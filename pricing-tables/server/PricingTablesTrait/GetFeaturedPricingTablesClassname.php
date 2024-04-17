<?php
/**
 * PricingTablesModule::get_featured_pricing_tables_classname().
 *
 * @package Builder\Packages\ModuleLibrary
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\PricingTables\PricingTablesTrait;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\FrontEnd\BlockParser\BlockParserStore;

trait GetFeaturedPricingTablesClassname {

	/**
	 * Get featured pricing tables classname based on given childrenIds and its featured status.
	 *
	 * This function is equivalent to the JS function
	 * /pricing-tables/utils/get-featured-pricing-tables-classname/index.ts
	 *
	 * @since ??
	 *
	 * @param array $children_ids    Children ids.
	 * @param int   $store_instance  Store instance.
	 *
	 * @return string Classname based upon featured status of children.
	 */
	public static function get_featured_pricing_tables_classname( array $children_ids, int $store_instance ):string {

		$featured_pricing_tables = [];

		// If child pricing table module has featured on then add it into $featured_pricing_tables array.
		foreach ( $children_ids as $key => $module_id ) {
			$current  = BlockParserStore::get( $module_id, $store_instance );
			$featured = strtolower( $current->attrs['module']['advanced']['featured']['desktop']['value'] ?? 'off' );
			array_push( $featured_pricing_tables, $featured );
		}

		$total_featured_pricing_tables = isset( $featured_pricing_tables ) && count( $featured_pricing_tables ) > 4 ? 4 : count( $featured_pricing_tables );
		for ( $i = 0; $i < $total_featured_pricing_tables; $i++ ) {
			if ( 'on' === $featured_pricing_tables[ $i ] ) {
				switch ( $i ) {
					case 0:
						return '';
					case 1:
						return 'et_pb_second_featured';
					case 2:
						return 'et_pb_third_featured';
					case 3:
						return 'et_pb_fourth_featured';
					default:
						return 'et_pb_no_featured_in_first_row';
				}
			}
		}

		return 'et_pb_no_featured_in_first_row';
	}

}
