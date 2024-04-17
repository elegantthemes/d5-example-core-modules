<?php
/**
 * PricingTablesModule: :: Style declaration functions.
 *
 * @package ET\Builder\Packages\ModuleLibrary\PricingTables
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\PricingTables\PricingTablesTrait;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;

trait StyleDeclarationTrait {

	/**
	 * Overflow style declaration if border radius is set.
	 *
	 * This function will declare overflow style for Pricing Tables module.
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array       $attrValue  The value (breakpoint > state > value) of module attribute.
	 *     @type bool|array  $important  If set to true, the CSS will be added with !important.
	 *     @type string      $returnType This is the type of value that the function will return. Can be either string or key_value_pair.
	 * }
	 *
	 * @return string
	 */
	public static function overflow_style_declaration( $params ) {
		$overflow_attr = $params['attrValue'] ?? [];

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		if ( isset( $overflow_attr['radius'] ) && ! empty( $overflow_attr['radius'] ) ) {
			$style_declarations->add( 'overflow', 'hidden' );
		}

		return $style_declarations->value;
	}

	/**
	 * Pricing Table Spacing Style Declaration.
	 *
	 * This function will declare bottom padding exclusively for the pricing table.
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array      $attrValue  The value (breakpoint > state > value) of module attribute.
	 *     @type bool|array $important  If set to true, the CSS will be added with !important.
	 *     @type string     $returnType This is the type of value that the function will return. Can be either string or key_value_pair.
	 * }
	 *
	 * @since ??
	 */
	public static function pricing_table_spacing_style_declaration( $params ) {

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		$spacing_attr = $params['attrValue'];

		if ( ! empty( $spacing_attr['padding']['bottom'] ) ) {
			$style_declarations->add( 'padding-bottom', $spacing_attr['padding']['bottom'] );
		}

		return $style_declarations->value;
	}

	/**
	 * Pricing Table Body Content Spacing Style Declaration.
	 *
	 * This function will set padding style for content in Pricing Tables Module.
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array      $attrValue  The value (breakpoint > state > value) of module attribute.
	 *     @type bool|array $important  If set to true, the CSS will be added with !important.
	 *     @type string     $returnType This is the type of value that the function will return. Can be either string or key_value_pair.
	 * }
	 *
	 * @since ??
	 */
	public static function pricing_table_body_content_spacing_style_declaration( $params ) {

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		$font_attr = $params['attrValue'];

		if (  isset( $font_attr['textAlign'] ) && 'center' === $font_attr['textAlign'] ) {
			$style_declarations->add( 'padding-left', '0px' );
		}

		return $style_declarations->value;
	}

	/**
	 * Pricing Table Drop Shadow Style Declaration.
	 *
	 * This function will toggle box shadow for pricing table.
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array      $attrValue  The value (breakpoint > state > value) of module attribute.
	 *     @type bool|array $important  If set to true, the CSS will be added with !important.
	 *     @type string     $returnType This is the type of value that the function will return. Can be either string or key_value_pair.
	 * }
	 *
	 * @since ??
	 */
	public static function pricing_table_drop_shadow_style_declaration( $params ) {

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		$has_drop_shadow = $params['attrValue'];

		if (  isset( $has_drop_shadow ) && 'off' === $has_drop_shadow ) {
			$style_declarations->add( '-moz-box-shadow', 'none' );
			$style_declarations->add( '-webkit-box-shadow', 'none' );
			$style_declarations->add( 'box-shadow', 'none' );
		}

		return $style_declarations->value;
	}
}
