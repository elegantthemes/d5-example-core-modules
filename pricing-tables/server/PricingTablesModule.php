<?php
/**
 * ModuleLibrary: Pricing Tables Module class.
 *
 * @package Builder\Packages\ModuleLibrary\PricingTablesModule
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\PricingTables;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\ModuleLibrary\PricingTables\PricingTablesTrait;

/**
 * `PricingTablesModule` is consisted of functions used for Pricing Tables Module such as Front-End rendering, REST API Endpoints etc.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 */
class PricingTablesModule implements DependencyInterface {

	use PricingTablesTrait\ModuleClassnamesTrait;
	use PricingTablesTrait\ModuleScriptDataTrait;
	use PricingTablesTrait\ModuleStylesTrait;
	use PricingTablesTrait\RenderCallbackTrait;
	use PricingTablesTrait\GetFeaturedPricingTablesClassname;

	/**
	 * Loads `PricingTablesModule` and registers Front-End render callback and REST API Endpoints.
	 *
	 * @since ??
	 *
	 * @return void
	 */
	public function load() {
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/pricing-tables/';

		add_action(
			'init',
			function() use ( $module_json_folder_path ) {
				ModuleRegistration::register_module(
					$module_json_folder_path,
					[
						'render_callback' => [ PricingTablesModule::class, 'render_callback' ],
					]
				);
			}
		);
	}

}
