<?php
/**
 * PricingTablesModule::module_classnames().
 *
 * @package ET\Builder\Packages\ModuleLibrary\PricingTables
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\PricingTables\PricingTablesTrait;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Packages\Module\Options\Element\ElementClassnames;

trait ModuleClassnamesTrait {

	/**
	 * Module classnames function for pricing tables module.
	 *
	 * This function is equivalent of JS function moduleClassnames located in
	 * visual-builder/packages/module-library/src/components/pricing-tables/module-classnames.ts.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *     @type object $classnamesInstance Instance of ET\Builder\Packages\Module\Layout\Components\Classnames.
	 *     @type array  $attrs              Block attributes data that being rendered.
	 *     @type array  $childrenIds        Children Ids of child modules.
	 * }
	 */
	public static function module_classnames( $args ) {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];
		$children_ids        = $args['childrenIds'];

		// Show bullet.
		$show_bullet = $attrs['content']['advanced']['showBullet']['desktop']['value'] ?? '';
		$index       = is_array( $children_ids ) ? count( $children_ids ) : 0;

		$classnames_instance->add( 'et_pb_pricing' );
		$classnames_instance->add( 'clearfix' );
		$classnames_instance->add( 'et_pb_pricing_no_bullet', 'off' === $show_bullet );
		$classnames_instance->add( 'et_pb_pricing_' . $index );

		// Module.
		$classnames_instance->add(
			ElementClassnames::classnames(
				[
					// TODO feat(D5, Module Attribute Refactor) Once link is merged as part of options property, remove this.
					'attrs' => array_merge(
						$attrs['module']['decoration'] ?? [],
						[
							'link' => $attrs['module']['advanced']['link'] ?? [],
						]
					),
				]
			)
		);
	}
}
