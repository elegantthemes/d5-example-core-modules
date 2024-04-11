<?php
/**
 * Module Library: Blurb Module Style Declaration Trait
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Blurb\BlurbModuleTraits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;
use ET\Builder\Packages\IconLibrary\IconFont\Utils;
use Exception;

trait StyleDeclarationTrait {

	/**
	 * Returns the icon style declaration for Blurb module.
	 *
	 * This function declares CSS styles for the Blurb module icon based on the provided parameters.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array      $attrValue  The value (breakpoint > state > value) of the module attribute.
	 *     @type bool|array $important  If set to true, the CSS will be added with !important.
	 *     @type string     $returnType This is the type of value that the function will return. Can be either string or key_value_pair.
	 * }
	 *
	 * @throws Exception Throws an exception if the provided attribute value is not an array.
	 *
	 * @return string The generated icon style declaration.
	 *
	 * @example
	 * ```php
	 * BlurbModule::icon_style_declaration( [
	 *   'attrValue'  => [
	 *     'icon' => [
	 *       'type'    => 'fa',
	 *       'weight'  => 'bold',
	 *       'unicode' => '&#xf104;',
	 *     ],
	 *   ],
	 * ] );
	 *
	 * // Result: 'font-family: FontAwesom !important; font-weight: bold; content: "\f104";'
	 * ```
	 */
	public static function icon_style_declaration( array $params ): string {
		$icon_attr = $params['attrValue']['icon'] ?? [];

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => [
					'font-family' => true,
				],
			]
		);

		if ( isset( $icon_attr['type'] ) ) {
			$font_family = 'fa' === $icon_attr['type'] ? 'FontAwesome' : 'ETmodules';
			$style_declarations->add( 'font-family', $font_family );
		}

		if ( ! empty( $icon_attr['weight'] ) ) {
			$style_declarations->add( 'font-weight', $icon_attr['weight'] );
		}

		if ( ! empty( $icon_attr['unicode'] ) ) {
			$style_declarations->add( 'content', '"' . Utils::process_font_icon( $icon_attr ) . '"' );
		}

		return $style_declarations->value();
	}

	/**
	 * Declare content alignment style for Blurb module.
	 *
	 * This function takes an array of arguments and declares the content alignment style for the Blurb module.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array $attrValue The alignment value (`left`, `center`, `right`).
	 * }
	 *
	 * @return string The content alignment style declaration.
	 *
	 * @example
	 * ```php
	 * BlurbModule::content_alignment_style_declaration( [ 'attrValue' => 'left' ] );
	 * // Result: 'text-align: left;'
	 * ```
	 *
	 * @example: Passing 'center' as the attribute value.
	 * ```php
	 * BlurbModule::content_alignment_style_declaration( [ 'attrValue' => 'center' ] );
	 * // Result: ''
	 * ```
	 */
	public static function content_alignment_style_declaration( array $params ): string {
		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
			]
		);

		if ( 'center' !== $params['attrValue'] ) {
			$style_declarations->add( 'text-align', $params['attrValue'] );
		}

		return $style_declarations->value();
	}

	/**
	 * Declare content alignment style for Blurb module.
	 *
	 * This function takes an array of arguments and declares the content alignment
	 * style for the Blurb module. The function expects an array of parameters with
	 * the following keys:
	 *
	 * - attrValue (array): The value (breakpoint > state > value) of the module attribute.
	 * - important (bool|array): If set to true, the CSS will be added with !important.
	 * - returnType (string): The type of value that the function will return. Can be either string or key_value_pair.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array $attrValue Image alignment value (`left`, `right`).
	 * }
	 *
	 * @return string The content alignment style declaration.
	 *
	 * @throws Exception Throws an exception if the provided attribute value is not an array.
	 *
	 * @example: Passing 'left' as the attribute value.
	 * ```php
	 * $params = [
	 *   'attrValue' => 'left',
	 * ];
	 * $style = BlurbModule::content_alignment_style_declaration( $params );
	 * // Result: 'margin: auto auto auto 0;'
	 * ```
	 *
	 * @example: Passing 'right' as the attribute value.
	 * ```php
	 *  $params = [
	 *    'attrValue' => 'right',
	 *  ];
	 *  $style = BlurbModule::content_alignment_style_declaration( $params );
	 *  // Result: 'margin: auto 0 auto auto;'
	 *  ```
	 */
	public static function image_alignment_style_declaration( array $params ): string {
		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
			]
		);

		switch ( $params['attrValue'] ) {
			case 'left':
				$style_declarations->add( 'margin', 'auto auto auto 0' );
				break;

			case 'right':
				$style_declarations->add( 'margin', 'auto 0 auto auto' );
				break;

			default:
				$style_declarations->add( 'margin', 'auto' );
		}

		return $style_declarations->value();
	}

	/**
	 * Retrieve the CSS style declaration for the icon width.
	 *
	 * This function adds a `font-size` style declaration to the Blurb module's icon to define the icon's width.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array $attrValue The value (breakpoint > state > value) of the module attribute.
	 * }
	 *
	 * @return string The CSS style declaration for the icon width.
	 *
	 * @example
	 * ```php
	 * $params = [
	 *   'attrValue' => [
	 *     'icon' => '24px',
	 *   ]
	 * ];
	 * $result = BlurbModule::icon_width_style_declaration( $params );
	 * // Result: "font-size: 24px;"
	 * ```
	 */
	public static function icon_width_style_declaration( array $params ): string {
		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
			]
		);

		if ( isset( $params['attrValue']['icon'] ) ) {
			$style_declarations->add( 'font-size', $params['attrValue']['icon'] );
		}

		return $style_declarations->value();
	}

	/**
	 * Sets the image width style declaration for the Blurb module.
	 *
	 * This function adds a `max-width` style declaration to the Blurb module's
	 * image based on the provided parameters. It uses the value (breakpoint >
	 * state > value) of the module attribute to determine the width. The CSS
	 * style declaration is returned as a string.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array $attrValue The value (breakpoint > state > value) of the module attribute.
	 * }
	 *
	 * @return string The CSS style declaration for the image width.
	 *
	 * @example: Set the image width style declaration for the Blurb module.
	 * ```php
	 * $params = [
	 *   'attrValue' => [
	 *     'image' => '500px',
	 *   ],
	 * ];
	 * $imageWidthStyle = BlurbModule::image_width_style_declaration( $params );
	 * // Result: "max-width: 500px;"
	 * ```
	 */
	public static function image_width_style_declaration( array $params ): string {
		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
			]
		);

		if ( isset( $params['attrValue']['image'] ) ) {
			$style_declarations->add( 'max-width', $params['attrValue']['image'] );
		}

		return $style_declarations->value();
	}

	/**
	 * Sets the overflow style declaration for Blurb module when border radius used.
	 *
	 * This function is the equivalent of the `overflowStyleDeclaration` JS function located in
	 * visual-builder/packages/module-library/src/components/blurb/style-declarations/overflow/index.ts.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of parameters.
	 *
	 *     @type array $attrValue The value (breakpoint > state > value) of the module attribute.
	 * }
	 *
	 * @return string The overflow style declaration.
	 *
	 * @example:
	 * ```php
	 *   $params = array(
	 *       'attrValue' => array(
	 *           'radius' => '10px',
	 *       ),
	 *   );
	 *   // Output: "overflow: hidden;"
	 *   $styleDeclaration = BlurbModule::overflow_style_declaration( $params );
	 * ```
	 *
	 * @example:
	 * ```php
	 *   $params = array(
	 *       'attrValue' => array(
	 *           'radius' => null,
	 *       ),
	 *   );
	 *   // Output: ""
	 *   $styleDeclaration = BlurbModule::overflow_style_declaration( $params );
	 * ```
	 */
	public static function overflow_style_declaration( array $params ): string {
		$attr_value = $params['attrValue'];

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
			]
		);

		if ( ! empty( $attr_value['radius'] ) ) {
			$style_declarations->add( 'overflow', 'hidden' );
		}

		return $style_declarations->value();
	}
}
