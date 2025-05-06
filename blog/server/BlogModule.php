<?php
/**
 * ModuleLibrary: Blog Module class.
 *
 * @package Builder\ModuleLibrary\BlogModule
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Blog;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- WP use snakeCase in \WP_Block_Parser_Block

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\Framework\Utility\PostUtility;
use ET\Builder\Framework\Utility\SanitizerUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\FrontEnd\Module\Script;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\IconLibrary\IconFont\Utils;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewScriptData;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewUtils;
use ET\Builder\Packages\Module\Layout\Components\StyleCommon\CommonStyle;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\Module\Options\Element\ElementClassnames;
use ET\Builder\Packages\Module\Options\Text\TextClassnames;
use ET\Builder\Packages\Module\Options\Text\TextStyle;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\ModuleUtils\ModuleUtils;
use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;
use WP_Query;
use ET\Builder\Packages\GlobalData\GlobalPresetItemGroupAttrNameResolver;
use ET\Builder\Packages\GlobalData\GlobalPresetItemGroupAttrNameResolved;
use ET\Builder\Framework\Utility\ArrayUtility;

/**
 * `BlogModule` is consisted of functions used for Blog Module such as Front-End rendering, REST API Endpoints etc.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 */
class BlogModule implements DependencyInterface {
	/**
	 * Track if the module is currently rendering to prevent unnecessary rendering and recursion.
	 *
	 * @var bool
	 */
	protected static $_rendering = false;

	/**
	 * Track if the module is currently rendering content to prevent unnecessary rendering and recursion.
	 *
	 * @var bool
	 */
	protected static $_rendering_content = false;

	/**
	 * Custom CSS fields
	 *
	 * This function is equivalent of JS const cssFields located in
	 * visual-builder/packages/module-library/src/components/blog/custom-css.ts.
	 *
	 * A minor difference with the JS const cssFields, this function did not have `label` property on each array item.
	 *
	 * @since ??
	 */
	public static function custom_css() {
		return \WP_Block_Type_Registry::get_instance()->get_registered( 'divi/blog' )->customCssFields;
	}

	/**
	 * Style declaration for Blog Module If it has border radius set.
	 *
	 * This function is the equivalent of the `borderStyleDeclaration` JS function located in
	 * visual-builder/packages/module-library/src/components/blog/style-declarations/border/index.ts.
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *     @type array      $attrValue  The value (breakpoint > state > value) of module attribute.
	 *     @type bool|array $important  If set to true, the CSS will be added with !important.
	 *     @type string     $returnType This is the type of value that the function will return. Can be either string or key_value_pair.
	 * }
	 *
	 * @since ??
	 */
	public static function overflow_style_declaration( array $params ): string {
		$radius = $params['attrValue']['radius'] ?? [];

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		if ( ! $radius ) {
			return $style_declarations->value();
		}

		$all_corners_zero = true;

		// Check whether all corners are zero.
		// If any corner is not zero, update the variable and break the loop.
		foreach ( $radius as $corner => $value ) {
			if ( 'sync' === $corner ) {
				continue;
			}

			$corner_value = SanitizerUtility::numeric_parse_value( $value ?? '' );
			if ( 0.0 !== ( $corner_value['valueNumber'] ?? 0.0 ) ) {
				$all_corners_zero = false;
				break;
			}
		}

		if ( $all_corners_zero ) {
			return $style_declarations->value();
		}

		// Add overflow hidden when any corner's border radius is not zero.
		$style_declarations->add( 'overflow', 'hidden' );

		return $style_declarations->value();
	}

