<?php
/**
 * ModuleLibrary: Pricing Tables Module class.
 *
 * @package Builder\Packages\ModuleLibrary\PricingTablesModule
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\PricingTables;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- WP use snakeCase in \WP_Block_Parser_Block

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\Framework\Utility\SanitizerUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewScriptData;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\Module\Options\Element\ElementClassnames;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;
use ET\Builder\Packages\GlobalData\GlobalPresetItemGroup;

// phpcs:disable Squiz.Commenting.InlineComment -- Temporarily disabled to get the PR CI pass for now. TODO: Fix this later.

/**
 * `PricingTablesModule` is consisted of functions used for Pricing Tables Module such as Front-End rendering, REST API Endpoints etc.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 */
class PricingTablesModule implements DependencyInterface {

	/**
	 * Module classnames function for pricing tables module.
	 *
	 * This function is equivalent of JS function moduleClassnames located in
	 * visual-builder/packages/module-library/src/components/pricing-tables/module-classnames.ts.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *     @type object $classnamesInstance Instance of ET\Builder\Packages\Module\Layout\Components\Classnames.
	 *     @type array  $attrs              Block attributes data that being rendered.
	 *     @type array  $childrenIds        Children Ids of child modules.
	 * }
	 */
	public static function module_classnames( $args ) {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];
		$children_ids        = $args['childrenIds'];

		// Show bullet.
		$show_bullet = $attrs['content']['advanced']['showBullet']['desktop']['value'] ?? '';
		$index       = is_array( $children_ids ) ? count( $children_ids ) : 0;

		$classnames_instance->add( 'et_pb_pricing' );
		$classnames_instance->add( 'clearfix' );
		$classnames_instance->add( 'et_pb_pricing_no_bullet', 'off' === $show_bullet );
		$classnames_instance->add( 'et_pb_pricing_' . $index );

