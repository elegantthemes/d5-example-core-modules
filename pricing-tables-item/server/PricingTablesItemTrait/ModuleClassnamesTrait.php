<?php
/**
 * PricingTablesItemModule::module_classnames().
 *
 * @package ET\Builder\Packages\ModuleLibrary\PricingTablesItem
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\PricingTablesItem\PricingTablesItemTrait;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

trait ModuleClassnamesTrait {

	/**
	 * Module classnames function for pricing table module.
	 *
	 * This function is equivalent of JS function moduleClassnames located in
	 * visual-builder/packages/module-library/src/components/pricing-table/module-classnames.ts.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *     @type object  $classnamesInstance Instance of ET\Builder\Packages\Module\Layout\Components\Classnames.
	 *     @type array   $attrs              Block attributes data that being rendered.
	 *     @type boolean $isFirst            Is the child element the first element.
	 * }
	 */
	public static function module_classnames( $args ) {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];

		// Featured Table.
		$featured = $attrs['module']['advanced']['featured']['desktop']['value'] ?? '';

		$classnames_instance->add( 'et_pb_featured_table', 'on' === $featured );
	}
}
