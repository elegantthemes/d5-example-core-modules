<?php
/**
 * Module Library: CTA Module
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\CTA;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\ModuleLibrary\CTA\CTAModuleTraits;

/**
 * CTAModule class.
 *
 * This class implements the functionality of a call-to-action component in a
 * frontend application. It provides functions for rendering the CTA, managing
 * REST API endpoints, and other related tasks.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 *
 * @see DependencyInterface
 */
class CTAModule implements DependencyInterface {

	use CTAModuleTraits\RenderCallbackTrait;
	use CTAModuleTraits\ModuleClassnamesTrait;
	use CTAModuleTraits\ModuleScriptDataTrait;
	use CTAModuleTraits\ModuleStylesTrait;

	/**
	 * Loads `CTAModule` and registers Front-End render callback and REST API Endpoints.
	 *
	 * @since ??
	 *
	 * @return void
	 */
	public function load(): void {
		// phpcs:ignore PHPCompatibility.FunctionUse.NewFunctionParameters.dirname_levelsFound -- We have PHP 7 support now, This can be deleted once PHPCS config is updated.
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/cta/';

		add_action(
			'init',
			function() use ( $module_json_folder_path ) {
				ModuleRegistration::register_module(
					$module_json_folder_path,
					[
						'render_callback' => [ CTAModule::class, 'render_callback' ],
					]
				);
			}
		);
	}

}
