<?php
/**
 * Trait AttrsFilterTrait.
 *
 * @package ET\Builder\Packages\ModuleLibrary\PricingTablesItem
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\PricingTablesItem\PricingTablesItemTrait;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Packages\ModuleUtils\ModuleUtils;

trait AttrsFilterTrait {

	/**
	 * Filters the button.decoration attributes.
	 *
	 * This function is equivalent of JS function filterButtonDecorationAttrs located in
	 * visual-builder/packages/module-library/src/components/pricing-table/attrs-filter/filter-button-decoration-attrs/index.ts.
	 *
	 * @since ??
	 *
	 * @param array  $decoration_attrs   The original decoration attributes.
	 * @param array  $parent_button_attr The attributes of the parent button module.
	 *
	 * @return array The filtered decoration attributes.
	 */
	public static function filter_button_decoration_attrs( array $decoration_attrs, array $parent_button_attr ): array {
		$button_attr  = $decoration_attrs['button'] ?? [];
		$button_attrs = $button_attr ?? [];

		// Iterate through each `attrState` for every `attrBreakpoint` in the `button_attr` object.
		foreach ( $button_attr as $attr_breakpoint => $attr_state_values ) {
			foreach ( $attr_state_values as $attr_state => $value ) {
				if ( ! array_key_exists( $attr_breakpoint, $button_attrs ) ) {
					$button_attrs[ $attr_breakpoint ] = [];
				}

				if ( ! array_key_exists( $attr_state, $button_attrs[ $attr_breakpoint ] ) ) {
					$button_attrs[ $attr_breakpoint ][ $attr_state ] = [];
				}

				$icon_settings_attr = ModuleUtils::get_attr_value(
					[
						'attr'       => $button_attrs,
						'state'      => $attr_state,
						'breakpoint' => $attr_breakpoint,
					]
				);
				// Attribute icon.enable is desktop only.
				$enabled       = $button_attrs['desktop']['value']['icon']['enable'] ?? '';
				$icon_settings = $icon_settings_attr['icon']['settings'] ?? [];

				// If the settings key is not present into icon array which means icon is not set.
				if ( ! array_key_exists( 'settings', $button_attrs[ $attr_breakpoint ][ $attr_state ]['icon'] ) ) {
					$button_attrs[ $attr_breakpoint ][ $attr_state ]['icon']['settings'] = [];
				}

				// If icon.enable is on for child pricing table and
				// icon.settings is undefined which means icon is not set for child pricing table
				// Then only merge the parent button icon attrs into child.
				if ( 'on' === $enabled && empty( $icon_settings ) ) {
					$button_attrs[ $attr_breakpoint ][ $attr_state ]['icon']['settings'] = $parent_button_attr['icon']['settings'];
				}
			}
		}

		return array_merge(
			$decoration_attrs,
			[
				'button' => $button_attrs,
			]
		);
	}
}
