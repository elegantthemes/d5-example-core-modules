<?php
/**
 * Module Library: Blurb Module
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Blurb;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- WP use snakeCase in \WP_Block_Parser_Block

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\Framework\Utility\SanitizerUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\IconLibrary\IconFont\Utils;
use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewScriptData;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\BoxShadow\BoxShadowClassnames;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\Module\Options\Element\ElementClassnames;
use ET\Builder\Packages\Module\Options\Text\TextClassnames;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\ModuleUtils\ModuleUtils;
use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;
use Exception;
use WP_Block_Type_Registry;
use WP_Block;
use ET\Builder\Packages\GlobalData\GlobalPresetItemGroup;

/**
 * BlurbModule class.
 *
 * This class implements the functionality of a blurb component in a frontend
 * application. It provides functions for rendering the blurb, managing REST API
 * endpoints, and other related tasks.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 *
 * @see DependencyInterface
 */
class BlurbModule implements DependencyInterface {

	/**
	 * Generate classnames for the module.
	 *
	 * This function generates classnames for the module based on the provided
	 * arguments. It is used in the `render_callback` function of the Blurb module.
	 *
	 * This function is equivalent to the JavaScript constant
	 * {@link /docs/builder-api/js/module-library/module-classnames moduleClassnames}
	 * located in `@divi/module-library`.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *     @type object $classnamesInstance Module classnames instance.
	 *     @type array  $attrs              Block attributes data for rendering the module.
	 * }
	 *
	 * @return void
	 *
	 * @example
	 * ```php
	 * $args = [
	 *   'classnamesInstance' => $classnamesInstance,
	 *   'attrs' => $attrs,
	 * ];
	 *
	 * BlurbModule::module_classnames($args);
	 * ```
	 */
	public static function module_classnames( array $args ): void {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];

		$classnames_instance->add( TextClassnames::text_options_classnames( $attrs['module']['advanced']['text'] ?? [] ), true );

		$image_icon_placement = $attrs['imageIcon']['advanced']['placement']['desktop']['value'] ?? 'top';
		$classnames_instance->add( 'et_pb_blurb_position_' . $image_icon_placement, true );

