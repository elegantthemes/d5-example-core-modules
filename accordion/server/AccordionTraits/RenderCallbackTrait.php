<?php
/**
 * Module Library: Accordion Module Render Callback Trait
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Accordion\AccordionTraits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- WordPress uses snakeCase in \WP_Block_Parser_Block

use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\ModuleLibrary\Accordion\AccordionModule;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use WP_Block;

trait RenderCallbackTrait {

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
			function( $inner_block ) {
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
				'scriptDataComponent'      => [ AccordionModule::class, 'module_script_data' ],
				'stylesComponent'          => [ AccordionModule::class, 'module_styles' ],
				'classnamesFunction'       => [ AccordionModule::class, 'module_classnames' ],
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
}
