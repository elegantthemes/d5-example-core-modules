<?php
/**
 * BlogModule::icon_style_declaration().
 *
 * @package Builder\Packages\ModuleLibrary
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Blog\BlogModuleTraits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;
use ET\Builder\Packages\IconLibrary\IconFont\Utils;

trait StyleDeclarationTrait {
	/**
	 * Style declaration for Blog Module If it has border radius set.
	 *
	 * This function is the equivalent of the `borderStyleDeclaration` JS function located in
	 * visual-builder/packages/module-library/src/components/blog/style-declarations/border/index.ts.
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *     @type array      $attrValue  The value (breakpoint > state > value) of module attribute.
	 *     @type bool|array $important  If set to true, the CSS will be added with !important.
	 *     @type string     $returnType This is the type of value that the function will return. Can be either string or key_value_pair.
	 * }
	 *
	 * @since ??
	 */
	public static function border_style_declaration( $args ) {
		$radius = $args['attrValue']['radius'] ?? null;

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		if ( is_array( $radius ) ) {
			$style_declarations->add( 'overflow', 'hidden' );
		}

		return $style_declarations->value();
	}
}
