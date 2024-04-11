<?php
/**
 * Module Library: Blog - Pagination
 *
 * @package Builder\Packages\ModuleLibrary
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Blog\BlogModuleTraits;

use ET\Builder\Packages\ModuleLibrary\Blog\BlogModule;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

trait RenderPaginationTrait {

	/**
	 * Render pagination.
	 *
	 * @since ??
	 *
	 * @return string
	 */
	public static function render_pagination() {

		ob_start();

		add_filter( 'get_pagenum_link', [ BlogModule::class, 'filter_pagination_url' ] );

		if ( function_exists( 'wp_pagenavi' ) ) {
			wp_pagenavi();
		} else {
			if ( et_is_builder_plugin_active() ) {
				include ET_BUILDER_PLUGIN_DIR . 'includes/navigation.php';
			} else {
				get_template_part( 'includes/navigation', 'index' );
			}
		}

		remove_filter( 'get_pagenum_link', [ BlogModule::class, 'filter_pagination_url' ] );

		$output = ob_get_contents();
		ob_end_clean();

		return $output;
	}

	/**
	 * Filter the pagination url to add a flag so it can be filtered to avoid pagination clashes with the main query.
	 *
	 * @since ??
	 *
	 * @param string $result The URL.
	 *
	 * @return string
	 */
	public static function filter_pagination_url( $result ) {
		return add_query_arg( 'et_blog', '', $result );
	}

}
