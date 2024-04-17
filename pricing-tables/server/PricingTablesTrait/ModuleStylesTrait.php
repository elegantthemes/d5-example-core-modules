<?php
/**
 * PricingTablesModule::module_styles().
 *
 * @package ET\Builder\Packages\ModuleLibrary\PricingTables
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\PricingTables\PricingTablesTrait;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use ET\Builder\Packages\ModuleLibrary\PricingTables\PricingTablesModule;

trait ModuleStylesTrait {

	use CustomCssTrait;
	use StyleDeclarationTrait;

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
											'declarationFunction' => [ PricingTablesModule::class, 'pricing_table_spacing_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$args['orderClass']} .et_pb_pricing_table",
											'attr'     => $attrs['module']['decoration']['border'] ?? [],
											'declarationFunction' => [ PricingTablesModule::class, 'overflow_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/css',
										'props'         => [
											'attr'      => $attrs['css'] ?? [],
											'cssFields' => PricingTablesModule::custom_css(),
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
											'declarationFunction' => [ PricingTablesModule::class, 'pricing_table_body_content_spacing_style_declaration' ],
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
											'declarationFunction' => [ PricingTablesModule::class, 'pricing_table_drop_shadow_style_declaration' ],
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
				],
			]
		);
	}
}
