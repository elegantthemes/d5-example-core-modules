<?php
/**
 * Module Library: PricingTablesItemModule - Script Data
 *
 * @package ET\Builder\Packages\ModuleLibrary\PricingTablesItem
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\PricingTablesItem\PricingTablesItemTrait;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewScriptData;
use ET\Builder\Packages\ModuleLibrary\PricingTablesItem\PricingTablesItemModule;

trait ModuleScriptDataTrait {

	/**
	 * Set script data of pricing table module options.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *   Array of arguments.
	 *
	 *   @type string         $id            Module id.
	 *   @type string         $name          Module name.
	 *   @type string         $selector      Module selector.
	 *   @type array          $attrs         Module attributes.
	 *   @type int            $storeInstance The ID of instance where this block stored in BlockParserStore class.
	 *   @type ModuleElements $elements      ModuleElements instance.
	 * }
	 */
	public static function module_script_data( $args ) {
		// Assign variables.
		$id             = $args['id'] ?? '';
		$name           = $args['name'] ?? '';
		$selector       = $args['selector'] ?? '';
		$attrs          = $args['attrs'] ?? [];
		$store_instance = $args['storeInstance'] ?? null;
		$elements       = $args['elements'];

		// Element Script Data Options.
		$elements->script_data(
			[
				'attrName' => 'module',
			]
		);

		// Show bullet script data.
		MultiViewScriptData::set(
			[
				'id'            => $id,
				'name'          => $name,
				'storeInstance' => $store_instance,
				'hoverSelector' => $selector,
				'setContent'    => [
					[
						'selector'      => $selector . ' .et_pb_dollar_sign',
						'data'          => $attrs['currencyFrequency']['innerContent'] ?? [],
						'valueResolver' => function( $value ) {
							$currency = $value['currency'] ?? '';
							return $currency ?? 'T';
						},
						'sanitizer'     => 'et_core_esc_previously',
					],
					[
						'selector'      => $selector . ' .et_pb_pricing_content',
						'data'          => $attrs['content']['innerContent'] ?? [],
						'valueResolver' => function( $value ) {
							return PricingTablesItemModule::render_pricing_list( $value );
						},
						'sanitizer'     => 'et_core_esc_previously',
					],
				],
			]
		);
	}
}
