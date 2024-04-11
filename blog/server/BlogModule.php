<?php
/**
 * ModuleLibrary: Blog Module class.
 *
 * @package Builder\ModuleLibrary\BlogModule
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Blog;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\ModuleLibrary\Blog\BlogModuleTraits;
use ET\Builder\FrontEnd\Module\Script;

/**
 * `BlogModule` is consisted of functions used for Blog Module such as Front-End rendering, REST API Endpoints etc.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 */
class BlogModule implements DependencyInterface {

	use BlogModuleTraits\ModuleStylesTrait;
	use BlogModuleTraits\ModuleClassnamesTrait;
	use BlogModuleTraits\ModuleScriptDataTrait;
	use BlogModuleTraits\RenderCallbackTrait;
	use BlogModuleTraits\RenderPaginationTrait;
	use BlogModuleTraits\RenderMetaTrait;
	use BlogModuleTraits\RenderContentTrait;

	/**
	 * Loads `BlogModule` and registers Front-End render callback and REST API Endpoints.
	 *
	 * @return void
	 */
	public function load() {
		// phpcs:ignore PHPCompatibility.FunctionUse.NewFunctionParameters.dirname_levelsFound -- We have PHP 7 support now, This can be deleted once PHPCS config is updated.
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/blog/';


		ModuleRegistration::register_module(
			$module_json_folder_path,
			[
				'render_callback' => [ BlogModule::class, 'render_callback' ],
			]
		);

		Script::register(
			[
				'handle'    => 'divi-module-library-script-blog',
				'src'       => ET_BUILDER_5_URI . '/visual-builder/build/module-library-script-blog.js',
				'deps'      => [ 'salvattore' ],
				'module'    => [ 'divi/blog' ],
				'ver'       => ET_CORE_VERSION,
				'in_footer' => true,
			]
		);
	}

}
