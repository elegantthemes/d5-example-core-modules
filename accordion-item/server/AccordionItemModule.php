<?php
/**
 * Module Library: Accordion Item Module
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\AccordionItem;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- WP use snakeCase in \WP_Block_Parser_Block

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\SanitizerUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\Module\Options\Element\ElementClassnames;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\ModuleUtils\ModuleUtils;
use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;
use WP_Block_Type_Registry;
use WP_Block;
use ET\Builder\Packages\GlobalData\GlobalPresetItemGroup;

/**
 * AccordionItemModule class.
 *
 * This class implements the functionality of an accordion item component in a frontend application.
 * It provides functions for rendering the accordion item, managing REST API endpoints, and other
 * related tasks.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 *
 * @see DependencyInterface
 */
class AccordionItemModule implements DependencyInterface {

	/**
	 * Generate classnames for the module.
	 *
	 * This function generates classnames for the module based on the provided
	 * arguments. It is used in the `render_callback` function of the Accordion
	 * Item module.
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
	 * AccordionItemModule::module_classnames($args);
	 * ```
	 */
	public static function module_classnames( array $args ): void {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];

		// Text Options classnames.
		$is_toggle_open = 'on' === ( $attrs['module']['advanced']['open']['desktop']['value'] ?? 'off' );

		// Module.
		$classnames_instance->add( 'et_pb_toggle' );
		$classnames_instance->add( 'et_pb_module' );
		$classnames_instance->add( 'et_pb_toggle_open', $is_toggle_open );
		$classnames_instance->add( 'et_pb_toggle_close', ! $is_toggle_open );

