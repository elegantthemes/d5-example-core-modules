<?php
/**
 * Module Library: Blurb Module Styles Trait
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Blurb\BlurbModuleTraits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\FrontEnd\Module\Style;

trait ModuleStylesTrait {

	use CustomCssTrait;
	use StyleDeclarationTrait;

	/**
	 * Get the style components for the Blurb Module.
	 *
	 * This function is equivalent to the JavaScript constant
	 * {@link /docs/builder-api/js/module-library/module-styles moduleStyles}
	 * located in `@divi/module-library`.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *     @type string $id                The ID of the module. In VB, the ID of module is UUIDV4. In FE, the ID is order index.
	 *     @type string $name              The name of the module.
	 *     @type string $attrs             The attributes of the module.
	 *     @type string $parentAttrs       The parent attributes.
	 *     @type string $orderClass        The selector class name.
	 *     @type string $parentOrderClass  The parent selector class name.
	 *     @type string $wrapperOrderClass The wrapper selector class name.
	 *     @type string $settings          The custom settings.
	 *     @type string $state             The attributes state.
	 *     @type string $mode              The style mode.
	 * }
	 *
	 * @return void
	 *
	 * @example
	 * ```php
	 * $module_styles = MyClass::getModuleStyles([
	 *   'id' => '1234',
	 *   'name' => 'My Module',
	 *   'attrs' => '',
	 *   'parentAttrs' => '',
	 *   'orderClass' => 'module-class',
	 *   'parentOrderClass' => 'parent-class',
	 *   'wrapperOrderClass' => 'wrapper-class',
	 *   'settings' => '',
	 *   'state' => '',
	 *   'mode' => 'default',
	 * ]);
	 * ```
	 */
	public static function module_styles( array $args ): void {
		$attrs       = $args['attrs'] ?? [];
		$elements    = $args['elements'];
		$settings    = $args['settings'] ?? [];
		$placement   = $attrs['imageIcon']['advanced']['placement']['desktop']['value'] ?? '';
		$order_class = $args['orderClass'];

		// In D4, image alignment is used only when placement is top.
		$image_alignment = ( empty( $placement ) || 'top' === $placement ) ? [
			'selector'            => "{$args['orderClass']} .et_pb_main_blurb_image .et_pb_image_wrap",
			'attr'                => $attrs['imageIcon']['advanced']['alignment'] ?? [],
			'declarationFunction' => [ self::class, 'image_alignment_style_declaration' ],
		] : [];

		// In D4, only one of them should be rendered. Render icon font-size if icon is
		// used. Otherwise, render image max-width.
		$icon_width = 'on' === $attrs['imageIcon']['innerContent']['desktop']['value']['useIcon']
			? [
				'selector'            => "{$args['orderClass']} .et-pb-icon",
				'attr'                => $attrs['imageIcon']['advanced']['width'] ?? [],
				'declarationFunction' => [ self::class, 'icon_width_style_declaration' ],
			]
			: [
				'selector'            => "{$args['orderClass']} .et_pb_main_blurb_image .et_pb_image_wrap",
				'attr'                => $attrs['imageIcon']['advanced']['width'] ?? [],
				'declarationFunction' => [ self::class, 'image_width_style_declaration' ],
			];

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
								'disabledOn'     => [
									'disabledModuleVisibility' => $settings['disabledModuleVisibility'] ?? null,
								],
								'advancedStyles' => [
									[
										'componentName' => 'divi/text',
										'props'         => [
											'attr' => $attrs['module']['advanced']['text'] ?? [],
										],
									],
									[
										'componentName' => 'divi/css',
										'props'         => [
											'attr'      => $attrs['css'] ?? [],
											'cssFields' => self::custom_css(),
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'attr' => $attrs['module']['decoration']['border'] ?? [],
											'declarationFunction' => [ self::class, 'overflow_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$order_class} .et_pb_main_blurb_image .et_pb_only_image_mode_wrap, {$order_class} .et_pb_main_blurb_image .et-pb-icon",
											'attr'     => $attrs['imageIcon']['decoration']['border'] ?? [],
											'declarationFunction' => [ self::class, 'overflow_style_declaration' ],
										],
									],
								],
							],
						]
					),

					// Image Icon.
					$elements->style(
						[
							'attrName'   => 'imageIcon',
							'styleProps' => [
								// Custom Image and Image Icon Styles.
								'advancedStyles' => [
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$args['orderClass']} .et-pb-icon",
											'attr'     => $attrs['imageIcon']['advanced']['color'] ?? [],
											'property' => 'color',
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$args['orderClass']} .et-pb-icon",
											'attr'     => $attrs['imageIcon']['innerContent'] ?? [],
											'declarationFunction' => [ self::class, 'icon_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => $icon_width,
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$args['orderClass']} .et_pb_blurb_content",
											'attr'     => $attrs['imageIcon']['advanced']['alignment'] ?? [],
											'declarationFunction' => [ self::class, 'content_alignment_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => $image_alignment,
									],
								],
							],
						]
					),

					// Image.
					$elements->style(
						[
							'attrName'   => 'image',
							'styleProps' => [
								'attrs' => [
									'border'     => $attrs['image']['border'] ?? [],
									'transition' => $attrs['transition'] ?? [],
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

					// Content.
					$elements->style(
						[
							'attrName' => 'content',
						]
					),

					// Content Container.
					$elements->style(
						[
							'attrName' => 'contentContainer',
						]
					),
				],
			]
		);
	}

}