		// Module.
		$classnames_instance->add(
			ElementClassnames::classnames(
				[
					'attrs' => array_merge(
						$attrs['module']['decoration'] ?? [],
						[
							'link' => $args['attrs']['module']['advanced']['link'] ?? [],
						]
					),
				]
			)
		);
	}

	/**
	 * Blurb module script data.
	 *
	 * This function assigns variables and sets script data options for the module.
	 *
	 * This function is equivalent to the JavaScript function
	 * {@link /docs/builder-api/js-beta/divi-module-library/functions/generateDefaultAttrs ModuleScriptData}
	 * located in `@divi/module-library`.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     Optional. An array of arguments for setting the module script data.
	 *
	 *     @type string         $id            The module ID.
	 *     @type string         $name          The module name.
	 *     @type string         $selector      The module selector.
	 *     @type array          $attrs         The module attributes.
	 *     @type int            $storeInstance The ID of the instance where this block is stored in the `BlockParserStore` class.
	 *     @type ModuleElements $elements      The `ModuleElements` instance.
	 * }
	 *
	 * @return void
	 *
	 * @example:
	 * ```php
	 * // Generate the script data for a module with specific arguments.
	 * $args = array(
	 *   'id'             => 'my-module',
	 *   'name'           => 'My Module',
	 *   'selector'       => '.my-module',
	 *   'attrs'          => array(
	 *     'portfolio' => array(
	 *       'advanced' => array(
	 *         'showTitle'       => false,
	 *         'showCategories'  => true,
	 *         'showPagination' => true,
	 *       )
	 *     )
	 *   ),
	 *   'elements'       => $elements,
	 *   'store_instance' => 123,
	 * );
	 *
	 * BlurbModule::module_script_data( $args );
	 * ```
	 */
	public static function module_script_data( array $args ): void {
		// Assign variables.
		$id             = $args['id'] ?? '';
		$name           = $args['name'] ?? '';
		$selector       = $args['selector'] ?? '';
		$attrs          = $args['attrs'] ?? [];
		$elements       = $args['elements'];
		$store_instance = $args['storeInstance'] ?? null;
		$is_use_icon    = 'on' === ( $attrs['imageIcon']['innerContent']['desktop']['value']['useIcon'] ?? 'off' );

		// Element Script Data Options.
		$elements->script_data(
			[
				'attrName' => 'module',
			]
		);

		MultiViewScriptData::set(
			[
				'id'            => $id,
				'name'          => $name,
				'storeInstance' => $store_instance,
				'hoverSelector' => $selector,
				'setContent'    => [
					[
						'selector'      => $selector . ' .et_pb_module_header',
						'data'          => $attrs['title']['innerContent'] ?? [],
						'valueResolver' => function ( $value ) {
							return $value['text'] ?? '';
						},
					],
					[
						'selector'      => $selector . ' .et_pb_blurb_description',
						'data'          => $attrs['content']['innerContent'] ?? [],
						'valueResolver' => function ( $value ) {
							return $value ?? '';
						},
						'sanitizer'     => 'et_core_esc_previously',
					],
					$is_use_icon ? [
						'selector'      => $selector . ' .et-pb-icon',
						'data'          => $attrs['imageIcon']['innerContent'] ?? [],
						'valueResolver' => function ( $value ) {
							return Utils::process_font_icon( $value['icon'] ?? '' ) ?? '';
						},
					] : [],
				],
				'setClassName'  => [
					[
						'selector'      => $selector,
						'data'          => [
							'et_pb_blurb_position_top' => $attrs['imageIcon']['advanced']['placement'] ?? [],
						],
						'valueResolver' => function ( $value ) {
							return 'top' === $value ? 'add' : 'remove';
						},
					],
					[
						'selector'      => $selector,
						'data'          => [
							'et_pb_blurb_position_left' => $attrs['imageIcon']['advanced']['placement'] ?? [],
						],
						'valueResolver' => function ( $value ) {
							return 'left' === $value ? 'add' : 'remove';
						},
					],
				],
			]
		);
	}

	/**
	 * Get the custom CSS fields for the Divi Blurb module.
	 *
	 * This function is equivalent to the JavaScript constant
	 * {@link /docs/builder-api/js-beta/divi-module-library/functions/generateDefaultAttrs cssFields}
	 * located in `@divi/module-library`. Note that this function does not have
	 * a `label` property on each array item, unlike the JS const cssFields.
	 *
	 * @since ??
	 *
	 * @return array An array of custom CSS fields for the Divi blurb module.
	 *
	 * @example
	 * ```php
	 * $customCssFields = CustomCssTrait::custom_css();
	 * // Returns an array of custom CSS fields for the blurb module.
	 * ```
	 */
	public static function custom_css(): array {
		return WP_Block_Type_Registry::get_instance()->get_registered( 'divi/blurb' )->customCssFields;
	}

	/**
	 * Returns the icon style declaration for Blurb module.
	 *
	 * This function declares CSS styles for the Blurb module icon based on the provided parameters.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array      $attrValue  The value (breakpoint > state > value) of the module attribute.
	 *     @type bool|array $important  If set to true, the CSS will be added with !important.
	 *     @type string     $returnType This is the type of value that the function will return. Can be either string or key_value_pair.
	 * }
	 *
	 * @throws Exception Throws an exception if the provided attribute value is not an array.
	 *
	 * @return string The generated icon style declaration.
	 *
	 * @example
	 * ```php
	 * BlurbModule::icon_style_declaration( [
	 *   'attrValue'  => [
	 *     'icon' => [
	 *       'type'    => 'fa',
	 *       'weight'  => 'bold',
	 *       'unicode' => '&#xf104;',
	 *     ],
	 *   ],
	 * ] );
	 *
	 * // Result: 'font-family: FontAwesom !important; font-weight: bold; content: "\f104";'
	 * ```
	 */
	public static function icon_style_declaration( array $params ): string {
		$icon_attr = $params['attrValue']['icon'] ?? [];

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => [
					'font-family' => true,
				],
			]
		);

		if ( isset( $icon_attr['type'] ) ) {
			$font_family = 'fa' === $icon_attr['type'] ? 'FontAwesome' : 'ETmodules';
			$style_declarations->add( 'font-family', $font_family );
		}

		if ( ! empty( $icon_attr['weight'] ) ) {
			$style_declarations->add( 'font-weight', $icon_attr['weight'] );
		}

		if ( ! empty( $icon_attr['unicode'] ) ) {
			$font_icon = Utils::escape_font_icon( Utils::process_font_icon( $icon_attr ) );
			$style_declarations->add( 'content', "'" . $font_icon . "'" );
		}

		return $style_declarations->value();
	}

	/**
	 * Declare content alignment style for Blurb module.
	 *
	 * This function takes an array of arguments and declares the content alignment style for the Blurb module.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array $attrValue The alignment value (`left`, `center`, `right`).
	 * }
	 *
	 * @return string The content alignment style declaration.
	 *
	 * @example
	 * ```php
	 * BlurbModule::content_alignment_style_declaration( [ 'attrValue' => 'left' ] );
	 * // Result: 'text-align: left;'
	 * ```
	 *
	 * @example: Passing 'center' as the attribute value.
	 * ```php
	 * BlurbModule::content_alignment_style_declaration( [ 'attrValue' => 'center' ] );
	 * // Result: ''
	 * ```
	 */
	public static function content_alignment_style_declaration( array $params ): string {
		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
			]
		);

		if ( $params['attrValue'] ) {
			$style_declarations->add( 'text-align', $params['attrValue'] );
		}

		return $style_declarations->value();
	}

	/**
	 * Declare content alignment style for Blurb module.
	 *
	 * This function takes an array of arguments and declares the content alignment
	 * style for the Blurb module. The function expects an array of parameters with
	 * the following keys:
	 *
	 * - attrValue (array): The value (breakpoint > state > value) of the module attribute.
	 * - important (bool|array): If set to true, the CSS will be added with !important.
	 * - returnType (string): The type of value that the function will return. Can be either string or key_value_pair.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array $attrValue Image alignment value (`left`, `right`).
	 * }
	 *
	 * @return string The content alignment style declaration.
	 *
	 * @throws Exception Throws an exception if the provided attribute value is not an array.
	 *
	 * @example: Passing 'left' as the attribute value.
	 * ```php
	 * $params = [
	 *   'attrValue' => 'left',
	 * ];
	 * $style = BlurbModule::content_alignment_style_declaration( $params );
	 * // Result: 'margin: auto auto auto 0;'
	 * ```
	 *
	 * @example: Passing 'right' as the attribute value.
	 * ```php
	 *  $params = [
	 *    'attrValue' => 'right',
	 *  ];
	 *  $style = BlurbModule::content_alignment_style_declaration( $params );
	 *  // Result: 'margin: auto 0 auto auto;'
	 *  ```
	 */
	public static function image_alignment_style_declaration( array $params ): string {
		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
			]
		);

		switch ( $params['attrValue'] ) {
			case 'left':
				$style_declarations->add( 'margin', 'auto auto auto 0' );
				break;

			case 'right':
				$style_declarations->add( 'margin', 'auto 0 auto auto' );
				break;

			default:
				$style_declarations->add( 'margin', 'auto' );
		}

		return $style_declarations->value();
	}

	/**
	 * Retrieve the CSS style declaration for the icon width.
	 *
	 * This function adds a `font-size` style declaration to the Blurb module's icon to define the icon's width.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array $attrValue The value (breakpoint > state > value) of the module attribute.
	 * }
	 *
	 * @return string The CSS style declaration for the icon width.
	 *
	 * @example
	 * ```php
	 * $params = [
	 *   'attrValue' => [
	 *     'icon' => '24px',
	 *   ]
	 * ];
	 * $result = BlurbModule::icon_width_style_declaration( $params );
	 * // Result: "font-size: 24px;"
	 * ```
	 */
	public static function icon_width_style_declaration( array $params ): string {
		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
			]
		);

		if ( isset( $params['attrValue']['icon'] ) ) {
			$style_declarations->add( 'font-size', $params['attrValue']['icon'] );
		}

		return $style_declarations->value();
	}

	/**
	 * Sets the image width style declaration for the Blurb module.
	 *
	 * This function adds a `max-width` style declaration to the Blurb module's
	 * image based on the provided parameters. It uses the value (breakpoint >
	 * state > value) of the module attribute to determine the width. The CSS
	 * style declaration is returned as a string.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array $attrValue The value (breakpoint > state > value) of the module attribute.
	 * }
	 *
	 * @return string The CSS style declaration for the image width.
	 *
	 * @example: Set the image width style declaration for the Blurb module.
	 * ```php
	 * $params = [
	 *   'attrValue' => [
	 *     'image' => '500px',
	 *   ],
	 * ];
	 * $imageWidthStyle = BlurbModule::image_width_style_declaration( $params );
	 * // Result: "max-width: 500px;"
	 * ```
	 */
	public static function image_width_style_declaration( array $params ): string {
		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
			]
		);

		if ( isset( $params['attrValue']['image'] ) ) {
			$style_declarations->add( 'width', $params['attrValue']['image'] );
		}

		return $style_declarations->value();
	}

	/**
	 * Sets the overflow style declaration for Blurb module when border radius used.
	 *
	 * This function is the equivalent of the `overflowStyleDeclaration` JS function located in
	 * visual-builder/packages/module-library/src/components/blurb/style-declarations/overflow/index.ts.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of parameters.
	 *
	 *     @type array $attrValue The value (breakpoint > state > value) of the module attribute.
	 * }
	 *
	 * @return string The overflow style declaration.
	 *
	 * @example:
	 * ```php
	 *   $params = array(
	 *       'attrValue' => array(
	 *           'radius' => '10px',
	 *       ),
	 *   );
	 *   // Output: "overflow: hidden;"
	 *   $styleDeclaration = BlurbModule::overflow_style_declaration( $params );
	 * ```
	 *
	 * @example:
	 * ```php
	 *   $params = array(
	 *       'attrValue' => array(
	 *           'radius' => null,
	 *       ),
	 *   );
	 *   // Output: ""
	 *   $styleDeclaration = BlurbModule::overflow_style_declaration( $params );
	 * ```
	 */
	public static function overflow_style_declaration( array $params ): string {
		$radius = $params['attrValue']['radius'] ?? [];

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
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
	 * Get the style components for the Blurb Module.
	 *
	 * This function is equivalent to the JavaScript constant
	 * {@link /docs/builder-api/js/module-library/module-styles moduleStyles}
	 * located in `@divi/module-library`.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *     @type string $id                The ID of the module. In VB, the ID of module is UUIDV4. In FE, the ID is order index.
	 *     @type string $name              The name of the module.
	 *     @type string $attrs             The attributes of the module.
	 *     @type string $parentAttrs       The parent attributes.
	 *     @type string $orderClass        The selector class name.
	 *     @type string $parentOrderClass  The parent selector class name.
	 *     @type string $wrapperOrderClass The wrapper selector class name.
	 *     @type string $settings          The custom settings.
	 *     @type string $state             The attributes state.
	 *     @type string $mode              The style mode.
	 *     @type ModuleElements $elements  ModuleElements instance.
	 * }
	 *
	 * @return void
	 *
	 * @example
	 * ```php
	 * $module_styles = MyClass::getModuleStyles([
	 *   'id' => '1234',
	 *   'name' => 'My Module',
	 *   'attrs' => '',
	 *   'parentAttrs' => '',
	 *   'orderClass' => 'module-class',
	 *   'parentOrderClass' => 'parent-class',
	 *   'wrapperOrderClass' => 'wrapper-class',
	 *   'settings' => '',
	 *   'state' => '',
	 *   'mode' => 'default',
	 * ]);
	 * ```
	 */
	public static function module_styles( array $args ): void {
		$attrs       = $args['attrs'] ?? [];
		$elements    = $args['elements'];
		$settings    = $args['settings'] ?? [];
		$placement   = $attrs['imageIcon']['advanced']['placement']['desktop']['value'] ?? '';
		$order_class = $args['orderClass'];

		// In D4, image alignment is used only when placement is top.
		$image_alignment = ( empty( $placement ) || 'top' === $placement ) ? [
			'selector'            => "{$args['orderClass']} .et_pb_main_blurb_image .et_pb_image_wrap",
			'attr'                => $attrs['imageIcon']['advanced']['alignment'] ?? [],
			'declarationFunction' => [ self::class, 'image_alignment_style_declaration' ],
		] : [];

		// In D4, only one of them should be rendered. Render icon font-size if icon is
		// used. Otherwise, render image max-width.
		$icon_width = 'on' === ( $attrs['imageIcon']['innerContent']['desktop']['value']['useIcon'] ?? 'off' )
			? [
				'selector'            => "{$args['orderClass']} .et-pb-icon",
				'attr'                => $attrs['imageIcon']['advanced']['width'] ?? [],
				'declarationFunction' => [ self::class, 'icon_width_style_declaration' ],
			]
			: [
				'selector'            => "{$args['orderClass']} .et_pb_main_blurb_image .et_pb_image_wrap",
				'attr'                => $attrs['imageIcon']['advanced']['width'] ?? [],
				'declarationFunction' => [ self::class, 'image_width_style_declaration' ],
			];

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
								'disabledOn'     => [
									'disabledModuleVisibility' => $settings['disabledModuleVisibility'] ?? null,
								],
								'advancedStyles' => [
									[
										'componentName' => 'divi/text',
										'props'         => [
											'selector' => "{$order_class} .et_pb_blurb_container",
											'attr'     => $attrs['module']['advanced']['text'] ?? [],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'attr' => $attrs['module']['decoration']['border'] ?? [],
											'declarationFunction' => [ self::class, 'overflow_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$order_class} .et_pb_main_blurb_image .et_pb_only_image_mode_wrap, {$order_class} .et_pb_main_blurb_image .et-pb-icon",
											'attr'     => $attrs['imageIcon']['decoration']['border'] ?? [],
											'declarationFunction' => [ self::class, 'overflow_style_declaration' ],
										],
									],
								],
							],
						]
					),

					// Image Icon.
					$elements->style(
						[
							'attrName'   => 'imageIcon',
							'styleProps' => [
								// Custom Image and Image Icon Styles.
								'advancedStyles' => [
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector'   => "{$args['orderClass']} .et-pb-icon",
											'selectors'  => [
												'desktop' => [
													'value' => "{$args['orderClass']} .et-pb-icon",
													'hover' => "{$args['orderClass']}{{:hover}} .et-pb-icon",
												],
											],
											'orderClass' => $args['orderClass'],
											'attr'       => $attrs['imageIcon']['advanced']['color'] ?? [],
											'property'   => 'color',
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$args['orderClass']} .et-pb-icon",
											'attr'     => $attrs['imageIcon']['innerContent'] ?? [],
											'declarationFunction' => [ self::class, 'icon_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => $icon_width,
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$args['orderClass']} .et_pb_blurb_content",
											'attr'     => $attrs['imageIcon']['advanced']['alignment'] ?? [],
											'declarationFunction' => [ self::class, 'content_alignment_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => $image_alignment,
									],
								],
							],
						]
					),

					// Image.
					$elements->style(
						[
							'attrName'   => 'image',
							'styleProps' => [
								'attrs' => [
									'border'     => $attrs['image']['border'] ?? [],
									'transition' => $attrs['transition'] ?? [],
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

					// Content.
					$elements->style(
						[
							'attrName' => 'content',
						]
					),

					// Content Container.
					$elements->style(
						[
							'attrName' => 'contentContainer',
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
	 * Render callback for the Blurb module.
	 *
	 * This function is responsible for rendering the server-side HTML of the module on the frontend.
	 *
	 * This function is equivalent to the JavaScript function
	 * {@link /docs/builder-api/js/module-library/ BlurbEdit}
	 * located in `@divi/module-library`.
	 *
	 * @since ??
	 *
	 * @param array          $attrs                       Block attributes that were saved by Divi Builder.
	 * @param string         $content                     The block's content.
	 * @param WP_Block       $block                       Parsed block object that is being rendered.
	 * @param ModuleElements $elements                    An instance of the ModuleElements class.
	 * @param array          $default_printed_style_attrs Default printed style attributes.
	 *
	 * @throws Exception If the `imageIcon` attribute is not set.
	 *
	 * return string The HTML rendered output of the Blurb module.
	 *
	 * @example
	 * ```php
	 * $attrs = [
	 *   'attrName' => 'value',
	 *   //...
	 * ];
	 * $content = 'The block content.';
	 * $block = new WP_Block();
	 * $elements = new ModuleElements();
	 *
	 * BlurbModule::render_callback( $attrs, $content, $block, $elements, $default_printed_style_attrs );
	 * ```
	 */
	public static function render_callback( array $attrs, string $content, WP_Block $block, ModuleElements $elements, array $default_printed_style_attrs ): string {
		$has_image_src = ModuleUtils::has_value(
			$attrs['imageIcon']['innerContent'] ?? [],
			[
				'valueResolver' => function ( $value ) {
					return ! empty( $value['src'] );
				},
			]
		);

		$use_icon          = $attrs['imageIcon']['innerContent']['desktop']['value']['useIcon'] ?? 'off';
		$animation_desktop = $attrs['imageIcon']['innerContent']['desktop']['value']['animation'] ?? 'top';
		$animation_tablet  = $attrs['imageIcon']['innerContent']['tablet']['value']['animation'] ?? $animation_desktop;
		$animation_phone   = $attrs['imageIcon']['innerContent']['phone']['value']['animation'] ?? $animation_tablet;
		// Icon.
		$is_icon_enabled = 'on' === $use_icon;
		$icon_value      = Utils::process_font_icon( $attrs['imageIcon']['innerContent']['desktop']['value']['icon'] ?? [] );
		$icon            = isset( $icon_value ) ? HTMLUtility::render(
			[
				'tag'               => 'span',
				'attributes'        => [
					'class' => 'et_pb_image_wrap',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => HTMLUtility::render(
					[
						'tag'        => 'span',
						'attributes' => [
							'class' => HTMLUtility::classnames(
								[
									'et-pb-icon'  => true,
									'et-waypoint' => true,
									"et_pb_animation_{$animation_desktop}" => ! empty( $animation_desktop ),
									"et_pb_animation_{$animation_tablet}_tablet" => ! empty( $animation_tablet ),
									"et_pb_animation_{$animation_phone}_phone" => ! empty( $animation_phone ),
								]
							),
						],
						'children'   => $icon_value,
					]
				),
			]
		) : '';

		// Image.
		$image = ! $is_icon_enabled && $has_image_src ? HTMLUtility::render(
			[
				'tag'               => 'span',
				'attributes'        => [
					'class' => HTMLUtility::classnames(
						[
							'et_pb_image_wrap'           => true,
							'et_pb_only_image_mode_wrap' => true,
						],
						BoxShadowClassnames::has_overlay( $attrs['imageIcon']['decoration']['boxShadow'] ?? [] )
					),
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => [
					$elements->style_components(
						[
							'attrName' => 'imageIcon',
						]
					),
					$elements->render(
						[
							'attrName'    => 'imageIcon',
							'elementType' => 'image',
							'attributes'  => [
								'class' => HTMLUtility::classnames(
									[
										'et-waypoint' => true,
										"et_pb_animation_{$animation_desktop}" => ! empty( $animation_desktop ),
										"et_pb_animation_{$animation_tablet}_tablet" => ! empty( $animation_tablet ),
										"et_pb_animation_{$animation_phone}_phone" => ! empty( $animation_phone ),
									]
								),
							],
						]
					),
				],
			]
		) : '';

		$image_or_icon = $is_icon_enabled ? $icon : $image;

		// Image/Icon Link.
		$title_link        = $attrs['title']['innerContent']['desktop']['value']['url'] ?? '';
		$title_link_target = 'on' === ( $attrs['title']['innerContent']['desktop']['value']['target'] ?? '' ) ? '_blank' : null;
		$image_icon_link   = ! empty( $title_link ) && ! empty( $image_or_icon ) ? HTMLUtility::render(
			[
				'tag'               => 'a',
				'attributes'        => [
					'href'   => $title_link,
					'target' => $title_link_target,
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $image_or_icon,
			]
		) : $image_or_icon;

		// Image/Icon Container.
		$image_container = ! empty( $image_or_icon ) ? HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class' => 'et_pb_main_blurb_image',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $image_icon_link,
			]
		) : '';

		// Title.
		$header = $elements->render(
			[
				'attrName' => 'title',
			]
		);

		// Content.
		$content = $elements->render(
			[
				'attrName' => 'content',
			]
		);

		// Header + Content.
		$header_n_content = HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class' => 'et_pb_blurb_container',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $header . $content,
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
				'classnamesFunction'  => [ self::class, 'module_classnames' ],
				'moduleCategory'      => $block->block_type->category,
				'stylesComponent'     => [ self::class, 'module_styles' ],
				'scriptDataComponent' => [ self::class, 'module_script_data' ],
				'parentAttrs'         => $parent->attrs ?? [],
				'parentId'            => $parent->id ?? '',
				'parentName'          => $parent->blockName ?? '',
				'children'            => $elements->style_components(
					[
						'attrName' => 'module',
					]
				) . $elements->render(
					[
						'attrName' => 'contentContainer',
						'children' => [
							$image_container,
							$header_n_content,
						],
					]
				),
			]
		);
	}

	/**
	 * Load the Blurb Module.
	 *
	 * This function is responsible for loading the BlurbModule and registering the necessary
	 * callbacks and endpoints for front-end rendering and REST API integration. It retrieves
	 * the path of the BlurbModule JSON folder and uses it to register the module with the
	 * ModuleRegistration class. The module is registered with the specified render callback
	 * function, which is a method within the BlurbModule class.
	 *
	 * @since ??
	 *
	 * @return void
	 *
	 * @example
	 * ```php
	 * $module_loader = new BlurbModule();
	 * $module_loader->load();
	 * ```
	 */
	public function load(): void {
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/blurb/';

		// Ensure that all filters and actions applied during module registration are registered before calling `ModuleRegistration::register_module()`.
		// However, for consistency, register all module-specific filters and actions prior to invoking `ModuleRegistration::register_module()`.
		ModuleRegistration::register_module(
			$module_json_folder_path,
			[
				'render_callback' => [ self::class, 'render_callback' ],
			]
		);
	}
}