		// Module.
		$classnames_instance->add(
			ElementClassnames::classnames(
				[
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
	 * Render callback for the Accordion Item module.
	 *
	 * This function is responsible for rendering the server-side HTML of the
	 * module on the frontend.
	 *
	 * This function is equivalent to the JavaScript function
	 * {@link /docs/builder-api/js/module-library/ AccordionItemEdit}
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
	 * @return string The HTML rendered output of the Accordion Item module.
	 *
	 * @example
	 * ```php
	 * $attrs = [
	 *   'itemName'    => 'Item 1',
	 *   'itemContent' => 'Content 1',
	 * ];
	 * $content = '';
	 * $block = new WP_Block( [
	 *   'id' => '123',
	 *   'name' => 'divi/accordion-item',
	 *   'parsed_block' => [
	 *     'id' => '123',
	 *     'orderIndex' => 1,
	 *     'storeInstance' => '123',
	 *   ],
	 * ] );
	 * $elements = new ModuleElements( $block );
	 * $default_printed_style_attrs = [];
	 * AccordionItemModule::render_callback( $attrs, $content, $block, $elements, $default_printed_style_attrs );
	 * ```
	 */
	public static function render_callback( array $attrs, string $content, WP_Block $block, ModuleElements $elements, array $default_printed_style_attrs ): string {
		$parent = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );

		$parent_attrs = ModuleUtils::get_all_attrs( $parent );

		$heading_level = self::get_heading_level( $attrs, $parent_attrs );

		return Module::render(
			[
				// FE only.
				'orderIndex'               => $block->parsed_block['orderIndex'],
				'storeInstance'            => $block->parsed_block['storeInstance'],

				// VB equivalent.
				'attrs'                    => $attrs,
				'elements'                 => $elements,
				'defaultPrintedStyleAttrs' => $default_printed_style_attrs,
				'parentAttrs'              => $parent_attrs,
				'parentId'                 => $parent->id ?? '',
				'parentName'               => $parent->blockName ?? '',
				'id'                       => $block->parsed_block['id'],
				'name'                     => $block->block_type->name,
				'moduleCategory'           => $block->block_type->category,

				'stylesComponent'          => [ self::class, 'module_styles' ],
				'classnamesFunction'       => [ self::class, 'module_classnames' ],
				'scriptDataComponent'      => [ self::class, 'module_script_data' ],

				'children'                 => [
					$elements->style_components(
						[
							'attrName' => 'module',
						]
					),
					$elements->render(
						[
							'attrName' => 'title',
							'tagName'  => $heading_level,
						]
					),
					$elements->render(
						[
							'attrName' => 'content',
						]
					),
				],
			]
		);
	}

	/**
	 * Accordion Item module script data.
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
	 * AccordionItem::module_script_data( $args );
	 * ```
	 */
	public static function module_script_data( array $args ): void {
		// Assign variables.
		$elements = $args['elements'];

		// Element Script Data Options.
		$elements->script_data(
			[
				'attrName' => 'module',
			]
		);
	}

	/**
	 * Add Accordion Item module styles.
	 *
	 * This function is responsible for generating and adding module styles to
	 * the style manager.
	 *
	 * This function is equivalent to the JavaScript constant
	 * {@link /docs/builder-api/js/module-library/module-styles moduleStyles}
	 * located in `@divi/module-library`.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments for generating module styles.
	 *
	 *     @type array    $attrs           Optional. The attributes of the module. Default `[]`.
	 *     @type object   $elements        The elements object.
	 *     @type array    $settings        Optional. The settings of the module. Default `[]`.
	 *     @type string   $orderClass      The order class for the module.
	 *     @type string   $id              The ID of the module.
	 *     @type string   $name            The name of the module.
	 *     @type int      $orderIndex      The order index of the module.
	 *     @type mixed    $storeInstance   The store instance.
	 *     @type ModuleElements $elements  The ModuleElements instance.
	 * }
	 *
	 * @return void
	 *
	 * @example:
	 * ```php
	 * // Add module styles for a login module
	 * $args = [
	 *   'attrs' => [
	 *     'field' => [
	 *       // attribute settings...
	 *     ],
	 *     // other attributes...
	 *   ],
	 *   'elements' => $elementsObject,
	 *   'settings' => [
	 *     'disabledModuleVisibility' => true,
	 *     // other settings...
	 *   ],
	 *   'orderClass' => '.example-login',
	 *   'id' => 'login-123',
	 *   'name' => 'Login Module',
	 *   'orderIndex' => 1,
	 *   'storeInstance' => $store,
	 * ];
	 * AccordionItemModule::module_styles( $args );
	 * ```
	 */
	public static function module_styles( array $args ): void {
		$attrs       = $args['attrs'] ?? [];
		$elements    = $args['elements'];
		$settings    = $args['settings'] ?? [];
		$order_class = $args['orderClass'] ?? '';
		$main_class  = $order_class . '.et_pb_toggle';

		$default_printed_style_attrs = $args['defaultPrintedStyleAttrs'] ?? [];

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
								'defaultPrintedStyleAttrs' => $default_printed_style_attrs['module']['decoration'] ?? [],
								'advancedStyles'           => [
									[
										'componentName' => 'divi/text',
										'props'         => [
											'attr' => $attrs['module']['advanced']['text'] ?? [],
											'propertySelectors' => [
												'textShadow' => [
													'desktop' => [
														'value' => [
															'text-shadow' => $main_class,
														],
													],
												],
											],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => ".et_pb_accordion .et_pb_module{$main_class}",
											'attr'     => $attrs['module']['decoration']['border'] ?? [],
											'declarationFunction' => [ self::class, 'overflow_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/css',
										'props'         => [
											'attr'      => $attrs['css'] ?? [],
											'cssFields' => self::custom_css(),
										],
									],
								],
							],
						]
					),

					// Content.
					$elements->style(
						[
							'attrName' => 'content',
						]
					),

					// Title.
					$elements->style(
						[
							'attrName'   => 'title',
							'styleProps' => [
								'selector' => "{$main_class} h1.et_pb_toggle_title, {$main_class} h2.et_pb_toggle_title, {$main_class} h3.et_pb_toggle_title, {$main_class} h4.et_pb_toggle_title, {$main_class} h5.et_pb_toggle_title, {$main_class} h6.et_pb_toggle_title",
							],
						]
					),

					// Open Toggle.
					$elements->style(
						[
							'attrName'   => 'openToggle',
							'styleProps' => [
								'font' => [
									'selector'  => "{$order_class}.et_pb_toggle_open h1.et_pb_toggle_title, {$order_class}.et_pb_toggle_open h2.et_pb_toggle_title, {$order_class}.et_pb_toggle_open h3.et_pb_toggle_title, {$order_class}.et_pb_toggle_open h4.et_pb_toggle_title, {$order_class}.et_pb_toggle_open h5.et_pb_toggle_title, {$order_class}.et_pb_toggle_open h6.et_pb_toggle_title",
									'important' => [
										'font' => [
											'desktop' => [
												'value' => [
													'color' => true,
												],
											],
										],
									],
								],
							],
						]
					),

					// Closed Toggle.
					$elements->style(
						[
							'attrName'   => 'closedToggle',
							'styleProps' => [
								'font' => [
									'selector'          => "{$main_class}.et_pb_toggle_close h1.et_pb_toggle_title, {$main_class}.et_pb_toggle_close h2.et_pb_toggle_title, {$main_class}.et_pb_toggle_close h3.et_pb_toggle_title, {$main_class}.et_pb_toggle_close h4.et_pb_toggle_title, {$main_class}.et_pb_toggle_close h5.et_pb_toggle_title, {$main_class}.et_pb_toggle_close h6.et_pb_toggle_title",
									'propertySelectors' => [
										'font' => [
											'desktop' => [
												'value' => [
													'color' => "{$order_class}.et_pb_toggle_close h1.et_pb_toggle_title, {$order_class}.et_pb_toggle_close h2.et_pb_toggle_title, {$order_class}.et_pb_toggle_close h3.et_pb_toggle_title, {$order_class}.et_pb_toggle_close h4.et_pb_toggle_title, {$order_class}.et_pb_toggle_close h5.et_pb_toggle_title, {$order_class}.et_pb_toggle_close h6.et_pb_toggle_title",
												],
											],
										],
									],
									'important'         => [
										'font' => [
											'desktop' => [
												'value' => [
													'color' => true,
												],
											],
										],
									],
								],
							],
						]
					),
					// Closed Toggle Icon.
					$elements->style(
						[
							'attrName'   => 'closedToggleIcon',
							'styleProps' => [
								'advancedStyles' => [
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$main_class}.et_pb_toggle_open .et_vb_toggle_overlay",
											'attr'     => $attrs['closedToggleIcon']['decoration']['icon'] ?? [],
											'declarationFunction' => [ self::class, 'toggle_open_overlay_sizing_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => implode(
												',',
												[
													"{$order_class}.et_pb_toggle_close .et_pb_toggle_title:before",
													"{$order_class}.et_pb_toggle_close .et_vb_toggle_overlay",
												]
											),
											'attr'     => $attrs['closedToggleIcon']['decoration']['icon'] ?? [],
											'declarationFunction' => [ self::class, 'toggle_close_icon_size_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$order_class}.et_pb_toggle_close .et_vb_toggle_overlay",
											'attr'     => $attrs['closedToggleIcon']['decoration']['icon'] ?? [],
											'declarationFunction' => [ self::class, 'toggle_close_overlay_sizing_style_declaration' ],
										],
									],
								],
							],

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
	 * Get the custom CSS fields for the Divi Accordion Item module.
	 *
	 * This function retrieves the custom CSS fields defined for the Divi
	 * accordion item module.
	 *
	 * This function is equivalent to the JavaScript constant
	 * {@link /docs/builder-api/js-beta/divi-module-library/functions/generateDefaultAttrs cssFields}
	 * located in `@divi/module-library`. Note that this function does not have
	 * a `label` property on each array item, unlike the JS const cssFields.
	 *
	 * @since ??
	 *
	 * @return array An array of custom CSS fields for the Divi accordion item module.
	 *
	 * @example
	 * ```php
	 * $customCssFields = CustomCssTrait::custom_css();
	 * // Returns an array of custom CSS fields for the accordion item module.
	 * ```
	 */
	public static function custom_css(): array {
		return WP_Block_Type_Registry::get_instance()->get_registered( 'divi/accordion-item' )->customCssFields;
	}

	/**
	 * Retrieves the style declaration for toggle open overlay sizing.
	 *
	 * This function generates the style declaration for setting the width and
	 * height of the overlay in the toggle open mode, based on the provided arguments.
	 *
	 * @since ??
	 *
	 * @param array $args Array of arguments for generating the style declaration.
	 *
	 * @return string The generated style declaration.
	 *
	 * @example: Generate style declaration with default arguments.
	 * ```php
	 * $args = [
	 *   'attrValue' => [
	 *     'useSize' => 'on',
	 *     'size'    => '100px',
	 *   ],
	 * ];
	 * $styleDeclaration = AccordionItemModule::toggle_open_overlay_sizing_style_declaration( $args );
	 * // Output: "width: 100px; height: 100px;"
	 * ```
	 */
	public static function toggle_open_overlay_sizing_style_declaration( array $args ): string {
		$use_size = $args['attrValue']['useSize'] ?? '';
		$size     = $args['attrValue']['size'] ?? '';

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		if ( 'on' === $use_size && $size ) {
			$style_declarations->add( 'width', $size );
			$style_declarations->add( 'height', $size );
		}

		return $style_declarations->value();
	}

	/**
	 * Style declaration for the toggle close icon.
	 *
	 * This function generates the style declaration for the accordion item's
	 * toggle close icon based on the provided arguments.
	 *
	 * @since ??
	 *
	 * @param array $args An array of arguments.
	 *
	 * @return string Style declaration for the toggle close icon.
	 *
	 * @example
	 * ```php
	 * $args = [
	 *   'attrValue' => [
	 *     'color'  => '#FF0000',
	 *     'weight' => 'normal',
	 *   ],
	 * ];
	 * $style_declaration = AccordionItemModule::toggle_close_icon_style_declaration( $args );
	 * // Output: 'color: #FF0000; font-weight: normal !important;'
	 * ```
	 */
	public static function toggle_close_icon_size_style_declaration( $args ) {
		$size     = $args['attrValue']['size'] ?? '';
		$use_size = $args['attrValue']['useSize'] ?? '';

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => [
					'right' => true,
				],
			]
		);

		if ( 'on' === $use_size && $size ) {
			$icon_size         = SanitizerUtility::numeric_parse_value( $size );
			$default_attrs     = ModuleRegistration::get_default_attrs( 'divi/accordion-item', 'defaultPrintedStyle' );
			$default_icon_size = SanitizerUtility::numeric_parse_value(
				$default_attrs['closedToggleIcon']['decoration']['icon']['desktop']['value']['size']
			);
			$size_diff         = ( $default_icon_size['valueNumber'] ?? 0 ) - ( $icon_size['valueNumber'] ?? 0 );
			$style_declarations->add( 'right', 0 !== $size_diff ? round( $size_diff / 2 ) . $icon_size['valueUnit'] : 0 );
		}

		return $style_declarations->value();
	}

