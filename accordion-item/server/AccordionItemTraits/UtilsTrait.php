<?php
/**
 * Module Library: Accordion Item Utils Trait
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\AccordionItem\AccordionItemTraits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Packages\ModuleUtils\ModuleUtils;

trait UtilsTrait {

	/**
	 * Determine the heading level for an accordion item.
	 *
	 * This function determines the heading level for an accordion item based on the attributes provided
	 * and the attributes of its parent module. If the heading level is set in the module attributes,
	 * that value is used. If the heading level is not set in the module attributes, the function checks
	 * the heading level set in the parent module attributes. If the heading level is not set in either,
	 * the default heading level is h5.
	 *
	 * This function is equivalent to the JavaScript function
	 * {@link /docs/builder-api/js/module-library/ getHeadingLevel}
	 * located in `@divi/module-library`.
	 *
	 * @since ??
	 *
	 * @param array $attrs        Module attributes.
	 * @param array $parent_attrs Parent module attributes.
	 *
	 * @return string The heading level ('h1', 'h2', 'h3', 'h4', 'h5', 'h6').
	 *
	 * @example
	 * ```php
	 * $attrs = [];
	 * $parent_attrs = [];
	 * $heading_level = AccordionItemModule::get_heading_level($attrs, $parent_attrs);
	 *
	 * // Result: $heading_level = 'h5'
	 * ```
	 * @example: Example with heading level set in module attributes.
	 * ```php
	 * $attrs = ['title' => ['decoration' => ['font' => ['font' => [ 'desktop' => ['value' => ['headingLevel' => 'h3']]]]]]]];
	 * $parent_attrs = ['title' => ['decoration' => ['font' => ['font' => ['desktop' => ['value' => ['headingLevel' => 'h2']]]]]]];
	 * $heading_level = AccordionItemModule::get_heading_level($attrs, $parent_attrs);
	 *
	 * // Result: $heading_level = 'h3'
	 * ```
	 */
	public static function get_heading_level( array $attrs, array $parent_attrs ): string {
		$merged_attrs = ModuleUtils::merge_attrs(
			[
				'defaultAttrs' => $parent_attrs['title']['decoration']['font']['font'] ?? [],
				'attrs'        => $attrs['title']['decoration']['font']['font'] ?? [],
			]
		);

		$heading_level = $merged_attrs['desktop']['value']['headingLevel'] ?? '';

		if ( ! in_array( $heading_level, [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ], true ) ) {
			return 'h5';
		}

		return $heading_level;
	}
}
