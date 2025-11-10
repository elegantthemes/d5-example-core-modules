<?php
/**
 * ModuleLibrary: Login Module class.
 *
 * @package Divi
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Login;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\Framework\Utility\SanitizerUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\IconLibrary\IconFont\Utils;
use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewScriptData;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewUtils;
use ET\Builder\Packages\Module\Layout\Components\StyleCommon\CommonStyle;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\Module\Options\Element\ElementClassnames;
use ET\Builder\Packages\Module\Options\Element\ElementStyle;
use ET\Builder\Packages\Module\Options\FormField\FormFieldStyle;
use ET\Builder\Packages\Module\Options\Text\TextClassnames;
use ET\Builder\Packages\Module\Options\Text\TextStyle;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\ModuleUtils\ChildrenUtils;
use ET\Builder\Packages\ModuleUtils\ModuleUtils;
use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;
use WP_Block;


/**
 * LoginModule class.
 *
 * This class contains functions used for LoginModule such as Front-End rendering, REST API Endpoints etc.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 */
class LoginModule implements DependencyInterface {

	/**
	 * Render the "LoggedIn" module as content.
	 *
	 * This function is used to render the "LoggedIn" module as content, which includes the user's display name and a "Log out" link.
	 * The function checks if the user is logged-in and if the page is not in customize or preview mode.
	 * It appends a line break (<br />) to the provided `content` if it is not empty.
	 *
	 * @since ??
	 *
	 * @param string $content                The existing content to append the "LoggedIn" module content to.
	 * @param string $current_page_redirect  Optional. The current page redirect setting. Default empty string.
	 *                                       If provided, it is used to generate the redirect URL for the "Log out" link.
	 *
	 * @return string The updated content with the "LoggedIn" module content.
	 *
	 * @example:
	 * ```php
	 *     $content_with_logged_in_as = render_logged_in_as_content('Welcome, user!', 'on');
	 *     echo $content_with_logged_in_as;
	 *     // Output: 'Welcome, user! <br /> Logged in as John Doe <a href="https://example.com/logout">Log out</a>'
	 * ```
	 */
	public static function render_logged_in_as_content( string $content, string $current_page_redirect ): string {
		$content = wpautop( $content );

		if ( ! is_user_logged_in() || is_customize_preview() || is_et_pb_preview() ) {
			return $content;
		}

		if ( '' !== $content ) {
			$content .= '<br />';
		}

		$current_user = wp_get_current_user();
		$redirect_url = ( isset( $_SERVER['HTTP_HOST'], $_SERVER['REQUEST_URI'] ) && 'on' === $current_page_redirect )
			? ( is_ssl() ? 'https://' : 'http://' ) . sanitize_text_field( $_SERVER['HTTP_HOST'] ) . sanitize_text_field( $_SERVER['REQUEST_URI'] )
			: '';

		$content .= sprintf( esc_html__( 'Logged in as %1$s', 'et_builder_5' ), esc_html( $current_user->display_name ) );

		$content .= ' ' . HTMLUtility::render(
			[
				'tag'               => 'a',
				'attributes'        => [
					'href' => wp_logout_url( $redirect_url ),
				],
				'children'          => esc_html__( 'Log out', 'et_builder_5' ),
				'childrenSanitizer' => 'et_core_esc_previously',
			]
		);

		return $content;
	}

	/**
	 * Generate classnames for the module.
	 *
	 * This function generates classnames for the module based on the provided arguments.
	 *
	 * This function is equivalent of JS const:
	 * {@link /docs/builder-api/js/module-library/module-classnames moduleClassnames} located in `@divi/module-library`.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *     @type object $classnamesInstance Module classnames instance.
	 *     @type array  $attrs              Block attributes data that is being rendered.
	 * }
	 *
	 * @return void
	 */
	public static function module_classnames( array $args ): void {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];

		$use_focus_border_color = $attrs['field']['advanced']['focusUseBorder']['desktop']['value'] ?? 'off';
		$background_color       = $attrs['module']['decoration']['background']['desktop']['value']['color'] ?? '#7EBEC5';
		$title                  = $attrs['title']['innerContent']['desktop']['value'] ?? '';
		$content                = $attrs['content']['innerContent']['desktop']['value'] ?? '';

		if ( is_customize_preview() ) {
			$classnames_instance->add( 'et_pb_in_customizer' );
		}

