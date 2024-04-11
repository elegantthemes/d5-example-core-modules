<?php
/**
 * Module Library: Blurb Module Class Names Trait
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Blurb\BlurbModuleTraits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Packages\Module\Options\Element\ElementClassnames;
use ET\Builder\Packages\Module\Options\Text\TextClassnames;

trait ModuleClassnamesTrait {

	/**
	 * Generate classnames for the module.
	 *
	 * This function generates classnames for the module based on the provided
	 * arguments. It is used in the `render_callback` function of the Blurb module.
	 *
	 * This function is equivalent to the JavaScript constant
	 * {@link /docs/builder-api/js/module-library/module-classnames moduleClassnames}
	 * located in `@divi/module-library`.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *     @type object $classnamesInstance Module classnames instance.
	 *     @type array  $attrs              Block attributes data for rendering the module.
	 * }
	 *
	 * @return void
	 *
	 * @example
	 * ```php
	 * $args = [
	 *   'classnamesInstance' => $classnamesInstance,
	 *   'attrs' => $attrs,
	 * ];
	 *
	 * BlurbModule::module_classnames($args);
	 * ```
	 */
	public static function module_classnames( array $args ): void {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];

		$classnames_instance->add( TextClassnames::text_options_classnames( $attrs['module']['advanced']['text'] ?? [] ), true );

		$image_icon_placement = $attrs['imageIcon']['advanced']['placement']['desktop']['value'] ?? 'top';
		$classnames_instance->add( 'et_pb_blurb_position_' . $image_icon_placement, true );

		// Module.
		$classnames_instance->add(
			ElementClassnames::classnames(
				[
					'attrs' => array_merge(
						$attrs['module']['decoration'] ?? [],
						[
							'border' => array_merge(
								$attrs['module']['decoration']['border'] ?? [],
								$attrs['imageIcon']['decoration']['border'] ?? []
							),
							'link'   => $attrs['module']['advanced']['link'] ?? [],
						]
					),
				]
			)
		);
	}

}
