<?php
/**
 * Module Library: Accordion Item Style Declaration Trait
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\AccordionItem\AccordionItemTraits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;
use ET\Builder\Packages\IconLibrary\IconFont\Utils;
use ET\Builder\Framework\Utility\SanitizerUtility;
use Exception;
use WP_Block_Type_Registry;

trait StyleDeclarationTrait {

	/**
	 * Retrieves the style declaration for toggle open overlay sizing.
	 *
	 * This function generates the style declaration for setting the width and
	 * height of the overlay in the toggle open mode, based on the provided arguments.
	 *
	 * @since ??
	 *
	 * @param array $args Array of arguments for generating the style declaration.
	 *
	 * @return string The generated style declaration.
	 *
	 * @example: Generate style declaration with default arguments.
	 * ```php
	 * $args = [
	 *   'attrValue' => [
	 *     'useSize' => 'on',
	 *     'size'    => '100px',
	 *   ],
	 * ];
	 * $styleDeclaration = AccordionItemModule::toggle_open_overlay_sizing_style_declaration( $args );
	 * // Output: "width: 100px; height: 100px;"
	 * ```
	 */
	public static function toggle_open_overlay_sizing_style_declaration( array $args ): string {
		$use_size = $args['attrValue']['useSize'] ?? '';
		$size     = $args['attrValue']['size'] ?? '';

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		if ( 'on' === $use_size && $size ) {
			$style_declarations->add( 'width', $size );
			$style_declarations->add( 'height', $size );
		}

		return $style_declarations->value();
	}

	/**
	 * Style declaration for the toggle close icon.
	 *
	 * This function generates the style declaration for the accordion item's
	 * toggle close icon based on the provided arguments.
	 *
	 * @since ??
	 *
	 * @param array $args An array of arguments.
	 *
	 * @throws Exception Throws an exception if the font icon is not supported.
	 *
	 * @return string Style declaration for the toggle close icon.
	 *
	 * @example
	 * ```php
	 * $args = [
	 *   'attrValue' => [
	 *     'color'  => '#FF0000',
	 *     'weight' => 'normal',
	 *   ],
	 * ];
	 * $style_declaration = AccordionItemModule::toggle_close_icon_style_declaration( $args );
	 * // Output: 'color: #FF0000; font-weight: normal !important;'
	 * ```
	 */
	public static function toggle_close_icon_size_style_declaration( $args ) {
		$size     = $args['attrValue']['size'] ?? '';
		$use_size = $args['attrValue']['useSize'] ?? '';

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => [
					'right' => true,
				],
			]
		);

		if ( 'on' === $use_size && $size ) {
			$icon_size         = SanitizerUtility::numeric_parse_value( $size );
			$default_icon_size = SanitizerUtility::numeric_parse_value(
				WP_Block_Type_Registry::get_instance()->get_registered( 'divi/accordion-item' )->attributes['closedToggleIcon']['defaultPrintedStyle']['decoration']['icon']['desktop']['value']['size']
			);
			$size_diff         = ( $default_icon_size['valueNumber'] ?? 0 ) - ( $icon_size['valueNumber'] ?? 0 );
			$style_declarations->add( 'right', 0 !== $size_diff ? round( $size_diff / 2 ) . $icon_size['valueUnit'] : 0 );
		}

		return $style_declarations->value();
	}

	/**
	 * Style declaration for toggle close overlay sizing.
	 *
	 * This function generates the style declaration for the accordion item's
	 * toggle close overlay sizing based on the provided arguments.
	 *
	 * @since ??
	 *
	 * @param array $args An array of arguments.
	 *
	 * @return string The generated CSS style declarations for toggle close overlay sizing.
	 *
	 * @examples
	 * ```php
	 * AccordionItemModule::toggle_close_overlay_sizing_style_declaration( [
	 *   'attrValue' => [
	 *     'useSize' => 'on',
	 *     'size' => '50px',
	 *   ],
	 * ] );
	 *
	 * // Output: 'width: 50px !important; height: 50px !important;'
	 * ```
	 */
	public static function toggle_close_overlay_sizing_style_declaration( array $args ): string {
		$use_size = $args['attrValue']['useSize'] ?? '';
		$size     = $args['attrValue']['size'] ?? '';

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => [
					'width'  => true,
					'height' => true,
				],
			]
		);

		if ( 'on' === $use_size && $size ) {
			$style_declarations->add( 'width', $size );
			$style_declarations->add( 'height', $size );
		}

		return $style_declarations->value();
	}

	/**
	 * Set the style declaration for the Accordion Item's border.
	 *
	 * This function generates the style declaration for the Accordion Item's
	 * border based on the provided arguments.
	 *
	 * @since ??
	 *
	 * @param array $args An array of arguments.
	 *
	 * @return string The style declarations as a string.
	 *
	 * @example
	 * ```php
	 * $args = [
	 *   'attrValue'  => [
	 *     'radius' => [
	 *       'desktop' => [
	 *         'normal' => '2px',
	 *         'hover'  => '4px',
	 *         'focus'  => '6px',
	 *       ],
	 *       'tablet'  => [
	 *         'normal' => '3px',
	 *         'hover'  => '5px',
	 *         'focus'  => '7px',
	 *       ],
	 *     ],
	 *   ],
	 * ];
	 * $styleDeclarations = AccordionItemModule::accordion_item_border_style_declaration( $args );
	 *
	 * // Result: 'overflow: hidden;'
	 * ```
	 */
	public static function accordion_item_border_style_declaration( array $args ): string {
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
