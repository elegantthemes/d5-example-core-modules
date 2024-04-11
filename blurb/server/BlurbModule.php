<?php
/**
 * Module Library: Blurb Module
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Blurb;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;

/**
 * BlurbModule class.
 *
 * This class implements the functionality of a blurb component in a frontend
 * application. It provides functions for rendering the blurb, managing REST API
 * endpoints, and other related tasks.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 *
 * @see DependencyInterface
 */
class BlurbModule implements DependencyInterface {

	use BlurbModuleTraits\ModuleClassnamesTrait;
	use BlurbModuleTraits\ModuleScriptDataTrait;
	use BlurbModuleTraits\ModuleStylesTrait;
	use BlurbModuleTraits\RenderCallbackTrait;

	/**
	 * Load the Blurb Module.
	 *
	 * This function is responsible for loading the BlurbModule and registering the necessary
	 * callbacks and endpoints for front-end rendering and REST API integration. It retrieves
	 * the path of the BlurbModule JSON folder and uses it to register the module with the
	 * ModuleRegistration class. The module is registered with the specified render callback
	 * function, which is a method within the BlurbModule class.
	 *
	 * @since ??
	 *
	 * @return void
	 *
	 * @example
	 * ```php
	 * $module_loader = new BlurbModule();
	 * $module_loader->load();
	 * ```
	 */
	public function load(): void {
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/blurb/';

		ModuleRegistration::register_module(
			$module_json_folder_path,
			[
				'render_callback' => [ BlurbModule::class, 'render_callback' ],
			]
		);
	}

}
