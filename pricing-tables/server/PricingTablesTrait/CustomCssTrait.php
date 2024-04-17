<?php
/**
 * PricingTablesModule::custom_css().
 *
 * @package ET\Builder\Packages\ModuleLibrary\PricingTables
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\PricingTables\PricingTablesTrait;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

trait CustomCssTrait {

	/**
	 * Custom CSS fields
	 *
	 * This function is equivalent of JS const cssFields located in
	 * visual-builder/packages/module-library/src/components/pricing-tables/custom-css.ts.
	 *
	 * A minor difference with the JS const cssFields, this function did not have `label` property on each array item.
	 *
	 * @since ??
	 */
	public static function custom_css() {
		return \WP_Block_Type_Registry::get_instance()->get_registered( 'divi/pricing-tables' )->customCssFields;
	}

}