	/**
	 * Style declaration for toggle close overlay sizing.
	 *
	 * This function generates the style declaration for the accordion item's
	 * toggle close overlay sizing based on the provided arguments.
	 *
	 * @since ??
	 *
	 * @param array $args An array of arguments.
	 *
	 * @return string The generated CSS style declarations for toggle close overlay sizing.
	 *
	 * @examples
	 * ```php
	 * AccordionItemModule::toggle_close_overlay_sizing_style_declaration( [
	 *   'attrValue' => [
	 *     'useSize' => 'on',
	 *     'size' => '50px',
	 *   ],
	 * ] );
	 *
	 * // Output: 'width: 50px !important; height: 50px !important;'
	 * ```
	 */
	public static function toggle_close_overlay_sizing_style_declaration( array $args ): string {
		$use_size = $args['attrValue']['useSize'] ?? '';
		$size     = $args['attrValue']['size'] ?? '';

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => [
					'width'  => true,
					'height' => true,
				],
			]
		);

		if ( 'on' === $use_size && $size ) {
			$style_declarations->add( 'width', $size );
			$style_declarations->add( 'height', $size );
		}

		return $style_declarations->value();
	}

	/**
	 * Set the style declaration for the Accordion Item's border.
	 *
	 * This function generates the style declaration for the Accordion Item's
	 * border based on the provided arguments.
	 *
	 * @since ??
	 *
	 * @param array $args An array of arguments.
	 *
	 * @return string The style declarations as a string.
	 *
	 * @example
	 * ```php
	 * $args = [
	 *   'attrValue'  => [
	 *     'radius' => [
	 *       'desktop' => [
	 *         'normal' => '2px',
	 *         'hover'  => '4px',
	 *         'focus'  => '6px',
	 *       ],
	 *       'tablet'  => [
	 *         'normal' => '3px',
	 *         'hover'  => '5px',
	 *         'focus'  => '7px',
	 *       ],
	 *     ],
	 *   ],
	 * ];
	 * $styleDeclarations = AccordionItemModule::overflow_style_declaration( $args );
	 *
	 * // Result: 'overflow: hidden;'
	 * ```
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
	 * Determine the heading level for an accordion item.
	 *
	 * This function determines the heading level for an accordion item based on the attributes provided
	 * and the attributes of its parent module. If the heading level is set in the module attributes,
	 * that value is used. If the heading level is not set in the module attributes, the function checks
	 * the heading level set in the parent module attributes. If the heading level is not set in either,
	 * the default heading level is h5.
	 *
	 * This function is equivalent to the JavaScript function
	 * {@link /docs/builder-api/js/module-library/ getHeadingLevel}
	 * located in `@divi/module-library`.
	 *
	 * @since ??
	 *
	 * @param array $attrs        Module attributes.
	 * @param array $parent_attrs Parent module attributes.
	 *
	 * @return string The heading level ('h1', 'h2', 'h3', 'h4', 'h5', 'h6').
	 *
	 * @example
	 * ```php
	 * $attrs = [];
	 * $parent_attrs = [];
	 * $heading_level = AccordionItemModule::get_heading_level($attrs, $parent_attrs);
	 *
	 * // Result: $heading_level = 'h5'
	 * ```
	 * @example: Example with heading level set in module attributes.
	 * ```php
	 * $attrs = ['title' => ['decoration' => ['font' => ['font' => [ 'desktop' => ['value' => ['headingLevel' => 'h3']]]]]]]];
	 * $parent_attrs = ['title' => ['decoration' => ['font' => ['font' => ['desktop' => ['value' => ['headingLevel' => 'h2']]]]]]];
	 * $heading_level = AccordionItemModule::get_heading_level($attrs, $parent_attrs);
	 *
	 * // Result: $heading_level = 'h3'
	 * ```
	 */
	public static function get_heading_level( array $attrs, array $parent_attrs ): string {
		$merged_attrs = ModuleUtils::merge_attrs(
			[
				'defaultAttrs' => $parent_attrs['title']['decoration']['font']['font'] ?? [],
				'attrs'        => $attrs['title']['decoration']['font']['font'] ?? [],
			]
		);

		$heading_level = $merged_attrs['desktop']['value']['headingLevel'] ?? '';

		if ( ! in_array( $heading_level, [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ], true ) ) {
			return 'h5';
		}

		return $heading_level;
	}

	/**
	 * Loads `AccordionItem` and registers Frontend render callback and REST API Endpoints.
	 *
	 * This function loads the `AccordionItem` module from the module library and registers the
	 * necessary callbacks and endpoints for frontend rendering and REST API integration.
	 *
	 * @since ??
	 *
	 * @return void
	 */
	public function load(): void {
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/accordion-item/';

		add_filter( 'divi_conversion_presets_attrs_map', array( AccordionItemPresetAttrsMap::class, 'get_map' ), 10, 2 );

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