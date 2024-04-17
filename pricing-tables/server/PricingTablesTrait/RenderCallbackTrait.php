<?php
/**
 * PricingTablesModule::render_callback()
 *
 * @package ET\Builder\Packages\ModuleLibrary\PricingTables
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\PricingTables\PricingTablesTrait;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- WP use snakeCase in \WP_Block_Parser_Block

use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\ModuleLibrary\PricingTables\PricingTablesModule;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\Framework\Utility\HTMLUtility;

trait RenderCallbackTrait {

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
			function( $inner_block ) {
				return $inner_block['id'];
			},
			$block->parsed_block['innerBlocks']
		) : [];

		// Get classname based upon children's featured pricing table status.
		$featured_pricing_tables_classname = PricingTablesModule::get_featured_pricing_tables_classname( $children_ids, $block->parsed_block['storeInstance'] );

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
				'classnamesFunction'       => [ PricingTablesModule::class, 'module_classnames' ],
				'scriptDataComponent'      => [ PricingTablesModule::class, 'module_script_data' ],
				'stylesComponent'          => [ PricingTablesModule::class, 'module_styles' ],
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
}
