<?php
/**
 * ModuleLibrary: Email Optin Module class.
 *
 * @package Builder\Packages\ModuleLibrary
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Signup;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- WordPress uses snakeCase in \WP_Block_Parser_Block

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\Conditions;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\Framework\Utility\SanitizerUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\FrontEnd\Module\Script;
use ET\Builder\FrontEnd\Module\ScriptData;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewScriptData;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewUtils;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\Module\Options\Element\ElementClassnames;
use ET\Builder\Packages\Module\Options\Element\ElementStyle;
use ET\Builder\Packages\Module\Options\FormField\FormFieldStyle;
use ET\Builder\Packages\Module\Options\Text\TextClassnames;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\ModuleLibrary\Signup\SignupHandler;
use ET\Builder\Packages\ModuleUtils\ChildrenUtils;
use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;
use ET\Builder\Packages\GlobalData\GlobalData;
use ET\Builder\Services\EmailAccountService\EmailAccountService;
use WP_Block_Type_Registry;
use WP_Block;


// phpcs:disable Squiz.Commenting.InlineComment -- Temporarily disabled to get the PR CI pass for now. TODO: Fix this later.
// phpcs:disable Squiz.PHP.CommentedOutCode.Found -- Temporarily disabled to get the PR CI pass for now. TODO: Fix this later.

/**
 * `SignupModule` is consisted of functions used for Email Optin Module such as Front-End rendering, REST API Endpoints etc.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 */
class SignupModule implements DependencyInterface {

	/**
	 * Module custom CSS fields.
	 *
	 * This function is equivalent of JS function cssFields located in
	 * visual-builder/packages/module-library/src/components/signup/custom-css.ts.
	 *
	 * @since ??
	 *
	 * @return array The array of custom CSS fields.
	 */
	public static function custom_css(): array {
		return WP_Block_Type_Registry::get_instance()->get_registered( 'divi/signup' )->customCssFields;
	}

	/**
	 * Set CSS class names to the module.
	 *
	 * This function is equivalent of JS function moduleClassnames located in
	 * visual-builder/packages/module-library/src/components/signup/module-classnames.ts.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *     @type string $id                  Module unique ID.
	 *     @type string $name                Module name with namespace.
	 *     @type array  $attrs               Module attributes.
	 *     @type array  $childrenIds         Module children IDs.
	 *     @type bool   $hasModule           Flag that indicates if module has child modules.
	 *     @type bool   $isFirst             Flag that indicates if module is first in the row.
	 *     @type bool   $isLast              Flag that indicates if module is last in the row.
	 *     @type object $classnamesInstance  Instance of Instance of ET\Builder\Packages\Module\Layout\Components\Classnames class.
	 *
	 *     // FE only.
	 *     @type int|null $storeInstance The ID of instance where this block stored in BlockParserStore.
	 *     @type int      $orderIndex    The order index of the element.
	 * }
	 */
	public static function module_classnames( $args ) {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];

		$classnames_instance->add( 'et_pb_newsletter', true );
		$classnames_instance->add( 'et_pb_subscribe', true );

		$use_spam_service = $attrs['module']['advanced']['spamProtection']['desktop']['value']['enabled'] ?? 'off';

		if ( 'on' === $use_spam_service ) {
			$classnames_instance->add( 'et_pb_recaptcha_enabled', true );
		}

		// Add background specific class.
		$background_color = $attrs['module']['decoration']['background']['desktop']['value']['color'] ?? '';
		if ( empty( $background_color ) ) {
			$classnames_instance->add( 'et_pb_no_bg', true );
		}

		// Add title specific class.
		$title = $attrs['title']['innerContent']['desktop']['value'] ?? '';
		if ( empty( $title ) ) {
			$classnames_instance->add( 'et_pb_newsletter_description_no_title', true );
		}

		// Add description/content specific class.
		$content = $attrs['content']['innerContent']['desktop']['value'] ?? '';
		if ( empty( $content ) ) {
			$classnames_instance->add( 'et_pb_newsletter_description_no_content', true );
		}

		// Use focus border attribute.
		$use_focus_border = $attrs['field']['advanced']['focusUseBorder']['desktop']['value'] ?? 'off';
		if ( 'on' === $use_focus_border ) {
			$classnames_instance->add( 'et_pb_with_focus_border', true );
		}

		// Text options.
		$classnames_instance->add( TextClassnames::text_options_classnames( $attrs['module']['advanced']['text'] ?? [] ), true );

