<?php
/**
 * PricingTablesItemModule::render_pricing_list().
 *
 * @package ET\Builder\Packages\ModuleLibrary\PricingTablesItem
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\PricingTablesItem\PricingTablesItemTrait;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Framework\Utility\HTMLUtility;

trait RenderPricingListTrait {

	/**
	 * Render Pricing List Item Content.
	 *
	 * @since ??
	 *
	 * @param string $content The content.
	 *
	 * @return string The processed content.
	 */
	public static function render_pricing_list( string $content ) {
		$content    = preg_replace( "/<p>|<\/p>|<br>|<br\s*\/?>/", "\n", $content );
		$list_items = array_values( array_filter( explode( "\n", $content ) ) );

		$children = '';

		foreach ( $list_items as $index => $list_item ) {
			$list_item_trimmed = trim( $list_item );
			if ( '' === $list_item_trimmed ) {
				continue;
			}

			$plus_minus_sign = substr( $list_item_trimmed, 0, 1 );
			$list_content    = in_array( $plus_minus_sign, array( '-', '+' ) ) ? substr( $list_item_trimmed, 1 ) : $list_item_trimmed;

			if ( '-' === $plus_minus_sign ) {
				$children .= HTMLUtility::render(
					array(
						'tag'               => 'li',
						'attributes'        => array(
							'class' => HTMLUtility::classnames(
								array(
									'et_pb_not_available' => true,
								)
							),
						),
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => HTMLUtility::render(
							array(
								'tag'               => 'span',
								'childrenSanitizer' => 'et_core_esc_previously',
								'children'          => $list_content,
							)
						),
					)
				);
			} else {
				$children .= HTMLUtility::render(
					array(
						'tag'               => 'li',
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => HTMLUtility::render(
							array(
								'tag'               => 'span',
								'childrenSanitizer' => 'et_core_esc_previously',
								'children'          => $list_content,
							)
						),
					)
				);
			}
		}

		// Pricing Table List Items Wrapper.
		$list_items_wrapper = HTMLUtility::render(
			array(
				'tag'               => 'ul',
				'attributes'        => array(
					'class' => HTMLUtility::classnames(
						array(
							'et_pb_pricing' => true,
						)
					),
				),
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $children,
			)
		);

		return $list_items_wrapper;
	}

}
