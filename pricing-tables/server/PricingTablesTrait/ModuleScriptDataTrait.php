<?php
/**
 * Module Library: PricingTablesModule - Script Data
 *
 * @package ET\Builder\Packages\ModuleLibrary\PricingTables
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\PricingTables\PricingTablesTrait;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewScriptData;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

trait ModuleScriptDataTrait {

	/**
	 * Set script data of pricing tables module options.
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
				'selector'      => $selector,
				'setClassName'  => [
					[
						'data'          => [
							'et_pb_pricing_no_bullet' => $attrs['content']['advanced']['showBullet'] ?? [],
						],
						'valueResolver' => function ( $value, $resolver_args ) {
							return 'et_pb_pricing_no_bullet' === $resolver_args['className'] && 'off' === ( $value ?? '' ) ? 'add' : 'remove';
						},
					],
				],
				'setStyle'      => [
					[
						'selector'      => $selector . ' et_pb_featured_table',
						'data'          => [
							'box-shadow' => $attrs['featuredTable']['advanced']['showDropShadow'] ?? [],
						],
						'valueResolver' => function( $value ) {
							return 'off' === $value ? 'none' : '';
						},
					],
				],
			]
		);
	}
}
