<?php
/**
 * Module Library: Accordion Item Module Custom CSS Trait
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\AccordionItem\AccordionItemTraits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use WP_Block_Type_Registry;

trait CustomCssTrait {

	/**
	 * Get the custom CSS fields for the Divi Accordion Item module.
	 *
	 * This function retrieves the custom CSS fields defined for the Divi
	 * accordion item module.
	 *
	 * This function is equivalent to the JavaScript constant
	 * {@link /docs/builder-api/js/module-library/generate-default-attrs cssFields}
	 * located in `@divi/module-library`. Note that this function does not have
	 * a `label` property on each array item, unlike the JS const cssFields.
	 *
	 * @since ??
	 *
	 * @return array An array of custom CSS fields for the Divi accordion item module.
	 *
	 * @example
	 * ```php
	 * $customCssFields = CustomCssTrait::custom_css();
	 * // Returns an array of custom CSS fields for the accordion item module.
	 * ```
	 */
	public static function custom_css(): array {
		return WP_Block_Type_Registry::get_instance()->get_registered( 'divi/accordion-item' )->customCssFields;
	}
}
