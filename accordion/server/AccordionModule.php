<?php
/**
 * Module Library: Accordion Module
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Accordion;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- WordPress uses snakeCase in \WP_Block_Parser_Block

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\SanitizerUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\Module\Options\Element\ElementClassnames;
use ET\Builder\Packages\ModuleLibrary\Accordion\AccordionPresetAttrsMap;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;
use WP_Block_Type_Registry;
use WP_Block;
use ET\Builder\Packages\GlobalData\GlobalPresetItemGroup;

/**
 * AccordionModule class.
 *
 * This class implements the functionality of an accordion component in a
 * frontend application. It provides functions for rendering the accordion,
 * managing REST API endpoints, and other related tasks.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 *
 * @see DependencyInterface
 */
class AccordionModule implements DependencyInterface {

	/**
	 * Render callback for the Accordion module.
	 *
	 * This function is responsible for the module's server-side HTML rendering on the frontend.
	 *
	 * This function is equivalent to the JavaScript function
	 * {@link /docs/builder-api/js/module-library/ AccordionEdit}
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
	 * @return string The HTML rendered output of the Accordion module.
	 *
	 * @example
	 * ```php
	 * $attrs = [
	 *   'accordionName'   => 'My Accordion',
	 *   'accordionItems'  => [
	 *     [
	 *       'itemName'    => 'Item 1',
	 *       'itemContent' => 'Content 1',
	 *     ],
	 *     [
	 *       'itemName'    => 'Item 2',
	 *       'itemContent' => 'Content 2',
	 *     ],
	 *   ],
	 * ];
	 * $content = '';
	 * $block = new WP_Block( [
	 *    'id' => '123',
	 *   'name' => 'divi/accordion',
	 *  'orderIndex' => 1,
	 * 'storeInstance' => '123',
	 * ] );
	 * $elements = new ModuleElements();
	 * $default_printed_style_attrs = [];
	 *
	 * AccordionModule::render_callback( $attrs, $content, $block, $elements, $default_printed_style_attrs );
	 * ```
	 */
	public static function render_callback( array $attrs, string $content, WP_Block $block, ModuleElements $elements, array $default_printed_style_attrs ): string {
		$children_ids = $block->parsed_block['innerBlocks'] ? array_map(
			function ( $inner_block ) {
				return $inner_block['id'];
			},
			$block->parsed_block['innerBlocks']
		) : [];

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
				'scriptDataComponent'      => [ self::class, 'module_script_data' ],
				'stylesComponent'          => [ self::class, 'module_styles' ],
				'classnamesFunction'       => [ self::class, 'module_classnames' ],
				'parentId'                 => $parent->id ?? '',
				'parentName'               => $parent->blockName ?? '',
				'parentAttrs'              => $parent->attrs ?? [],
				'childrenIds'              => $children_ids,
				'children'                 => [
					$elements->style_components(
						[
							'attrName' => 'module',
						]
					),
					$content,
				],
			]
		);
	}

	/**
	 * Generate classnames for the module.
	 *
	 * This function generates classnames for the module based on the provided
	 * arguments. It is used in the `render_callback` function of the Accordion
	 * module.
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
	 * AccordionModule::module_classnames($args);
	 * ```
	 */
	public static function module_classnames( array $args ): void {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];

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
	 * Accordion module script data.
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
	 *     'id'             => 'my-module',
	 *     'name'           => 'My Module',
	 *     'selector'       => '.my-module',
	 *     'attrs'          => array(
	 *         'portfolio' => array(
	 *             'advanced' => array(
	 *                 'showTitle'       => false,
	 *                 'showCategories'  => true,
	 *                 'showPagination' => true,
	 *             )
	 *         )
	 *     ),
	 *     'elements'       => $elements,
	 *     'store_instance' => 123,
	 * );
	 *
	 * AccordionModule::module_script_data( $args );
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
	 * Add Accordion module styles.
	 *
	 * This function is responsible for generating and adding module styles to the style manager.
	 *
	 * This function is equivalent to the JavaScript function
	 * {@link /docs/builder-api/js/module-library/module-styles ModuleStyles}
	 * located in `@divi/module-library`.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments for generating module styles.
	 *
	 *     @type string   $id                       The ID of the module.
	 *     @type string   $name                     The name of the module.
	 *     @type array    $attrs                    Optional. The attributes of the module. Default `[]`.
	 *     @type array    $defaultPrintedStyleAttrs Optional. The default printed style attributes of the module. Default `[]`.
	 *     @type object   $elements                 The elements object.
	 *     @type string   $orderClass               Optional. The order class for the module. Default `''`.
	 *     @type int      $orderIndex               The order index of the module.
	 *     @type array    $settings                 Optional. The settings of the module. Default `[]`.
	 *     @type mixed    $storeInstance            The store instance.
	 *     @type ModuleElements $elements           The ModuleElements instance.
	 * }
	 *
	 * @return void
	 *
	 * @example:
	 * ```php
	 * // Add module styles for a login module
	 * $args = [
	 *     'id' => 'login-123',
	 *     'name' => 'Login Module',
	 *     'attrs' => [],
	 *     'defaultPrintedStyleAttrs' => [],
	 *     'elements' => $elementsObject,
	 *     'orderClass' => '.example-login',
	 *     'orderIndex' => 1,
	 *     'settings' => [],
	 *     'storeInstance' => $store,
	 * ];
	 *
	 * LoginModule::module_styles( $args );
	 * ```
	 */
	public static function module_styles( array $args ): void {
		$attrs       = $args['attrs'] ?? [];
		$elements    = $args['elements'];
		$settings    = $args['settings'] ?? [];
		$order_class = $args['orderClass'] ?? '';

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
								'disabledOn'               => [
									'disabledModuleVisibility' => $settings['disabledModuleVisibility'] ?? null,
								],
								'advancedStyles'           => [
									[
										'componentName' => 'divi/text',
										'props'         => [
											'attr' => $attrs['module']['advanced']['text'] ?? [],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => $order_class . '.et_pb_accordion .et_pb_accordion_item',
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
					// Closed Toggle Icon.
					$elements->style(
						[
							'attrName'   => 'closedToggleIcon',
							'styleProps' => [
								'advancedStyles' => [
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => $order_class . ' .et_pb_toggle_title:before',
											'attr'     => $attrs['closedToggleIcon']['decoration']['icon'] ?? [],
											'declarationFunction' => [ self::class, 'toggle_icon_style_declaration' ],
										],
									],
								],
							],
						]
					),

					// Open Toggle.
					$elements->style(
						[
							'attrName' => 'openToggle',
						]
					),
					// Open Toggle Title.
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
					// Closed Toggle.
					$elements->style(
						[
							'attrName' => 'closedToggle',
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
	 * Style declaration for accordion's border overflow.
	 *
	 * This function is used to generate the style declaration for the border overflow of an accordion module.
	 *
	 * @since ??
	 *
	 * @param array $params An array of arguments.
	 *
	 * @return string The generated CSS style declaration.
	 *
	 * @example
	 * ```php
	 * $args = [
	 *   'attrValue' => [
	 *     'radius' => [
	 *       'desktop' => [
	 *         'default' => '10px',
	 *         'hover'   => '8px',
	 *       ],
	 *     ],
	 *   ],
	 *   'important'  => true,
	 *   'returnType' => 'string',
	 * ];
	 * $styleDeclaration = AccordionModule::overflow_style_declaration( $args );
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
	 * Style declaration for accordion's toggle icon.
	 *
	 * This function is used to generate the style declaration for the toggle icon of an accordion module.
	 *
	 * @since ??
	 *
	 * @param array $args An array of arguments.
	 *
	 * @throws \Exception Throws an exception if the `attrValue` argument is not an array.
	 * @return string The generated CSS code for the toggle icon style declaration.
	 *
	 * @example: Generating a toggle icon style declaration
	 * ```php
	 * $args = [
	 *     'attrValue'  => [
	 *         'color'   => '#f00',
	 *         'useSize' => 'on',
	 *         'size'    => '14px',
	 *         'weight'  => 'bold',
	 *     ],
	 * ];
	 * $styleDeclaration = AccordionModule::toggle_icon_style_declaration( $args );
	 *
	 * // Result:
	 * // $styleDeclaration = 'color: #f00; font-size: 14px; font-weight: bold !important; right: 2px;';
	 * ```
	 */
	public static function toggle_icon_style_declaration( array $args ): string {
		$use_size = $args['attr']['desktop']['value']['useSize'] ?? '';

		$size = $args['attrValue']['size'] ?? '';

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		if ( 'on' === $use_size && $size ) {
			$icon_size         = SanitizerUtility::numeric_parse_value( $size );
			$default_attrs     = ModuleRegistration::get_default_attrs( 'divi/accordion', 'defaultPrintedStyle' );
			$default_icon_size = SanitizerUtility::numeric_parse_value(
				$default_attrs['closedToggleIcon']['decoration']['icon']['desktop']['value']['size']
			);
			$size_diff         = ( $default_icon_size['valueNumber'] ?? 0 ) - ( $icon_size['valueNumber'] ?? 0 );
			$style_declarations->add( 'right', 0 !== $size_diff ? round( $size_diff / 2 ) . $icon_size['valueUnit'] : 0 );
		}

		return $style_declarations->value();
	}

	/**
	 * Get the custom CSS fields for the Divi Accordion module.
	 *
	 * This function retrieves the custom CSS fields defined for the Divi accordion module.
	 *
	 * This function is equivalent to the JavaScript constant
	 * {@link /docs/builder-api/js-beta/divi-module-library/functions/generateDefaultAttrs cssFields} located in
	 * `@divi/module-library`. Note that this function does not have a `label` property on each
	 * array item, unlike the JS const cssFields.
	 *
	 * @since ??
	 *
	 * @return array An array of custom CSS fields for the Divi accordion module.
	 *
	 * @example
	 * ```php
	 * $customCssFields = CustomCssTrait::custom_css();
	 * // Returns an array of custom CSS fields for the accordion module.
	 * ```
	 */
	public static function custom_css(): array {
		return WP_Block_Type_Registry::get_instance()->get_registered( 'divi/accordion' )->customCssFields;
	}

	/**
	 * Load an accordion module and register the render callback and REST API endpoints.
	 *
	 * This function registers the accordion module and adds a render callback for it. The accordion module
	 * JSON folder path is determined using the `dirname()` function and the `__DIR__` constant to get the
	 * current file's directory path. It then adds an action to the 'init' hook to register the module and
	 * set the render callback to the `AccordionModule::render_callback` method.
	 *
	 * @since ??
	 *
	 * @return void
	 */
	public function load(): void {
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/accordion/';

		add_filter( 'divi_conversion_presets_attrs_map', array( AccordionPresetAttrsMap::class, 'get_map' ), 10, 2 );

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