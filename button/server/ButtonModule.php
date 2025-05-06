<?php
/**
 * Module Library: Button Module
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Button;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- WP use snakeCase in \WP_Block_Parser_Block

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\SanitizerUtility;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\IconLibrary\IconFont\Utils;
use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewScriptData;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\Module\Options\Element\ElementClassnames;
use ET\Builder\Packages\Module\Options\Text\TextClassnames;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;
use Exception;
use WP_Block;
use ET\Builder\Packages\ModuleUtils\ModuleUtils;

/**
 * ButtonModule class.
 *
 * This class implements the functionality of a button component in a frontend
 * application. It provides functions for rendering the button, managing REST
 * API endpoints, and other related tasks.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 *
 * @see DependencyInterface
 */
class ButtonModule implements DependencyInterface {

	/**
	 * Generate classnames for the module.
	 *
	 * This function generates classnames for the module based on the provided
	 * arguments. It is used in the `render_callback` function of the Button module.
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
	 * ButtonModule::module_classnames($args);
	 * ```
	 */
	public static function module_classnames( array $args ): void {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];

		$classnames_instance->add( TextClassnames::text_options_classnames( $attrs['module']['advanced']['text'] ?? [], [ 'orientation' => false ] ), true );

		// Module.
		$classnames_instance->add(
			ElementClassnames::classnames(
				[
					// TODO feat(D5, Module Attribute Refactor) Once link is merged as part of options property, remove this.
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
	 * Wrapper classnames function for the Button module.
	 *
	 * This function generates classnames for the module wrapper based on the provided arguments.
	 *
	 * This function is equivalent to the JavaScript function
	 * {@link /docs/builder-api/js-beta/divi-module-library/functions/generateDefaultAttrs wrapperClassnames}
	 * located in `@divi/module-library`.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *     @type object $classnamesInstance Instance of ET\Builder\Packages\Module\Layout\Components\Classnames.
	 *     @type array $attrs Block attributes data that being rendered.
	 * }
	 *
	 * @return void
	 */
	public static function wrapper_classnames( array $args ): void {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];

		// Prefix the wrapper classname on theme builder layout.
		$layout_type               = $args['layoutType'] ?? 'default';
		$layout_type_to_prefix_map = [
			'et_header_layout' => '_tb_header',
			'et_body_layout'   => '_tb_body',
			'et_footer_layout' => '_tb_footer',
		];
		$wrapper_prefix            = $layout_type_to_prefix_map[ $layout_type ] ?? '';

		// Module wrapper's specific classnames.
		$link_value = $attrs['button']['innerContent']['desktop']['value']['linkUrl'] ?? '';
		$text_value = $attrs['button']['innerContent']['desktop']['value']['text'] ?? $link_value;

		$classnames_instance->add( 'et_pb_module' );
		$classnames_instance->add( 'et_pb_empty_button', ! $text_value && ! $link_value );
		$classnames_instance->add( 'et_pb_button_module_wrapper' );
		$classnames_instance->add( "et_pb_button_{$args['orderIndex']}{$wrapper_prefix}_wrapper" );
	}

	/**
	 * Button module script data.
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
	 * ButtonModule::module_script_data( $args );
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
				'selector'      => $selector,
				'setContent'    => [
					[
						'data'          => $attrs['button']['innerContent'] ?? [],
						'valueResolver' => function ( $value ) {
							$text = $value['text'] ?? '';

							if ( $text ) {
								$text = ModuleUtils::extract_link_title( $text );
							}

							return '' === $text && ! empty( $value['linkUrl'] ) ? esc_url( $value['linkUrl'] ) : esc_attr( $text );
						},
					],
				],
				'setVisibility' => [
					[
						'data'          => $attrs['button']['innerContent'] ?? [],
						'valueResolver' => function ( $value ) {
							return empty( $value['text'] ) && empty( $value['linkUrl'] ) ? 'hidden' : 'visible';
						},
					],
				],
			]
		);
	}

	/**
	 * Render callback for the Button module.
	 *
	 * This function is responsible for rendering the server-side HTML of the
	 * module on the frontend.
	 *
	 * This function is equivalent to the JavaScript function
	 * {@link /docs/builder-api/js/module-library/ ButtonEdit}
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
	 * @throws Exception If the icon type is not supported.
	 *
	 * @return string The HTML rendered output of the Button module.
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
	 * ButtonModule::render_callback( $attrs, $content, $block, $elements, $default_printed_style_attrs );
	 * ```
	 */
	public static function render_callback( array $attrs, string $content, WP_Block $block, ModuleElements $elements, array $default_printed_style_attrs ): string {
		$link_value = $attrs['button']['innerContent']['desktop']['value']['linkUrl'] ?? '';
		$text_value = $attrs['button']['innerContent']['desktop']['value']['text'] ?? '';

		if ( $text_value ) {
			$text_value = ModuleUtils::extract_link_title( $text_value );
		}

		$text_value = '' === $text_value && ! empty( $link_value ) ? esc_url( $link_value ) : esc_attr( $text_value );

		$has_custom_button = 'on' === ( $attrs['button']['decoration']['button']['desktop']['value']['enable'] ?? 'off' );
		$button_icon_value = $attrs['button']['decoration']['button']['desktop']['value']['icon']['settings'] ?? null;
		$has_button_icon   = $has_custom_button && isset( $button_icon_value );

		$button_icon        = $has_button_icon
			? Utils::process_font_icon( $attrs['button']['decoration']['button']['desktop']['value']['icon']['settings'] ?? [] )
			: '';
		$button_icon_tablet = $has_button_icon
			? Utils::process_font_icon( $attrs['button']['decoration']['button']['tablet']['value']['icon']['settings'] ?? [] )
			: '';
		$button_icon_phone  = $has_button_icon
			? Utils::process_font_icon( $attrs['button']['decoration']['button']['phone']['value']['icon']['settings'] ?? [] )
			: '';

		$rendered_rel      = $attrs['button']['innerContent']['desktop']['value']['rel'] ?? '';
		$link_target_value = $attrs['button']['innerContent']['desktop']['value']['linkTarget'] ?? '';
		$link_target       = 'on' === $link_target_value ? '_blank' : null;

		// Nothing to output if neither Button Text nor Button URL is defined.
		if ( empty( $text_value ) && empty( $link_value ) ) {
			return '';
		}

		return Module::render(
			[
				// FE only.
				'orderIndex'                => $block->parsed_block['orderIndex'],
				'storeInstance'             => $block->parsed_block['storeInstance'],

				// VB equivalent.
				'attrs'                     => $attrs,
				'elements'                  => $elements,
				'htmlAttrs'                 => [
					'href'             => esc_url( $link_value ),
					'target'           => esc_attr( $link_target ),
					'data-icon'        => esc_attr( $button_icon ),
					'data-icon-tablet' => esc_attr( $button_icon_tablet ),
					'data-icon-phone'  => esc_attr( $button_icon_phone ),
					'rel'              => empty( $rendered_rel ) ? '' : esc_attr( implode( ' ', $rendered_rel ) ),
				],
				'classnamesFunction'        => [ self::class, 'module_classnames' ],
				'id'                        => $block->parsed_block['id'],
				'hasModuleClassName'        => false,
				'name'                      => $block->block_type->name,
				'moduleCategory'            => $block->block_type->category,
				'scriptDataComponent'       => [ self::class, 'module_script_data' ],
				'stylesComponent'           => [ self::class, 'module_styles' ],
				'tag'                       => 'a',
				'wrapperClassnamesFunction' => [ self::class, 'wrapper_classnames' ],
				'children'                  => $elements->style_components(
					[
						'attrName' => 'button',
					]
				) . $text_value,
			]
		);
	}

	/**
	 * Button alignment
	 *
	 * This function will declare alignment style for button module.
	 *
	 * @since ??
	 *
	 * @param array $params An array of arguments.
	 *
	 * @return string The CSS for icon alignment.
	 */
	public static function button_alignment_declaration( array $params ): string {
		$alignment_attr = $params['attrValue'];

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		if ( $alignment_attr ) {
			switch ( $alignment_attr ) {
				case 'left':
					$style_declarations->add( 'text-align', 'left' );
					break;
				case 'center':
					$style_declarations->add( 'text-align', 'center' );
					break;
				case 'right':
					$style_declarations->add( 'text-align', 'right' );
					break;
				default:
					break;
			}
		}

		return $style_declarations->value();
	}

	/**
	 * Button spacing style declaration.
	 *
	 * This function will declare spacing style for button module.
	 *
	 * @since ??
	 *
	 * @param array $params An array of arguments.
	 *
	 * @return string The CSS for button spacing style.
	 */
	public static function button_spacing_style_declaration( array $params ): string {
		$icon_show_on_hover = 'on' === ( $params['attrValue']['icon']['onHover'] ?? '' );

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		if ( $icon_show_on_hover ) {
			$style_declarations->add( 'padding-left', '1em' );
			$style_declarations->add( 'padding-right', '1em' );
		}

		return $style_declarations->value();
	}

	/**
	 * Button Module's style components.
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
	 *      @type string $id                Module ID. In VB, the ID of module is UUIDV4. In FE, the ID is order index.
	 *      @type string $isCustomPostType  Is rendered in custom post type.
	 *      @type string $name              Module name.
	 *      @type string $attrs             Module attributes.
	 *      @type string $parentAttrs       Parent attrs.
	 *      @type string $baseOrderClass    Base selector class without additional prefix on custom post type scren.
	 *      @type string $orderClass        Selector class name.
	 *      @type string $parentOrderClass  Parent selector class name.
	 *      @type string $wrapperOrderClass Wrapper selector class name.
	 *      @type string $settings          Custom settings.
	 *      @type string $state             Attributes state.
	 *      @type string $mode              Style mode.
	 *      @type ModuleElements $elements  ModuleElements instance.
	 * }
	 *
	 * @return void
	 */
	public static function module_styles( array $args ): void {
		$default_attributes = ModuleRegistration::get_default_attrs( 'divi/button' );
		$attrs              = array_replace_recursive( $default_attributes, $args['attrs'] );
		$elements           = $args['elements'];
		$style_group        = $args['styleGroup'];
		$settings           = $args['settings'] ?? [];

		$icon_placement_value = $attrs['button']['decoration']['button']['desktop']['value']['icon']['placement'] ?? 'right';
		$icon_placement       = 'left' === $icon_placement_value ? 'before' : 'after';

		$is_custom_post_type = $args['isCustomPostType'] ?? false;

		$order_class      = $args['orderClass'] ?? '';
		$base_order_class = $args['baseOrderClass'] ?? '';

		$wrapper_order_class = $args['wrapperOrderClass'] ?? '';

		$module_element_attrs = $attrs['module']['decoration'] ?? [];
		$button_element_attrs = $attrs['button']['decoration'] ?? [];

		if ( 'presetGroup' === $style_group ) {
			$module_element_attrs = array_replace_recursive(
				[
					'spacing'   => $attrs['button']['decoration']['spacing'] ?? [],
					'boxShadow' => $attrs['button']['decoration']['boxShadow'] ?? [],
				],
				$module_element_attrs
			);

			unset( $button_element_attrs['spacing'] );
			unset( $button_element_attrs['boxShadow'] );
		}

		if ( 'module' === $style_group ) {
			unset( $button_element_attrs['boxShadow'] );
		}

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
								'attrs'          => $module_element_attrs,
								'spacing'        => [
									'propertySelectors' => [
										'desktop' => [
											'value' => [
												'margin'  => $wrapper_order_class,
												'padding' => implode(
													', ',
													[
														"{$wrapper_order_class} {$base_order_class}",
														"{$wrapper_order_class} {$base_order_class}:hover",
													]
												),
											],
										],
									],
									'important'         => true,
								],
								'disabledOn'     => [
									'disabledModuleVisibility' => $settings['disabledModuleVisibility'] ?? null,
								],
								'advancedStyles' => [
									[
										'componentName' => 'divi/text',
										'props'         => [
											'attr' => $attrs['module']['advanced']['text'] ?? [],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => $wrapper_order_class,
											'attr'     => $attrs['module']['advanced']['alignment'] ?? [],
											'declarationFunction' => [ self::class, 'button_alignment_declaration' ],
										],
									],
								],
							],
						]
					),

					// Button.
					$elements->style(
						[
							'attrName'   => 'button',
							'styleProps' => [
								'attrs'          => $button_element_attrs,
								'disabledOn'     => [
									'disabledModuleVisibility' => $settings['disabledModuleVisibility'] ?? null,
								],
								'advancedStyles' => [
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => implode(
												', ',
												$is_custom_post_type
													? [
														"body.et-db #page-container #et-boc .et-l .et_pb_section {$base_order_class}:{$icon_placement}",
														"body.et-db #page-container #et-boc .et-l .et_pb_section {$base_order_class}:hover:{$icon_placement}",
													]
													: [
														"body #page-container .et_pb_section {$base_order_class}:{$icon_placement}",
														"body #page-container .et_pb_section {$base_order_class}:hover:{$icon_placement}",
													]
											),
											'attr'     => $attrs['button']['decoration']['button'] ?? [],
											'declarationFunction' => [ self::class, 'icon_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => implode(
												', ',
												$is_custom_post_type
												? [
													"body.et-db #page-container #et-boc .et-l .et_pb_section {$base_order_class}",
													"body.et-db #page-container #et-boc .et-l .et_pb_section {$base_order_class}:hover",
												]
												: [
													"body #page-container .et_pb_section {$base_order_class}",
													"body #page-container .et_pb_section {$base_order_class}:hover",
												]
											),
											'attr'     => $attrs['button']['decoration']['button'] ?? [],
											'declarationFunction' => [ self::class, 'icon_style_fe_declaration' ],
											'selectorFunction' => function ( $params ) {
												$params = wp_parse_args(
													$params,
													[
														'selector' => null,
													]
												);

												$selector = $params['selector'];

												return implode(
													', ',
													array_map(
														static function ( $element ) {
															return $element . ':after';
														},
														explode( ', ', $selector )
													)
												);
											},
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => $is_custom_post_type
												? "body.et-db #page-container #et-boc .et-l .et_pb_section {$base_order_class}:hover"
												: "body #page-container .et_pb_section {$base_order_class}:hover",
											'attr'     => $attrs['button']['decoration']['button'] ?? [],
											'declarationFunction' => [ self::class, 'hover_icon_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => $is_custom_post_type
												? "body.et-db #page-container #et-boc .et-l {$order_class}"
												: "body #page-container {$order_class}",
											'attr'     => $attrs['button']['decoration']['button'] ?? [],
											'declarationFunction' => [ self::class, 'button_spacing_style_declaration' ],
										],
									],
								],
								'button'         => [
									'affectingAttrs' => [
										'spacing' => $attrs['module']['decoration']['spacing'] ?? [],
									],
								],
							],
						]
					),

					// Module - Only for Custom CSS.
					CssStyle::style(
						[
							'selector' => $args['orderClass'],
							'attr'     => $attrs['css'] ?? [],
						]
					),
				],
			]
		);
	}

	/**
	 * Icon style declaration
	 *
	 * This function will declare icon style for Button module.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array      $attrValue  The value (breakpoint > state > value) of module attribute.
	 *     @type bool|array $important  Optional. If set to true, the CSS will be added with !important. Default false.
	 *     @type string     $returnType Optional. This is the type of value that the function will return.
	 *                                  Can be either "string" or "key_value_pair". Default "string".
	 * }
	 *
	 * @throws Exception If the icon type is not supported.
	 *
	 * @return string|array The icon style declaration or key/value pairs.
	 */
	public static function icon_style_declaration( array $params ): string {
		$icon_attr           = $params['attrValue'];
		$icon_placement      = $icon_attr['icon']['placement'] ?? 'right';
		$icon_show_on_hover  = 'off' !== ( $icon_attr['icon']['onHover'] ?? '' );
		$should_animate_icon = 'right' === $icon_placement && $icon_show_on_hover;

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => [
					'font-family' => true,
					'font-size'   => true,
					'line-height' => true,
				],
			]
		);

		$margin_left = 'left' === $icon_placement || $should_animate_icon ? '-1.3em' : '0';

		if ( ! empty( $icon_attr['icon']['settings'] ) ) {
			$icon_unicode = Utils::escape_font_icon( Utils::process_font_icon( $icon_attr['icon']['settings'] ) );

			$style_declarations->add( 'content', "'{$icon_unicode}'" );
		}

		if ( ! empty( $icon_attr['icon']['settings']['type'] ) ) {
			$font_family = 'fa' === $icon_attr['icon']['settings']['type'] ? 'FontAwesome' : 'ETmodules';
			$style_declarations->add( 'font-family', $font_family );
		}

		// Checking if the icon is enabled.
		// It is important to check this because sometimes we are getting different values for the icon settings.
		// As a result, placement right value always is applied.
		$button_enable = $icon_attr['enable'] ?? 'off';
		if ( 'on' === $button_enable ) {
			$style_declarations->add( 'margin-left', $margin_left );
		}
		$style_declarations->add( 'font-size', '1.6em' );
		$style_declarations->add( 'line-height', '1em' );

		return $style_declarations->value();
	}

	/**
	 * FE specific Icon style declaration
	 *
	 * This function will declare FE specific Icon style for Button module.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array $attrValue The value (breakpoint > state > value) of module attribute.
	 * }
	 *
	 * @return string The icon style frontend declaration.
	 */
	public static function icon_style_fe_declaration( array $params ): string {
		$icon_attr = $params['attrValue'];

		$icon_placement = $icon_attr['icon']['placement'] ?? 'right';

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		if ( 'left' === $icon_placement ) {
			$style_declarations->add( 'display', 'none' );
			$style_declarations->add( 'margin-right', 'auto' );
		}

		return $style_declarations->value();
	}

	/**
	 * FE specific hover Icon style declaration
	 *
	 * This function will declare FE specific Hover Icon style for Button module.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array $attrValue The value (breakpoint > state > value) of module attribute.
	 * }
	 *
	 * @return string The icon style hover declaration.
	 */
	public static function hover_icon_style_declaration( array $params ): string {
		$icon_attr = $params['attrValue'];

		$icon_placement = $icon_attr['icon']['placement'] ?? 'right';
		$hover          = $icon_attr['icon']['onHover'] ?? 'on';

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		if ( 'on' === $hover && 'left' === $icon_placement ) {
			$style_declarations->add( 'padding-right', '.7em' );
			$style_declarations->add( 'padding-left', '2em' );
		}

		return $style_declarations->value();
	}

	/**
	 * Loads `ButtonModule` and registers the frontend render callback and REST API Endpoints.
	 *
	 * @since ??
	 *
	 * @return void
	 */
	public function load(): void {
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/button/';

		add_filter( 'divi_conversion_presets_attrs_map', array( ButtonPresetAttrsMap::class, 'get_map' ), 10, 2 );

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