<?php
/**
 * Module Library: Accordion Module
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Accordion;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;

/**
 * AccordionModule class.
 *
 * This class implements the functionality of an accordion component in a
 * frontend application. It provides functions for rendering the accordion,
 * managing REST API endpoints, and other related tasks.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 *
 * @see DependencyInterface
 */
class AccordionModule implements DependencyInterface {

	use AccordionTraits\ModuleClassnamesTrait;
	use AccordionTraits\ModuleScriptDataTrait;
	use AccordionTraits\RenderCallbackTrait;
	use AccordionTraits\ModuleStylesTrait;
	use AccordionTraits\StyleDeclarationTrait;
	use AccordionTraits\CustomCssTrait;

	/**
	 * Load an accordion module and register the render callback and REST API endpoints.
	 *
	 * This function registers the accordion module and adds a render callback for it. The accordion module
	 * JSON folder path is determined using the `dirname()` function and the `__DIR__` constant to get the
	 * current file's directory path. It then adds an action to the 'init' hook to register the module and
	 * set the render callback to the `AccordionModule::render_callback` method.
	 *
	 * @since ??
	 *
	 * @return void
	 */
	public function load(): void {
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/accordion/';

		ModuleRegistration::register_module(
			$module_json_folder_path,
			[
				'render_callback' => [ AccordionModule::class, 'render_callback' ],
			]
		);
	}

}