		// Module.
		$classnames_instance->add(
			ElementClassnames::classnames(
				[
					'attrs' => array_merge(
						$attrs['module']['decoration'] ?? [],
						[
							'link' => $args['attrs']['module']['advanced']['link'] ?? [],
						]
					),
				]
			)
		);
	}

	/**
	 * Set script data to the module.
	 *
	 * This function is equivalent of JS function ModuleScriptData located in
	 * visual-builder/packages/module-library/src/components/signup/module-script-data.tsx.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *     @type string         $id            Module unique ID.
	 *     @type string         $name          Module name with namespace.
	 *     @type string         $selector      Module CSS selector.
	 *     @type array          $attrs         Module attributes.
	 *     @type array          $parentAttrs   Parent module attributes.
	 *     @type ModuleElements $elements      Instance of ModuleElements class.
	 *
	 *     // FE only.
	 *     @type int|null $storeInstance The ID of instance where this block stored in BlockParserStore.
	 *     @type int      $orderIndex    The order index of the element.
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

		// Set module specific front-end data.
		self::set_front_end_data(
			[
				'selector' => $selector,
			]
		);

		// Setup input field placeholder.
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
							'et_pb_newsletter_description_no_title' => $attrs['title']['innerContent'] ?? [],
						],
						'valueResolver' => function ( $value, $resolver_args ) {
							return 'et_pb_newsletter_description_no_title' === $resolver_args['className'] && empty( $value ?? '' ) ? 'add' : 'remove';
						},
					],
					[
						'selector'      => $selector,
						'data'          => [
							'et_pb_newsletter_description_no_content' => $attrs['content']['innerContent'] ?? [],
						],
						'valueResolver' => function ( $value, $resolver_args ) {
							return 'et_pb_newsletter_description_no_content' === $resolver_args['className'] && empty( $value ?? '' ) ? 'add' : 'remove';
						},
					],
					[
						'selector'      => $selector . ' .et_pb_newsletter_description',
						'data'          => [
							'et_multi_view_hidden' => MultiViewUtils::merge_values(
								[
									'title'   => $attrs['title']['innerContent'] ?? [],
									'content' => $attrs['content']['innerContent'] ?? [],
								]
							),
						],
						'valueResolver' => function ( $value, $resolver_args ) {
							return 'et_multi_view_hidden' === $resolver_args['className'] && empty( $value['title'] ?? '' ) && empty( $value['content'] ?? '' ) ? 'add' : 'remove';
						},
					],
				],
			]
		);
	}

	/**
	 * Email Optin Module with border style declaration.
	 *
	 * This function will declare input field with border style for Email Optin module.
	 *
	 * This function is the equivalent of the `fieldBorderStyleDeclaration` JS function located in
	 * visual-builder/packages/module-library/src/components/signup/style-declarations/field-border/index.ts.
	 *
	 * @param array $params {
	 *     An array of arguments.
	 *
	 *     @type array      $attrValue  The value (breakpoint > state > value) of module attribute.
	 *     @type bool|array $important  If set to true, the CSS will be added with !important.
	 *     @type string     $returnType This is the type of value that the function will return. Can be either string or key_value_pair.
	 * }
	 *
	 * @since ??
	 */
	public static function field_overflow_style_declaration( array $params ): string {
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

			// If value contains global variable, apply overflow:hidden.
			// Global variables can contain complex CSS (clamp, calc, vw, rem, etc.) that can't be parsed numerically.
			if ( GlobalData::is_global_variable_value( $value ?? '' ) ) {
				$all_corners_zero = false;
				break;
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
	 * Set CSS styles to the module.
	 *
	 * This function is equivalent of JS function ModuleStyles located in
	 * visual-builder/packages/module-library/src/components/signup/module-styles.tsx.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 *     @type string $id                       Module unique ID.
	 *     @type string $name                     Module name with namespace.
	 *     @type array  $attrs                    Module attributes.
	 *     @type array  $parentAttrs              Parent module attributes.
	 *     @type array  $siblingAttrs             Sibling module attributes.
	 *     @type array  $defaultPrintedStyleAttrs Default printed style attributes.
	 *     @type string $orderClass               Module CSS selector.
	 *     @type string $parentOrderClass         Parent module CSS selector.
	 *     @type string $wrapperOrderClass        Wrapper module CSS selector.
	 *     @type array  $settings                 Custom settings.
	 *     @type object $elements                 Instance of ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements class.
	 *
	 *     // VB only.
	 *     @type string $state Attributes state.
	 *     @type string $mode  Style mode.
	 *
	 *     // FE only.
	 *     @type int|null $storeInstance The ID of instance where this block stored in BlockParserStore.
	 *     @type int      $orderIndex    The order index of the element.
	 * }
	 */
	public static function module_styles( array $args ): void {
		$attrs       = $args['attrs'] ?? [];
		$elements    = $args['elements'];
		$settings    = $args['settings'] ?? [];
		$order_class = $args['orderClass'] ?? '';

		$default_printed_style_attrs = $args['defaultPrintedStyleAttrs'] ?? [];

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
								'defaultPrintedStyleAttrs' => $default_printed_style_attrs['module']['decoration'] ?? [],
								'disabledOn'               => [
									'disabledModuleVisibility' => $settings['disabledModuleVisibility'] ?? null,
								],
								'advancedStyles'           => [
									[
										'componentName' => 'divi/text',
										'props'         => [
											'selector' => "{$order_class} .et_pb_newsletter_description p, {$order_class} .et_pb_newsletter_description .et_pb_module_header",
											'attr'     => $attrs['module']['advanced']['text'] ?? [],
											'propertySelectors' => [
												'textShadow' => [
													'desktop' => [
														'value' => [
															'text-shadow' => "{$order_class} .et_pb_newsletter_description p, {$order_class} .et_pb_newsletter_description .et_pb_module_header",
														],
													],
												],
											],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => "{$order_class}.et_pb_subscribe",
											'attr'     => $attrs['module']['decoration']['border'] ?? [],
											'declarationFunction' => [ self::class, 'field_overflow_style_declaration' ],
										],
									],
									[
										'componentName' => 'divi/common',
										'props'         => [
											'selector' => implode(
												', ',
												[
													"{$order_class} .et_pb_newsletter_form p input[type=\"text\"]",
													"{$order_class} .et_pb_newsletter_form p textarea",
													"{$order_class} .et_pb_newsletter_form p select",
													"{$order_class} .et_pb_newsletter_form p .input[type=\"checkbox\"] + label i",
													"{$order_class} .et_pb_newsletter_form p .input[type=\"radio\"] + label i",
												]
											),
											'attr'     => $attrs['field']['decoration']['border'] ?? [],
											'declarationFunction' => [ self::class, 'field_overflow_style_declaration' ],
										],
									],
								],
							],
						]
					),
					// title.
					$elements->style(
						[
							'attrName' => 'title',
						]
					),
					// content.
					$elements->style(
						[
							'attrName' => 'content',
						]
					),
					// button.
					$elements->style(
						[
							'attrName' => 'button',
						]
					),
					// Email Optin module form field.
					FormFieldStyle::style(
						[
							'attr'              => $attrs['field'] ?? [],
							'selector'          => implode(
								', ',
								[
									"{$order_class} .et_pb_newsletter_form p .input[type=checkbox] + label",
									"{$order_class} .et_pb_newsletter_form p .input[type=radio] + label",
									"{$order_class} .et_pb_newsletter_form p .input",
								]
							),
							'important'         => [
								'spacing' => true,
								'font'    => [
									'font' => [
										'desktop' => [
											'value' => [
												'color' => true,
												'font-size' => true,
											],
										],
									],
								],
							],
							'propertySelectors' => [
								'boxShadow'  => [
									'desktop' => [
										'value' => [
											'box-shadow' => "{$order_class} .et_pb_newsletter_form p .input",
										],
									],
								],
								'border'     => [
									'desktop' => [
										'value' => [
											'border-radius' => implode(
												', ',
												[
													"{$order_class} .et_pb_newsletter_form p input[type=\"text\"]",
													"{$order_class} .et_pb_newsletter_form p textarea",
													"{$order_class} .et_pb_newsletter_form p select",
													"{$order_class} .et_pb_newsletter_form p .input[type=\"checkbox\"] + label i",
													"{$order_class} .et_pb_newsletter_form p .input[type=\"radio\"] + label i",
												]
											),
											'border-style' => implode(
												', ',
												[
													"{$order_class} .et_pb_newsletter_form p input[type=\"text\"]",
													"{$order_class} .et_pb_newsletter_form p textarea",
													"{$order_class} .et_pb_newsletter_form p select",
													"{$order_class} .et_pb_newsletter_form p .input[type=\"checkbox\"] + label i",
													"{$order_class} .et_pb_newsletter_form p .input[type=\"radio\"] + label i",
												]
											),
										],
									],
								],
								'spacing'    => [
									'desktop' => [
										'value' => [
											'margin'  => "{$order_class} .et_pb_newsletter_form p.et_pb_newsletter_field",
											'padding' => implode(
												', ',
												[
													"{$order_class} .et_pb_newsletter_form .input",
													"{$order_class} .et_pb_newsletter_form input[type=\"text\"]",
													"{$order_class} .et_pb_newsletter_form p.et_pb_newsletter_field input[type=\"text\"]",
													"{$order_class} .et_pb_newsletter_form textarea",
													"{$order_class} .et_pb_newsletter_form p.et_pb_newsletter_field textarea",
													"{$order_class} .et_pb_newsletter_form p select",
												]
											),
										],
									],
								],
								'background' => [
									'desktop' => [
										'value' => [
											'background-color' => implode(
												', ',
												[
													"{$order_class} .et_pb_newsletter_form p input[type=\"text\"]",
													"{$order_class} .et_pb_newsletter_form p textarea",
													"{$order_class} .et_pb_newsletter_form p select",
													"{$order_class} .et_pb_newsletter_form p .input[type=\"checkbox\"] + label i",
													"{$order_class} .et_pb_newsletter_form p .input[type=\"radio\"] + label i",
												]
											),
										],
										'hover' => [
											'background-color' => implode(
												', ',
												[
													"{$order_class} .et_pb_newsletter_form p input[type=\"text\"]",
													"{$order_class} .et_pb_newsletter_form p textarea",
													"{$order_class} .et_pb_newsletter_form p select",
													"{$order_class} .et_pb_newsletter_form p .input[type=\"checkbox\"] + label i",
													"{$order_class} .et_pb_newsletter_form p .input[type=\"radio\"] + label i",
												]
											),
										],
									],
								],
								'font'       => [
									'font' => [
										'desktop' => [
											'value' => [
												'color' => implode(
													', ',
													[
														"{$order_class} .et_pb_newsletter_form p input[type=\"text\"]",
														"{$order_class} .et_pb_newsletter_form p textarea",
														"{$order_class} .et_pb_newsletter_form p select",
														"{$order_class} .et_pb_newsletter_form p .input[type=\"checkbox\"] + label i:before",
														"{$order_class} .et_pb_newsletter_form p .input[type=\"radio\"] + label i:before",
													]
												),
											],
											'hover' => [
												'color' => implode(
													', ',
													[
														"{$order_class} .et_pb_newsletter_form p input[type=\"text\"]:hover",
														"{$order_class} .et_pb_newsletter_form p textarea:hover",
														"{$order_class} .et_pb_newsletter_form p select:hover",
														"{$order_class} .et_pb_newsletter_form p .input[type=\"checkbox\"] + label:hover i:before",
														"{$order_class} .et_pb_newsletter_form p .input[type=\"radio\"] + label:hover i:before",
													]
												),
											],
										],
									],
								],
								'focus'      => [
									'background' => [
										'desktop' => [
											'value' => [
												'background-color' => implode(
													', ',
													[
														"{$order_class} .et_pb_newsletter_form p textarea",
														"{$order_class} .et_pb_newsletter_form p select",
														"{$order_class} .et_pb_newsletter_form p input.input",
													]
												),
											],
											'hover' => [
												'background-color' => implode(
													', ',
													[
														"{$order_class} .et_pb_newsletter_form p textarea",
														"{$order_class} .et_pb_newsletter_form p select",
														"{$order_class} .et_pb_newsletter_form p input.input",
													]
												),
											],
										],
									],
									'border'     => [
										'desktop' => [
											'value' => [
												'border-radius' => "{$order_class} .et_pb_newsletter_form p input[type=\"text\"]",
												'border-style'  => "{$order_class} .et_pb_newsletter_form p input[type=\"text\"]",
											],
										],
									],
									'font'       => [
										'font' => [
											'desktop' => [
												'value' => [
													'color' => implode(
														', ',
														[
															"{$order_class} .et_pb_newsletter_form p .input[type=\"checkbox\"]:active + label",
															"{$order_class} .et_pb_newsletter_form p .input[type=\"radio\"]:active + label",
															"{$order_class} .et_pb_newsletter_form p .input[type=\"checkbox\"]:checked:active + label i:before",
															"{$order_class} .et_pb_newsletter_form p .input",
														]
													),
												],
												'hover' => [
													'color' => implode(
														', ',
														[
															"{$order_class} .et_pb_newsletter_form p .input[type=\"checkbox\"]:active:hover + label",
															"{$order_class} .et_pb_newsletter_form p .input[type=\"radio\"]:active:hover + label",
															"{$order_class} .et_pb_newsletter_form p .input[type=\"checkbox\"]:checked:active:hover + label i:before",
															"{$order_class} .et_pb_newsletter_form p .input",
														]
													),
												],
											],
										],
									],
								],
							],
						]
					),
					// ::*placeholder style can't handle multiple selectors used the same statements.
					ElementStyle::style(
						[
							'selector'   => implode(
								', ',
								[
									"{$order_class} .et_pb_newsletter_form p .input::placeholder",
									"{$order_class} .et_pb_newsletter_form p textarea::placeholder",
									"{$order_class} .et_pb_newsletter_form p .input:focus::placeholder",
									"{$order_class} .et_pb_newsletter_form p textarea:focus::placeholder",
								]
							),
							'attrs'      => [
								'font' => $attrs['field']['decoration']['font'] ?? [],
							],
							'orderClass' => $order_class,
						]
					),
					ElementStyle::style(
						[
							'selector'   => implode(
								', ',
								[
									"{$order_class} .et_pb_newsletter_form p .input::-webkit-input-placeholder",
									"{$order_class} .et_pb_newsletter_form p textarea::-webkit-input-placeholder",
									"{$order_class} .et_pb_newsletter_form p .input:focus::-webkit-input-placeholder",
									"{$order_class} .et_pb_newsletter_form p textarea:focus::-webkit-input-placeholder",
								]
							),
							'attrs'      => [
								'font' => $attrs['field']['decoration']['font'] ?? [],
							],
							'orderClass' => $order_class,
						]
					),
					ElementStyle::style(
						[
							'selector'   => implode(
								', ',
								[
									"{$order_class} .et_pb_newsletter_form p .input::-moz-placeholder",
									"{$order_class} .et_pb_newsletter_form p textarea::-moz-placeholder",
									"{$order_class} .et_pb_newsletter_form p .input:focus::-moz-placeholder",
									"{$order_class} .et_pb_newsletter_form p textarea:focus::-moz-placeholder",
								]
							),
							'attrs'      => [
								'font' => $attrs['field']['decoration']['font'] ?? [],
							],
							'orderClass' => $order_class,
						]
					),
					ElementStyle::style(
						[
							'selector'   => implode(
								', ',
								[
									"{$order_class} .et_pb_newsletter_form p .input::-ms-input-placeholder",
									"{$order_class} .et_pb_newsletter_form p textarea::-ms-input-placeholder",
									"{$order_class} .et_pb_newsletter_form p .input:focus::-ms-input-placeholder",
									"{$order_class} .et_pb_newsletter_form p textarea:focus::-ms-input-placeholder",
								]
							),
							'attrs'      => [
								'font' => $attrs['field']['decoration']['font'] ?? [],
							],
							'orderClass' => $order_class,
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
	 * Module render callback which outputs server side rendered HTML on the Front-End.
	 *
	 * This function is equivalent of JS function SignupEdit located in
	 * visual-builder/packages/module-library/src/components/signup/edit.tsx.
	 *
	 * @since ??
	 *
	 * @param array          $attrs                       Block attributes that were saved by Divi Builder.
	 * @param string         $child_modules_content       The block's child modules content.
	 * @param WP_Block       $block                       Parsed block object that is being rendered.
	 * @param ModuleElements $elements                    An instance of the ModuleElements class.
	 * @param array          $default_printed_style_attrs Default printed style attributes.
	 *
	 * @return string The module HTML output.
	 */
	public static function render_callback( array $attrs, string $child_modules_content, WP_Block $block, ModuleElements $elements, array $default_printed_style_attrs ) {
		global $half_width_counter;

		// Reset the $half_width_counter.
		$half_width_counter = 0;

		// Extract child modules IDs using helper utility.
		$children_ids = ChildrenUtils::extract_children_ids( $block );

		// Get Parent.
		$parent = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );

		$use_custom_fields = $attrs['customFields']['advanced']['enable']['desktop']['value'] ?? 'off';

		$success_action         = $attrs['success']['advanced']['action']['desktop']['value'] ?? '';
		$success_redirect_url   = $attrs['success']['advanced']['redirectUrl']['desktop']['value'] ?? '';
		$success_redirect_query = $attrs['success']['advanced']['redirectQuery']['desktop']['value'] ?? [];
		$name_field_only        = $attrs['field']['advanced']['nameFieldOnly']['desktop']['value'] ?? 'on';
		$name_field             = $attrs['field']['advanced']['nameField']['desktop']['value'] ?? 'off';
		$first_name_field       = $attrs['field']['advanced']['firstNameField']['desktop']['value'] ?? 'on';
		$last_name_field        = $attrs['field']['advanced']['lastNameField']['desktop']['value'] ?? 'on';

		// Email Service Provider Fields.
		$email_service                  = EmailAccountService::get_provider( $attrs['module']['advanced']['emailService']['desktop']['value']['provider'] ?? 'mailchimp' );
		$show_provider_name_field_only  = $email_service->show_name_field( 'name' );
		$show_provider_first_name_field = $email_service->show_name_field( 'showFirstNameField' );
		$show_provider_last_name_field  = $email_service->show_name_field( 'showLastNameField' );

		$email_service_account   = $attrs['module']['advanced']['emailService']['desktop']['value']['account'] ?? '0|none';
		$is_render_form          = $email_service_account && '0|none' !== $email_service_account;
		$is_render_custom_fields = $email_service->is_valid_account( $email_service_account );

		// Email OptIn Form Title.
		$title = $elements->render(
			[
				'attrName' => 'title',
			]
		);

		// Email OptIn Form Content/Description.
		$content = $elements->render(
			[
				'attrName' => 'content',
			]
		);

		$has_signup_description = ! empty( $title ) || ! empty( $content );

		// Content wrapper div.
		$content_wrapper = HTMLUtility::render(
			[
				'tag'               => 'div',
				'tagEscaped'        => true,
				'attributes'        => [
					'class' => HTMLUtility::classnames(
						[
							'et_pb_newsletter_description' => true,
							'et_multi_view_hidden'         => ! $has_signup_description,
						]
					),
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => [
					$title,
					$content,
				],
			]
		);

		// Email OptIn Form Footer Content.
		$footer_content = $elements->render(
			[
				'attrName' => 'footerContent',
			]
		);

		// Error messages wrapper div.
		$error_messages = HTMLUtility::render(
			[
				'tag'               => 'div',
				'tagEscaped'        => true,
				'attributes'        => [
					'class' => 'et_pb_newsletter_result et_pb_newsletter_error',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => [],
			]
		);

		// Success messages wrapper div.
		$success_message_text = $attrs['success']['advanced']['message']['desktop']['value'] ?? __( 'Success!', 'et_builder_5' );
		$success_messages     = HTMLUtility::render(
			[
				'tag'               => 'div',
				'tagEscaped'        => true,
				'attributes'        => [
					'class' => 'et_pb_newsletter_result et_pb_newsletter_success',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => HTMLUtility::render(
					[
						'tag'               => 'h2',
						'tagEscaped'        => true,
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => [
							esc_html( $success_message_text ),
						],
					]
				),
			]
		);

		// Email Optin Form Button.
		$button_html = $elements->render(
			[
				'attrName'     => 'button',
				'attributes'   => [
					'class' => 'et_pb_newsletter_button',
				],
				'elementProps' => [
					'hasPreloader'   => true,
					'hasTextWrapper' => true,
					'hasWrapper'     => false,
				],
			]
		);

		// button html wrapper tag.
		$button_html_wrapper = HTMLUtility::render(
			[
				'tag'               => 'p',
				'tagEscaped'        => true,
				'attributes'        => [
					'class' => 'et_pb_newsletter_button_wrap',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => [
					$button_html,
				],
			]
		);

		// Element div.et_pb_newsletter_fields.
		// Add layout classes based on module display mode.
		$layout_display          = $attrs['module']['decoration']['layout']['desktop']['value']['display'] ?? 'flex';
		$is_flex_layout_display  = 'flex' === $layout_display;
		$is_grid_layout_display  = 'grid' === $layout_display;
		$is_block_layout_display = ! $is_flex_layout_display && ! $is_grid_layout_display;

		$form_fields_wrapper = HTMLUtility::render(
			[
				'tag'               => 'div',
				'tagEscaped'        => true,
				'attributes'        => [
					'class' => HTMLUtility::classnames(
						[
							'et_pb_newsletter_fields' => true,
							'et_flex_module'          => $is_flex_layout_display,
							'et_grid_module'          => $is_grid_layout_display,
							'et_block_module'         => $is_block_layout_display,
						]
					),
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => [
					$show_provider_name_field_only && 'on' === $name_field_only ? self::render_field( $attrs, 'name', $elements, true ) : '',
					$show_provider_first_name_field && ( 'on' === $first_name_field || 'on' === $name_field ) ? self::render_field( $attrs, 'name', $elements, 'on' === $name_field ) : '',
					$show_provider_last_name_field && 'on' === $last_name_field && 'on' !== $name_field ? self::render_field( $attrs, 'last_name', $elements ) : '',
					self::render_field( $attrs, 'email', $elements ),
					// Render child modules inside the form when custom fields are enabled.
					'on' === $use_custom_fields && $is_render_custom_fields ? $child_modules_content : '',
					$button_html_wrapper,
					$footer_content,
				],
			]
		);

		// Element form.
		$form = HTMLUtility::render(
			[
				'tag'               => 'form',
				'tagEscaped'        => true,
				'attributes'        => [
					'method' => 'post',
					'class'  => HTMLUtility::classnames(
						[
							'et_pb_newsletter_custom_fields' => 'on' === ( $attrs['customFields']['advanced']['enable']['desktop']['value'] ?? 'off' ),
						]
					),
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => [
					$error_messages,
					$success_messages,
					$form_fields_wrapper,
					self::render_field( $attrs, 'hidden', $elements ),
				],
			]
		);

		// Email Optin form wrapper.
		$form_wrapper = $is_render_form ? HTMLUtility::render(
			[
				'tag'               => 'div',
				'tagEscaped'        => true,
				'attributes'        => [
					'class' => HTMLUtility::classnames(
						[
							'et_pb_newsletter_form' => true,
						]
					),
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $form,
			]
		) : '';

		$ip_address = '';
		// If success action is message or redirect url is empty, then we will not redirect.
		if ( 'message' === $success_action || empty( $success_redirect_url ) ) {
			$success_redirect_url   = '';
			$success_redirect_query = '';
			$ip_address             = '';
		}

		// If success action is redirect and redirect url is not empty, then we will set IP address and redirect query.
		if ( 'redirect' === $success_action && ! empty( $success_redirect_url ) ) {
			if ( ! empty( $success_redirect_query ) ) {
				$success_redirect_query = implode( '|', $success_redirect_query );

				// If ip_address is present then get ip address and set as data attribute.
				if ( false !== strpos( $success_redirect_query, 'ip_address' ) ) {
					$ip_address = et_core_get_ip_address();
				}
			} else {
				$success_redirect_query = '';
			}
		}

		return Module::render(
			[
				// FE only.
				'orderIndex'               => $block->parsed_block['orderIndex'],
				'storeInstance'            => $block->parsed_block['storeInstance'],

				// VB equivalent.
				'attrs'                    => $attrs,
				'id'                       => $block->parsed_block['id'],
				'elements'                 => $elements,
				'name'                     => $block->block_type->name,
				'moduleCategory'           => $block->block_type->category,
				'defaultPrintedStyleAttrs' => $default_printed_style_attrs,
				'classnamesFunction'       => [ self::class, 'module_classnames' ],
				'stylesComponent'          => [ self::class, 'module_styles' ],
				'scriptDataComponent'      => [ self::class, 'module_script_data' ],
				'parentId'                 => $parent->id ?? '',
				'parentName'               => $parent->blockName ?? '',
				'parentAttrs'              => $parent->attrs ?? [],
				'childrenIds'              => $children_ids,
				'htmlAttrs'                => [
					'data-ip_address'     => '' !== $ip_address ? esc_attr( $ip_address ) : null,
					'data-redirect_query' => '' !== $success_redirect_query ? esc_attr( $success_redirect_query ) : null,
					'data-redirect_url'   => '' !== $success_redirect_url ? esc_url( $success_redirect_url ) : null,
				],
				'children'                 => [
					$elements->style_components(
						[
							'attrName' => 'module',
						]
					),
					$content_wrapper,
					$form_wrapper,
					// Child modules are only rendered here when custom fields are NOT enabled.
					// When custom fields are enabled, child modules are rendered inside the form.
					'on' !== $use_custom_fields ? $child_modules_content : '',
				],
			]
		);
	}

	/**
	 * Generate checksum for Email Optin Module.
	 *
	 * @since ??
	 *
	 * @param array $attrs Module attributes.
	 *
	 * @return string Checksum.
	 */
	public static function generate_checksum( array $attrs ) : string {
		$checksum = md5( serialize( $attrs ) ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.serialize_serialize -- Intentional.

		// Spam protection state.
		$use_spam_service             = $attrs['module']['advanced']['spamProtection']['desktop']['value']['enabled'] ?? 'off';
		$use_spam_service_by_checksum = get_option( 'et_pb_signup_' . $checksum );

		if ( $use_spam_service_by_checksum !== $use_spam_service ) {
			update_option( 'et_pb_signup_' . $checksum, $use_spam_service );
		}

		// Provider.
		$provider             = $attrs['module']['advanced']['spamProtection']['desktop']['value']['provider'] ?? 'recaptcha';
		$provider_by_checksum = get_option( 'et_pb_signup_provider_' . $checksum, 'recaptcha' );

		if ( $provider_by_checksum !== $provider ) {
			update_option( 'et_pb_signup_provider_' . $checksum, $provider );
		}

		// Account.
		$account             = $attrs['module']['advanced']['spamProtection']['desktop']['value']['account'] ?? '';
		$account_by_checksum = get_option( 'et_pb_signup_account_' . $checksum, '' );

		if ( $account_by_checksum !== $account ) {
			update_option( 'et_pb_signup_account_' . $checksum, $account );
		}

		// Min score.
		$min_score             = (float) ( $attrs['module']['advanced']['spamProtection']['desktop']['value']['minScore'] ?? 0.0 );
		$min_score_by_checksum = (float) get_option( 'et_pb_signup_min_score_' . $checksum, 0.0 );

		if ( $min_score_by_checksum !== $min_score ) {
			update_option( 'et_pb_signup_min_score_' . $checksum, $min_score );
		}

		return $checksum;
	}

	/**
	 * Render Email Optin Module field.
	 *
	 * @param array          $attrs             Module attributes.
	 * @param string         $field_type        Email Optin module field type.
	 * @param ModuleElements $elements          Module elements object.
	 * @param boolean        $name_field_only   Boolean condition for name field.
	 *
	 * @return string
	 */
	public static function render_field( array $attrs, string $field_type, ModuleElements $elements, bool $name_field_only = false ): string {
		$html = '';

		// Based upon field type, render the field.
		switch ( $field_type ) {
			case 'name':
				$label = $name_field_only ? __( 'Name', 'et_builder_5' ) : __( 'First Name', 'et_builder_5' );

				$fullwidth_prop          = $name_field_only ? 'nameFullwidth' : 'firstNameFullwidth';
				$fullwidth_desktop_value = $attrs['field']['advanced'][ $fullwidth_prop ]['desktop']['value'] ?? 'on';
				$fullwidth_tablet_value  = $attrs['field']['advanced'][ $fullwidth_prop ]['tablet']['value'] ?? $fullwidth_desktop_value;
				$fullwidth_phone_value   = $attrs['field']['advanced'][ $fullwidth_prop ]['phone']['value'] ?? $fullwidth_tablet_value;

				$is_fullwidth_desktop = 'on' === $fullwidth_desktop_value;
				$is_fullwidth_tablet  = 'on' === $fullwidth_tablet_value;
				$is_fullwidth_phone   = 'on' === $fullwidth_phone_value;

				$html = HTMLUtility::render(
					[
						'tag'               => 'p',
						'tagEscaped'        => true,
						'attributes'        => [
							'class' => HTMLUtility::classnames(
								[
									'et_pb_newsletter_field'          => true,
									'et_pb_contact_field_last'        => $is_fullwidth_desktop,
									'et_pb_contact_field_half'        => ! $is_fullwidth_desktop,
									'et_pb_contact_field_last_tablet' => $is_fullwidth_tablet,
									'et_pb_contact_field_half_tablet' => ! $is_fullwidth_tablet,
									'et_pb_contact_field_last_phone'  => $is_fullwidth_phone,
									'et_pb_contact_field_half_phone'  => ! $is_fullwidth_phone,
								]
							),
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => [
							HTMLUtility::render(
								[
									'tag'        => 'label',
									'tagEscaped' => true,
									'attributes' => [
										'class' => 'et_pb_contact_form_label',
										'for'   => 'et_pb_signup_firstname',
										'style' => 'display: none;',
									],
									'children'   => $label,
								]
							),
							$elements->render(
								[
									'attrName'   => 'field',
									'tagName'    => 'input',
									'attributes' => [
										'id'          => 'et_pb_signup_firstname',
										'type'        => 'text',
										'placeholder' => $label,
										'name'        => 'et_pb_signup_firstname',
									],
								]
							),
						],
					]
				);
				break;

			case 'last_name':
				$label = __( 'Last Name', 'et_builder_5' );

				$fullwidth_desktop_value = $attrs['field']['advanced']['lastNameFullwidth']['desktop']['value'] ?? 'on';
				$fullwidth_tablet_value  = $attrs['field']['advanced']['lastNameFullwidth']['tablet']['value'] ?? $fullwidth_desktop_value;
				$fullwidth_phone_value   = $attrs['field']['advanced']['lastNameFullwidth']['phone']['value'] ?? $fullwidth_tablet_value;

				$is_fullwidth_desktop = 'on' === $fullwidth_desktop_value;
				$is_fullwidth_tablet  = 'on' === $fullwidth_tablet_value;
				$is_fullwidth_phone   = 'on' === $fullwidth_phone_value;

				$html = HTMLUtility::render(
					[
						'tag'               => 'p',
						'tagEscaped'        => true,
						'attributes'        => [
							'class' => HTMLUtility::classnames(
								[
									'et_pb_newsletter_field'          => true,
									'et_pb_contact_field_last'        => $is_fullwidth_desktop,
									'et_pb_contact_field_half'        => ! $is_fullwidth_desktop,
									'et_pb_contact_field_last_tablet' => $is_fullwidth_tablet,
									'et_pb_contact_field_half_tablet' => ! $is_fullwidth_tablet,
									'et_pb_contact_field_last_phone'  => $is_fullwidth_phone,
									'et_pb_contact_field_half_phone'  => ! $is_fullwidth_phone,
								]
							),
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => [
							HTMLUtility::render(
								[
									'tag'        => 'label',
									'tagEscaped' => true,
									'attributes' => [
										'class' => 'et_pb_contact_form_label',
										'for'   => 'et_pb_signup_lastname',
										'style' => 'display: none;',
									],
									'children'   => $label,
								]
							),
							$elements->render(
								[
									'attrName'   => 'field',
									'tagName'    => 'input',
									'attributes' => [
										'id'          => 'et_pb_signup_lastname',
										'type'        => 'text',
										'placeholder' => $label,
										'name'        => 'et_pb_signup_lastname',
									],
								]
							),
						],
					]
				);
				break;

			case 'email':
				$label = __( 'Email', 'et_builder_5' );

				$fullwidth_desktop_value = $attrs['field']['advanced']['emailFullwidth']['desktop']['value'] ?? 'on';
				$fullwidth_tablet_value  = $attrs['field']['advanced']['emailFullwidth']['tablet']['value'] ?? $fullwidth_desktop_value;
				$fullwidth_phone_value   = $attrs['field']['advanced']['emailFullwidth']['phone']['value'] ?? $fullwidth_tablet_value;

				$is_fullwidth_desktop = 'on' === $fullwidth_desktop_value;
				$is_fullwidth_tablet  = 'on' === $fullwidth_tablet_value;
				$is_fullwidth_phone   = 'on' === $fullwidth_phone_value;

				$html = HTMLUtility::render(
					[
						'tag'               => 'p',
						'tagEscaped'        => true,
						'attributes'        => [
							'class' => HTMLUtility::classnames(
								[
									'et_pb_newsletter_field'          => true,
									'et_pb_contact_field_last'        => $is_fullwidth_desktop,
									'et_pb_contact_field_half'        => ! $is_fullwidth_desktop,
									'et_pb_contact_field_last_tablet' => $is_fullwidth_tablet,
									'et_pb_contact_field_half_tablet' => ! $is_fullwidth_tablet,
									'et_pb_contact_field_last_phone'  => $is_fullwidth_phone,
									'et_pb_contact_field_half_phone'  => ! $is_fullwidth_phone,
								]
							),
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => [
							HTMLUtility::render(
								[
									'tag'        => 'label',
									'tagEscaped' => true,
									'attributes' => [
										'class' => 'et_pb_contact_form_label',
										'for'   => 'et_pb_signup_email',
										'style' => 'display: none;',
									],
									'children'   => $label,
								]
							),
							$elements->render(
								[
									'attrName'   => 'field',
									'tagName'    => 'input',
									'attributes' => [
										'id'          => 'et_pb_signup_email',
										'type'        => 'text',
										'placeholder' => $label,
										'name'        => 'et_pb_signup_email',
									],
								]
							),
						],
					]
				);
				break;

			case 'hidden':
				$selected_provider          = $attrs['module']['advanced']['emailService']['desktop']['value']['provider'] ?? 'mailchimp';
				$selected_account_name_list = $attrs['module']['advanced']['emailService']['desktop']['value']['account'] ?? '0|none';
				$selected_account_parts     = explode( '|', $selected_account_name_list );
				$selected_account_name      = $selected_account_parts[0] ?? '';
				$selected_account_list      = $selected_account_parts[1] ?? '';

				$ip_address_value = $attrs['field']['advanced']['ipAddress']['desktop']['value'] ?? '';
				$ip_address       = 'on' === $ip_address_value ? 'true' : 'false';

				$html .= HTMLUtility::render(
					[
						'tag'        => 'input',
						'tagEscaped' => true,
						'attributes' => [
							'type'  => 'hidden',
							'name'  => 'et_pb_signup_provider',
							'value' => $selected_provider,
						],
					]
				);
				$html .= HTMLUtility::render(
					[
						'tag'        => 'input',
						'tagEscaped' => true,
						'attributes' => [
							'type'  => 'hidden',
							'name'  => 'et_pb_signup_list_id',
							'value' => $selected_account_list,
						],
					]
				);
				$html .= HTMLUtility::render(
					[
						'tag'        => 'input',
						'tagEscaped' => true,
						'attributes' => [
							'type'  => 'hidden',
							'name'  => 'et_pb_signup_account_name',
							'value' => $selected_account_name,
						],
					]
				);
				$html .= HTMLUtility::render(
					[
						'tag'        => 'input',
						'tagEscaped' => true,
						'attributes' => [
							'type'  => 'hidden',
							'name'  => 'et_pb_signup_ip_address',
							'value' => $ip_address,
						],
					]
				);

				$html .= HTMLUtility::render(
					[
						'tag'        => 'input',
						'tagEscaped' => true,
						'attributes' => [
							'type'  => 'hidden',
							'name'  => 'et_pb_signup_checksum',
							'value' => self::generate_checksum( $attrs ),
						],
					]
				);
				break;

			default:
				break;
		}

		/**
		 * Filters the html output for individual opt-in form fields. The dynamic portion of the filter
		 * name ("$field_type"), will be one of: 'name', 'last_name', 'email', 'submit_button', 'hidden'.
		 *
		 * @since ??
		 *
		 * @param string $html              The form field's HTML.
		 * @param bool   $single_name_field Whether or not a single name field is being used.
		 *                                  Only applicable when "$field_type" is 'name'.
		 */
		$html = apply_filters( "et_pb_signup_form_field_html_{$field_type}", $html, $name_field_only );

		if ( ! is_string( $html ) ) {
			$html = '';
		}

		return $html;
	}

	/**
	 * Set the module specific front-end data.
	 *
	 * @since ??
	 *
	 * @param array $args {
	 *     An array of arguments for setting the front-end script data.
	 *
	 *     @type string $selector The module selector.
	 * }
	 * @return void
	 *
	 * @example
	 * ```php
	 * SignupModule::set_front_end_data( [
	 *   'selector' => '.et_pb_signup_0',
	 * ] );
	 * ```
	 */
	public static function set_front_end_data( array $args ): void {
		// Script data is not needed in VB.
		if ( Conditions::is_vb_enabled() ) {
			return;
		}

		$selector = $args['selector'] ?? '';

		// Register front-end data item.
		ScriptData::add_data_item(
			[
				'data_name'    => 'signup',
				'data_item_id' => null,
				'data_item'    => [
					'selector' => $selector,
				],
			]
		);
	}


	/**
	 * Loads `SignupModule` and registers Front-End render callback and REST API Endpoints.
	 *
	 * @since ??
	 *
	 * @return void
	 */
	public function load() {
		add_filter( 'divi_conversion_presets_attrs_map', array( SignupPresetAttrsMap::class, 'get_map' ), 10, 2 );

		// Remove default handler in D4.
		remove_action( 'wp_ajax_et_pb_submit_subscribe_form', 'et_pb_submit_subscribe_form' );
		remove_action( 'wp_ajax_nopriv_et_pb_submit_subscribe_form', 'et_pb_submit_subscribe_form' );

		// Register new handler in D5.
		add_action( 'wp_ajax_et_pb_submit_subscribe_form', [ SignupHandler::class, 'handle_form_submit' ] );
		add_action( 'wp_ajax_nopriv_et_pb_submit_subscribe_form', [ SignupHandler::class, 'handle_form_submit' ] );

		// phpcs:ignore PHPCompatibility.FunctionUse.NewFunctionParameters.dirname_levelsFound -- We have PHP 7 support now, This can be deleted once PHPCS config is updated.
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/signup/';

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