		// Module classnames.
		$classnames_instance->add( 'et_pb_newsletter' );

		// Text options.
		$classnames_instance->add( TextClassnames::text_options_classnames( $attrs['module']['advanced']['text'] ?? [] ), true );

		$classnames_instance->add( 'et_pb_with_focus_border', 'on' === $use_focus_border_color );
		$classnames_instance->add( 'et_pb_newsletter_description_no_title', empty( $title ) );
		$classnames_instance->add( 'et_pb_newsletter_description_no_content', empty( $content ) );
		$classnames_instance->add( 'et_pb_no_bg', empty( $background_color ) );

		// Module.
		$classnames_instance->add(
			ElementClassnames::classnames(
				[
					'attrs' => array_merge(
						$attrs['module']['decoration'] ?? [],
						[
							'link' => $attrs['module']['advanced']['link'] ?? [],
						]
					),
				]
			)
		);
	}

	/**
	 * Sets the script data for a module.
	 *
	 * This function assigns variables and sets the script data options for a module.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     Optional. An array of arguments for setting the module script data.
	 *
	 *     @type string   $id             The ID of the module.
	 *     @type string   $name           The name of the module.
	 *     @type string   $selector       The CSS selector for the module.
	 *     @type array    $attrs          The attributes of the module.
	 *     @type object   $elements       The elements object.
	 *     @type int      $storeInstance  The ID of instance where this block stored in BlockParserStore.
	 * }
	 *
	 * @return void
	 *
	 * @example:
	 * ```php
	 *     module_script_data( [
	 *         'id'             => 'module-1',
	 *         'name'           => 'My Module',
	 *         'selector'       => '.module-container',
	 *         'attrs'          => [
	 *             'title'   => [ 'innerContent' => [ 'Title' ] ],
	 *             'content' => [ 'innerContent' => [ 'Content' ] ],
	 *             'module'  => [ 'advanced' => [ 'currentPageRedirect' => [] ] ]
	 *         ],
	 *         'elements'       => $elements,
	 *         'storeInstance'  => $storeInstance,
	 *     ] );
	 * ```
	 */
	public static function module_script_data( array $args ): void {
		// Assign variables.
		$id             = $args['id'] ?? '';
		$name           = $args['name'] ?? '';
		$selector       = $args['selector'] ?? '';
		$attrs          = $args['attrs'] ?? [];
		$elements       = $args['elements'];
		$store_instance = $args['storeInstance'] ?? null;

		// Element Script Data Options.
		$elements->script_data(
			[
				'attrName' => 'module',
			]
		);

		MultiViewScriptData::set(
			[
				'id'            => $id,
				'name'          => $name,
				'storeInstance' => $store_instance,
				'hoverSelector' => $selector,
				'setClassName'  => [
					[
						'selector'      => $selector,
						'data'          => [
							'et_pb_newsletter_description_no_title'   => $attrs['title']['innerContent'] ?? [],
							'et_pb_newsletter_description_no_content' => $attrs['content']['innerContent'] ?? [],
						],
						'valueResolver' => function ( $value ) {
							return empty( $value ) ? 'add' : 'remove';
						},
					],
				],
				'setVisibility' => [
					[
						'selector'      => "$selector .et_pb_newsletter_description",
						'data'          => MultiViewUtils::merge_values(
							[
								'title'   => $attrs['title']['innerContent'] ?? [],
								'content' => $attrs['content']['innerContent'] ?? [],
							]
						),
						'valueResolver' => function ( $value ) use ( $elements ) {
							return ! ( '' === ( $value['title'] ?? '' ) && '' === ( $value['content'] ?? '' ) ) ? 'visible' : 'hidden';
						},
					],
				],
			]
		);
	}

	/**
	 * Get the custom CSS fields for the Divi Login block.
	 *
	 * This function retrieves the custom CSS fields defined for the Divi login block.
	 *
	 * This function is equivalent of JS const:
	 * {@link /docs/builder-api/js-beta/divi-module-library/functions/generateDefaultAttrs cssFields} located in `@divi/module-library`.
	 *
	 * Note that this function does not have a `label` property on each array item, unlike the JS const cssFields.
	 *
	 * @since ??
	 *
	 * @return array An array of custom CSS fields for the Divi login block.
	 */
	public static function custom_css(): array {
		return \WP_Block_Type_Registry::get_instance()->get_registered( 'divi/login' )->customCssFields;
	}

	/**
	 * Get Button icon style declaration.
	 *
	 * This function is used to declare the style for the icon in the Login module.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array      $attrValue  The value (breakpoint > state > value) of module attribute.
	 * }
	 *
	 * @return string The icon style declarations.
	 *
	 * @example:
	 * ```php
	 * $params = array(
	 *     'attrValue'  => array(
	 *         'icon' => array(
	 *             'type' => 'fa',
	 *             'weight' => '400',
	 *             'unicode' => 'e029',
	 *         ),
	 *     ),
	 * );
	 * $icon_style = LoginModule::icon_style_declaration( $params );
	 * ```
	 *
	 * @example:
	 * ```php
	 * $params = array(
	 *     'attrValue'  => array(
	 *         'iconColor' => '#ffffff',
	 *         'hoverIcon' => array(
	 *             'type'    => 'eticon',
	 *             'family'  => 'ETmodules',
	 *             'weight'  => '400',
	 *             'unicode' => 'e01f',
	 *         ),
	 *     ),
	 * );
	 * $icon_style = LoginModule::icon_style_declaration( $params );
	 * ```
	 */
	public static function icon_style_declaration( array $params ): string {
		$icon_attr = $params['attrValue']['icon'] ?? [];

		$icon_placement = $icon_attr['placement'] ?? 'right';

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => [
					'font-family' => true,
					'margin-left' => true,
					'font-size'   => true,
					'line-height' => true,
					'font-weight' => true,
				],
			]
		);

		$margin_left = 'left' === $icon_placement ? '-1.3em' : '.3em';

		if ( ! empty( $icon_attr['settings']['type'] ) ) {
			$font_family = 'fa' === $icon_attr['settings']['type'] ? 'FontAwesome' : 'ETmodules';
			$style_declarations->add( 'font-family', $font_family );
		}

		if ( ! empty( $icon_attr['settings'] ) ) {
			$icon_unicode = Utils::escape_font_icon( Utils::process_font_icon( $icon_attr['settings'] ) );

			$style_declarations->add( 'content', "'{$icon_unicode}'" );
		}

		$style_declarations->add( 'margin-left', $margin_left );
		$style_declarations->add( 'font-size', 'inherit' );
		$style_declarations->add( 'line-height', 'inherit' );
		$style_declarations->add( 'font-weight', 'inherit' );
		$style_declarations->add( 'display', 'inline-block' );

		if ( 'left' === $icon_placement ) {
			$style_declarations->add( 'right', 'auto' );
		}

		return $style_declarations->value();
	}

	/**
	 * Get the Frontend specific CSS style declarations for the placement of an icon.
	 *
	 * This function takes an array of parameters and retrieves the value of the `icon` attribute.
	 * If the `icon` attribute is not set, it returns an empty array.
	 * It then checks the value of the `placement` property of the `icon` attribute.
	 * If the `placement` property is set to `left`, it adds CSS style declarations for hiding the icon and aligning it to the right.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of parameters.
	 *
	 *     @type array  $attrValue  The value (breakpoint > state > value) of module attribute.
	 * }
	 *
	 * @return string The CSS style declarations for the placement of the icon.
	 *
	 * @example:
	 * ```php
	 *     $params = [
	 *         'attrValue' => [
	 *             'icon' => [
	 *                 'placement' => 'left',
	 *             ],
	 *         ],
	 *     ];
	 *     $styleDeclarations = LoginModule::icon_style_fe_declaration( $params );
	 *
	 *     echo $styleDeclarations;
	 * ```

	 * @example:
	 * ```php
	 *     $params = [
	 *         'attrValue' => [
	 *             'icon' => [
	 *                 'placement' => 'right',
	 *             ],
	 *         ],
	 *     ];
	 *     $styleDeclarations = LoginModule::icon_style_fe_declaration( $params );
	 *
	 *     echo $styleDeclarations;
	 * ```
	 */
	public static function icon_style_fe_declaration( array $params ): string {
		$icon_attr = $params['attrValue']['icon'] ?? [];

		$icon_placement = $icon_attr['placement'] ?? 'right';

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		if ( 'left' === $icon_placement ) {
			$style_declarations->add( 'display', 'none' );
			$style_declarations->add( 'margin-right', 'auto' );
		}

		return $style_declarations->value();
	}

	/**
	 * Generates the style declaration for hover button icon.
	 *
	 * This function generates the style declaration for the hover button icon based on the provided parameters.
	 *
	 * @since ??
	 *
	 * @param array $params {
	 *     An array of parameters.
	 *
	 *     @type array $attrValue {
	 *         The value (breakpoint > state > value) of module attribute.
	 *
	 *         @type array $icon {
	 *             An array specifying the icon settings.
	 *
	 *             @type string $onHover   Whether the icon should be displayed on hover or not.
	 *             @type string $placement The placement of the icon.
	 *             @type array  $settings  The icon settings.
	 *         }
	 *     }
	 * }
	 * @return string The generated style declaration.
	 *
	 * @example:
	 * ```php
	 *     LoginModule::hover_icon_style_declaration( [
	 *         'attrValue' => [
	 *             'icon' => [
	 *                 'onHover' => 'on',
	 *                 'placement' => 'right',
	 *                 'settings' => [
	 *                     'font' => 'Font Awesome',
	 *                     'icon' => 'fa-envelope',
	 *                     'size' => '16px',
	 *                 ],
	 *             ],
	 *         ],
	 *     ] );
	 * ```
	 */
	public static function hover_icon_style_declaration( array $params ): string {
		$icon_attr = $params['attrValue']['icon'] ?? [];

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		$hover_enabled  = $icon_attr['onHover'] ?? 'on';
		$icon_placement = $icon_attr['placement'] ?? 'right';

		if ( $hover_enabled ) {
			if ( ! empty( $icon_attr['settings'] ) ) {
				$icon_unicode = Utils::escape_font_icon( Utils::process_font_icon( $icon_attr['settings'] ) );

				$style_declarations->add( 'content', "'{$icon_unicode}'" );
			}

			if ( 'left' === $icon_placement ) {
				$style_declarations->add( 'padding-right', '0.7em' );
			}

			// Override FE hover padding.
			if ( 'right' === $icon_placement ) {
				$style_declarations->add( 'padding-left', '0em' );
				$style_declarations->add( 'padding-right', '0em' );
			}

			$style_declarations->add( 'opacity', '1' );
		}

		return $style_declarations->value();
	}

	/**
	 * Style declaration for login's border overflow.
	 *
	 * This function is used to generate the style declaration for the border overflow of a login module.
	 *
	 * @since ??
	 *
	 * @param array $params An array of arguments.
	 *
	 * @return string The generated CSS style declaration.
	 *
	 * @example
	 * ```php
	 * $args = [
	 *   'attrValue' => [
	 *     'radius' => [
	 *       'desktop' => [
	 *         'default' => '10px',
	 *         'hover'   => '8px',
	 *       ],
	 *     ],
	 *   ],
	 *   'important'  => true,
	 *   'returnType' => 'string',
	 * ];
	 * $styleDeclaration = AccordionModule::overflow_style_declaration( $args );
	 * ```
	 */
	public static function overflow_style_declaration( array $params ): string {
		$radius = $params['attrValue']['radius'] ?? [];

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		if ( ! $radius ) {
			return $style_declarations->value();
		}

		$all_corners_zero = true;

		// Check whether all corners are zero.
		// If any corner is not zero, update the variable and break the loop.
		foreach ( $radius as $corner => $value ) {
			if ( 'sync' === $corner ) {
				continue;
			}

			$corner_value = SanitizerUtility::numeric_parse_value( $value ?? '' );
			if ( 0.0 !== ( $corner_value['valueNumber'] ?? 0.0 ) ) {
				$all_corners_zero = false;
				break;
			}
		}

		if ( $all_corners_zero ) {
			return $style_declarations->value();
		}

		// Add overflow hidden when any corner's border radius is not zero.
		$style_declarations->add( 'overflow', 'hidden' );

		return $style_declarations->value();
	}

	/**
	 * Adds Login module styles to the stylesheet.
	 *
	 * This function is responsible for generating and adding module styles to the stylesheet based on these arguments.
	 *
	 * This function is equivalent of JS const:
	 * {@link /docs/builder-api/js/module-library/module-styles moduleStyles} located in `@divi/module-library`.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     Array of arguments for generating module styles.
	 *
	 *     @type array    $attrs           Optional. The attributes of the module. Default `[]`.
	 *     @type array    $settings        Optional. The settings of the module. Default `[]`.
	 *     @type string   $orderClass      The order class for the module.
	 *     @type string   $id              The ID of the module.
	 *     @type string   $name            The name of the module.
	 *     @type int      $orderIndex      The order index of the module.
	 *     @type mixed    $storeInstance   The store instance.
	 *     @type ModuleElements $elements  The ModuleElements instance.
	 * }
	 *
	 * @return void
	 *
	 * @example:
	 * ```php
	 * // Add module styles for a login module
	 * $args = [
	 *     'attrs' => [
	 *         'field' => [
	 *             // attribute settings...
	 *         ],
	 *         // other attributes...
	 *     ],
	 *     'elements' => $elementsObject,
	 *     'settings' => [
	 *         'disabledModuleVisibility' => true,
	 *         // other settings...
	 *     ],
	 *     'orderClass' => '.example-login',
	 *     'id' => 'login-123',
	 *     'name' => 'Login Module',
	 *     'orderIndex' => 1,
	 *     'storeInstance' => $store,
	 * ];
	 *
	 * LoginModule::module_styles( $args );
	 * ```
	 */
	public static function module_styles( array $args ): void {
		$attrs       = $args['attrs'] ?? [];
		$elements    = $args['elements'];
		$settings    = $args['settings'] ?? [];
		$order_class = $args['orderClass'] ?? '';

		$main_selector = "{$args['orderClass']}.et_pb_login";

		$icon_placement_value = ! empty( $attrs['button']['icon']['desktop']['value']['placement'] ) ?
			$attrs['button']['icon']['desktop']['value']['placement'] : 'right';

		$icon_placement = 'left' === $icon_placement_value ? 'before' : 'after';

		// If the form field is processed with the `style` method of module elements and along with the additional styles
		// under the `advancedStyles` property, we don't need to copy the transition attribute because the `style` method
		// will handle it. However, the `FormFieldStyle` component is basically a collection of `ElementStyle` components,
		// not just one. So, we can't use `style` method of module elements and need to copy the transition attribute from
		// the `module` decoration to the `field` decoration because the `transition` attribute is on module level and not
		// on field level. This is needed to make sure custom transitions setting values are applied to the form field.
		if ( ! empty( $attrs['field']['decoration'] ) && ! empty( $attrs['module']['decoration']['transition'] ) ) {
			$attrs['field']['decoration']['transition'] = $attrs['module']['decoration']['transition'];
		}

		Style::add(
			[
				'id'            => $args['id'],
				'name'          => $args['name'],
				'orderIndex'    => $args['orderIndex'],
				'storeInstance' => $args['storeInstance'],
				'styles'        => [
					// Module.
					$elements->style(
						[
							'attrName'   => 'module',
							'styleProps' => [
								'disabledOn'     => [
									'disabledModuleVisibility' => $settings['disabledModuleVisibility'] ?? null,
								],
								'advancedStyles' => [
									[
										'componentName' => 'divi/text',
										'props'         => [
											'selector'    => implode(
												', ',
												[
													"{$args['orderClass']} .et_pb_module_header",
													"{$args['orderClass']} .et_pb_newsletter_description_content",
													"{$args['orderClass']} .et_pb_forgot_password a",
												]
											),
											'attr'        => $attrs['module']['advanced']['text'] ?? [],
											'orientation' => false,
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'attr' => $attrs['module']['decoration']['border'] ?? [],
											'declarationFunction' => [ self::class, 'overflow_style_declaration' ],
										],
									],
								],
							],
						]
					),
					FormFieldStyle::style(
						[
							'selector'          => implode(
								', ',
								[
									"{$args['orderClass']} input[type='password']",
									"{$args['orderClass']} input[type='text']",
									"{$args['orderClass']} textarea",
									"{$args['orderClass']} input",
								]
							),
							'attr'              => $attrs['field'] ?? [],
							'important'         => [
								'spacing' => [
									'desktop' => [
										'value' => [
											'padding' => true,
										],
									],
								],
							],
							'propertySelectors' => [
								'font'        => [
									'font' => [
										'desktop' => [
											'value' => [
												'color' => implode(
													', ',
													[
														"{$args['orderClass']} input[type='password']",
														"{$args['orderClass']} input[type='text']",
														"{$args['orderClass']} textarea",
														"{$args['orderClass']} input",
														"{$args['orderClass']} input::placeholder",
													]
												),
											],
										],
									],
								],
								'placeholder' => [
									'font' => [
										'font' => [
											'desktop' => [
												'value' => [
													'color' => "{$args['orderClass']} .et_pb_newsletter_form p input",
												],
											],
										],
									],
								],
								'boxShadow'   => [
									'desktop' => [
										'value' => [
											'box-shadow' => "{$args['orderClass']} .et_pb_newsletter_form input",
										],
									],
								],
								'border'      => [
									'desktop' => [
										'value' => [
											'border' => "{$args['orderClass']} .et_pb_newsletter_form p input",
										],
									],
								],
								'focus'       => [
									'background' => [
										'desktop' => [
											'value' => [
												'background-color' => "{$args['orderClass']} .et_pb_newsletter_form p input",
											],
										],
									],
									'border'     => [
										'desktop' => [
											'value' => [
												'border' => "{$args['orderClass']} .et_pb_newsletter_form p input",
											],
										],
									],
									'font'       => [
										'font' => [
											'desktop' => [
												'value' => [
													'color' => "{$args['orderClass']} .et_pb_newsletter_form p input",
												],
											],
										],
									],
								],
							],
							'orderClass'        => $order_class,
						]
					),
					// Title.
					$elements->style(
						[
							'attrName' => 'title',
						]
					),
					// Description.
					$elements->style(
						[
							'attrName' => 'content',
						]
					),
					// Button.
					$elements->style(
						[
							'attrName'   => 'button',
							'styleProps' => [
								'advancedStyles' => [
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "body #page-container .et_pb_section {$main_selector} button.et_pb_newsletter_button.et_pb_button:{$icon_placement}",
											'attr'     => $attrs['button']['decoration']['button'] ?? [],
											'declarationFunction' => [ self::class, 'icon_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => implode(
												', ',
												[
													"body #page-container .et_pb_section {$main_selector} .et_pb_newsletter_button.et_pb_button",
													"body #page-container .et_pb_section {$main_selector} .et_pb_newsletter_button.et_pb_button:hover",
												]
											),
											'attr'     => $attrs['button']['decoration']['button'] ?? [],
											'declarationFunction' => [ self::class, 'icon_style_fe_declaration' ],
											'selectorFunction' => function ( $params ) {
												$params = wp_parse_args(
													$params,
													[
														'selector' => null,
													]
												);

												$selector = $params['selector'];

												return implode(
													', ',
													array_map(
														static function ( $element ) {
															return $element . ':after';
														},
														explode( ', ', $selector )
													)
												);
											},
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => implode(
												', ',
												[
													"body #page-container .et_pb_section {$main_selector} button.et_pb_newsletter_button.et_pb_button:hover",
													"body #page-container .et_pb_section {$main_selector} button.et_pb_newsletter_button.et_pb_button:hover:{$icon_placement}",
												]
											),
											'attr'     => $attrs['button']['decoration']['button'] ?? [],
											'declarationFunction' => [ self::class, 'hover_icon_style_declaration' ],
										],
									],
								],
							],
						]
					),

					// Module - Only for Custom CSS.
					CssStyle::style(
						[
							'selector'  => $args['orderClass'],
							'attr'      => $attrs['css'] ?? [],
							'cssFields' => self::custom_css(),
						]
					),
				],
			]
		);
	}

	/**
	 * Render callback for the Login module.
	 *
	 * This function is responsible for rendering the server-side HTML of the module on the FrontEnd (FE).
	 *
	 * This function is equivalent of JS function:
	 * {@link /docs/builder-api/js/module-library/login-edit TextEdit}
	 * located in `@divi/module-library` package.
	 *
	 * @since ??
	 *
	 * @param array          $attrs                 The block attributes that were saved by the Visual Builder.
	 * @param string         $child_modules_content The block content from child modules.
	 * @param WP_Block       $block                 The parsed block object that is being rendered.
	 * @param ModuleElements $elements              An instance of the ModuleElements class.
	 *
	 * @return string The rendered HTML for the module.
	 *
	 * @example:
	 * ```php
	 * $attrs = [
	 *     'attrName' => 'value',
	 *     //...
	 * ];
	 * $content = 'This is the content';
	 * $block = new WP_Block();
	 * $elements = new ModuleElements();
	 *
	 * $html = LoginModule::render_callback( $attrs, $content, $block, $elements );
	 * echo $html;
	 * ```
	 */
	public static function render_callback( array $attrs, string $child_modules_content, WP_Block $block, ModuleElements $elements ): string {
		// Extract child modules IDs using helper utility.
		$children_ids = ChildrenUtils::extract_children_ids( $block );

		// Get Parent.
		$parent = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );

		$current_page_redirect = $attrs['module']['advanced']['currentPageRedirect']['desktop']['value'] ?? 'off';
		$redirect_url          = ( isset( $_SERVER['HTTP_HOST'], $_SERVER['REQUEST_URI'] ) && 'on' === $current_page_redirect )
			? ( is_ssl() ? 'https://' : 'http://' ) . sanitize_text_field( $_SERVER['HTTP_HOST'] ) . sanitize_text_field( $_SERVER['REQUEST_URI'] )
			: '';

		$output = '';
		$form   = '';

		if ( ! is_user_logged_in() || is_customize_preview() || is_et_pb_preview() ) {
			$username   = esc_html__( 'Username', 'et_builder_5' );
			$password   = esc_html__( 'Password', 'et_builder_5' );
			$form_index = ( '' !== $block->parsed_block['orderIndex'] ? esc_attr( $block->parsed_block['orderIndex'] ) : uniqid( '', true ) );

			$button_element = $elements->render(
				[
					'attrName'     => 'button',
					'elementProps' => [
						'name'       => 'et_builder_submit_button',
						'hasWrapper' => false,
						'type'       => 'button',
					],
				]
			);

			$button_redirect = 'on' === $current_page_redirect ? HTMLUtility::render(
				[
					'tag'        => 'input',
					'attributes' => [
						'type'  => 'hidden',
						'name'  => 'redirect_to',
						'value' => esc_url( $redirect_url ),
					],
				]
			) : '';

			$button_container = HTMLUtility::render(
				[
					'tag'               => 'p',
					'children'          => $button_element . $button_redirect,
					'childrenSanitizer' => 'et_core_esc_previously',
				]
			);

			$user_login_label = HTMLUtility::render(
				[
					'tag'               => 'label',
					'attributes'        => [
						'class' => 'et_pb_contact_form_label',
						'for'   => 'user_login_' . $form_index,
						'style' => 'display: none;',
					],
					'children'          => $username,
					'childrenSanitizer' => 'esc_html',
				]
			);

			$user_login_input = $elements->render(
				[
					'attrName'         => 'field',
					'tagName'          => 'input',
					'skipAttrChildren' => true,
					'attributes'       => [
						'id'          => 'user_login_' . $form_index,
						'placeholder' => esc_html( $username ),
						'type'        => 'text',
						'value'       => '',
						'name'        => 'log',
					],
				]
			);

			$user_pass_label = HTMLUtility::render(
				[
					'tag'               => 'label',
					'attributes'        => [
						'class' => 'et_pb_contact_form_label',
						'for'   => 'user_pass_' . $form_index,
						'style' => 'display: none;',
					],
					'children'          => $password,
					'childrenSanitizer' => 'esc_html',
				]
			);

			$user_pass_input = $elements->render(
				[
					'attrName'         => 'field',
					'tagName'          => 'input',
					'skipAttrChildren' => true,
					'attributes'       => [
						'id'          => 'user_pass_' . $form_index,
						'placeholder' => esc_html( $password ),
						'type'        => 'password',
						'value'       => '',
						'name'        => 'pwd',
					],
				]
			);

			$user_login_field = HTMLUtility::render(
				[
					'tag'               => 'p',
					'attributes'        => [
						'class' => 'et_pb_contact_form_field',
					],
					'children'          => $user_login_label . $user_login_input,
					'childrenSanitizer' => 'et_core_esc_previously',
				]
			);

			$user_pass_field = HTMLUtility::render(
				[
					'tag'               => 'p',
					'attributes'        => [
						'class' => 'et_pb_contact_form_field',
					],
					'children'          => $user_pass_label . $user_pass_input,
					'childrenSanitizer' => 'et_core_esc_previously',
				]
			);

			$lost_password_url = HTMLUtility::render(
				[
					'tag'               => 'a',
					'attributes'        => [
						'href' => esc_url( wp_lostpassword_url() ),
					],
					'children'          => esc_html__( 'Forgot your password?', 'et_builder_5' ),
					'childrenSanitizer' => 'et_core_esc_previously',
				]
			);

			$forgot_password = HTMLUtility::render(
				[
					'tag'               => 'p',
					'attributes'        => [
						'class' => 'et_pb_forgot_password',
					],
					'children'          => $lost_password_url,
					'childrenSanitizer' => 'et_core_esc_previously',
				]
			);

			$login_form = HTMLUtility::render(
				[
					'tag'               => 'form',
					'attributes'        => [
						'action' => esc_url( site_url( 'wp-login.php', 'login_post' ) ),
						'method' => 'post',
					],
					'children'          => $user_login_field . $user_pass_field . $forgot_password . $button_container,
					'childrenSanitizer' => 'et_core_esc_previously',
				]
			);

			$form = HTMLUtility::render(
				[
					'tag'               => 'div',
					'attributes'        => [
						'class' => 'et_pb_newsletter_form et_pb_login_form',
					],
					'children'          => $login_form,
					'childrenSanitizer' => 'et_core_esc_previously',
				]
			);
		}

		// Title and content.
		$is_render_title       = ModuleUtils::has_value( $attrs['title']['innerContent'] ?? [] );
		$is_render_content     = ModuleUtils::has_value( $attrs['content']['innerContent'] ?? [] ) || ( is_user_logged_in() && ! is_customize_preview() && ! is_et_pb_preview() );
		$content               = $attrs['content']['innerContent']['desktop']['value'] ?? '';
		$current_page_redirect = $attrs['module']['advanced']['currentPageRedirect']['desktop']['value'] ?? 'off';

		$title_and_content = $is_render_title || $is_render_content ? HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class' => 'et_pb_newsletter_description',
				],
				'children'          => [
					$elements->render(
						[
							'attrName' => 'title',
						]
					),
					$elements->render(
						[
							'selector'      => '{{selector}} .et_pb_newsletter_description_content',
							'attrName'      => 'content',
							'valueResolver' => function ( $value ) use ( $current_page_redirect ) {
								return LoginModule::render_logged_in_as_content( $value ?? '', $current_page_redirect );
							},
						]
					),
				],
				'childrenSanitizer' => 'et_core_esc_previously',
			]
		) : '';

		if ( $title_and_content ) {
			$output .= et_core_esc_previously( $title_and_content );
		}

		$output .= $form;

		return Module::render(
			[
				// FE only.
				'orderIndex'          => $block->parsed_block['orderIndex'],
				'storeInstance'       => $block->parsed_block['storeInstance'],

				// VB equivalent.
				'attrs'               => $attrs,
				'elements'            => $elements,
				'id'                  => $block->parsed_block['id'],
				'name'                => $block->block_type->name,
				'classnamesFunction'  => [ self::class, 'module_classnames' ],
				'moduleCategory'      => $block->block_type->category,
				'stylesComponent'     => [ self::class, 'module_styles' ],
				'scriptDataComponent' => [ self::class, 'module_script_data' ],
				'parentId'            => $parent->id ?? '',
				'parentName'          => $parent->blockName ?? '', // phpcs:ignore ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- WP use snakeCase in \WP_Block_Parser_Block
				'parentAttrs'         => $parent->attrs ?? [],
				'childrenIds'         => $children_ids,
				'children'            => $elements->style_components(
					[
						'attrName' => 'module',
					]
				) . $output . $child_modules_content,
			]
		);
	}

	/**
	 * Load Login Module.
	 *
	 * This function loads the Login Module by registering it with the WordPress `init` action hook.
	 *
	 * This function also registers the Front-End render callback and REST API Endpoints.
	 *
	 * @since ??
	 *
	 * @return void
	 */
	public function load(): void {
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/login/';

		add_filter( 'divi_conversion_presets_attrs_map', array( LoginPresetAttrsMap::class, 'get_map' ), 10, 2 );

		// Ensure that all filters and actions applied during module registration are registered before calling `ModuleRegistration::register_module()`.
		// However, for consistency, register all module-specific filters and actions prior to invoking `ModuleRegistration::register_module()`.
		ModuleRegistration::register_module(
			$module_json_folder_path,
			[
				'render_callback' => [ self::class, 'render_callback' ],
			]
		);
	}
}
