<?php
/**
 * BlogModule::module_classnames().
 *
 * @package Builder\Packages\ModuleLibrary
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Blog\BlogModuleTraits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Packages\Module\Options\Element\ElementClassnames;
use ET\Builder\Packages\Module\Options\Text\TextClassnames;

trait ModuleClassnamesTrait {

	/**
	 * Module classnames function for call to action module.
	 *
	 * This function is equivalent of JS function moduleClassnames located in
	 * visual-builder/packages/module-library/src/components/blog/module-classnames.ts.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *     @type object $classnamesInstance Instance of ET\Builder\Packages\Module\Layout\Components\Classnames.
	 *     @type array  $attrs              Block attributes data that being rendered.
	 * }
	 */
	public static function module_classnames( $args ) {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];

		$fullwidth = $attrs['fullwidth']['advanced']['enable']['desktop']['value'] ?? 'on';

		$classnames_instance->add( TextClassnames::text_options_classnames( $attrs['module']['advanced']['text'] ?? [] ), true );

		if ( 'on' === $fullwidth ) {
			$classnames_instance->add( 'et_pb_posts', true );
		} else {
			$classnames_instance->add( 'et_pb_blog_grid_wrapper', true );
		}

		// Module.
		$classnames_instance->add(
			ElementClassnames::classnames(
				[
					'attrs' => array_merge(
						$attrs['module']['decoration'] ?? [],
						[
							'border' => $attrs['post']['decoration']['border'] ?? $attrs['fullwidth']['decoration']['border'] ?? [],
							'link'   => $attrs['module']['advanced']['link'] ?? [],
						]
					),
				]
			)
		);
	}

}