	/**
	 * Blog Module's style components.
	 *
	 * This function is equivalent of JS function ModuleStyles located in
	 * visual-builder/packages/module-library/src/components/cta/styles.tsx.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *      @type string         $id                Module ID. In VB, the ID of module is UUIDV4. In FE, the ID is order index.
	 *      @type string         $name              Module name.
	 *      @type string         $attrs             Module attributes.
	 *      @type string         $parentAttrs       Parent attrs.
	 *      @type string         $orderClass        Selector class name.
	 *      @type string         $parentOrderClass  Parent selector class name.
	 *      @type string         $wrapperOrderClass Wrapper selector class name.
	 *      @type string         $settings          Custom settings.
	 *      @type string         $state             Attributes state.
	 *      @type string         $mode              Style mode.
	 *      @type ModuleElements $elements          ModuleElements instance.
	 * }
	 */
	public static function module_styles( array $args ): void {
		$attrs       = $args['attrs'] ?? [];
		$elements    = $args['elements'];
		$settings    = $args['settings'] ?? [];
		$order_class = $args['orderClass'] ?? '';

		Style::add(
			[
				'id'            => $args['id'],
				'name'          => $args['name'],
				'orderIndex'    => $args['orderIndex'],
				'storeInstance' => $args['storeInstance'],
				'styles'        => [
					// Module.
					$elements->style(
						[
							'attrName'   => 'module',
							'styleProps' => [
								'disabledOn' => [
									'disabledModuleVisibility' => $settings['disabledModuleVisibility'] ?? null,
								],
							],
						]
					),
					TextStyle::style(
						[
							'selector'   => $args['orderClass'],
							'attr'       => $attrs['module']['advanced']['text'] ?? [],
							'orderClass' => $order_class,
						]
					),

					// Image.
					$elements->style(
						[
							'attrName' => 'image',
						]
					),

					CommonStyle::style(
						[
							'selector'            => "{$args['orderClass']} .et_pb_post .entry-featured-image-url, {$args['orderClass']} .et_pb_post .et_pb_slides, {$args['orderClass']} .et_pb_post .et_pb_video_overlay",
							'attr'                => $attrs['image']['decoration']['border'] ?? [],
							'declarationFunction' => [ self::class, 'overflow_style_declaration' ],
							'orderClass'          => $order_class,
						]
					),

					// Title.
					$elements->style(
						[
							'attrName' => 'title',
						]
					),

					// Meta.
					$elements->style(
						[
							'attrName' => 'meta',
						]
					),

					// Content.
					$elements->style(
						[
							'attrName' => 'content',
						]
					),

					// Read more.
					$elements->style(
						[
							'attrName' => 'readMore',
						]
					),

					// Post Item.
					$elements->style(
						[
							'attrName' => 'post',
						]
					),
					CommonStyle::style(
						[
							'selector'            => "{$args['orderClass']} .et_pb_post",
							'attr'                => $attrs['post']['decoration']['border'] ?? [],
							'declarationFunction' => [ self::class, 'overflow_style_declaration' ],
							'orderClass'          => $order_class,
						]
					),

					// Fullwidth.
					$elements->style(
						[
							'attrName' => 'fullwidth',
						]
					),
					CommonStyle::style(
						[
							'selector'            => "{$args['orderClass']}:not(.et_pb_blog_grid_wrapper) .et_pb_post",
							'attr'                => $attrs['fullwidth']['decoration']['border'] ?? [],
							'declarationFunction' => [ self::class, 'overflow_style_declaration' ],
							'orderClass'          => $order_class,
						]
					),

					// Overlay.
					$elements->style(
						[
							'attrName' => 'overlay',
						]
					),

					// Overlay Icon.
					$elements->style(
						[
							'attrName' => 'overlayIcon',
						]
					),

					// Masonry.
					$elements->style(
						[
							'attrName' => 'masonry',
						]
					),

					// Pagination.
					$elements->style(
						[
							'attrName' => 'pagination',
						]
					),

					// Placed the very end only for custom css.
					CssStyle::style(
						[
							'selector'   => $args['orderClass'],
							'attr'       => $attrs['css'] ?? [],
							'cssFields'  => self::custom_css(),
							'orderClass' => $order_class,
						]
					),
				],
			]
		);
	}

	/**
	 * Module classnames function for call to action module.
	 *
	 * This function is equivalent of JS function moduleClassnames located in
	 * visual-builder/packages/module-library/src/components/blog/module-classnames.ts.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *     @type object $classnamesInstance Instance of ET\Builder\Packages\Module\Layout\Components\Classnames.
	 *     @type array  $attrs              Block attributes data that being rendered.
	 * }
	 */
	public static function module_classnames( $args ) {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];

		$fullwidth = $attrs['fullwidth']['advanced']['enable']['desktop']['value'] ?? 'on';

