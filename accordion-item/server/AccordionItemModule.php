<?php
/**
 * Module Library: Accordion Item Module
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\AccordionItem;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;

/**
 * AccordionItemModule class.
 *
 * This class implements the functionality of an accordion item component in a frontend application.
 * It provides functions for rendering the accordion item, managing REST API endpoints, and other
 * related tasks.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 *
 * @see DependencyInterface
 */
class AccordionItemModule implements DependencyInterface {
	use AccordionItemTraits\ModuleClassnamesTrait;
	use AccordionItemTraits\RenderCallbackTrait;
	use AccordionItemTraits\ModuleScriptDataTrait;
	use AccordionItemTraits\ModuleStylesTrait;
	use AccordionItemTraits\CustomCssTrait;
	use AccordionItemTraits\StyleDeclarationTrait;
	use AccordionItemTraits\UtilsTrait;

	/**
	 * Loads `AccordionItem` and registers Frontend render callback and REST API Endpoints.
	 *
	 * This function loads the `AccordionItem` module from the module library and registers the
	 * necessary callbacks and endpoints for frontend rendering and REST API integration.
	 *
	 * @since ??
	 *
	 * @return void
	 */
	public function load(): void {
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/accordion-item/';

		ModuleRegistration::register_module(
			$module_json_folder_path,
			[
				'render_callback' => [ AccordionItemModule::class, 'render_callback' ],
			]
		);
	}
}
