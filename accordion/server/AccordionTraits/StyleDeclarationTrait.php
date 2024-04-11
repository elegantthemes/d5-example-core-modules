<?php
/**
 * Module Library: Accordion Module Style Declaration Trait
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Accordion\AccordionTraits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;
use ET\Builder\Framework\Utility\SanitizerUtility;
use WP_Block_Type_Registry;

trait StyleDeclarationTrait {

	/**
	 * Style declaration for accordion's border.
	 *
	 * This function is used to generate the style declaration for the border of an accordion module.
	 *
	 * @since ??
	 *
	 * @param array $args An array of arguments.
	 *
	 * @return string The generated CSS style declaration.
	 *
	 * @example
	 * ```php
	 * $args = [
	 *   'attrValue' => [
	 *     'radius' => [
	 *       'desktop' => [
	 *         'default' => '10px',
	 *         'hover'   => '8px',
	 *       ],
	 *     ],
	 *   ],
	 *   'important'  => true,
	 *   'returnType' => 'string',
	 * ];
	 * $styleDeclaration = AccordionModule::accordion_border_style_declaration( $args );
	 * ```
	 */
	public static function accordion_border_style_declaration( array $args ): string {
		$radius = $args['attrValue']['radius'] ?? [];

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		if ( $radius ) {
			$style_declarations->add( 'overflow', 'hidden' );
		}

		return $style_declarations->value();
	}

	/**
	 * Style declaration for accordion's toggle icon.
	 *
	 * This function is used to generate the style declaration for the toggle icon of an accordion module.
	 *
	 * @since ??
	 *
	 * @param array $args An array of arguments.
	 *
	 * @throws \Exception Throws an exception if the `attrValue` argument is not an array.
	 * @return string The generated CSS code for the toggle icon style declaration.
	 *
	 * @example: Generating a toggle icon style declaration
	 * ```php
	 * $args = [
	 *     'attrValue'  => [
	 *         'color'   => '#f00',
	 *         'useSize' => 'on',
	 *         'size'    => '14px',
	 *         'weight'  => 'bold',
	 *     ],
	 * ];
	 * $styleDeclaration = AccordionModule::toggle_icon_style_declaration( $args );
	 *
	 * // Result:
	 * // $styleDeclaration = 'color: #f00; font-size: 14px; font-weight: bold !important; right: 2px;';
	 * ```
	 */
	public static function toggle_icon_style_declaration( array $args ): string {
		$use_size = $args['attrValue']['useSize'] ?? '';
		$size     = $args['attrValue']['size'] ?? '';

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		if ( 'on' === $use_size && $size ) {
			$icon_size         = SanitizerUtility::numeric_parse_value( $size );
			$default_icon_size = SanitizerUtility::numeric_parse_value(
				WP_Block_Type_Registry::get_instance()->get_registered( 'divi/accordion' )->attributes['closedToggleIcon']['defaultPrintedStyle']['decoration']['icon']['desktop']['value']['size']
			);
			$size_diff         = ( $default_icon_size['valueNumber'] ?? 0 ) - ( $icon_size['valueNumber'] ?? 0 );
			$style_declarations->add( 'right', 0 !== $size_diff ? round( $size_diff / 2 ) . $icon_size['valueUnit'] : 0 );
		}

		return $style_declarations->value();
	}
}