		// Module.
		$classnames_instance->add(
			ElementClassnames::classnames(
				[
					// TODO feat(D5, Module Attribute Refactor) Once link is merged as part of options property, remove this.
					'attrs' => array_merge(
						$attrs['module']['decoration'] ?? [],
						[
							'link' => $attrs['module']['advanced']['link'] ?? [],
						]
					),
				]
			)
		);
	}

	/**
	 * Set script data of pricing tables module options.
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
		$store_instance = $args['storeInstance'] ?? null;
		$elements       = $args['elements'];

		// Element Script Data Options.
		$elements->script_data(
			[
				'attrName' => 'module',
			]
		);

		// Show bullet script data.
		MultiViewScriptData::set(
			[
				'id'            => $id,
				'name'          => $name,
				'storeInstance' => $store_instance,
				'selector'      => $selector,
				'setClassName'  => [
					[
						'data'          => [
							'et_pb_pricing_no_bullet' => $attrs['content']['advanced']['showBullet'] ?? [],
						],
						'valueResolver' => function ( $value, $resolver_args ) {
							return 'et_pb_pricing_no_bullet' === $resolver_args['className'] && 'off' === ( $value ?? '' ) ? 'add' : 'remove';
						},
					],
				],
				'setStyle'      => [
					[
						'selector'      => $selector . ' et_pb_featured_table',
						'data'          => [
							'box-shadow' => $attrs['featuredTable']['advanced']['showDropShadow'] ?? [],
						],
						'valueResolver' => function ( $value ) {
							return 'off' === $value ? 'none' : '';
						},
					],
				],
			]
		);
	}

	/**
	 * Custom CSS fields
	 *
	 * This function is equivalent of JS const cssFields located in
	 * visual-builder/packages/module-library/src/components/pricing-tables/custom-css.ts.
	 *
	 * A minor difference with the JS const cssFields, this function did not have `label` property on each array item.
	 *
	 * @since ??
	 */
	public static function custom_css() {
		return \WP_Block_Type_Registry::get_instance()->get_registered( 'divi/pricing-tables' )->customCssFields;
	}

	/**
	 * Overflow style declaration if border radius is set.
	 *
	 * This function will declare overflow style for Pricing Tables module.
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array       $attrValue  The value (breakpoint > state > value) of module attribute.
	 *     @type bool|array  $important  If set to true, the CSS will be added with !important.
	 *     @type string      $returnType This is the type of value that the function will return. Can be either string or key_value_pair.
	 * }
	 *
	 * @return string
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
	 * Pricing Table Spacing Style Declaration.
	 *
	 * This function will declare bottom padding exclusively for the pricing table.
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array      $attrValue  The value (breakpoint > state > value) of module attribute.
	 *     @type bool|array $important  If set to true, the CSS will be added with !important.
	 *     @type string     $returnType This is the type of value that the function will return. Can be either string or key_value_pair.
	 * }
	 *
	 * @since ??
	 */
	public static function pricing_table_spacing_style_declaration( $params ) {

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		$spacing_attr = $params['attrValue'];

		if ( ! empty( $spacing_attr['padding']['bottom'] ) ) {
			$style_declarations->add( 'padding-bottom', $spacing_attr['padding']['bottom'] );
		}

		return $style_declarations->value();
	}

	/**
	 * Pricing Table Body Content Spacing Style Declaration.
	 *
	 * This function will set padding style for content in Pricing Tables Module.
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array      $attrValue  The value (breakpoint > state > value) of module attribute.
	 *     @type bool|array $important  If set to true, the CSS will be added with !important.
	 *     @type string     $returnType This is the type of value that the function will return. Can be either string or key_value_pair.
	 * }
	 *
	 * @since ??
	 */
	public static function pricing_table_body_content_spacing_style_declaration( $params ) {

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		$font_attr = $params['attrValue'];

		if ( isset( $font_attr['textAlign'] ) && 'center' === $font_attr['textAlign'] ) {
			$style_declarations->add( 'padding-left', '0px' );
		}

		return $style_declarations->value();
	}

	/**
	 * Pricing Table Drop Shadow Style Declaration.
	 *
	 * This function will toggle box shadow for pricing table.
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array      $attrValue  The value (breakpoint > state > value) of module attribute.
	 *     @type bool|array $important  If set to true, the CSS will be added with !important.
	 *     @type string     $returnType This is the type of value that the function will return. Can be either string or key_value_pair.
	 * }
	 *
	 * @since ??
	 */
	public static function pricing_table_drop_shadow_style_declaration( $params ) {

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		$has_drop_shadow = $params['attrValue'];

		if ( isset( $has_drop_shadow ) && 'off' === $has_drop_shadow ) {
			$style_declarations->add( '-moz-box-shadow', 'none' );
			$style_declarations->add( '-webkit-box-shadow', 'none' );
			$style_declarations->add( 'box-shadow', 'none' );
		}

		return $style_declarations->value();
	}

	/**
	 * Pricing Tables Module's style components.
	 *
	 * This function is equivalent of JS function ModuleStyles located in
	 * visual-builder/packages/module-library/src/components/pricing-tables/module-styles.tsx.
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
	public static function module_styles( $args ) {
		$attrs    = $args['attrs'] ?? [];
		$elements = $args['elements'];
		$settings = $args['settings'] ?? [];

		// Default printed style attributes.
		$default_printed_style_attrs = $args['defaultPrintedStyleAttrs']['module']['decoration'] ?? [];

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
								'defaultPrintedStyleAttrs' => $default_printed_style_attrs,
								'disabledOn'               => [
									'disabledModuleVisibility' => $settings['disabledModuleVisibility'] ?? null,
								],
								'advancedStyles'           => [
									[
										'componentName' => 'divi/text',
										'props'         => [
											'selector' => implode(
												', ',
												[
													"{$args['orderClass']} .et_pb_pricing_table",
													"{$args['orderClass']} .et_pb_pricing_content",
												]
											),
											'attr'     => $attrs['module']['advanced']['text'] ?? [],
											'propertySelectors' => [
												'textShadow' => [
													'desktop' => [
														'value' => [
															'text-shadow' => implode(
																', ',
																[
																	"{$args['orderClass']} .et_pb_pricing_heading",
																	"{$args['orderClass']} .et_pb_pricing_content_top",
																	"{$args['orderClass']} .et_pb_pricing_content",
																]
															),
														],
													],
												],
											],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$args['orderClass']} .et_pb_pricing_table",
											'attr'     => $attrs['module']['decoration']['spacing'] ?? [],
											'declarationFunction' => [ self::class, 'pricing_table_spacing_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$args['orderClass']} .et_pb_pricing_table",
											'attr'     => $attrs['module']['decoration']['border'] ?? [],
											'declarationFunction' => [ self::class, 'overflow_style_declaration' ],
										],
									],
								],
							],
						]
					),
					// Title.
					$elements->style(
						[
							'attrName' => 'title',
						]
					),
					// Price.
					$elements->style(
						[
							'attrName' => 'price',
						]
					),
					// Description.
					$elements->style(
						[
							'attrName'   => 'content',
							'styleProps' => [
								'advancedStyles' => [
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$args['orderClass']} .et_pb_pricing li",
											'attr'     => $attrs['content']['decoration']['bodyFont']['body']['font'] ?? [],
											'declarationFunction' => [ self::class, 'pricing_table_body_content_spacing_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$args['orderClass']} ul.et_pb_pricing li span::before",
											'attr'     => $attrs['content']['advanced']['bulletColor'] ?? [],
											'property' => 'border-color',
										],
									],
								],
							],
						]
					),
					// Best Value.
					$elements->style(
						[
							'attrName' => 'subtitle',
						]
					),
					// Currency.
					$elements->style(
						[
							'attrName' => 'currencyFrequency',
						]
					),
					// Item not available.
					$elements->style(
						[
							'attrName' => 'excluded',
						]
					),
					// Button.
					$elements->style(
						[
							'attrName' => 'button',
						]
					),
					// Featured Table.
					$elements->style(
						[
							'attrName'   => 'featuredTable',
							'styleProps' => [
								'advancedStyles' => [
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$args['orderClass']} .et_pb_featured_table",
											'attr'     => $attrs['featuredTable']['advanced']['showDropShadow'] ?? [],
											'declarationFunction' => [ self::class, 'pricing_table_drop_shadow_style_declaration' ],
										],
									],
								],
							],
						]
					),
					// Featured Title.
					$elements->style(
						[
							'attrName' => 'featuredTitle',
						]
					),
					// Featured Content.
					$elements->style(
						[
							'attrName'   => 'featuredContent',
							'styleProps' => [
								'advancedStyles' => [
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$args['orderClass']} .et_pb_featured_table ul.et_pb_pricing li span::before",
											'attr'     => $attrs['featuredContent']['advanced']['bulletColor'] ?? [],
											'property' => 'border-color',
										],
									],
								],
							],
						]
					),
					// Featured Best Value.
					$elements->style(
						[
							'attrName' => 'featuredSubtitle',
						]
					),
					// Featured Price.
					$elements->style(
						[
							'attrName' => 'featuredPrice',
						]
					),
					// Featured Currency Frequency.
					$elements->style(
						[
							'attrName' => 'featuredCurrencyFrequency',
						]
					),
					// Featured Item not available.
					$elements->style(
						[
							'attrName' => 'featuredExcluded',
						]
					),
					// Module - Only for Custom CSS.
					CssStyle::style(
						[
							'selector'  => $args['orderClass'],
							'attr'      => $attrs['css'] ?? [],
							'cssFields' => self::custom_css(),
						]
					),
				],
			]
		);
	}

	/**
	 * Pricing Tables render callback which outputs server side rendered HTML on the Front-End.
	 *
	 * @since ??
	 *
	 * @param array          $attrs                       Block attributes that were saved by VB.
	 * @param string         $content                     Block content.
	 * @param WP_Block       $block                       Parsed block object that being rendered.
	 * @param ModuleElements $elements                    ModuleElements instance.
	 * @param array          $default_printed_style_attrs Default printed style attributes.
	 *
	 * @return string HTML rendered of Pricing Tables module.
	 */
	public static function render_callback( $attrs, $content, $block, $elements, $default_printed_style_attrs ) {
		$children_ids = $block->parsed_block['innerBlocks'] ? array_map(
			function ( $inner_block ) {
				return $inner_block['id'];
			},
			$block->parsed_block['innerBlocks']
		) : [];

		// Get classname based upon children's featured pricing table status.
		$featured_pricing_tables_classname = self::get_featured_pricing_tables_classname( $children_ids, $block->parsed_block['storeInstance'] );

		$children = '';

		// Child Content Wrapper.
		$pricing_tables_content_wrapper = HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class' => HTMLUtility::classnames(
						[
							'et_pb_pricing_table_wrap' => true,
						]
					),
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $content,
			]
		);

		$children .= $pricing_tables_content_wrapper;

		$parent = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );

		return Module::render(
			[
				// FE only.
				'orderIndex'               => $block->parsed_block['orderIndex'],
				'storeInstance'            => $block->parsed_block['storeInstance'],

				// VB equivalent.
				'id'                       => $block->parsed_block['id'],
				'name'                     => $block->block_type->name,
				'moduleCategory'           => $block->block_type->category,
				'attrs'                    => $attrs,
				'elements'                 => $elements,
				'defaultPrintedStyleAttrs' => $default_printed_style_attrs,
				'classnamesFunction'       => [ self::class, 'module_classnames' ],
				'scriptDataComponent'      => [ self::class, 'module_script_data' ],
				'stylesComponent'          => [ self::class, 'module_styles' ],
				'className'                => $featured_pricing_tables_classname,
				'parentId'                 => $parent->id ?? '',
				'parentName'               => $parent->blockName ?? '',
				'parentAttrs'              => $parent->attrs ?? [],
				'cssPosition'              => 'before',
				'children'                 => $elements->style_components(
					[
						'attrName' => 'module',
					]
				) . $children,
				'childrenIds'              => $children_ids,
			]
		);
	}

	/**
	 * Get featured pricing tables classname based on given childrenIds and its featured status.
	 *
	 * This function is equivalent to the JS function
	 * /pricing-tables/utils/get-featured-pricing-tables-classname/index.ts
	 *
	 * @since ??
	 *
	 * @param array $children_ids    Children ids.
	 * @param int   $store_instance  Store instance.
	 *
	 * @return string Classname based upon featured status of children.
	 */
	public static function get_featured_pricing_tables_classname( array $children_ids, int $store_instance ): string {

		$featured_pricing_tables = [];

		// If child pricing table module has featured on then add it into $featured_pricing_tables array.
		foreach ( $children_ids as $key => $module_id ) {
			$current  = BlockParserStore::get( $module_id, $store_instance );
			$featured = strtolower( $current->attrs['module']['advanced']['featured']['desktop']['value'] ?? 'off' );
			array_push( $featured_pricing_tables, $featured );
		}

		$total_featured_pricing_tables = isset( $featured_pricing_tables ) && count( $featured_pricing_tables ) > 4 ? 4 : count( $featured_pricing_tables );
		for ( $i = 0; $i < $total_featured_pricing_tables; $i++ ) {
			if ( 'on' === $featured_pricing_tables[ $i ] ) {
				switch ( $i ) {
					case 0:
						return '';
					case 1:
						return 'et_pb_second_featured';
					case 2:
						return 'et_pb_third_featured';
					case 3:
						return 'et_pb_fourth_featured';
					default:
						return 'et_pb_no_featured_in_first_row';
				}
			}
		}

		return 'et_pb_no_featured_in_first_row';
	}

	/**
	 * Loads `PricingTablesModule` and registers Front-End render callback and REST API Endpoints.
	 *
	 * @since ??
	 *
	 * @return void
	 */
	public function load() {
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/pricing-tables/';

		add_filter( 'divi_conversion_presets_attrs_map', array( PricingTablesPresetAttrsMap::class, 'get_map' ), 10, 2 );

		// Ensure that all filters and actions applied during module registration are registered before calling `ModuleRegistration::register_module()`.
		// However, for consistency, register all module-specific filters and actions prior to invoking `ModuleRegistration::register_module()`.
		ModuleRegistration::register_module(
			$module_json_folder_path,
			[
				'render_callback' => [ self::class, 'render_callback' ],
			]
		);

		add_filter(
			'divi.moduleLibrary.conversion.moduleConversionOutline',
			function ( $conversion_outline, $module_name ) {

				// Add custom conversion functions for this module
				if ( 'divi/pricing-tables' !== $module_name ) {
					return $conversion_outline;
				}

				// Non static expansion functions like this
				// dont automatically get converted correctly in the
				// autogenerated .json conversion outline,
				// so lets hook in and provide the correct conversion functions.
				//
				// valueExpansionFunctionMap: {
				//   button_rel:         buttonValueConversionFunctionMap['innerContent.*.rel'],
				// },
				$conversion_outline['valueExpansionFunctionMap'] = [
					'button_rel' => 'ET\Builder\Packages\Conversion\AdvancedOptionConversion::convertButtonRel',
				];

				return $conversion_outline;
			},
			10,
			2
		);
	}
}