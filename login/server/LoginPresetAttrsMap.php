<?php
/**
 * Module Library: Login Module
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Login;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}


/**
 * Class LoginPresetAttrsMap
 *
 * @since ??
 *
 * @package ET\Builder\Packages\ModuleLibrary\Login
 */
class LoginPresetAttrsMap {
	/**
	 * Get the preset attributes map for the Login module.
	 *
	 * @since ??
	 *
	 * @param array  $map         The preset attributes map.
	 * @param string $module_name The module name.
	 *
	 * @return array
	 */
	public static function get_map( array $map, string $module_name ) {
		if ( 'divi/login' !== $module_name ) {
			return $map;
		}

		$keys_to_remove = [
			'button.decoration.button.innerContent__text',
			'button.decoration.button.innerContent__linkUrl',
			'button.decoration.button.innerContent__linkTarget',
			'button.decoration.button.innerContent__rel',
			'button.decoration.button.decoration.button__enable',
			'button.decoration.button.decoration.button__icon.enable',
			'button.decoration.button.decoration.button__icon.settings',
			'button.decoration.button.decoration.button__icon.color',
			'button.decoration.button.decoration.button__icon.placement',
			'button.decoration.button.decoration.button__icon.onHover',
			'button.decoration.button.decoration.button__alignment',
			'button.decoration.button.decoration.background__color',
			'button.decoration.button.decoration.background__gradient.stops',
			'button.decoration.button.decoration.background__gradient.enabled',
			'button.decoration.button.decoration.background__gradient.type',
			'button.decoration.button.decoration.background__gradient.direction',
			'button.decoration.button.decoration.background__gradient.directionRadial',
			'button.decoration.button.decoration.background__gradient.repeat',
			'button.decoration.button.decoration.background__gradient.length',
			'button.decoration.button.decoration.background__gradient.overlaysImage',
			'button.decoration.button.decoration.background__image.url',
			'button.decoration.button.decoration.background__image.parallax.enabled',
			'button.decoration.button.decoration.background__image.parallax.method',
			'button.decoration.button.decoration.background__image.size',
			'button.decoration.button.decoration.background__image.width',
			'button.decoration.button.decoration.background__image.height',
			'button.decoration.button.decoration.background__image.position',
			'button.decoration.button.decoration.background__image.horizontalOffset',
			'button.decoration.button.decoration.background__image.verticalOffset',
			'button.decoration.button.decoration.background__image.repeat',
			'button.decoration.button.decoration.background__image.blend',
			'button.decoration.button.decoration.background__video.mp4',
			'button.decoration.button.decoration.background__video.webm',
			'button.decoration.button.decoration.background__video.width',
			'button.decoration.button.decoration.background__video.height',
			'button.decoration.button.decoration.background__video.allowPlayerPause',
			'button.decoration.button.decoration.background__video.pauseOutsideViewport',
			'button.decoration.button.decoration.background__pattern.style',
			'button.decoration.button.decoration.background__pattern.enabled',
			'button.decoration.button.decoration.background__pattern.color',
			'button.decoration.button.decoration.background__pattern.transform',
			'button.decoration.button.decoration.background__pattern.size',
			'button.decoration.button.decoration.background__pattern.width',
			'button.decoration.button.decoration.background__pattern.height',
			'button.decoration.button.decoration.background__pattern.repeatOrigin',
			'button.decoration.button.decoration.background__pattern.horizontalOffset',
			'button.decoration.button.decoration.background__pattern.verticalOffset',
			'button.decoration.button.decoration.background__pattern.repeat',
			'button.decoration.button.decoration.background__pattern.blend',
			'button.decoration.button.decoration.background__mask.style',
			'button.decoration.button.decoration.background__mask.enabled',
			'button.decoration.button.decoration.background__mask.color',
			'button.decoration.button.decoration.background__mask.transform',
			'button.decoration.button.decoration.background__mask.aspectRatio',
			'button.decoration.button.decoration.background__mask.size',
			'button.decoration.button.decoration.background__mask.width',
			'button.decoration.button.decoration.background__mask.height',
			'button.decoration.button.decoration.background__mask.position',
			'button.decoration.button.decoration.background__mask.horizontalOffset',
			'button.decoration.button.decoration.background__mask.verticalOffset',
			'button.decoration.button.decoration.background__mask.blend',
			'button.decoration.button.decoration.border__radius',
			'button.decoration.button.decoration.border__styles',
			'button.decoration.button.decoration.border__styles.all.width',
			'button.decoration.button.decoration.border__styles.top.width',
			'button.decoration.button.decoration.border__styles.right.width',
			'button.decoration.button.decoration.border__styles.bottom.width',
			'button.decoration.button.decoration.border__styles.left.width',
			'button.decoration.button.decoration.border__styles.all.color',
			'button.decoration.button.decoration.border__styles.top.color',
			'button.decoration.button.decoration.border__styles.right.color',
			'button.decoration.button.decoration.border__styles.bottom.color',
			'button.decoration.button.decoration.border__styles.left.color',
			'button.decoration.button.decoration.border__styles.all.style',
			'button.decoration.button.decoration.border__styles.top.style',
			'button.decoration.button.decoration.border__styles.right.style',
			'button.decoration.button.decoration.border__styles.bottom.style',
			'button.decoration.button.decoration.border__styles.left.style',
			'button.decoration.button.decoration.spacing__margin',
			'button.decoration.button.decoration.spacing__padding',
			'button.decoration.button.decoration.boxShadow__style',
			'button.decoration.button.decoration.boxShadow__horizontal',
			'button.decoration.button.decoration.boxShadow__vertical',
			'button.decoration.button.decoration.boxShadow__blur',
			'button.decoration.button.decoration.boxShadow__spread',
			'button.decoration.button.decoration.boxShadow__color',
			'button.decoration.button.decoration.boxShadow__position',
			'button.decoration.button.decoration.font.font__family',
			'button.decoration.button.decoration.font.font__weight',
			'button.decoration.button.decoration.font.font__style',
			'button.decoration.button.decoration.font.font__lineColor',
			'button.decoration.button.decoration.font.font__lineStyle',
			'button.decoration.button.decoration.font.font__textAlign',
			'button.decoration.button.decoration.font.font__color',
			'button.decoration.button.decoration.font.font__size',
			'button.decoration.button.decoration.font.font__letterSpacing',
			'button.decoration.button.decoration.font.font__lineHeight',
			'button.decoration.button.decoration.font.textShadow__style',
			'button.decoration.button.decoration.font.textShadow__horizontal',
			'button.decoration.button.decoration.font.textShadow__vertical',
			'button.decoration.button.decoration.font.textShadow__blur',
			'button.decoration.button.decoration.font.textShadow__color',
			'field.decoration.background__gradient.stops',
			'field.decoration.background__gradient.enabled',
			'field.decoration.background__gradient.type',
			'field.decoration.background__gradient.direction',
			'field.decoration.background__gradient.directionRadial',
			'field.decoration.background__gradient.repeat',
			'field.decoration.background__gradient.length',
			'field.decoration.background__gradient.overlaysImage',
			'field.decoration.background__image.url',
			'field.decoration.background__image.parallax.enabled',
			'field.decoration.background__image.parallax.method',
			'field.decoration.background__image.size',
			'field.decoration.background__image.width',
			'field.decoration.background__image.height',
			'field.decoration.background__image.position',
			'field.decoration.background__image.horizontalOffset',
			'field.decoration.background__image.verticalOffset',
			'field.decoration.background__image.repeat',
			'field.decoration.background__image.blend',
			'field.decoration.background__video.mp4',
			'field.decoration.background__video.webm',
			'field.decoration.background__video.width',
			'field.decoration.background__video.height',
			'field.decoration.background__video.allowPlayerPause',
			'field.decoration.background__video.pauseOutsideViewport',
			'field.decoration.background__pattern.style',
			'field.decoration.background__pattern.enabled',
			'field.decoration.background__pattern.color',
			'field.decoration.background__pattern.transform',
			'field.decoration.background__pattern.size',
			'field.decoration.background__pattern.width',
			'field.decoration.background__pattern.height',
			'field.decoration.background__pattern.repeatOrigin',
			'field.decoration.background__pattern.horizontalOffset',
			'field.decoration.background__pattern.verticalOffset',
			'field.decoration.background__pattern.repeat',
			'field.decoration.background__pattern.blend',
			'field.decoration.background__mask.style',
			'field.decoration.background__mask.enabled',
			'field.decoration.background__mask.color',
			'field.decoration.background__mask.transform',
			'field.decoration.background__mask.aspectRatio',
			'field.decoration.background__mask.size',
			'field.decoration.background__mask.width',
			'field.decoration.background__mask.height',
			'field.decoration.background__mask.position',
			'field.decoration.background__mask.horizontalOffset',
			'field.decoration.background__mask.verticalOffset',
			'field.decoration.background__mask.blend',
		];

		foreach ( $keys_to_remove as $key ) {
			unset( $map[ $key ] );
		}

		return array_merge(
			$map,
			[
				'button.innerContent__text'                => [
					'attrName' => 'button.innerContent',
					'preset'   => 'content',
					'subName'  => 'text',
				],
				'field.advanced.focus.background__color'   => [
					'attrName' => 'field.advanced.focus.background',
					'preset'   => [ 'style' ],
					'subName'  => 'color',
				],
				'field.advanced.focus.font.font__color'    => [
					'attrName' => 'field.advanced.focus.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'color',
				],
				'field.advanced.focus.font.font__size'     => [
					'attrName' => 'field.advanced.focus.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'size',
				],
				'field.advanced.focus.font.font__letterSpacing' => [
					'attrName' => 'field.advanced.focus.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'letterSpacing',
				],
				'field.advanced.focus.font.font__lineHeight' => [
					'attrName' => 'field.advanced.focus.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'lineHeight',
				],
				'field.decoration.font.font__headingLevel' => [
					'attrName' => 'field.decoration.font.font',
					'preset'   => [ 'html' ],
					'subName'  => 'headingLevel',
				],
				'button.decoration.button__enable'         => [
					'attrName' => 'button.decoration.button',
					'preset'   => [ 'style' ],
					'subName'  => 'enable',
				],
				'button.decoration.background__color'      => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'color',
				],
				'button.decoration.background__gradient.stops' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style', 'html' ],
					'subName'  => 'gradient.stops',
				],
				'button.decoration.background__gradient.enabled' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style', 'html' ],
					'subName'  => 'gradient.enabled',
				],
				'button.decoration.background__gradient.type' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style', 'html' ],
					'subName'  => 'gradient.type',
				],
				'button.decoration.background__gradient.direction' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style', 'html' ],
					'subName'  => 'gradient.direction',
				],
				'button.decoration.background__gradient.directionRadial' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style', 'html' ],
					'subName'  => 'gradient.directionRadial',
				],
				'button.decoration.background__gradient.repeat' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style', 'html' ],
					'subName'  => 'gradient.repeat',
				],
				'button.decoration.background__gradient.length' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style', 'html' ],
					'subName'  => 'gradient.length',
				],
				'button.decoration.background__gradient.overlaysImage' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style', 'html' ],
					'subName'  => 'gradient.overlaysImage',
				],
				'button.decoration.background__image.url'  => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style', 'html' ],
					'subName'  => 'image.url',
				],
				'button.decoration.background__image.parallax.enabled' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style', 'html', 'script' ],
					'subName'  => 'image.parallax.enabled',
				],
				'button.decoration.background__image.parallax.method' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style', 'html' ],
					'subName'  => 'image.parallax.method',
				],
				'button.decoration.background__image.size' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'image.size',
				],
				'button.decoration.background__image.width' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'image.width',
				],
				'button.decoration.background__image.height' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'image.height',
				],
				'button.decoration.background__image.position' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'image.position',
				],
				'button.decoration.background__image.horizontalOffset' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'image.horizontalOffset',
				],
				'button.decoration.background__image.verticalOffset' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'image.verticalOffset',
				],
				'button.decoration.background__image.repeat' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'image.repeat',
				],
				'button.decoration.background__image.blend' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style', 'html' ],
					'subName'  => 'image.blend',
				],
				'button.decoration.background__video.mp4'  => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'html' ],
					'subName'  => 'video.mp4',
				],
				'button.decoration.background__video.webm' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'html' ],
					'subName'  => 'video.webm',
				],
				'button.decoration.background__video.width' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'html' ],
					'subName'  => 'video.width',
				],
				'button.decoration.background__video.height' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'html' ],
					'subName'  => 'video.height',
				],
				'button.decoration.background__video.allowPlayerPause' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'html' ],
					'subName'  => 'video.allowPlayerPause',
				],
				'button.decoration.background__video.pauseOutsideViewport' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'html' ],
					'subName'  => 'video.pauseOutsideViewport',
				],
				'button.decoration.background__pattern.style' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style', 'html' ],
					'subName'  => 'pattern.style',
				],
				'button.decoration.background__pattern.enabled' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style', 'html' ],
					'subName'  => 'pattern.enabled',
				],
				'button.decoration.background__pattern.color' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style', 'html' ],
					'subName'  => 'pattern.color',
				],
				'button.decoration.background__pattern.transform' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'pattern.transform',
				],
				'button.decoration.background__pattern.size' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'pattern.size',
				],
				'button.decoration.background__pattern.width' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'pattern.width',
				],
				'button.decoration.background__pattern.height' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'pattern.height',
				],
				'button.decoration.background__pattern.repeatOrigin' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'pattern.repeatOrigin',
				],
				'button.decoration.background__pattern.horizontalOffset' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'pattern.horizontalOffset',
				],
				'button.decoration.background__pattern.verticalOffset' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'pattern.verticalOffset',
				],
				'button.decoration.background__pattern.repeat' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'pattern.repeat',
				],
				'button.decoration.background__pattern.blend' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'pattern.blend',
				],
				'button.decoration.background__mask.style' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style', 'html' ],
					'subName'  => 'mask.style',
				],
				'button.decoration.background__mask.enabled' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style', 'html' ],
					'subName'  => 'mask.enabled',
				],
				'button.decoration.background__mask.color' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style', 'html' ],
					'subName'  => 'mask.color',
				],
				'button.decoration.background__mask.transform' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'mask.transform',
				],
				'button.decoration.background__mask.aspectRatio' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'mask.aspectRatio',
				],
				'button.decoration.background__mask.size'  => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'mask.size',
				],
				'button.decoration.background__mask.width' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'mask.width',
				],
				'button.decoration.background__mask.height' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'mask.height',
				],
				'button.decoration.background__mask.position' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'mask.position',
				],
				'button.decoration.background__mask.horizontalOffset' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'mask.horizontalOffset',
				],
				'button.decoration.background__mask.verticalOffset' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'mask.verticalOffset',
				],
				'button.decoration.background__mask.blend' => [
					'attrName' => 'button.decoration.background',
					'preset'   => [ 'style' ],
					'subName'  => 'mask.blend',
				],
				'button.decoration.border__radius'         => [
					'attrName' => 'button.decoration.border',
					'preset'   => [ 'style' ],
					'subName'  => 'radius',
				],
				'button.decoration.border__styles'         => [
					'attrName' => 'button.decoration.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles',
				],
				'button.decoration.border__styles.all.width' => [
					'attrName' => 'button.decoration.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.all.width',
				],
				'button.decoration.border__styles.top.width' => [
					'attrName' => 'button.decoration.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.top.width',
				],
				'button.decoration.border__styles.right.width' => [
					'attrName' => 'button.decoration.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.right.width',
				],
				'button.decoration.border__styles.bottom.width' => [
					'attrName' => 'button.decoration.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.bottom.width',
				],
				'button.decoration.border__styles.left.width' => [
					'attrName' => 'button.decoration.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.left.width',
				],
				'button.decoration.border__styles.all.color' => [
					'attrName' => 'button.decoration.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.all.color',
				],
				'button.decoration.border__styles.top.color' => [
					'attrName' => 'button.decoration.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.top.color',
				],
				'button.decoration.border__styles.right.color' => [
					'attrName' => 'button.decoration.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.right.color',
				],
				'button.decoration.border__styles.bottom.color' => [
					'attrName' => 'button.decoration.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.bottom.color',
				],
				'button.decoration.border__styles.left.color' => [
					'attrName' => 'button.decoration.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.left.color',
				],
				'button.decoration.border__styles.all.style' => [
					'attrName' => 'button.decoration.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.all.style',
				],
				'button.decoration.border__styles.top.style' => [
					'attrName' => 'button.decoration.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.top.style',
				],
				'button.decoration.border__styles.right.style' => [
					'attrName' => 'button.decoration.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.right.style',
				],
				'button.decoration.border__styles.bottom.style' => [
					'attrName' => 'button.decoration.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.bottom.style',
				],
				'button.decoration.border__styles.left.style' => [
					'attrName' => 'button.decoration.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.left.style',
				],
				'button.decoration.font.font__family'      => [
					'attrName' => 'button.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'family',
				],
				'button.decoration.font.font__weight'      => [
					'attrName' => 'button.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'weight',
				],
				'button.decoration.font.font__style'       => [
					'attrName' => 'button.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'style',
				],
				'button.decoration.font.font__lineColor'   => [
					'attrName' => 'button.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'lineColor',
				],
				'button.decoration.font.font__lineStyle'   => [
					'attrName' => 'button.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'lineStyle',
				],
				'button.decoration.font.font__color'       => [
					'attrName' => 'button.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'color',
				],
				'button.decoration.font.font__size'        => [
					'attrName' => 'button.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'size',
				],
				'button.decoration.font.font__letterSpacing' => [
					'attrName' => 'button.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'letterSpacing',
				],
				'button.decoration.font.font__lineHeight'  => [
					'attrName' => 'button.decoration.font.font',
					'preset'   => [ 'style' ],
					'subName'  => 'lineHeight',
				],
				'button.decoration.font.textShadow__style' => [
					'attrName' => 'button.decoration.font.textShadow',
					'preset'   => [ 'style' ],
					'subName'  => 'style',
				],
				'button.decoration.font.textShadow__horizontal' => [
					'attrName' => 'button.decoration.font.textShadow',
					'preset'   => [ 'style' ],
					'subName'  => 'horizontal',
				],
				'button.decoration.font.textShadow__vertical' => [
					'attrName' => 'button.decoration.font.textShadow',
					'preset'   => [ 'style' ],
					'subName'  => 'vertical',
				],
				'button.decoration.font.textShadow__blur'  => [
					'attrName' => 'button.decoration.font.textShadow',
					'preset'   => [ 'style' ],
					'subName'  => 'blur',
				],
				'button.decoration.font.textShadow__color' => [
					'attrName' => 'button.decoration.font.textShadow',
					'preset'   => [ 'style' ],
					'subName'  => 'color',
				],
				'button.decoration.button__icon.enable'    => [
					'attrName' => 'button.decoration.button',
					'preset'   => [ 'style' ],
					'subName'  => 'icon.enable',
				],
				'button.decoration.button__icon.settings'  => [
					'attrName' => 'button.decoration.button',
					'preset'   => [ 'html', 'style' ],
					'subName'  => 'icon.settings',
				],
				'button.decoration.button__icon.color'     => [
					'attrName' => 'button.decoration.button',
					'preset'   => [ 'style' ],
					'subName'  => 'icon.color',
				],
				'button.decoration.button__icon.placement' => [
					'attrName' => 'button.decoration.button',
					'preset'   => [ 'style' ],
					'subName'  => 'icon.placement',
				],
				'button.decoration.button__icon.onHover'   => [
					'attrName' => 'button.decoration.button',
					'preset'   => [ 'style' ],
					'subName'  => 'icon.onHover',
				],
				'button.decoration.spacing__margin'        => [
					'attrName' => 'button.decoration.spacing',
					'preset'   => [ 'style' ],
					'subName'  => 'margin',
				],
				'button.decoration.spacing__padding'       => [
					'attrName' => 'button.decoration.spacing',
					'preset'   => [ 'style' ],
					'subName'  => 'padding',
				],
				'button.decoration.boxShadow__style'       => [
					'attrName' => 'button.decoration.boxShadow',
					'preset'   => [ 'html', 'style' ],
					'subName'  => 'style',
				],
				'button.decoration.boxShadow__horizontal'  => [
					'attrName' => 'button.decoration.boxShadow',
					'preset'   => [
						'html',
						'style',
					],
					'subName'  => 'horizontal',
				],
				'button.decoration.boxShadow__vertical'    => [
					'attrName' => 'button.decoration.boxShadow',
					'preset'   => [
						'html',
						'style',
					],
					'subName'  => 'vertical',
				],
				'button.decoration.boxShadow__blur'        => [
					'attrName' => 'button.decoration.boxShadow',
					'preset'   => [
						'html',
						'style',
					],
					'subName'  => 'blur',
				],
				'button.decoration.boxShadow__spread'      => [
					'attrName' => 'button.decoration.boxShadow',
					'preset'   => [
						'html',
						'style',
					],
					'subName'  => 'spread',
				],
				'button.decoration.boxShadow__color'       => [
					'attrName' => 'button.decoration.boxShadow',
					'preset'   => [
						'html',
						'style',
					],
					'subName'  => 'color',
				],
				'button.decoration.boxShadow__position'    => [
					'attrName' => 'button.decoration.boxShadow',
					'preset'   => [ 'html', 'style' ],
					'subName'  => 'position',
				],
				'field.advanced.focus.border__radius'      => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'radius',
				],
				'field.advanced.focus.border__styles'      => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles',
				],
				'field.advanced.focus.border__styles.all.width' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.all.width',
				],
				'field.advanced.focus.border__styles.top.width' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.top.width',
				],
				'field.advanced.focus.border__styles.right.width' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.right.width',
				],
				'field.advanced.focus.border__styles.bottom.width' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.bottom.width',
				],
				'field.advanced.focus.border__styles.left.width' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.left.width',
				],
				'field.advanced.focus.border__styles.all.color' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.all.color',
				],
				'field.advanced.focus.border__styles.top.color' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.top.color',
				],
				'field.advanced.focus.border__styles.right.color' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.right.color',
				],
				'field.advanced.focus.border__styles.bottom.color' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.bottom.color',
				],
				'field.advanced.focus.border__styles.left.color' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.left.color',
				],
				'field.advanced.focus.border__styles.all.style' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.all.style',
				],
				'field.advanced.focus.border__styles.top.style' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.top.style',
				],
				'field.advanced.focus.border__styles.right.style' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.right.style',
				],
				'field.advanced.focus.border__styles.bottom.style' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.bottom.style',
				],
				'field.advanced.focus.border__styles.left.style' => [
					'attrName' => 'field.advanced.focus.border',
					'preset'   => [ 'style' ],
					'subName'  => 'styles.left.style',
				],
			]
		);
	}
}
