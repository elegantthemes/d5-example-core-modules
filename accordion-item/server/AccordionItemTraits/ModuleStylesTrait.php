<?php
/**
 * Module Library: Accordion Item Module Styles Trait
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\AccordionItem\AccordionItemTraits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\ModuleLibrary\AccordionItem\AccordionItemModule;

trait ModuleStylesTrait {

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
		$attrs        = $args['attrs'] ?? [];
		$parent_attrs = $args['parentAttrs'] ?? [];
		$elements     = $args['elements'];
		$settings     = $args['settings'] ?? [];
		$order_class  = $args['orderClass'] ?? '';
		$main_class   = $order_class . '.et_pb_toggle';

		$default_printed_style_attrs = $args['defaultPrintedStyleAttrs'] ?? [];

		$heading_level = AccordionItemModule::get_heading_level( $attrs, $parent_attrs );

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
											'declarationFunction' => [ AccordionItemModule::class, 'accordion_item_border_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/css',
										'props'         => [
											'attr'      => $attrs['css'] ?? [],
											'cssFields' => AccordionItemModule::custom_css(),
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
								'selector' => "{$main_class} {$heading_level}.et_pb_toggle_title",
							],
						]
					),

					// Open Toggle.
					$elements->style(
						[
							'attrName'   => 'openToggle',
							'styleProps' => [
								'font' => [
									'selector'  => "{$order_class}.et_pb_toggle_open {$heading_level}.et_pb_toggle_title",
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
									'selector'          => "{$main_class}.et_pb_toggle_close {$heading_level}.et_pb_toggle_title",
									'propertySelectors' => [
										'font' => [
											'desktop' => [
												'value' => [
													'color' => "{$order_class}.et_pb_toggle_close {$heading_level}.et_pb_toggle_title",
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
											'declarationFunction' => [ AccordionItemModule::class, 'toggle_open_overlay_sizing_style_declaration' ],
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
											'declarationFunction' => [ AccordionItemModule::class, 'toggle_close_icon_size_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$order_class}.et_pb_toggle_close .et_vb_toggle_overlay",
											'attr'     => $attrs['closedToggleIcon']['decoration']['icon'] ?? [],
											'declarationFunction' => [ AccordionItemModule::class, 'toggle_close_overlay_sizing_style_declaration' ],
										],
									],
								],
							],

						]
					),
				],
			]
		);
	}
}
