<?php
/**
 * Blog: BlogController.
 *
 * @package Builder\Framework\Route
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Blog;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Framework\Controllers\RESTController;
use ET\Builder\Framework\UserRole\UserRole;
use WP_REST_Request;
use WP_REST_Response;

// phpcs:disable WordPress.WP.GlobalVariablesOverride.Prohibited -- disabled intentionally.

/**
 * Blog REST Controller class.
 *
 * @since ??
 */
class BlogController extends RESTController {
	/**
	 * Return posts/pages for Blog module.
	 *
	 * @since ??
	 *
	 * @param WP_REST_Request $request REST request object.
	 *
	 * @return WP_REST_Response|WP_Error
	 */
	public static function index( WP_REST_Request $request ): WP_REST_Response {
		$posts = [];

		$args = [
			'post_type'       => $request->get_param( 'postType' ),
			'posts_per_page'  => $request->get_param( 'postsPerPage' ),
			'paged'           => $request->get_param( 'paged' ),
			'categories'      => $request->get_param( 'categories' ),
			'fullwidth'       => $request->get_param( 'fullwidth' ),
			'date_format'     => $request->get_param( 'dateFormat' ),
			'excerpt_content' => $request->get_param( 'excerptContent' ),
			'excerpt_length'  => $request->get_param( 'excerptLength' ),
			'show_excerpt'    => $request->get_param( 'showExcerpt' ),
			'manual_excerpt'  => $request->get_param( 'manualExcerpt' ),
			'offset'          => $request->get_param( 'offset' ),
			'orderby'         => $request->get_param( 'orderby' ),
		];

		$query_args = array(
			'posts_per_page' => $args['posts_per_page'],
			'post_status'    => array( 'publish', 'private', 'inherit' ),
			'perm'           => 'readable',
			'post_type'      => $args['post_type'],
			'paged'          => $args['paged'],
		);

		if ( 'date_desc' !== $args['orderby'] ) {
			switch ( $args['orderby'] ) {
				case 'date_asc':
					$query_args['orderby'] = 'date';
					$query_args['order']   = 'ASC';
					break;
				case 'title_asc':
					$query_args['orderby'] = 'title';
					$query_args['order']   = 'ASC';
					break;
				case 'title_desc':
					$query_args['orderby'] = 'title';
					$query_args['order']   = 'DESC';
					break;
				case 'rand':
					$query_args['orderby'] = 'rand';
					break;
			}
		}

		if ( ! empty( $args['categories'] ) ) {
			$query_args['cat'] = $args['categories'];
		} else {
			// WP_Query doesn't return sticky posts when it performed via Ajax.
			// This happens because `is_home` is false in this case, but on FE it's true if no category set for the query.
			// Set `is_home` = true to emulate the FE behavior with sticky posts in VB.
			add_action(
				'pre_get_posts',
				function( $query ) {
					if ( true === $query->get( 'et_is_home' ) ) {
						$query->is_home = true;
					}
				}
			);

			$query_args['et_is_home'] = true;
		}

		if ( '' !== $args['offset'] && ! empty( $args['offset'] ) ) {
			/**
			 * Offset + pagination don't play well. Manual offset calculation required
			 *
			 * @see: https://codex.wordpress.org/Making_Custom_Queries_using_Offset_and_Pagination
			 */
			if ( $args['paged'] > 1 ) {
				$query_args['offset'] = ( ( $args['paged'] - 1 ) * $args['posts_number'] ) + $args['offset'];
			} else {
				$query_args['offset'] = $args['offset'];
			}
		}

		// Get query.
		$query = new \WP_Query( $query_args );

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();

				$title = get_the_title();

				$thumbnail = [];
				$thumb     = '';

				if ( has_post_thumbnail() || 'attachment' === get_post_type() ) {
					$thumb          = '';
					$width          = 'on' === $args['fullwidth'] ? 1080 : 400;
					$width          = (int) apply_filters( 'et_pb_blog_image_width', $width );
					$height         = 'on' === $args['fullwidth'] ? 675 : 250;
					$height         = (int) apply_filters( 'et_pb_blog_image_height', $height );
					$class          = 'on' === $args['fullwidth'] ? 'et_pb_post_main_image' : '';
					$alt            = get_post_meta( get_post_thumbnail_id(), '_wp_attachment_image_alt', true );
					$thumbnail_data = get_thumbnail( $width, $height, $class, $alt, $title, false, 'Blogimage' );
					$thumb          = $thumbnail_data['thumb'];
					$alt_text       = get_post_meta( get_post_thumbnail_id(), '_wp_attachment_image_alt', true );
					$thumbnail      = [
						'src'    => $thumb,
						'alt'    => ! empty( $alt_text ) ? $alt_text : esc_attr( get_the_title( get_the_ID() ) ),
						'width'  => $width,
						'height' => $height,
					];
				}

				$taxonomy   = et_builder_get_category_taxonomy( get_post_type( get_the_ID() ) );
				$terms      = get_the_terms( get_the_ID(), $taxonomy );
				$categories = [];

				if ( ! empty( $terms ) ) {
					foreach ( $terms as $term ) {
						$categories[] = [
							'id'   => $term->term_id,
							'name' => $term->name,
							'slug' => $term->slug,
							'link' => get_term_link( $term, $taxonomy ),
						];
					}
				}

				$content = BlogModule::render_content(
					[
						'excerpt_content' => $args['excerpt_content'],
						'show_excerpt'    => $args['show_excerpt'],
						'excerpt_manual'  => $args['manual_excerpt'],
						'excerpt_length'  => $args['excerpt_length'],
						'post_id'         => get_the_ID(),
					]
				);

				$new_post = [
					'id'         => get_the_ID(),
					'classNames' => get_post_class(),
					'title'      => get_the_title( get_the_ID() ),
					'permalink'  => get_permalink( get_the_ID() ),
					'thumbnail'  => ! empty( $thumb ) ? $thumbnail : null,
					'content'    => $content,
					'date'       => get_the_date( $args['date_format'] ),
					'comment'    => sprintf( esc_html( _nx( '%s Comment', '%s Comments', get_comments_number(), 'number of comments', 'et_builder' ) ), number_format_i18n( get_comments_number() ) ),
					'author'     => [
						'name' => get_the_author(),
						'link' => get_author_posts_url( get_the_author_meta( 'ID' ) ),
					],
					'categories' => $categories,
				];

				$posts[] = $new_post;
			}
		}

		$metadata = [
			'maxNumPages' => $query->max_num_pages,
		];

		// Adds WP-PageNavi plugin support.
		$metadata['wpPagenavi'] = function_exists( 'wp_pagenavi' ) ? \wp_pagenavi(
			[
				'query' => $query,
				'echo'  => false,
			]
		) : null;

		wp_reset_postdata();

		$response = [
			'posts'    => $posts,
			'metadata' => $metadata,
		];

		return self::response_success( $response );
	}
	/**
	 * Index action arguments.
	 *
	 * Endpoint arguments as used in `register_rest_route()`.
	 *
	 * @return array
	 */
	public static function index_args(): array {
		return [
			'postType'       => [
				'type'              => 'string',
				'default'           => 'post',
				'validate_callback' => function( $param, $request, $key ) {
					return is_string( $param );
				},
			],
			'postsPerPage'   => [
				'type'              => 'string',
				'default'           => '10',
				'validate_callback' => function( $param, $request, $key ) {
					return is_numeric( $param );
				},
				'sanitize_callback' => function( $value, $request, $param ) {
					return (int) $value;
				},
			],
			'paged'          => [
				'type'              => 'string',
				'default'           => '1',
				'validate_callback' => function( $param, $request, $key ) {
					return is_numeric( $param );
				},
				'sanitize_callback' => function( $value, $request, $param ) {
					return (int) $value;
				},
			],
			'categories'     => [
				'type'              => 'string',
				'default'           => '',
				'sanitize_callback' => function( $value, $request, $param ) {
					return explode( ',', $value );
				},
			],
			'fullwidth'      => [
				'type'              => 'string',
				'default'           => 'on',
				'validate_callback' => function( $param, $request, $key ) {
					return 'on' === $param || 'off' === $param;
				},
			],
			'dateFormat'     => [
				'type'              => 'string',
				'default'           => 'M j, Y',
				'validate_callback' => function( $param, $request, $key ) {
					return is_string( $param );
				},
			],
			'excerptContent' => [
				'type'              => 'string',
				'default'           => 'off',
				'validate_callback' => function( $param, $request, $key ) {
					return 'on' === $param || 'off' === $param;
				},
			],
			'excerptLength'  => [
				'type'              => 'string',
				'default'           => '270',
				'validate_callback' => function( $param, $request, $key ) {
					return is_numeric( $param );
				},
				'sanitize_callback' => function( $value, $request, $param ) {
					return (int) $value;
				},
			],
			'showExcerpt'    => [
				'type'              => 'string',
				'default'           => 'on',
				'validate_callback' => function( $param, $request, $key ) {
					return 'on' === $param || 'off' === $param;
				},
			],
			'manualExcerpt'  => [
				'type'              => 'string',
				'default'           => 'on',
				'validate_callback' => function( $param, $request, $key ) {
					return 'on' === $param || 'off' === $param;
				},
			],
			'offset'         => [
				'type'              => 'string',
				'default'           => '0',
				'validate_callback' => function( $param, $request, $key ) {
					return is_numeric( $param );
				},
				'sanitize_callback' => function( $value, $request, $param ) {
					return (int) $value;
				},
			],
			'orderby'        => [
				'type'              => 'string',
				'default'           => 'date_desc',
				'validate_callback' => function( $param, $request, $key ) {
					return is_string( $param );
				},
			],
		];
	}
	/**
	 * Index action permission.
	 *
	 * Endpoint permission callback as used in `register_rest_route()`.
	 *
	 * @return bool
	 */
	public static function index_permission(): bool {
		return UserRole::can_current_user_use_visual_builder();
	}
}