		$classnames_instance->add( TextClassnames::text_options_classnames( $attrs['module']['advanced']['text'] ?? [] ), true );

		if ( 'on' === $fullwidth ) {
			$classnames_instance->add( 'et_pb_posts', true );
		} else {
			$classnames_instance->add( 'et_pb_blog_grid_wrapper', true );
		}

		// Module.
		$classnames_instance->add(
			ElementClassnames::classnames(
				[
					'attrs' => array_merge(
						$attrs['module']['decoration'] ?? [],
						[
							'border' => $attrs['post']['decoration']['border'] ?? $attrs['fullwidth']['decoration']['border'] ?? [],
							'link'   => $attrs['module']['advanced']['link'] ?? [],
						]
					),
				]
			)
		);
	}

	/**
	 * Set script data of used module options.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *   Array of arguments.
	 *
	 *   @type string         $id            Module id.
	 *   @type string         $name          Module name.
	 *   @type string         $selector      Module selector.
	 *   @type array          $attrs         Module attributes.
	 *   @type int            $storeInstance The ID of instance where this block stored in BlockParserStore class.
	 *   @type ModuleElements $elements      ModuleElements instance.
	 * }
	 */
	public static function module_script_data( $args ) {
		// Assign variables.
		$id             = $args['id'] ?? '';
		$name           = $args['name'] ?? '';
		$selector       = $args['selector'] ?? '';
		$attrs          = $args['attrs'] ?? [];
		$elements       = $args['elements'];
		$store_instance = $args['storeInstance'] ?? null;
		$post_ids       = $args['post_ids'] ?? [];

		// Element Script Data Options.
		$elements->script_data(
			[
				'attrName' => 'module',
			]
		);

		// Post meta set content.
		$set_content = [];

		$date_format = $attrs['post']['advanced']['dateFormat']['desktop']['value'] ?? '';

		if ( ! empty( $post_ids ) ) {
			foreach ( $post_ids as $post_id ) {
				$set_content[] = [
					'selector'      => $selector . ' .et_pb_post_id_' . $post_id . ' .post-meta',
					'data'          => MultiViewUtils::merge_values(
						[
							'showAuthor'     => $attrs['meta']['advanced']['showAuthor'] ?? [],
							'showDate'       => $attrs['meta']['advanced']['showDate'] ?? [],
							'showCategories' => $attrs['meta']['advanced']['showCategories'] ?? [],
							'showComments'   => $attrs['meta']['advanced']['showComments'] ?? [],
						]
					),
					'sanitizer'     => 'et_core_esc_previously',
					'valueResolver' => function ( $value ) use ( $date_format, $post_id ) {
						$show_author     = 'on' === ( $value['showAuthor'] ?? '' );
						$show_date       = 'on' === ( $value['showDate'] ?? '' );
						$show_categories = 'on' === ( $value['showCategories'] ?? '' );
						$show_comments   = 'on' === ( $value['showComments'] ?? '' );

						return BlogModule::render_meta(
							[
								'show_author'     => $show_author,
								'show_date'       => $show_date,
								'show_categories' => $show_categories,
								'show_comments'   => $show_comments,
								'post_id'         => $post_id,
								'date_format'     => $date_format,
							]
						);
					},
				];

				// Post excerpt.
				$set_content[] = [
					'selector'      => $selector . ' .et_pb_post_id_' . $post_id . ' .post-content-inner',
					'data'          => MultiViewUtils::merge_values(
						[
							'excerptContent' => $attrs['post']['advanced']['excerptContent'] ?? [],
							'showExcerpt'    => $attrs['post']['advanced']['showExcerpt'] ?? [],
							'excerptManual'  => $attrs['post']['advanced']['excerptManual'] ?? [],
							'excerptLength'  => $attrs['post']['advanced']['excerptLength'] ?? [],
						]
					),
					'sanitizer'     => 'wp_kses_post',
					'valueResolver' => function ( $value ) use ( $date_format, $post_id ) {
						$excerpt_content = $value['excerptContent'] ?? '';
						$show_excerpt    = $value['showExcerpt'] ?? '';
						$excerpt_manual  = $value['excerptManual'] ?? '';
						$excerpt_length  = $value['excerptLength'] ?? '';

						return BlogModule::render_content(
							[
								'excerpt_content' => $excerpt_content,
								'show_excerpt'    => $show_excerpt,
								'excerpt_manual'  => $excerpt_manual,
								'excerpt_length'  => $excerpt_length,
								'post_id'         => $post_id,
							]
						);
					},
				];
			}
		}

		MultiViewScriptData::set(
			[
				'id'            => $id,
				'name'          => $name,
				'storeInstance' => $store_instance,
				'hoverSelector' => $selector,
				'setContent'    => $set_content,
				'setVisibility' => [
					[
						'selector'      => $selector . ' .entry-featured-image-url',
						'data'          => $attrs['image']['advanced']['enable'] ?? [],
						'valueResolver' => function ( $value ) {
							return 'on' === $value ? 'visible' : 'hidden';
						},
					],
					[
						'selector'      => $selector . ' .more-link',
						'data'          => $attrs['readMore']['advanced']['enable'] ?? [],
						'valueResolver' => function ( $value ) {
							return 'on' === $value ? 'visible' : 'hidden';
						},
					],
					[
						'selector'      => $selector . ' .pagination',
						'data'          => $attrs['pagination']['advanced']['enable'] ?? [],
						'valueResolver' => function ( $value ) {
							return 'on' === $value ? 'visible' : 'hidden';
						},
					],
				],
			]
		);
	}

	/**
	 * Blog module render callback which outputs server side rendered HTML on the Front-End.
	 *
	 * This function is the equivalent of JS function CtaEdit located in
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

		if ( self::$_rendering ) {
			return '';
		}

		self::$_rendering = true;

		// Fallback $__et_blog_module_paged; sometime it could be null.
		$et_blog_module_page = $__et_blog_module_paged > 1 ? $__et_blog_module_paged : absint( get_query_var( 'page' ) );
		$et_blog_module_page = max( 1, $et_blog_module_page );

		// Keep a reference to the real main query to restore from later.
		$main_query = $wp_the_query;

		$use_current_loop = $attrs['post']['advanced']['useCurrentLoop']['desktop']['value'] ?? 'off';

		$post_type      = $attrs['post']['advanced']['type']['desktop']['value'] ?? '';
		$posts_per_page = $attrs['post']['advanced']['number']['desktop']['value'] ?? '';
		$categories     = $attrs['post']['advanced']['categories']['desktop']['value'] ?? [];
		$fullwidth      = $attrs['fullwidth']['advanced']['enable']['desktop']['value'] ?? 'on';
		$offset         = $attrs['post']['advanced']['offset']['desktop']['value'] ?? '';

		$query_args = array(
			'posts_per_page' => $posts_per_page,
			'post_status'    => array( 'publish', 'private', 'inherit' ),
			'perm'           => 'readable',
			'post_type'      => $post_type,
		);

		if ( $et_blog_module_page > 1 ) {
			$et_paged            = $et_blog_module_page;
			$paged               = $et_blog_module_page; //phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- intentionally done.
			$query_args['paged'] = $et_blog_module_page;
		}

		if ( ! empty( $categories ) ) {
			$query_args['cat'] = $categories;
		} else {
			// WP_Query doesn't return sticky posts when it performed via Ajax.
			// This happens because `is_home` is false in this case, but on FE it's true if no category set for the query.
			// Set `is_home` = true to emulate the FE behavior with sticky posts in VB.
			add_action(
				'pre_get_posts',
				function ( $query ) {
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

		if ( 'off' === $use_current_loop ) {
			query_posts( $query_args ); //phpcs:ignore WordPress.WP.DiscouragedFunctions.query_posts_query_posts -- intentionally done.
		} elseif ( is_singular() ) {
			// Force an empty result set in order to avoid loops over the current post.
			query_posts( array( 'post__in' => array( 0 ) ) ); //phpcs:ignore WordPress.WP.DiscouragedFunctions.query_posts_query_posts -- intentionally done.
		} else {
			// Only allow certain args when `Posts For Current Page` is set.
			$original = $wp_query->query_vars;
			$custom   = array_intersect_key( $query_args, array_flip( array( 'posts_per_page', 'offset', 'paged' ) ) );

			// Trick WP into reporting this query as the main query so third party filters
			// that check for is_main_query() are applied.
			$wp_the_query = $wp_query = new WP_Query( array_merge( $original, $custom ) ); //phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited,Squiz.PHP.DisallowMultipleAssignments.Found -- intentionally done.
		}

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
		$output     = '';
		$pagination = '';

		$post_ids    = [];
		$items_count = 0;

		if ( $wp_query->have_posts() ) {
			$sticky_posts = get_option( 'sticky_posts' );
			if ( ! empty( $sticky_posts ) ) {
				$sticky_args  = array(
					'post_type'      => 'post',
					'post__in'       => $sticky_posts,
					'posts_per_page' => -1,
					'cat'            => $categories,
					'orderby'        => 'post__in',
				);
				$sticky_query = new WP_Query( $sticky_args );
				while ( $sticky_query->have_posts() ) {
					$sticky_query->the_post();
					$post_ids[] = get_the_ID();
					$output    .= self::process_post_data( $sticky_query->post, $attrs, $block->parsed_block['orderIndex'], $items_count );

					++$items_count;
				}
				wp_reset_postdata();
			}

			while ( $wp_query->have_posts() ) {
				$wp_query->the_post();
				if ( ! in_array( get_the_ID(), $sticky_posts, true ) ) {
					$post_ids[] = get_the_ID();
					$output    .= self::process_post_data( $wp_query->post, $attrs, $block->parsed_block['orderIndex'], $items_count );

					++$items_count;
				}
			}

			$pagination .= self::render_pagination( $attrs );

			wp_reset_postdata();
		}

		unset( $wp_query->et_pb_blog_query );

		$wp_the_query = $wp_query = $main_query; //phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited,Squiz.PHP.DisallowMultipleAssignments.Found -- intentionally done.
		wp_reset_query(); //phpcs:ignore WordPress.WP.DiscouragedFunctions.wp_reset_query_wp_reset_query -- intentionally done.

		// Restore stashed properties.
		foreach ( $wp_query_props as $prop => $value ) {
			$wp_query->{$prop} = $value;
		}

		$no_posts_output = '';

		ob_start();

		get_template_part( 'includes/no-results', 'index' );

		if ( ob_get_length() > 0 ) {
			$no_posts_output = ob_get_clean();
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

		if ( empty( $post_ids ) ) {
			$posts_output = $no_posts_output;
		}

		$parent = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );

		$module_html = Module::render(
			[
				// FE only.
				'orderIndex'          => $block->parsed_block['orderIndex'],
				'storeInstance'       => $block->parsed_block['storeInstance'],

				// VB equivalent.
				'attrs'               => $attrs,
				'id'                  => $block->parsed_block['id'],
				'elements'            => $elements,
				'name'                => $block->block_type->name,
				'classnamesFunction'  => [ self::class, 'module_classnames' ],
				'moduleCategory'      => $block->block_type->category,
				'stylesComponent'     => [ self::class, 'module_styles' ],
				'scriptDataComponent' => function ( $args ) use ( $post_ids ) {
					self::module_script_data(
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

		self::$_rendering = false;
		return $module_html;
	}

	/**
	 * Processes the data for a single post and returns the HTML for that post.
	 *
	 * This function is responsible for generating the HTML for a single post. It retrieves the post's ID, checks if the post has a thumbnail, and if the thumbnail should be shown. It then generates the HTML for the thumbnail, the post title, the post meta, and the post content. It also checks if a "Read More" link should be added to the post content. Finally, it generates the HTML for the entire post and returns it.
	 *
	 * @param \WP_Post $post The post-object.
	 * @param array    $attrs The attributes for the post.
	 * @param int      $order_index The order index of the post.
	 * @param int      $item_index The items index of the post.
	 * @return string The HTML for the post.
	 */
	public static function process_post_data( \WP_Post $post, array $attrs, int $order_index, int $item_index ): string {

		$fullwidth       = $attrs['fullwidth']['advanced']['enable']['desktop']['value'] ?? 'on';
		$date_format     = $attrs['post']['advanced']['dateFormat']['desktop']['value'] ?? '';
		$excerpt_content = $attrs['post']['advanced']['excerptContent']['desktop']['value'] ?? 'off';
		$excerpt_length  = $attrs['post']['advanced']['excerptLength']['desktop']['value'] ?? '270';
		$excerpt_manual  = $attrs['post']['advanced']['excerptManual']['desktop']['value'] ?? 'on';
		$icon_value      = Utils::process_font_icon( $attrs['overlayIcon']['decoration']['icon']['desktop']['value'] ?? [] );
		$show_excerpt    = $attrs['post']['advanced']['showExcerpt']['desktop']['value'] ?? 'on';
		$show_overlay    = 'on' === ( $attrs['overlay']['advanced']['enable']['desktop']['value'] ?? 'off' );

		$post_format = et_pb_post_format();

		$show_title_meta_content = 'off' === $fullwidth || ! in_array( $post_format, array( 'link', 'audio', 'quote' ), true ) || post_password_required( $post );

		$show_thumbnail  = ModuleUtils::has_value(
			$attrs['image']['advanced']['enable'] ?? [],
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

		$has_thumbnail = has_post_thumbnail() || 'attachment' === get_post_type();

		$post_thumb = '';

		if ( ! in_array( $post_format, array( 'link', 'audio', 'quote' ), true ) || post_password_required( $post ) ) {
			$thumb          = '';
			$width          = 'on' === $fullwidth ? 1080 : 400;
			$width          = (int) apply_filters( 'et_pb_blog_image_width', $width );
			$height         = 'on' === $fullwidth ? 675 : 250;
			$height         = (int) apply_filters( 'et_pb_blog_image_height', $height );
			$class          = 'on' === $fullwidth ? 'et_pb_post_main_image' : '';
			$alt            = get_post_meta( get_post_thumbnail_id(), '_wp_attachment_image_alt', true );
			$thumbnail_data = get_thumbnail( $width, $height, $class, $alt, get_the_title(), false, 'Blogimage' );
			$thumb          = $thumbnail_data['thumb'];
			$first_video    = PostUtility::get_first_video();

			if ( 'video' === $post_format && false !== $first_video ) {

				$video_overlay = ! empty( $thumb ) ? HTMLUtility::render(
					[
						'tag'               => 'div',
						'attributes'        => [
							'class' => 'et_pb_video_overlay',
							'style' => 'background-image: url(' . $thumb . '); background-size: cover;',
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => HTMLUtility::render(
							[
								'tag'        => 'div',
								'attributes' => [
									'class' => 'et_pb_video_overlay_hover',
								],
								'children'   => HTMLUtility::render(
									[
										'tag'        => 'a',
										'attributes' => [
											'class' => 'et_pb_video_play',
											'href'  => '#',
										],
									]
								),
							]
						),
					]
				) : '';

				$post_thumb = HTMLUtility::render(
					[
						'tag'               => 'div',
						'attributes'        => [
							'class' => 'et_main_video_container',
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => [
							$video_overlay,
							$first_video,
						],
					]
				);
			} elseif ( 'gallery' === $post_format ) {
				ob_start();
				et_pb_gallery_images( 'slider' );
				$post_thumb = ob_get_clean();
			} elseif ( $has_thumbnail && $show_thumbnail ) {

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

				$post_thumb = 'off' === $fullwidth ? HTMLUtility::render(
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
		}

		$title = $show_title_meta_content && (
			! in_array( $post_format, array( 'link', 'audio' ), true ) ||
			post_password_required( $post )
		) ? HTMLUtility::render(
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
		) : '';

		$meta = $show_title_meta_content ? HTMLUtility::render(
			[
				'tag'               => 'p',
				'attributes'        => [
					'class' => 'post-meta',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => self::render_meta(
					[
						'show_author'     => $show_author,
						'show_date'       => $show_date,
						'show_categories' => $show_categories,
						'show_comments'   => $show_comments,
						'post_id'         => $post->ID,
						'date_format'     => $date_format,
					]
				),
			]
		) : '';

		$post_content_render = $show_title_meta_content ? HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [

					'class' => 'post-content-inner',
				],
				'childrenSanitizer' => 'wp_kses_post',
				'children'          => self::render_content(
					[
						'excerpt_content' => $excerpt_content,
						'show_excerpt'    => $show_excerpt,
						'excerpt_manual'  => $excerpt_manual,
						'excerpt_length'  => $excerpt_length,
						'post_id'         => $post->ID,
					]
				),
			]
		) : '';

		$read_more = $show_read_more ? HTMLUtility::render(
			[
				'tag'        => 'a',
				'attributes' => [
					'href'  => get_permalink(),
					'class' => 'more-link',
				],
				'children'   => esc_html__(
					'Read More',
					'et_builder'
				),
			]
		) : '';

		$content = HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [ 'class' => 'post-content' ],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $post_content_render . $read_more,
			]
		);

		$post_id_class = 'et_pb_post_id_' . $post->ID;

		// add item order index class.
		$item_class = sprintf( ' et_pb_blog_item_%1$s_%2$s', (int) $order_index, (int) $item_index );

		// Post format content.
		ob_start();
		et_divi_post_format_content();
		$post_format_content = ob_get_clean();

		return HTMLUtility::render(
			[
				'tag'               => 'article',
				'attributes'        => [
					'class' => HTMLUtility::classnames(
						[
							'et_pb_post'        => true,
							$post_id_class      => true,
							'clearfix'          => true,
							'et_pb_no_thumb'    => $show_thumbnail && ! $has_thumbnail,
							'et_pb_has_overlay' => $show_overlay,
							$item_class         => true,
						],
						get_post_class()
					),
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => [
					$post_format_content,
					$post_thumb,
					$title,
					$meta,
					$content,
				],
			]
		);
	}

	/**
	 * Render pagination.
	 *
	 * @since ??
	 *
	 * @param array $attrs The module attributes.
	 *
	 * @return string
	 */
	public static function render_pagination( array $attrs ): string {
		// Check if pagination is enabled across all breakpoints and states.
		$show_pagination = ModuleUtils::has_value(
			$attrs['pagination']['advanced']['enable'] ?? [],
			[
				'valueResolver' => function ( $value ) {
					return 'on' === $value;
				},
			]
		);

		if ( ! $show_pagination ) {
			return '';
		}

		ob_start();

		add_filter( 'get_pagenum_link', [ self::class, 'filter_pagination_url' ] );

		if ( function_exists( 'wp_pagenavi' ) ) {
			wp_pagenavi();
		} elseif ( et_is_builder_plugin_active() ) {
				include ET_BUILDER_PLUGIN_DIR . 'includes/navigation.php';
		} else {
			get_template_part( 'includes/navigation', 'index' );
		}

		remove_filter( 'get_pagenum_link', [ self::class, 'filter_pagination_url' ] );

		$output = ob_get_contents();
		ob_end_clean();

		$is_hidden_onload = 'on' !== ( $attrs['pagination']['advanced']['enable']['desktop']['value'] ?? 'on' );

		if ( $is_hidden_onload ) {
			$class_attributes = strpos( $output, 'class="' );

			if ( false !== $class_attributes ) {
				$output = substr_replace( $output, 'class="et_multi_view_hidden ', $class_attributes, strlen( 'class="' ) );
			}
		}

		return $output;
	}

	/**
	 * Filter the pagination url to add a flag so it can be filtered to avoid pagination clashes with the main query.
	 *
	 * @since ??
	 *
	 * @param string $result The URL.
	 *
	 * @return string
	 */
	public static function filter_pagination_url( $result ) {
		return add_query_arg( 'et_blog', '', $result );
	}

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

	/**
	 * Render Post Content.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *    Optional. An array of arguments for render the post content.
	 *
	 *    @type string $excerpt_content Show content or excerpt. Could be 'on' or 'off'. Default is 'off'.
	 *    @type string $show_excerpt    Show or hide the excerpt. Could be 'on' or 'off'. Default is 'on'.
	 *    @type string $excerpt_manual  Show or hide the manual excerpt. Could be 'on' or 'off'. Default is 'on'.
	 *    @type string $excerpt_length  The length of the excerpt. Default is '270'.
	 *    @type string $post_id         The post ID. Default is '0'.
	 * }
	 *
	 * @return string
	 */
	public static function render_content( array $args ) {
		if ( self::$_rendering_content ) {
			return '';
		}

		self::$_rendering_content = true;

		$excerpt_content = $args['excerpt_content'] ?? 'off';
		$show_excerpt    = $args['show_excerpt'] ?? 'on';
		$excerpt_manual  = $args['excerpt_manual'] ?? 'on';
		$excerpt_length  = (int) $args['excerpt_length'] ?? 270;
		$post_id         = (int) $args['post_id'] ?? 0;

		$post_content = et_strip_shortcodes( PostUtility::delete_post_first_video( get_the_content( null, false, $post_id ) ), true );
		$content      = '';

		if ( 'on' === $excerpt_content ) {
			global $more;

			if ( et_pb_is_pagebuilder_used( $post_id ) ) {
				$more = 1; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- intentionally done.

				$content = et_core_intentionally_unescaped( apply_filters( 'the_content', $post_content ), 'html' );
			} else {
				$more    = null; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- intentionally done.
				$content = et_core_intentionally_unescaped( apply_filters( 'the_content', PostUtility::delete_post_first_video( get_the_content( esc_html__( 'read more...', 'et_builder' ), false, $post_id ) ) ), 'html' );
			}
		} elseif ( 'on' === $show_excerpt ) {
			if ( has_excerpt( $post_id ) && 'off' !== $excerpt_manual ) {
				$content = apply_filters( 'the_excerpt', get_the_excerpt( $post_id ) );
			} elseif ( '' !== $post_content ) {
					$content = et_core_intentionally_unescaped( wpautop( PostUtility::delete_post_first_video( strip_shortcodes( PostUtility::truncate_post( $excerpt_length, false, get_post( $post_id ), true ) ) ) ), 'html' );
			}
		}

		self::$_rendering_content = false;
		return $content;
	}

	/**
	 * Loads `BlogModule` and registers Front-End render callback and REST API Endpoints.
	 *
	 * @return void
	 */
	public function load() {
		// phpcs:ignore PHPCompatibility.FunctionUse.NewFunctionParameters.dirname_levelsFound -- We have PHP 7 support now, This can be deleted once PHPCS config is updated.
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/blog/';

		add_filter( 'divi_conversion_presets_attrs_map', array( BlogPresetAttrsMap::class, 'get_map' ), 10, 2 );

		// Ensure that all filters and actions applied during module registration are registered before calling `ModuleRegistration::register_module()`.
		// However, for consistency, register all module-specific filters and actions prior to invoking `ModuleRegistration::register_module()`.
		ModuleRegistration::register_module(
			$module_json_folder_path,
			[
				'render_callback' => [ self::class, 'render_callback' ],
			]
		);
	}

	/**
	 * Resolve the group preset attribute name for the Blog module.
	 *
	 * @param GlobalPresetItemGroupAttrNameResolved $attr_name_to_resolve The attribute name to be resolved.
	 * @param array                                 $params               The filter parameters.
	 *
	 * @return GlobalPresetItemGroupAttrNameResolved The resolved attribute name.
	 */
	public static function option_group_preset_resolver_attr_name( $attr_name_to_resolve, array $params ):?GlobalPresetItemGroupAttrNameResolved {
		// Bydefault, $attr_name_to_resolve is a null value.
		// If it is not null, it means that the attribute name is already resolved.
		// In this case, we return the resolved attribute name.
		if ( null !== $attr_name_to_resolve ) {
			return $attr_name_to_resolve;
		}

		if ( $params['moduleName'] !== $params['dataModuleName'] ) {
			if ( 'divi/blog' === $params['moduleName'] ) {
				if ( strpos( $params['attrName'], '.decoration.border' ) ) {
					$attr_names_to_pairs = GlobalPresetItemGroupAttrNameResolver::get_attr_names_by_group( $params['dataModuleName'], $params['dataGroupId'] );
					$attr_name_match     = ArrayUtility::find(
						$attr_names_to_pairs,
						function ( $attr_name ) use ( $params ) {
							return GlobalPresetItemGroupAttrNameResolver::is_attr_name_suffix_matched( $attr_name, $params['attrName'] );
						}
					);

					return new GlobalPresetItemGroupAttrNameResolved(
						[
							'attrName'    => $attr_name_match,
							'attrSubName' => $params['attrSubName'] ?? null,
						]
					);
				}
			}
		}

		return $attr_name_to_resolve;
	}
}