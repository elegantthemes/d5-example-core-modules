<?php
/**
 * Blog: PostTypeController.
 *
 * @package Builder\Framework\Route
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Blog;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Framework\Controllers\RESTController;
use ET\Builder\Framework\UserRole\UserRole;
use WP_REST_Request;
use WP_REST_Response;

/**
 * Blog REST Controller class.
 *
 * @since ??
 */
class PostTypeController extends RESTController {
	/**
	 * Return post types for Blog module.
	 *
	 * @since ??
	 *
	 * @param WP_REST_Request $request REST request object.
	 *
	 * @return WP_REST_Response|WP_Error
	 */
	public static function index( WP_REST_Request $request ): WP_REST_Response {
		$post_types = et_get_registered_post_type_options( false, false );

		$response = [];

		if ( ! empty( $post_types ) ) {
			foreach ( $post_types as $post_type => $post_type_label ) {
				$response[ $post_type ] = [
					'label' => $post_type_label,
				];
			}
		}

		return self::response_success( $response );
	}
	/**
	 * Index action arguments.
	 *
	 * Endpoint arguments as used in `register_rest_route()`.
	 *
	 * @return array
	 */
	public static function index_args(): array {
		return [];
	}
	/**
	 * Index action permission.
	 *
	 * Endpoint permission callback as used in `register_rest_route()`.
	 *
	 * @return bool
	 */
	public static function index_permission(): bool {
		return UserRole::can_current_user_use_visual_builder();
	}
}
