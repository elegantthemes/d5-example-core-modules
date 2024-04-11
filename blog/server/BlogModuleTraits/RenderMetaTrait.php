<?php
/**
 * Module Library: Blog - Meta
 *
 * @package Builder\Packages\ModuleLibrary
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Blog\BlogModuleTraits;

use ET\Builder\Framework\Utility\HTMLUtility;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

trait RenderMetaTrait {

	/**
	 * Render Meta.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *    Optional. An array of arguments for render the post meta.
	 *    @type bool   $show_author     Show author.
	 *    @type bool   $show_date       Show date.
	 *    @type bool   $show_categories Show categories.
	 *    @type bool   $show_comments   Show comments.
	 *    @type int    $post_id         Post ID.
	 *    @type string $date_format     Date format.
	 * }
	 *
	 * @return string
	 */
	public static function render_meta( $args ) {
		$show_author     = $args['show_author'] ?? '';
		$show_date       = $args['show_date'] ?? '';
		$show_categories = $args['show_categories'] ?? '';
		$show_comments   = $args['show_comments'] ?? '';
		$post_id         = $args['post_id'] ?? 0;
		$date_format     = $args['date_format'] ?? '';

		$post_meta = [];

		$author = sprintf(
			__( 'by %s', 'et_builder' ),
			HTMLUtility::render(
				[
					'tag'               => 'span',
					'attributes'        => [
						'class' => 'author vcard',
					],
					'childrenSanitizer' => 'et_core_esc_previously',
					'children'          => HTMLUtility::render(
						[
							'tag'        => 'a',
							'attributes' => [
								'href'  => get_author_posts_url( get_the_author_meta( 'ID' ) ),
								'title' => sprintf( __( 'Posts by %s', 'et_builder' ), get_the_author() ),
								'rel'   => 'author',
							],
							'children'   => get_the_author(),
						]
					),
				]
			)
		);

		if ( $show_author ) {
			$post_meta[] = $author;
		}

		$date = HTMLUtility::render(
			[
				'tag'        => 'span',
				'attributes' => [
					'class' => 'published',
				],
				'children'   => get_the_date( $date_format, $post_id ),
			]
		);

		if ( $show_date ) {
			$post_meta[] = $date;
		}

			$taxonomy   = et_builder_get_category_taxonomy( get_post_type( $post_id ) );
			$terms      = get_the_terms( $post_id, $taxonomy );
			$categories = [];

		if ( ! empty( $terms ) ) {
			foreach ( $terms as $term ) {
				$categories[] = HTMLUtility::render(
					[
						'tag'        => 'a',
						'attributes' => [
							'href' => get_term_link( $term, $taxonomy ),
							'rel'  => 'tag',
						],
						'children'   => $term->name,
					]
				);
			}
		}

		if ( $show_categories ) {
			$post_meta[] = HTMLUtility::render(
				[
					'tag'               => 'span',
					'attributes'        => [
						'class' => 'entry-categories',
					],
					'childrenSanitizer' => 'et_core_esc_previously',
					'children'          => implode( ', ', $categories ),
				]
			);
		}

		$comments = sprintf( esc_html( _nx( '%s Comment', '%s Comments', get_comments_number(), 'number of comments', 'et_builder' ) ), number_format_i18n( get_comments_number( $post_id ) ) );

		if ( $show_comments ) {
			$post_meta[] = HTMLUtility::render(
				[
					'tag'               => 'span',
					'attributes'        => [
						'class' => 'entry-comments',
					],
					'childrenSanitizer' => 'et_core_esc_previously',
					'children'          => $comments,
				]
			);
		}

		return implode( ' | ', $post_meta );
	}
}
