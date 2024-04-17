<?php
/**
 * PricingTablesModule: :: Style declaration functions.
 *
 * @package ET\Builder\Packages\ModuleLibrary\PricingTables
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\PricingTablesItem\PricingTablesItemTrait;

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
	 *     @type array      $attrValue  The value (breakpoint > state > value) of module attribute.
	 *     @type bool|array $important  If set to true, the CSS will be added with !important.
	 *     @type string     $returnType This is the type of value that the function will return. Can be either string or key_value_pair.
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
}
