<?php
/**
 * Module Library: Accordion Item Module Render Callback Trait
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\AccordionItem\AccordionItemTraits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- WP use snakeCase in \WP_Block_Parser_Block

use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\ModuleLibrary\AccordionItem\AccordionItemModule;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use WP_Block;

trait RenderCallbackTrait {

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
		$parent               = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );
		$default_parent_attrs = ModuleRegistration::get_default_attrs( 'divi/accordion' );
		$parent_attrs         = array_replace_recursive( $default_parent_attrs, $parent->attrs ?? [] );

		$heading_level = AccordionItemModule::get_heading_level( $attrs, $parent_attrs );

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

				'stylesComponent'          => [ AccordionItemModule::class, 'module_styles' ],
				'classnamesFunction'       => [ AccordionItemModule::class, 'module_classnames' ],
				'scriptDataComponent'      => [ AccordionItemModule::class, 'module_script_data' ],

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
}
