<?php
/**
 * ModuleLibrary: Blog module front-end render callback.
 *
 * @package Builder\ModuleLibrary\BlogModule
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Blog\BlogModuleTraits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- WP use snakeCase in \WP_Block_Parser_Block

use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\Packages\IconLibrary\IconFont\Utils;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\ModuleLibrary\Blog\BlogModule;
use ET\Builder\Packages\ModuleUtils\ModuleUtils;
use WP_Query;

trait RenderCallbackTrait {

	/**
	 * Blog module render callback which outputs server side rendered HTML on the Front-End.
	 *
	 * This function is equivalent of JS function CtaEdit located in
	 * visual-builder/packages/module-library/src/components/cta/edit.tsx.
	 *
	 * @since ??
	 *
	 * @param array          $attrs    Block attributes that were saved by VB.
	 * @param string         $content  Block content.
	 * @param \WP_Block      $block    Parsed block object that being rendered.
	 * @param ModuleElements $elements ModuleElements instance.
	 *
	 * @return string HTML rendered of Blog module.
	 */
	public static function render_callback( $attrs, $content, $block, $elements ) {
		global $post, $paged, $wp_query, $wp_the_query, $wp_filter, $__et_blog_module_paged;

		// Keep a reference to the real main query to restore from later.
		$main_query = $wp_the_query;

		$post_type       = $attrs['post']['advanced']['type']['desktop']['value'] ?? '';
		$posts_per_page  = $attrs['post']['advanced']['number']['desktop']['value'] ?? '';
		$categories      = $attrs['post']['advanced']['categories']['desktop']['value'] ?? [];
		$fullwidth       = $attrs['fullwidth']['advanced']['enable']['desktop']['value'] ?? 'on';
		$date_format     = $attrs['post']['advanced']['dateFormat']['desktop']['value'] ?? '';
		$excerpt_content = $attrs['post']['advanced']['excerptContent']['desktop']['value'] ?? '';
		$excerpt_length  = $attrs['post']['advanced']['excerptLength']['desktop']['value'] ?? '';
		$excerpt_manual  = $attrs['post']['advanced']['excerptManual']['desktop']['value'] ?? '';
		$offset          = $attrs['post']['advanced']['offset']['desktop']['value'] ?? '';
		$icon_value      = Utils::process_font_icon( $attrs['overlayIcon']['decoration']['icon']['desktop']['value'] ?? [] );

		$show_excerpt    = ModuleUtils::has_value(
			$attrs['post']['advanced']['showExcerpt'] ?? [],
			[
				'valueResolver' => function ( $value ) {
					return 'on' === $value;
				},
			]
		);
		$show_thumbnail  = ModuleUtils::has_value(
			$attrs['image']['advanced']['enable'] ?? [],
			[
				'valueResolver' => function ( $value ) {
					return 'on' === $value;
				},
			]
		);
		$show_overlay    = ModuleUtils::has_value(
			$attrs['overlay']['advanced']['enable'] ?? [],
			[
				'valueResolver' => function ( $value ) {
					return 'on' === $value;
				},
			]
		);
		$show_read_more  = ModuleUtils::has_value(
			$attrs['readMore']['advanced']['enable'] ?? [],
			[
				'valueResolver' => function ( $value ) {
					return 'on' === $value;
				},
			]
		);
		$show_author     = ModuleUtils::has_value(
			$attrs['meta']['advanced']['showAuthor'] ?? [],
			[
				'valueResolver' => function ( $value ) {
					return 'on' === $value;
				},
			]
		);
		$show_date       = ModuleUtils::has_value(
			$attrs['meta']['advanced']['showDate'] ?? [],
			[
				'valueResolver' => function ( $value ) {
					return 'on' === $value;
				},
			]
		);
		$show_categories = ModuleUtils::has_value(
			$attrs['meta']['advanced']['showCategories'] ?? [],
			[
				'valueResolver' => function ( $value ) {
					return 'on' === $value;
				},
			]
		);
		$show_comments   = ModuleUtils::has_value(
			$attrs['meta']['advanced']['showComments'] ?? [],
			[
				'valueResolver' => function ( $value ) {
					return 'on' === $value;
				},
			]
		);
		$heading_level   = $attrs['title']['decoration']['font']['font']['desktop']['value']['headingLevel'] ?? 'h2';

		$query_args = array(
			'posts_per_page' => $posts_per_page,
			'post_status'    => array( 'publish', 'private', 'inherit' ),
			'perm'           => 'readable',
			'post_type'      => $post_type,
		);

		if ( $__et_blog_module_paged > 1 ) {
			$et_paged            = $__et_blog_module_paged;
			$paged               = $__et_blog_module_paged; //phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- intentionally done.
			$query_args['paged'] = $__et_blog_module_paged;
		}

		if ( ! empty( $categories ) ) {
			$query_args['cat'] = $categories;
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

		if ( '' !== $offset && ! empty( $offset ) ) {
			$query_args['offset'] = $offset;
		}

		// Stash properties that will not be the same after wp_reset_query().
		$wp_query_props = array(
			'current_post' => $wp_query->current_post,
			'in_the_loop'  => $wp_query->in_the_loop,
		);

		// TODO feat(D5, Theme Builder) Implement `use_current_loop` option.
		query_posts( $query_args ); //phpcs:ignore WordPress.WP.DiscouragedFunctions.query_posts_query_posts -- intentionally done.

		/**
		 * Filters Blog module's main query.
		 *
		 * @since ??
		 *
		 * @param WP_Query $wp_query
		 * @param array    $attrs    Modified module attributes.
		 */
		$wp_query = apply_filters( 'et_builder_blog_query', $wp_query, $attrs ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- We intend to override $wp_query for blog module.

		/**
		 * Renders Blog final HTML output.
		 */
		$output = '';
		$pagination = '';

		$post_ids = [];

		if ( have_posts() ) {
			while ( have_posts() ) {
				the_post();

				$post_ids[] = get_the_ID();

				$has_thumbnail = has_post_thumbnail() || 'attachment' === get_post_type();

				$image = '';

				if ( $has_thumbnail && $show_thumbnail ) {
					$thumb          = '';
					$width          = 'on' === $fullwidth ? 1080 : 400;
					$width          = (int) apply_filters( 'et_pb_blog_image_width', $width );
					$height         = 'on' === $fullwidth ? 675 : 250;
					$height         = (int) apply_filters( 'et_pb_blog_image_height', $height );
					$class          = 'on' === $fullwidth ? 'et_pb_post_main_image' : '';
					$alt            = get_post_meta( get_post_thumbnail_id(), '_wp_attachment_image_alt', true );
					$thumbnail_data = get_thumbnail( $width, $height, $class, $alt, get_the_title(), false, 'Blogimage' );
					$thumb          = $thumbnail_data['thumb'];

					$post_thumbnail = HTMLUtility::render(
						[
							'tag'               => 'a',
							'attributes'        => [
								'href'  => get_permalink(),
								'class' => 'entry-featured-image-url',
							],
							'childrenSanitizer' => 'et_core_esc_previously',
							'children'          => [
								print_thumbnail( $thumb, $thumbnail_data['use_timthumb'], get_the_title(), $width, $height, '', false ),
								HTMLUtility::render(
									[
										'tag'        => 'span',
										'attributes' => [
											'data-icon' => $icon_value,
											'class'     => 'et_overlay et_pb_inline_icon',
										],
									]
								),
							],
						]
					);

					$image = 'off' === $fullwidth ? HTMLUtility::render(
						[
							'tag'               => 'div',
							'attributes'        => [
								'class' => 'et_pb_image_container',

							],
							'children'          => $post_thumbnail,
							'childrenSanitizer' => 'et_core_esc_previously',
						]
					) : $post_thumbnail;
				}

				$title = HTMLUtility::render(
					[
						'tag'               => $heading_level,
						'attributes'        => [
							'class' => 'entry-title',
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => HTMLUtility::render(
							[
								'tag'        => 'a',
								'attributes' => [
									'href' => get_the_permalink(),
								],
								'children'   => get_the_title(),
							]
						),
					]
				);

				$meta = HTMLUtility::render(
					[
						'tag'               => 'p',
						'attributes'        => [
							'class' => 'post-meta',
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => BlogModule::render_meta(
							[
								'show_author'     => $show_author,
								'show_date'       => $show_date,
								'show_categories' => $show_categories,
								'show_comments'   => $show_comments,
								'post_id'         => get_the_ID(),
								'date_format'     => $date_format,
							]
						),
					]
				);

				$post_content_render = HTMLUtility::render(
					[
						'tag'               => 'div',
						'attributes'        => [
							'class' => 'post-content-inner',
						],
						'childrenSanitizer' => 'wp_kses_post',
						'children'          => BlogModule::render_content(
							[
								'excerpt_content' => $excerpt_content,
								'show_excerpt'    => $show_excerpt,
								'excerpt_manual'  => $excerpt_manual,
								'excerpt_length'  => $excerpt_length,
								'post_id'         => get_the_ID(),
							]
						),
					]
				);

				$read_more = $show_read_more ? HTMLUtility::render(
					[
						'tag'        => 'a',
						'attributes' => [
							'href'  => get_permalink(),
							'class' => 'more-link',
						],
						'children'   => esc_html__( 'Read More', 'et_builder' ),
					]
				) : '';

				$content = HTMLUtility::render(
					[
						'tag'               => 'div',
						'attributes'        => [
							'class' => 'post-content',
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => $post_content_render . $read_more,
					]
				);

				$post_id_class = 'et_pb_post_id_' . get_the_ID();

				$output .= HTMLUtility::render(
					[
						'tag'               => 'article',
						'attributes'        => [
							'class' => HTMLUtility::classnames(
								[
									'et_pb_post'        => true,
									$post_id_class      => true,
									'clearfix'          => true,
									'et_pb_no_thumb'    => 'off' === $show_thumbnail && ! $has_thumbnail,
									'et_pb_has_overlay' => $show_overlay,
								],
								get_post_class()
							),
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => [
							$image,
							$title,
							$meta,
							$content,
						],
					]
				);
			}

			$pagination .= BlogModule::render_pagination();
		}

		wp_reset_postdata();
		unset( $wp_query->et_pb_blog_query );

		$wp_the_query = $wp_query = $main_query; //phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited,Squiz.PHP.DisallowMultipleAssignments.Found -- intentionally done.
		wp_reset_query(); //phpcs:ignore WordPress.WP.DiscouragedFunctions.wp_reset_query_wp_reset_query -- intentionally done.

		// Restore stashed properties.
		foreach ( $wp_query_props as $prop => $value ) {
			$wp_query->{$prop} = $value;
		}

		$posts_output = 'on' === $fullwidth ? HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class' => 'et_pb_ajax_pagination_container',
				],
				'children'          => [
					$output,
					$pagination,
				],
				'childrenSanitizer' => 'et_core_esc_previously',
			]
		) : HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class' => 'et_pb_blog_grid clearfix',
				],
				'children'          => HTMLUtility::render(
					[
						'tag'               => 'div',
						'attributes'        => [
							'class' => 'et_pb_ajax_pagination_container',
						],
						'children'          => [
							HTMLUtility::render(
								[
									'tag'               => 'div',
									'attributes'        => [
										'class'        => 'et_pb_salvattore_content',
										'data-columns' => '',
									],
									'children'          => [
										$output,
									],
									'childrenSanitizer' => 'et_core_esc_previously',
								]
							),
							$pagination,
						],
						'childrenSanitizer' => 'et_core_esc_previously',
					]
				),
				'childrenSanitizer' => 'et_core_esc_previously',
			]
		);

		$parent = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );

		return Module::render(
			[
				// FE only.
				'orderIndex'          => $block->parsed_block['orderIndex'],
				'storeInstance'       => $block->parsed_block['storeInstance'],

				// VB equivalent.
				'attrs'               => $attrs,
				'id'                  => $block->parsed_block['id'],
				'elements'            => $elements,
				'name'                => $block->block_type->name,
				'classnamesFunction'  => [ BlogModule::class, 'module_classnames' ],
				'moduleCategory'      => $block->block_type->category,
				'stylesComponent'     => [ BlogModule::class, 'module_styles' ],
				'scriptDataComponent' => function ( $args ) use ( $post_ids ) {
					BlogModule::module_script_data(
						array_merge(
							$args,
							[
								'post_ids' => $post_ids,
							]
						)
					);
				},
				'parentAttrs'         => $parent->attrs ?? [],
				'parentId'            => $parent->id ?? '',
				'parentName'          => $parent->blockName ?? '',
				'children'            => $elements->style_components(
					[
						'attrName' => 'module',
					]
				) . $posts_output,
			]
		);
	}

}
