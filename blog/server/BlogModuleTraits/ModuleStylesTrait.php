<?php
/**
 * BlogModule::module_styles().
 *
 * @package Builder\Packages\ModuleLibrary
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Blog\BlogModuleTraits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Options\Text\TextStyle;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\Module\Layout\Components\StyleCommon\CommonStyle;

trait ModuleStylesTrait {

	use CustomCssTrait;
	use StyleDeclarationTrait;

	/**
	 * Blog Module's style components.
	 *
	 * This function is equivalent of JS function ModuleStyles located in
	 * visual-builder/packages/module-library/src/components/cta/styles.tsx.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *      @type string $id                Module ID. In VB, the ID of module is UUIDV4. In FE, the ID is order index.
	 *      @type string $name              Module name.
	 *      @type string $attrs             Module attributes.
	 *      @type string $parentAttrs       Parent attrs.
	 *      @type string $orderClass        Selector class name.
	 *      @type string $parentOrderClass  Parent selector class name.
	 *      @type string $wrapperOrderClass Wrapper selector class name.
	 *      @type string $settings          Custom settings.
	 *      @type string $state             Attributes state.
	 *      @type string $mode              Style mode.
	 * }
	 */
	public static function module_styles( $args ) {
		$attrs    = $args['attrs'] ?? [];
		$elements = $args['elements'];
		$settings = $args['settings'] ?? [];

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
								'disabledOn' => [
									'disabledModuleVisibility' => $settings['disabledModuleVisibility'] ?? null,
								],
							],
						]
					),
					TextStyle::style(
						[
							'selector' => $args['orderClass'],
							'attr'     => $attrs['module']['advanced']['text'] ?? [],
						]
					),
					CssStyle::style(
						[
							'selector'  => $args['orderClass'],
							'attr'      => $attrs['css'] ?? [],
							'cssFields' => self::custom_css(),
						]
					),

					// Image.
					$elements->style(
						[
							'attrName' => 'image',
						]
					),

					CommonStyle::style(
						[
							'selector'            => "{$args['orderClass']} .et_pb_post .entry-featured-image-url, {$args['orderClass']} .et_pb_post .et_pb_slides, {$args['orderClass']} .et_pb_post .et_pb_video_overlay",
							'attr'                => $attrs['image']['decoration']['border'] ?? [],
							'declarationFunction' => [ self::class, 'border_style_declaration' ],
						]
					),

					// Title.
					$elements->style(
						[
							'attrName' => 'title',
						]
					),

					// Meta.
					$elements->style(
						[
							'attrName' => 'meta',
						]
					),

					// Content.
					$elements->style(
						[
							'attrName' => 'content',
						]
					),

					// Read more.
					$elements->style(
						[
							'attrName' => 'readMore',
						]
					),

					// Post Item.
					$elements->style(
						[
							'attrName' => 'post',
						]
					),
					CommonStyle::style(
						[
							'selector'            => "{$args['orderClass']} .et_pb_post",
							'attr'                => $attrs['post']['decoration']['border'] ?? [],
							'declarationFunction' => [ self::class, 'border_style_declaration' ],
						]
					),

					// Fullwidth.
					$elements->style(
						[
							'attrName' => 'fullwidth',
						]
					),
					CommonStyle::style(
						[
							'selector'            => "{$args['orderClass']}:not(.et_pb_blog_grid_wrapper) .et_pb_post",
							'attr'                => $attrs['fullwidth']['decoration']['border'] ?? [],
							'declarationFunction' => [ self::class, 'border_style_declaration' ],
						]
					),

					// Overlay.
					$elements->style(
						[
							'attrName' => 'overlay',
						]
					),

					// Overlay Icon.
					$elements->style(
						[
							'attrName' => 'overlayIcon',
						]
					),

					// Masonry.
					$elements->style(
						[
							'attrName' => 'masonry',
						]
					),

					// Pagination.
					$elements->style(
						[
							'attrName' => 'pagination',
						]
					),
				],
			]
		);
	}

}
