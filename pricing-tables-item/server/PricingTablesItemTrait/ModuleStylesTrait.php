<?php
/**
 * PricingTablesItemModule::module_styles().
 *
 * @package ET\Builder\Packages\ModuleLibrary\PricingTablesItem
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\PricingTablesItem\PricingTablesItemTrait;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\ModuleLibrary\PricingTablesItem\PricingTablesItemModule;

trait ModuleStylesTrait {

    use CustomCssTrait;
	use StyleDeclarationTrait;

    /**
	 * Pricing Table Module's style components.
	 *
	 * This function is equivalent of JS function ModuleStyles located in
	 * visual-builder/packages/module-library/src/components/pricing-table/module-styles.tsx.
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
	 * @since ??
	 */
	public static function module_styles( array $args ) {
		$attrs        = $args['attrs'] ?? [];
		$elements     = $args['elements'];
		$settings     = $args['settings'] ?? [];
		$parentAttrs  = $args['parentAttrs'] ?? [];

		$default_printed_style_attrs = $args['defaultPrintedStyleAttrs']['module']['decoration'] ?? [];
		$parent_button_attr          = $parentAttrs['button']['decoration']['button']['desktop']['value'] ?? [];

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
													"{$args['orderClass']}.et_pb_pricing_table",
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
											'selector' => ".et_pb_pricing .et_pb_pricing_table{$args['orderClass']}",
											'attr'     => $attrs['module']['decoration']['border'] ?? [],
											'declarationFunction' => [ PricingTablesItemModule::class, 'overflow_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/css',
										'props'         => [
											'attr'      => $attrs['css'] ?? [],
											'cssFields' => PricingTablesItemModule::custom_css(),
										],
									],
								],
							],
						]
					),
					// Price.
					$elements->style(
						[
							'attrName' => 'price',
						]
					),
					// Title.
					$elements->style(
						[
							'attrName' => 'title',
						]
					),
					// Description.
					$elements->style(
						[
							'attrName' => 'content',
							'styleProps' => [
								'advancedStyles' => [
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector'  => "{$args['orderClass']} ul.et_pb_pricing li span::before",
											'attr'      => $attrs['content']['advanced']['bulletColor'] ?? [],
											'property'  => 'border-color',
											'important' => true,
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
					// Item Not Available.
					$elements->style(
						[
							'attrName' => 'excluded',
						]
					),
					// Pricing Table Button.
					$elements->style(
						[
							'attrName'   => 'button',
							'styleProps' => [
								'attrsFilter'              => function( $decoration_attrs ) use ( $parent_button_attr ) {
									return PricingTablesItemModule::filter_button_decoration_attrs( $decoration_attrs, $parent_button_attr );
								},
							],
						]
					),
				],
			]
		);
	}
}
