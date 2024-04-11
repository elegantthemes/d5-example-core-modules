<?php
/**
 * Module Library: Blog - Meta
 *
 * @package Builder\Packages\ModuleLibrary
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Blog\BlogModuleTraits;

use ET\Builder\Framework\Utility\PostUtility;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

trait RenderContentTrait {

	/**
	 * Render Meta.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *    Optional. An array of arguments for render the post meta.
	 *    @type bool   $show_author     Show author.
	 *    @type bool   $show_date       Show date.
	 *    @type bool   $show_categories Show categories.
	 *    @type bool   $show_comments   Show comments.
	 *    @type int    $post_id         Post ID.
	 *    @type string $date_format     Date format.
	 * }
	 *
	 * @return string
	 */
	public static function render_content( $args ) {
		$excerpt_content = $args['excerpt_content'] ?? '';
		$show_excerpt    = $args['show_excerpt'] ?? '';
		$excerpt_manual  = $args['excerpt_manual'] ?? '';
		$excerpt_length  = $args['excerpt_length'] ?? '';
		$post_id         = $args['post_id'] ?? 0;

		$post_content = et_strip_shortcodes( et_delete_post_first_video( get_the_content( null, false, $post_id ) ), true );
		$content      = '';

		if ( 'on' === $excerpt_content ) {
			global $more;

			if ( et_pb_is_pagebuilder_used( $post_id ) ) {
				$more = 1; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- intentionally done.

				$content = et_core_intentionally_unescaped( apply_filters( 'the_content', $post_content ), 'html' );
			} else {
				$more    = null; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- intentionally done.
				$content = et_core_intentionally_unescaped( apply_filters( 'the_content', et_delete_post_first_video( get_the_content( esc_html__( 'read more...', 'et_builder' ), false, $post_id ) ) ), 'html' );
			}
		} elseif ( $show_excerpt ) {
			if ( has_excerpt( $post_id ) && 'off' !== $excerpt_manual ) {
				$content = apply_filters( 'the_excerpt', get_the_excerpt( $post_id ) );
			} else {
				if ( '' !== $post_content ) {
					$content = et_core_intentionally_unescaped( wpautop( et_delete_post_first_video( strip_shortcodes( PostUtility::truncate_post( $excerpt_length, false, get_post( $post_id ), true ) ) ) ), 'html' );
				}
			}
		}

		return $content;
	}
}
