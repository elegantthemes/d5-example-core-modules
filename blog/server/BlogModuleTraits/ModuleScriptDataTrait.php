<?php
/**
 * Module Library: Blog - Script Data
 *
 * @package Builder\Packages\ModuleLibrary
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Blog\BlogModuleTraits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewScriptData;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewUtils;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\Packages\ModuleLibrary\Blog\BlogModule;

trait ModuleScriptDataTrait {

	/**
	 * Set script data of used module options.
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
		$elements       = $args['elements'];
		$store_instance = $args['storeInstance'] ?? null;
		$post_ids       = $args['post_ids'] ?? [];

		// Element Script Data Options.
		$elements->script_data(
			[
				'attrName' => 'module',
			]
		);

		// Post meta set content.
		$set_content = [];

		$date_format = $attrs['post']['advanced']['dateFormat']['desktop']['value'] ?? '';

		if ( ! empty( $post_ids ) ) {
			foreach ( $post_ids as $post_id ) {
				$set_content[] = [
					'selector'      => $selector . ' .et_pb_post_id_' . $post_id . ' .post-meta',
					'data'          => MultiViewUtils::merge_values(
						[
							'showAuthor'     => MultiViewUtils::normalize_value( $attrs['meta']['advanced']['showAuthor'] ?? [] ),
							'showDate'       => MultiViewUtils::normalize_value( $attrs['meta']['advanced']['showDate'] ?? [] ),
							'showCategories' => MultiViewUtils::normalize_value( $attrs['meta']['advanced']['showCategories'] ?? [] ),
							'showComments'   => MultiViewUtils::normalize_value( $attrs['meta']['advanced']['showComments'] ?? [] ),
						]
					),
					'sanitizer'     => 'et_core_esc_previously',
					'valueResolver' => function( $value ) use ( $date_format, $post_id ) {
						$show_author     = 'on' === ( $value['showAuthor'] ?? '' );
						$show_date       = 'on' === ( $value['showDate'] ?? '' );
						$show_categories = 'on' === ( $value['showCategories'] ?? '' );
						$show_comments   = 'on' === ( $value['showComments'] ?? '' );

						return BlogModule::render_meta(
							[
								'show_author'     => $show_author,
								'show_date'       => $show_date,
								'show_categories' => $show_categories,
								'show_comments'   => $show_comments,
								'post_id'         => $post_id,
								'date_format'     => $date_format,
							]
						);
					},
				];

				// Post excerpt.
				$set_content[] = [
					'selector'      => $selector . ' .et_pb_post_id_' . $post_id . ' .post-content-inner',
					'data'          => MultiViewUtils::merge_values(
						[
							'excerptContent' => $attrs['post']['advanced']['excerptContent'] ?? [],
							'showExcerpt'    => $attrs['post']['advanced']['showExcerpt'] ?? [],
							'excerptManual'  => $attrs['post']['advanced']['excerptManual'] ?? [],
							'excerptLength'  => $attrs['post']['advanced']['excerptLength'] ?? [],
						]
					),
					'sanitizer'     => 'wp_kses_post',
					'valueResolver' => function( $value ) use ( $date_format, $post_id ) {
						$excerpt_content = $value['excerptContent'] ?? '';
						$show_excerpt    = $value['showExcerpt'] ?? '';
						$excerpt_manual  = $value['excerptManual'] ?? '';
						$excerpt_length  = $value['excerptLength'] ?? '';

						return BlogModule::render_content(
							[
								'excerpt_content' => $excerpt_content,
								'show_excerpt'    => $show_excerpt,
								'excerpt_manual'  => $excerpt_manual,
								'excerpt_length'  => $excerpt_length,
								'post_id'         => $post_id,
							]
						);
					},
				];
			}
		}

		MultiViewScriptData::set(
			[
				'id'            => $id,
				'name'          => $name,
				'storeInstance' => $store_instance,
				'hoverSelector' => $selector,
				'setContent'    => $set_content,
				'setVisibility' => [
					[
						'selector'      => $selector . ' .entry-featured-image-url',
						'data'          => $attrs['image']['advanced']['enable'] ?? [],
						'valueResolver' => function ( $value ) {
							return 'on' === $value ? 'visible' : 'hidden';
						},
					],
					[
						'selector'      => $selector . ' .more-link',
						'data'          => $attrs['readMore']['advanced']['enable'] ?? [],
						'valueResolver' => function ( $value ) {
							return 'on' === $value ? 'visible' : 'hidden';
						},
					],
					[
						'selector'      => $selector . ' .pagination',
						'data'          => $attrs['pagination']['advanced']['enable'] ?? [],
						'valueResolver' => function ( $value ) {
							return 'on' === $value ? 'visible' : 'hidden';
						},
					],
				],
			]
		);
	}

}
