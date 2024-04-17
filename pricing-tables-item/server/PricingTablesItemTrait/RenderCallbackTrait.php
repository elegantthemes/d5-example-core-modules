<?php
/**
 * PricingTablesItemModule::render_callback()
 *
 * @package ET\Builder\Packages\ModuleLibrary\PricingTablesItem
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\PricingTablesItem\PricingTablesItemTrait;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- WP use snakeCase in \WP_Block_Parser_Block

use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\Packages\ModuleLibrary\PricingTablesItem\PricingTablesItemModule;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use WP_Block;

trait RenderCallbackTrait {

	use RenderPricingListTrait;

	/**
	 * Pricing Table render callback which outputs server side rendered HTML on the Front-End.
	 *
	 * @since ??
	 *
	 * @param array          $attrs                       Block attributes that were saved by VB.
	 * @param string         $content                     Block content.
	 * @param WP_Block       $block                       Parsed block object that being rendered.
	 * @param ModuleElements $elements                    ModuleElements instance.
	 * @param array          $default_printed_style_attrs Default printed style attributes.
	 *
	 * @return string HTML rendered of BarCountersItem module.
	 */
	public static function render_callback( $attrs, $content, $block, $elements, $default_printed_style_attrs ) {
		$parent               = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );
		$default_parent_attrs = ModuleRegistration::get_default_attrs( 'divi/pricing-tables' );
		$parent_attrs         = array_replace_recursive( $default_parent_attrs, $parent->attrs ?? [] );

		// Heading Level.
		$parent_heading_level = $parent_attrs['title']['decoration']['font']['font']['desktop']['value']['headingLevel'] ?? 'h2';
		$heading_level        = $attrs['title']['decoration']['font']['font']['desktop']['value']['headingLevel'] ?? '';
		$heading_level        = empty( $heading_level ) ? $parent_heading_level : $heading_level;

		// Title.
		$pricing_table_title = $elements->render(
			[
				'attrName' => 'title',
				'tagName'  => $heading_level,
			]
		);

		// Subtitle.
		$pricing_table_subtitle = $elements->render(
			[
				'attrName' => 'subtitle',
			]
		);

		// Pricing Table Heading Wrapper.
		$pricing_table_heading_wrapper = HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class' => HTMLUtility::classnames(
						[
							'et_pb_pricing_heading' => true,
						]
					),
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $pricing_table_title . $pricing_table_subtitle,
			]
		);

		// Currency Frequency.
		$currency_frequency = $elements->render(
			[
				'attrName'      => 'currencyFrequency',
				'attrSubName'   => 'currency',
				'attributes'    => [
					'class' => HTMLUtility::classnames(
						[
							'et_pb_dollar_sign' => true,
						]
					),
				],
			]
		);

		// Price.
		$price = $elements->render(
			[
				'attrName' => 'price',
			]
		);

		// Currency Frequency Per.
		$currency_frequency_per = $elements->render(
			[
				'attrName'      => 'currencyFrequency',
				'attrSubName'   => 'per',
				'attributes'    => [
					'class' => HTMLUtility::classnames(
						[
							'et_pb_frequency' => true,
						]
					),
				],
				'valueResolver' => function( $value ) {
					return ! empty($value) ? HTMLUtility::render(
						[
							'tag'               => 'span',
							'attributes'        => [
								'class' => HTMLUtility::classnames(
									[
										'et_pb_frequency_slash' => true,
									]
								),
							],
							'childrenSanitizer' => 'et_core_esc_previously',
							'children'          => '/',
						]
					) . $value : '';
				},
			]
		);

		// Pricing Table Price Content Wrapper.
		$pricing_table_price_content_wrapper = HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class' => HTMLUtility::classnames(
						[
							'et_pb_pricing_content_top' => true,
						]
					),
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => HTMLUtility::render(
					[
						'tag'               => 'div',
						'attributes'        => [
							'class' => HTMLUtility::classnames(
								[
									'et_pb_et_price' => true,
								]
							),
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => $currency_frequency . $price . $currency_frequency_per,
					]
				),
			]
		);

		// Pricing Table List Content.
		$pricing_list_content = $elements->render(
			[
				'tagName'           => 'div',
				'attributes'        => [
					'class' => 'et_pb_pricing_content',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => [
					'attrName'      => 'content',
					'valueResolver' => function( $value ) {
						return PricingTablesItemModule::render_pricing_list( $value );
					},
				],
			]
		);

		// Button.
		$button = $elements->render(
			[
				'attrName' => 'button',
			]
		);

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
				'hasModuleClassName'       => false,
				'classnamesFunction'       => [ PricingTablesItemModule::class, 'module_classnames' ],
				'scriptDataComponent'      => [ PricingTablesItemModule::class, 'module_script_data' ],
				'stylesComponent'          => [ PricingTablesItemModule::class, 'module_styles' ],
				'parentAttrs'              => $parent_attrs,
				'parentId'                 => $parent->id ?? '',
				'parentName'               => $parent->blockName ?? '',
				'children'                 => $elements->style_components(
					[
						'attrName' => 'module',
					]
				) . $pricing_table_heading_wrapper . $pricing_table_price_content_wrapper . $pricing_list_content . $button,
			]
		);
	}
}
