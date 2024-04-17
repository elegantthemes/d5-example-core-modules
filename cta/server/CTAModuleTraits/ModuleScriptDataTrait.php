<?php
/**
 * Module Library: CTA Module Script Data Trait
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\CTA\CTAModuleTraits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewScriptData;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewUtils;

trait ModuleScriptDataTrait {

	/**
	 * CTA module script data.
	 *
	 * This function assigns variables and sets script data options for the module.
	 *
	 * This function is equivalent to the JavaScript function
	 * {@link /docs/builder-api/js/module-library/generate-default-attrs ModuleScriptData}
	 * located in `@divi/module-library`.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     Optional. An array of arguments for setting the module script data.
	 *
	 *     @type string         $id            The module ID.
	 *     @type string         $name          The module name.
	 *     @type string         $selector      The module selector.
	 *     @type array          $attrs         The module attributes.
	 *     @type int            $storeInstance The ID of the instance where this block is stored in the `BlockParserStore` class.
	 *     @type ModuleElements $elements      The `ModuleElements` instance.
	 * }
	 *
	 * @return void
	 *
	 * @example:
	 * ```php
	 * // Generate the script data for a module with specific arguments.
	 * $args = array(
	 *     'id'             => 'my-module',
	 *     'name'           => 'My Module',
	 *     'selector'       => '.my-module',
	 *     'attrs'          => array(
	 *         'portfolio' => array(
	 *             'advanced' => array(
	 *                 'showTitle'       => false,
	 *                 'showCategories'  => true,
	 *                 'showPagination' => true,
	 *             )
	 *         )
	 *     ),
	 *     'elements'       => $elements,
	 *     'store_instance' => 123,
	 * );
	 *
	 * CTA::module_script_data( $args );
	 * ```
	 */
	public static function module_script_data( array $args ): void {
		// Assign variables.
		$id             = $args['id'] ?? '';
		$name           = $args['name'] ?? '';
		$selector       = $args['selector'] ?? '';
		$attrs          = $args['attrs'] ?? [];
		$elements       = $args['elements'];
		$store_instance = $args['storeInstance'] ?? null;

		// Element Script Data Options.
		$elements->script_data(
			[
				'attrName' => 'module',
			]
		);

		MultiViewScriptData::set(
			[
				'id'            => $id,
				'name'          => $name,
				'storeInstance' => $store_instance,
				'hoverSelector' => $selector,
				'setContent'    => [
					[
						'selector'      => $selector . ' .et_pb_module_header',
						'data'          => $attrs['title']['innerContent'] ?? [],
						'valueResolver' => function( $value ) {
							return $value ?? '';
						},
					],
					[
						'selector'      => $selector . ' .et_pb_promo_description > div:nth-child(2)',
						'data'          => $attrs['content']['innerContent'] ?? [],
						'valueResolver' => function( $value ) {
							return $value ?? '';
						},
						'sanitizer'     => 'et_core_esc_previously',
					],
					[
						'selector'      => $selector . ' .et_pb_promo_button',
						'data'          => $attrs['button']['innerContent'] ?? [],
						'valueResolver' => function( $value ) {
							return $value['text'] ?? '';
						},
					],
				],
				'setVisibility' => [
					[
						'selector'      => $selector . ' .et_pb_promo_description',
						'data'          => MultiViewUtils::merge_values(
							[
								'title'   => $attrs['title']['innerContent'] ?? [],
								'content' => $attrs['content']['innerContent'] ?? [],
							]
						),
						'valueResolver' => function ( $value ) {
							return '' !== ( $value['title'] ?? '' ) || '' !== ( $value['content'] ?? '' ) ? 'visible' : 'hidden';
						},
					],
					[
						'selector'      => $selector . ' .et_pb_promo_button',
						'data'          => $attrs['button']['innerContent'] ?? [],
						'valueResolver' => function ( $value ) {
							return '' !== ( $value['text'] ?? '' ) ? 'visible' : 'hidden';
						},
					],
				],
			]
		);
	}

}
