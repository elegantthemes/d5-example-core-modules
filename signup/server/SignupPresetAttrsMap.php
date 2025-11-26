<?php
/**
 * Module Library: Signup Module Preset Attributes Map
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Signup;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}


/**
 * Class SignupPresetAttrsMap
 *
 * @since ??
 *
 * @package ET\Builder\Packages\ModuleLibrary\Signup
 */
class SignupPresetAttrsMap {
	/**
	 * Get the preset attributes map for the Signup module.
	 *
	 * @since ??
	 *
	 * @param array  $map         The preset attributes map.
	 * @param string $module_name The module name.
	 *
	 * @return array
	 */
	public static function get_map( array $map, string $module_name ) {
		if ( 'divi/signup' !== $module_name ) {
			return $map;
		}

		unset( $map['button.decoration.button.innerContent__text'] );
		unset( $map['button.decoration.button.innerContent__linkUrl'] );
		unset( $map['button.decoration.button.innerContent__linkTarget'] );
		unset( $map['button.decoration.button.innerContent__rel'] );
		unset( $map['button.decoration.button.decoration.button__enable'] );
		unset( $map['button.decoration.button.decoration.button__icon.enable'] );
		unset( $map['button.decoration.button.decoration.button__icon.settings'] );
		unset( $map['button.decoration.button.decoration.button__icon.color'] );
		unset( $map['button.decoration.button.decoration.button__icon.placement'] );
		unset( $map['button.decoration.button.decoration.button__icon.onHover'] );
		unset( $map['button.decoration.button.decoration.button__alignment'] );
		unset( $map['button.decoration.button.decoration.background__color'] );
		unset( $map['button.decoration.button.decoration.background__gradient.stops'] );
		unset( $map['button.decoration.button.decoration.background__gradient.enabled'] );
		unset( $map['button.decoration.button.decoration.background__gradient.type'] );
		unset( $map['button.decoration.button.decoration.background__gradient.direction'] );
		unset( $map['button.decoration.button.decoration.background__gradient.directionRadial'] );
		unset( $map['button.decoration.button.decoration.background__gradient.repeat'] );
		unset( $map['button.decoration.button.decoration.background__gradient.length'] );
		unset( $map['button.decoration.button.decoration.background__gradient.overlaysImage'] );
		unset( $map['button.decoration.button.decoration.background__image.url'] );
		unset( $map['button.decoration.button.decoration.background__image.parallax.enabled'] );
		unset( $map['button.decoration.button.decoration.background__image.parallax.method'] );
		unset( $map['button.decoration.button.decoration.background__image.size'] );
		unset( $map['button.decoration.button.decoration.background__image.width'] );
		unset( $map['button.decoration.button.decoration.background__image.height'] );
		unset( $map['button.decoration.button.decoration.background__image.position'] );
		unset( $map['button.decoration.button.decoration.background__image.horizontalOffset'] );
		unset( $map['button.decoration.button.decoration.background__image.verticalOffset'] );
		unset( $map['button.decoration.button.decoration.background__image.repeat'] );
		unset( $map['button.decoration.button.decoration.background__image.blend'] );
		unset( $map['button.decoration.button.decoration.background__video.mp4'] );
		unset( $map['button.decoration.button.decoration.background__video.webm'] );
		unset( $map['button.decoration.button.decoration.background__video.width'] );
		unset( $map['button.decoration.button.decoration.background__video.height'] );
		unset( $map['button.decoration.button.decoration.background__video.allowPlayerPause'] );
		unset( $map['button.decoration.button.decoration.background__video.pauseOutsideViewport'] );
		unset( $map['button.decoration.button.decoration.background__pattern.style'] );
		unset( $map['button.decoration.button.decoration.background__pattern.enabled'] );
		unset( $map['button.decoration.button.decoration.background__pattern.color'] );
		unset( $map['button.decoration.button.decoration.background__pattern.transform'] );
		unset( $map['button.decoration.button.decoration.background__pattern.size'] );
		unset( $map['button.decoration.button.decoration.background__pattern.width'] );
		unset( $map['button.decoration.button.decoration.background__pattern.height'] );
		unset( $map['button.decoration.button.decoration.background__pattern.repeatOrigin'] );
		unset( $map['button.decoration.button.decoration.background__pattern.horizontalOffset'] );
		unset( $map['button.decoration.button.decoration.background__pattern.verticalOffset'] );
		unset( $map['button.decoration.button.decoration.background__pattern.repeat'] );
		unset( $map['button.decoration.button.decoration.background__pattern.blend'] );
		unset( $map['button.decoration.button.decoration.background__mask.style'] );
		unset( $map['button.decoration.button.decoration.background__mask.enabled'] );
		unset( $map['button.decoration.button.decoration.background__mask.color'] );
		unset( $map['button.decoration.button.decoration.background__mask.transform'] );
		unset( $map['button.decoration.button.decoration.background__mask.aspectRatio'] );
		unset( $map['button.decoration.button.decoration.background__mask.size'] );
		unset( $map['button.decoration.button.decoration.background__mask.width'] );
		unset( $map['button.decoration.button.decoration.background__mask.height'] );
		unset( $map['button.decoration.button.decoration.background__mask.position'] );
		unset( $map['button.decoration.button.decoration.background__mask.horizontalOffset'] );
		unset( $map['button.decoration.button.decoration.background__mask.verticalOffset'] );
		unset( $map['button.decoration.button.decoration.background__mask.blend'] );
		unset( $map['button.decoration.button.decoration.border__radius'] );
		unset( $map['button.decoration.button.decoration.border__styles'] );
		unset( $map['button.decoration.button.decoration.border__styles.all.width'] );
		unset( $map['button.decoration.button.decoration.border__styles.top.width'] );
		unset( $map['button.decoration.button.decoration.border__styles.right.width'] );
		unset( $map['button.decoration.button.decoration.border__styles.bottom.width'] );
		unset( $map['button.decoration.button.decoration.border__styles.left.width'] );
		unset( $map['button.decoration.button.decoration.border__styles.all.color'] );
		unset( $map['button.decoration.button.decoration.border__styles.top.color'] );
		unset( $map['button.decoration.button.decoration.border__styles.right.color'] );
		unset( $map['button.decoration.button.decoration.border__styles.bottom.color'] );
		unset( $map['button.decoration.button.decoration.border__styles.left.color'] );
		unset( $map['button.decoration.button.decoration.border__styles.all.style'] );
		unset( $map['button.decoration.button.decoration.border__styles.top.style'] );
		unset( $map['button.decoration.button.decoration.border__styles.right.style'] );
		unset( $map['button.decoration.button.decoration.border__styles.bottom.style'] );
		unset( $map['button.decoration.button.decoration.border__styles.left.style'] );
		unset( $map['button.decoration.button.decoration.spacing__margin'] );
		unset( $map['button.decoration.button.decoration.spacing__padding'] );
		unset( $map['button.decoration.button.decoration.boxShadow__style'] );
		unset( $map['button.decoration.button.decoration.boxShadow__horizontal'] );
		unset( $map['button.decoration.button.decoration.boxShadow__vertical'] );
		unset( $map['button.decoration.button.decoration.boxShadow__blur'] );
		unset( $map['button.decoration.button.decoration.boxShadow__spread'] );
		unset( $map['button.decoration.button.decoration.boxShadow__color'] );
		unset( $map['button.decoration.button.decoration.boxShadow__position'] );
		unset( $map['button.decoration.button.decoration.font.font__family'] );
		unset( $map['button.decoration.button.decoration.font.font__weight'] );
		unset( $map['button.decoration.button.decoration.font.font__style'] );
		unset( $map['button.decoration.button.decoration.font.font__lineColor'] );
		unset( $map['button.decoration.button.decoration.font.font__lineStyle'] );
		unset( $map['button.decoration.button.decoration.font.font__textAlign'] );
		unset( $map['button.decoration.button.decoration.font.font__color'] );
		unset( $map['button.decoration.button.decoration.font.font__size'] );
		unset( $map['button.decoration.button.decoration.font.font__letterSpacing'] );
		unset( $map['button.decoration.button.decoration.font.font__lineHeight'] );
		unset( $map['button.decoration.button.decoration.font.textShadow__style'] );
		unset( $map['button.decoration.button.decoration.font.textShadow__horizontal'] );
		unset( $map['button.decoration.button.decoration.font.textShadow__vertical'] );
		unset( $map['button.decoration.button.decoration.font.textShadow__blur'] );
		unset( $map['button.decoration.button.decoration.font.textShadow__color'] );
		unset( $map['button.decoration.font.font__lineHeight'] );
		unset( $map['field.decoration.background__gradient.stops'] );
		unset( $map['field.decoration.background__gradient.enabled'] );
		unset( $map['field.decoration.background__gradient.type'] );
		unset( $map['field.decoration.background__gradient.direction'] );
		unset( $map['field.decoration.background__gradient.directionRadial'] );
		unset( $map['field.decoration.background__gradient.repeat'] );
		unset( $map['field.decoration.background__gradient.length'] );
		unset( $map['field.decoration.background__gradient.overlaysImage'] );
		unset( $map['field.decoration.background__image.url'] );
		unset( $map['field.decoration.background__image.parallax.enabled'] );
		unset( $map['field.decoration.background__image.parallax.method'] );
		unset( $map['field.decoration.background__image.size'] );
		unset( $map['field.decoration.background__image.width'] );
		unset( $map['field.decoration.background__image.height'] );
		unset( $map['field.decoration.background__image.position'] );
		unset( $map['field.decoration.background__image.horizontalOffset'] );
		unset( $map['field.decoration.background__image.verticalOffset'] );
		unset( $map['field.decoration.background__image.repeat'] );
		unset( $map['field.decoration.background__image.blend'] );
		unset( $map['field.decoration.background__video.mp4'] );
		unset( $map['field.decoration.background__video.webm'] );
		unset( $map['field.decoration.background__video.width'] );
		unset( $map['field.decoration.background__video.height'] );
		unset( $map['field.decoration.background__video.allowPlayerPause'] );
		unset( $map['field.decoration.background__video.pauseOutsideViewport'] );
		unset( $map['field.decoration.background__pattern.style'] );
		unset( $map['field.decoration.background__pattern.enabled'] );
		unset( $map['field.decoration.background__pattern.color'] );
		unset( $map['field.decoration.background__pattern.transform'] );
		unset( $map['field.decoration.background__pattern.size'] );
		unset( $map['field.decoration.background__pattern.width'] );
		unset( $map['field.decoration.background__pattern.height'] );
		unset( $map['field.decoration.background__pattern.repeatOrigin'] );
		unset( $map['field.decoration.background__pattern.horizontalOffset'] );
		unset( $map['field.decoration.background__pattern.verticalOffset'] );
		unset( $map['field.decoration.background__pattern.repeat'] );
		unset( $map['field.decoration.background__pattern.blend'] );
		unset( $map['field.decoration.background__mask.style'] );
		unset( $map['field.decoration.background__mask.enabled'] );
		unset( $map['field.decoration.background__mask.color'] );
		unset( $map['field.decoration.background__mask.transform'] );
		unset( $map['field.decoration.background__mask.aspectRatio'] );
		unset( $map['field.decoration.background__mask.size'] );
		unset( $map['field.decoration.background__mask.width'] );
		unset( $map['field.decoration.background__mask.height'] );
		unset( $map['field.decoration.background__mask.position'] );
		unset( $map['field.decoration.background__mask.horizontalOffset'] );
		unset( $map['field.decoration.background__mask.verticalOffset'] );
		unset( $map['field.decoration.background__mask.blend'] );
		unset( $map['customFields.advanced.fields'] );
		unset( $map['customFields.advanced.notice'] );
		unset( $map['field.advanced.focus.font.font__size'] );
		unset( $map['field.advanced.focus.font.font__letterSpacing'] );
		unset( $map['field.advanced.focus.font.font__lineHeight'] );

		return array_merge(
			$map,
			[
				'title.innerContent'                       => [
					'attrName' => 'title.innerContent',
					'preset'   => 'content',
				],
				'button.innerContent__text'                => [
					'attrName' => 'button.innerContent',
					'preset'   => 'content',
					'subName'  => 'text',
				],
				'module.advanced.emailService__provider'   => [
					'attrName' => 'module.advanced.emailService',
					'preset'   => 'content',
					'subName'  => 'provider',
				],
				'module.advanced.emailService__account'    => [
					'attrName' => 'module.advanced.emailService',
					'preset'   => 'content',
					'subName'  => 'account',
				],
				'module.advanced.spamProtection__enabled'  => [
					'attrName' => 'module.advanced.spamProtection',
					'preset'   => 'content',
					'subName'  => 'enabled',
				],
				'module.advanced.spamProtection__provider' => [
					'attrName' => 'module.advanced.spamProtection',
					'preset'   => 'content',
					'subName'  => 'provider',
				],
				'module.advanced.spamProtection__account'  => [
					'attrName' => 'module.advanced.spamProtection',
					'preset'   => 'content',
					'subName'  => 'account',
				],
				'module.advanced.spamProtection__minScore' => [
					'attrName' => 'module.advanced.spamProtection',
					'preset'   => 'content',
					'subName'  => 'minScore',
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
				'button.innerContent__rel'                 => [
					'attrName' => 'button.innerContent',
					'preset'   => [ 'html' ],
					'subName'  => 'rel',
				],
				'button.decoration.button__icon.onHover'   => [
					'attrName' => 'button.decoration.button',
					'preset'   => [ 'style' ],
					'subName'  => 'icon.onHover',
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
