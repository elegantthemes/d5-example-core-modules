<?php
/**
 * Module Library: Blurb Module Render Callback Trait
 *
 * @package Divi
 *
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Blurb\BlurbModuleTraits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- WP use snakeCase in \WP_Block_Parser_Block

use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\Packages\IconLibrary\IconFont\Utils;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\BoxShadow\BoxShadowClassnames;
use ET\Builder\Packages\ModuleLibrary\Blurb\BlurbModule;
use ET\Builder\Packages\ModuleUtils\ModuleUtils;
use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use Exception;
use WP_Block;

trait RenderCallbackTrait {

	/**
	 * Render callback for the Blurb module.
	 *
	 * This function is responsible for rendering the server-side HTML of the module on the frontend.
	 *
	 * This function is equivalent to the JavaScript function
	 * {@link /docs/builder-api/js/module-library/ BlurbEdit}
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
	 * @throws Exception If the `imageIcon` attribute is not set.
	 *
	 * return string The HTML rendered output of the Blurb module.
	 *
	 * @example
	 * ```php
	 * $attrs = [
	 *   'attrName' => 'value',
	 *   //...
	 * ];
	 * $content = 'The block content.';
	 * $block = new WP_Block();
	 * $elements = new ModuleElements();
	 *
	 * BlurbModule::render_callback( $attrs, $content, $block, $elements, $default_printed_style_attrs );
	 * ```
	 */
	public static function render_callback( array $attrs, string $content, WP_Block $block, ModuleElements $elements, array $default_printed_style_attrs ): string {
		$has_image_src = ModuleUtils::has_value(
			$attrs['imageIcon']['innerContent'] ?? [],
			[
				'valueResolver' => function ( $value ) {
					return ! empty( $value['src'] );
				},
			]
		);

		$use_icon          = $attrs['imageIcon']['innerContent']['desktop']['value']['useIcon'] ?? 'off';
		$animation_desktop = $attrs['imageIcon']['innerContent']['desktop']['value']['animation'] ?? 'top';
		$animation_tablet  = $attrs['imageIcon']['innerContent']['tablet']['value']['animation'] ?? $animation_desktop;
		$animation_phone   = $attrs['imageIcon']['innerContent']['phone']['value']['animation'] ?? $animation_tablet;

		// Icon.
		$is_icon_enabled = 'on' === $use_icon;
		$icon_value      = Utils::process_font_icon( $attrs['imageIcon']['innerContent']['desktop']['value']['icon'] ?? [] );
		$icon            = ! empty( $icon_value ) ? HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class' => 'et_pb_image_wrap',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => HTMLUtility::render(
					[
						'tag'        => 'span',
						'attributes' => [
							'class' => HTMLUtility::classnames(
								[
									'et-pb-icon'  => true,
									'et-waypoint' => true,
									"et_pb_animation_{$animation_desktop}" => ! empty( $animation_desktop ),
									"et_pb_animation_{$animation_tablet}_tablet" => ! empty( $animation_tablet ),
									"et_pb_animation_{$animation_phone}_phone" => ! empty( $animation_phone ),
								]
							),
						],
						'children'   => $icon_value,
					]
				),
			]
		) : '';

		// Image.
		$image_src = $attrs['imageIcon']['innerContent']['desktop']['value']['src'] ?? '';
		$image_alt = $attrs['imageIcon']['innerContent']['desktop']['value']['alt'] ?? '';
		$image     = ! $is_icon_enabled && $has_image_src ? HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class' => HTMLUtility::classnames(
						[
							'et_pb_image_wrap'           => true,
							'et_pb_only_image_mode_wrap' => true,
						],
						BoxShadowClassnames::has_overlay( $attrs['imageIcon']['decoration']['boxShadow'] ?? [] )
					),
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => [
					$elements->style_components(
						[
							'attrName' => 'imageIcon',
						]
					),
					HTMLUtility::render(
						[
							'tag'        => 'img',
							'attributes' => [
								'src'   => $image_src,
								'alt'   => $image_alt,
								'class' => HTMLUtility::classnames(
									[
										'et-waypoint' => true,
										"et_pb_animation_{$animation_desktop}" => ! empty( $animation_desktop ),
										"et_pb_animation_{$animation_tablet}_tablet" => ! empty( $animation_tablet ),
										"et_pb_animation_{$animation_phone}_phone" => ! empty( $animation_phone ),
									]
								),
							],
						]
					),
				],
			]
		) : '';

		// Image/Icon Container.
		$image_or_icon   = $is_icon_enabled ? $icon : $image;
		$image_container = ! empty( $image_or_icon ) ? HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class' => 'et_pb_main_blurb_image',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $image_or_icon,
			]
		) : '';

		// Image/Icon Link.
		$title_link        = $attrs['title']['innerContent']['desktop']['value']['url'] ?? '';
		$title_link_target = $attrs['title']['innerContent']['desktop']['value']['target'] ?? '';
		$image_icon_link   = ! empty( $title_link ) && ! empty( $image_container ) ? HTMLUtility::render(
			[
				'tag'               => 'a',
				'attributes'        => [
					'href'   => $title_link,
					'target' => $title_link_target,
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $image_container,
			]
		) : $image_container;

		// Title.
		// TODO feat(D5, Refactor) title can have link inside of it.
		$header = $elements->render(
			[
				'attrName' => 'title',
			]
		);

		// Content.
		$content = $elements->render(
			[
				'attrName' => 'content',
			]
		);

		// Header + Content.
		$header_n_content = HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class' => 'et_pb_blurb_container',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $header . $content,
			]
		);

		$parent = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );

		return Module::render(
			[
				// FE only.
				'orderIndex'          => $block->parsed_block['orderIndex'],
				'storeInstance'       => $block->parsed_block['storeInstance'],

				// VB equivalent.
				'attrs'               => $attrs,
				'id'                  => $block->parsed_block['id'],
				'elements'            => $elements,
				'name'                => $block->block_type->name,
				'classnamesFunction'  => [ BlurbModule::class, 'module_classnames' ],
				'moduleCategory'      => $block->block_type->category,
				'stylesComponent'     => [ BlurbModule::class, 'module_styles' ],
				'scriptDataComponent' => [ BlurbModule::class, 'module_script_data' ],
				'parentAttrs'         => $parent->attrs ?? [],
				'parentId'            => $parent->id ?? '',
				'parentName'          => $parent->blockName ?? '',
				'children'            => $elements->style_components(
					[
						'attrName' => 'module',
					]
				) . $elements->render(
					[
						'attrName' => 'contentContainer',
						'children' => [
							$image_icon_link,
							$header_n_content,
						],
					]
				),
			]
		);
	}

}
