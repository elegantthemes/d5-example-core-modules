<?php
/**
 * ModuleLibrary: Pricing Table Module class.
 *
 * @package Builder\Packages\ModuleLibrary\PricingTablesItemModule
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\PricingTablesItem;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\ModuleLibrary\PricingTablesItem\PricingTablesItemTrait;

/**
 * `PricingTablesItemModule` is consisted of functions used for Pricing Table Module such as Front-End rendering, REST API Endpoints etc.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 */
class PricingTablesItemModule implements DependencyInterface {

	use PricingTablesItemTrait\ModuleClassnamesTrait;
	use PricingTablesItemTrait\ModuleScriptDataTrait;
	use PricingTablesItemTrait\ModuleStylesTrait;
	use PricingTablesItemTrait\RenderCallbackTrait;
	use PricingTablesItemTrait\AttrsFilterTrait;

	/**
	 * Loads `PricingTablesItemModule` and registers Front-End render callback and REST API Endpoints.
	 *
	 * @since ??
	 *
	 * @return void
	 */
	public function load() {
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/pricing-table/';

		add_action(
			'init',
			function() use ( $module_json_folder_path ) {
				ModuleRegistration::register_module(
					$module_json_folder_path,
					[
						'render_callback' => [ PricingTablesItemModule::class, 'render_callback' ],
					]
				);
			}
		);
	}
}
