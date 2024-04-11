<?php
/**
 * Module Library: Accordion Module Styles Trait
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Accordion\AccordionTraits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\ModuleLibrary\Accordion\AccordionModule;

trait ModuleStylesTrait {

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
											'declarationFunction' => [ AccordionModule::class, 'accordion_border_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/css',
										'props'         => [
											'attr'      => $attrs['css'] ?? [],
											'cssFields' => AccordionModule::custom_css(),
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
											'declarationFunction' => [ AccordionModule::class, 'toggle_icon_style_declaration' ],
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
				],
			]
		);
	}
}
