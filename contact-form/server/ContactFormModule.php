<?php
/**
 * ModuleLibrary: Contact Form Module class.
 *
 * @package Builder\Packages\ModuleLibrary
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\ContactForm;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- WordPress uses snakeCase in \WP_Block_Parser_Block

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\Conditions;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\FrontEnd\Module\Script;
use ET\Builder\FrontEnd\Module\ScriptData;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Element\ElementClassnames;
use ET\Builder\Packages\Module\Options\Element\ElementStyle;
use ET\Builder\Packages\Module\Options\FormField\FormFieldStyle;
use ET\Builder\Packages\Module\Options\Text\TextClassnames;
use ET\Builder\Packages\ModuleLibrary\ContactForm\ContactFormHandler;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\ModuleUtils\ChildrenUtils;
use WP_Block_Type_Registry;
use WP_Block;

/**
 * `ContactFormModule` is consisted of functions used for Contact Form Module such as Front-End rendering, REST API Endpoints etc.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 */
class ContactFormModule implements DependencyInterface {

	/**
	 * Module custom CSS fields.
	 *
	 * This function is equivalent of JS function cssFields located in
	 * visual-builder/packages/module-library/src/components/contact-form/custom-css.ts.
	 *
	 * @since ??
	 *
	 * @return array The array of custom CSS fields.
	 */
	public static function custom_css():array {
		return WP_Block_Type_Registry::get_instance()->get_registered( 'divi/contact-form' )->customCssFields;
	}

	/**
	 * Set CSS class names to the module.
	 *
	 * This function is equivalent of JS function moduleClassnames located in
	 * visual-builder/packages/module-library/src/components/contact-form/module-classnames.ts.
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

		// Text options.
		$classnames_instance->add( TextClassnames::text_options_classnames( $attrs['module']['advanced']['text'] ?? [] ), true );

		$classnames_instance->add( 'clearfix', true );

		// This class is only applicable in the FE.
		if ( 'on' === $attrs['module']['advanced']['spamProtection']['desktop']['value']['enabled'] ?? 'off' ) {
			$classnames_instance->add( 'et_pb_recaptcha_enabled', true );
		}

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
	 * visual-builder/packages/module-library/src/components/contact-form/module-script-data.tsx.
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
		$selector = $args['selector'] ?? '';
		$attrs    = $args['attrs'] ?? [];
		$elements = $args['elements'];

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
	}

	/**
	 * Set CSS styles to the module.
	 *
	 * This function is equivalent of JS function ModuleStyles located in
	 * visual-builder/packages/module-library/src/components/contact-form/module-styles.tsx.
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
	 *
	 *     // VB only.
	 *     @type string $state                    Attributes state.
	 *     @type string $mode                     Style mode.
	 *
	 *     // FE only.
	 *     @type int|null $storeInstance          The ID of instance where this block stored in BlockParserStore.
	 *     @type int      $orderIndex             The order index of the element.
	 *     @type ModuleElements $elements         The ModuleElements instance.
	 * }
	 */
	public static function module_styles( array $args ) : void {
		$attrs                       = $args['attrs'] ?? [];
		$elements                    = $args['elements'];
		$settings                    = $args['settings'] ?? [];
		$order_class                 = $args['orderClass'] ?? '';
		$base_order_class            = $args['baseOrderClass'] ?? '';
		$default_printed_style_attrs = $args['defaultPrintedStyleAttrs'] ?? [];
		$is_custom_post_type         = $args['isCustomPostType'] ?? false;

		$base_selector = $is_custom_post_type
			? 'body.et-db #page-container #et-boc .et-l .et_pb_section'
			: 'body #page-container .et_pb_section';

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
											'selector' => "{$order_class}.et_pb_contact_form_container",
											'attr'     => $attrs['module']['advanced']['text'] ?? [],
											'propertySelectors' => [
												'text' => [
													'desktop' => [
														'value' => [
															'text-align' => "{$order_class} input, {$order_class} textarea, {$order_class} label",
														],
													],
												],
												'textShadow' => [
													'desktop' => [
														'value' => [
															'text-shadow' => "{$order_class}, {$order_class} input, {$order_class} textarea, {$order_class} label, {$order_class} select",
														],
													],
												],
											],
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
					// captcha.
					$elements->style(
						[
							'attrName' => 'captcha',
						]
					),
					// button.
					$elements->style(
						[
							'attrName'   => 'button',
							'styleProps' => [
								'spacing' => [
									'selector'  => implode(
										', ',
										[
											"{$base_selector} {$base_order_class}.et_pb_contact_form_container.et_pb_module .et_pb_button",
											"{$base_selector} {$base_order_class}.et_pb_contact_form_container.et_pb_module .et_pb_button:hover",
										]
									),
									'important' => true,
								],
							],
						]
					),
					FormFieldStyle::style(
						[
							'attr'              => $attrs['field'] ?? [],
							'selector'          => implode(
								', ',
								[
									"{$order_class} .input[type=checkbox] + label",
									"{$order_class} .input[type=radio] + label",
									"{$order_class} .input",
								]
							),
							'propertySelectors' => [
								'spacing'    => [
									'desktop' => [
										'value' => [
											'margin'  => "{$order_class} .et_pb_contact_field",
											'padding' => "{$order_class} .et_pb_contact_field .input",
										],
									],
								],
								'background' => [
									'desktop' => [
										'value' => [
											'background-color' => implode(
												', ',
												[
													"{$order_class} .et_pb_contact_field .input",
													"{$order_class} .et_pb_contact_field .input[type=\"checkbox\"] + label i",
													"{$order_class} .et_pb_contact_field .input[type=\"radio\"] + label i",
												]
											),
										],
										'hover' => [
											'background-color' => implode(
												', ',
												[
													"{$order_class} .et_pb_contact_field .input:hover",
													"{$order_class} .et_pb_contact_field .input[type=\"checkbox\"] + label:hover i",
													"{$order_class} .et_pb_contact_field .input[type=\"radio\"] + label:hover i",
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
														"{$order_class} .input[type=\"checkbox\"]:checked + label i:before",
														"{$order_class}.et_pb_contact_form_container .input",
														"{$order_class}.et_pb_contact_form_container .input[type=\"checkbox\"] + label",
														"{$order_class}.et_pb_contact_form_container .input[type=\"radio\"] + label",
													]
												),
											],
											'hover' => [
												'color' => implode(
													', ',
													[
														"{$order_class} .input[type=\"checkbox\"]:checked + label i:before",
														"{$order_class}.et_pb_contact_form_container .input:hover",
														"{$order_class}.et_pb_contact_form_container .input[type=\"checkbox\"]:hover + label",
														"{$order_class}.et_pb_contact_form_container .input[type=\"radio\"]:hover + label",
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
														"{$order_class} .input[type=\"checkbox\"]:active + label i",
														"{$order_class} .input[type=\"radio\"]:active + label i",
														"{$order_class} .input",
													]
												),
											],
											'hover' => [
												'background-color' => implode(
													', ',
													[
														"{$order_class} .input[type=\"checkbox\"]:active:hover + label i",
														"{$order_class} .input[type=\"radio\"]:active:hover + label i",
														"{$order_class} .input",
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
															"{$order_class} .input",
														]
													),
												],
												'hover' => [
													'color' => implode(
														', ',
														[
															"{$order_class} .input[type=\"checkbox\"]:active:hover + label",
															"{$order_class} .input[type=\"radio\"]:active:hover + label",
															"{$order_class} .input[type=\"checkbox\"]:checked:active:hover + label i:before",
															"{$order_class} .input",
														]
													),
												],
											],
										],
									],
								],
							],
							'orderClass'        => $order_class,
						]
					),
					ElementStyle::style(
						[
							'selector'   => "{$order_class}.et_pb_contact_form_container .input::placeholder",
							'attrs'      => [
								'font' => $attrs['field']['decoration']['font'] ?? [],
							],
							'orderClass' => $order_class,
						]
					),
					ElementStyle::style(
						[
							'selector'   => "{$order_class}.et_pb_contact_form_container .input::-webkit-input-placeholder",
							'attrs'      => [
								'font' => $attrs['field']['decoration']['font'] ?? [],
							],
							'orderClass' => $order_class,
						]
					),
					ElementStyle::style(
						[
							'selector'   => "{$order_class}.et_pb_contact_form_container .input::-moz-placeholder",
							'attrs'      => [
								'font' => $attrs['field']['decoration']['font'] ?? [],
							],
							'orderClass' => $order_class,
						]
					),
					ElementStyle::style(
						[
							'selector'   => "{$order_class}.et_pb_contact_form_container .input::-ms-input-placeholder",
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
	 * This function is equivalent of JS function ContactFormEdit located in
	 * visual-builder/packages/module-library/src/components/contact-form/edit.tsx.
	 *
	 * @since ??
	 *
	 * @param array          $attrs                       Block attributes that were saved by Divi Builder.
	 * @param string         $content                     The block's content.
	 * @param WP_Block       $block                       Parsed block object that is being rendered.
	 * @param ModuleElements $elements                    An instance of the ModuleElements class.
	 * @param array          $default_printed_style_attrs Default printed style attributes.
	 *
	 * @return string The module HTML output.
	 */
	public static function render_callback( array $attrs, string $content, WP_Block $block, ModuleElements $elements, array $default_printed_style_attrs ) {
		global $half_width_counter;

		// Reset the $half_width_counter.
		$half_width_counter = 0;

		$children_ids = ChildrenUtils::extract_children_ids( $block );
		$parent       = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );
		$form_handler = new ContactFormHandler( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );

		// Module Order Index.
		$order_index = $block->parsed_block['orderIndex'] ?? 0;

		// Contact Form Title.
		$title = $elements->render(
			[
				'attrName' => 'title',
			]
		);

		$message_children   = '';
		$should_render_form = true;

		if ( $form_handler->is_submitted() ) {
			if ( $form_handler->get_error()->has_errors() ) {
				$message_children = HTMLUtility::render(
					[
						'tag'        => 'p',
						'tagEscaped' => true,
						'attributes' => [
							'class' => 'et_pb_contact_error_text',
						],
						'children'   => $form_handler->get_error()->get_error_message(),
					]
				);
			} else {
				if ( $form_handler->is_mail_sent() ) {
					$success_message = $attrs['module']['advanced']['successMessage']['desktop']['value'] ?? '';

					if ( '' === $success_message ) {
						$success_message = __( 'Thanks for contacting us', 'et_builder_5' );
					}

					$message_children = HTMLUtility::render(
						[
							'tag'               => 'p',
							'tagEscaped'        => true,
							'children'          => $success_message,
							'childrenSanitizer' => 'et_core_esc_previously',
						]
					);
				} else {
					$message_children = HTMLUtility::render(
						[
							'tag'        => 'p',
							'tagEscaped' => true,
							'attributes' => [
								'class' => 'et_pb_contact_error_text',
							],
							'children'   => __( 'There was an error trying to send your message. Please try again later.', 'et_builder_5' ),
						]
					);
				}

				// By default, the form should be rendered all the time. The only time it should
				// not be rendered is when the form is submitted and no error found.
				$should_render_form = false;
			}
		}

		$message = HTMLUtility::render(
			[
				'tag'               => 'div',
				'tagEscaped'        => true,
				'attributes'        => [
					'class' => 'et-pb-contact-message',
				],
				'children'          => $message_children,
				'childrenSanitizer' => 'et_core_esc_previously',
			]
		);

		// Contact Form.
		$form = '';

		if ( $should_render_form ) {
			// Contact Form - Fields - Input.
			$process_input = HTMLUtility::render(
				[
					'tag'        => 'input',
					'tagEscaped' => true,
					'attributes' => [
						'type'  => 'hidden',
						'name'  => 'et_pb_contactform_submit_' . $order_index,
						'value' => 'et_contact_proccess',
					],
				]
			);

			// Contact Form - Fields - Button & Captcha.
			$button = $elements->render(
				[
					'attrName' => 'button',
				]
			);

			$basic_captcha = self::render_element_basic_captcha( $attrs, $order_index );

			$bottom_container = HTMLUtility::render(
				[
					'tag'               => 'div',
					'tagEscaped'        => true,
					'attributes'        => [
						'class' => 'et_contact_bottom_container',
					],
					'childrenSanitizer' => 'et_core_esc_previously',
					'children'          => [
						$basic_captcha,
						$button,
					],
				]
			);

			// Contact Form - Fields.
		// phpcs:ignore ET.Sniffs.ValidatedSanitizedInput.InputNotSanitized -- intentionally done.
			$current_url = ( is_ssl() ? 'https://' : 'http://' ) . ( $_SERVER['HTTP_HOST'] ?? '' ) . ( $_SERVER['REQUEST_URI'] ?? '' );

			// Get layout display to add appropriate classes to the form element.
			$layout_display = $attrs['module']['decoration']['layout']['desktop']['value']['display'] ?? 'flex';
			$form_classes   = array_filter(
				[
					'et_pb_contact_form',
					'flex' === $layout_display ? 'et_flex_module' : '',
					'grid' === $layout_display ? 'et_grid_module' : '',
					'block' === $layout_display ? 'et_block_module' : '',
				]
			);

			$form_fields = HTMLUtility::render(
				[
					'tag'               => 'form',
					'tagEscaped'        => true,
					'attributes'        => [
						'class'  => implode( ' ', $form_classes ),
						'method' => 'post',
						'action' => esc_url( $current_url ),
					],
					'childrenSanitizer' => 'et_core_esc_previously',
					'children'          => [
						$content,
						$process_input,
						$bottom_container,
						wp_nonce_field( 'et-pb-contact-form-submit-' . $order_index, '_wpnonce-et-pb-contact-form-submitted-' . $order_index, true, false ),
					],
				]
			);

			$form = HTMLUtility::render(
				[
					'tag'               => 'div',
					'tagEscaped'        => true,
					'attributes'        => [
						'class' => 'et_pb_contact',
					],
					'childrenSanitizer' => 'et_core_esc_previously',
					'children'          => $form_fields,
				]
			);
		}

		$use_redirect = $attrs['redirect']['advanced']['useRedirect']['desktop']['value'] ?? 'off';
		$redirect_url = $attrs['redirect']['innerContent']['desktop']['value'] ?? '';
		$unique_id    = $attrs['module']['advanced']['uniqueId']['desktop']['value'] ?? $block->parsed_block['id'] ?? '';

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
				'defaultPrintedStyleAttrs' => $default_printed_style_attrs,
				'parentId'                 => $parent->id ?? '',
				'parentName'               => $parent->blockName ?? '',
				'parentAttrs'              => $parent->attrs ?? [],
				'childrenIds'              => $children_ids,
				'htmlAttrs'                => [
					'data-form_unique_num' => $block->parsed_block['orderIndex'],
					'data-form_unique_id'  => $unique_id,
					'data-redirect_url'    => 'on' === $use_redirect && '' !== $redirect_url ? $redirect_url : null,
				],
				'children'                 => [
					$elements->style_components(
						[
							'attrName' => 'module',
						]
					),
					$title,
					$message,
					$form,
				],
			]
		);
	}

	/**
	 * ContactFrom module front-end render_block_data filter.
	 *
	 * @since ??
	 *
	 * @param array         $parsed_block The block being rendered.
	 * @param array         $source_block An un-modified copy of $parsed_block, as it appeared in the source content.
	 * @param null|WP_Block $parent_block If this is a nested block, a reference to the parent block.
	 *
	 * @return array Filtered block that being rendered.
	 */
	public static function render_block_data( array $parsed_block, array $source_block, ?WP_Block $parent_block ): array {
		if ( 'divi/contact-form' !== $parsed_block['blockName'] ) {
			return $parsed_block;
		}

		/**
		 * Contact form module must have an id attribute.
		 * If it doesn't have one, we will add it here.
		 */
		$id = $parsed_block['attrs']['module']['advanced']['htmlAttributes']['desktop']['value']['id'] ?? '';

		if ( ! $id ) {
			$parsed_block['attrs']['module']['advanced']['htmlAttributes']['desktop']['value']['id'] = 'et_pb_contact_form_' . ( $parsed_block['orderIndex'] ?? 0 );
		}

		return $parsed_block;
	}

	/**
	 * Render element basic captcha.
	 *
	 * @param array $attrs Module attributes.
	 * @param int   $order_index Module order index.
	 *
	 * @return string
	 */
	public static function render_element_basic_captcha( array $attrs, int $order_index ):string {
		$use_spam_service = $attrs['module']['advanced']['spamProtection']['desktop']['value']['enabled'] ?? 'off';

		if ( 'on' === $use_spam_service ) {
			return '';
		}

		$use_basic_captcha = $attrs['module']['advanced']['spamProtection']['desktop']['value']['useBasicCaptcha'] ?? 'on';

		if ( 'off' === $use_basic_captcha ) {
			return '';
		}

		// generate digits for captcha.
		$et_pb_first_digit  = wp_rand( 1, 15 );
		$et_pb_second_digit = wp_rand( 1, 15 );

		$basic_captcha_question = HTMLUtility::render(
			[
				'tag'               => 'span',
				'tagEscaped'        => true,
				'attributes'        => [
					'class' => 'et_pb_contact_captcha_question',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => sprintf( '%1$s + %2$s', esc_html( $et_pb_first_digit ), esc_html( $et_pb_second_digit ) ),
			]
		);

		$basic_captcha_input = HTMLUtility::render(
			[
				'tag'        => 'input',
				'tagEscaped' => true,
				'attributes' => [
					'type'               => 'text',
					'size'               => '2',
					'class'              => 'input et_pb_contact_captcha',
					'data-first_digit'   => $et_pb_first_digit,
					'data-second_digit'  => $et_pb_second_digit,
					'data-required_mark' => 'required',
					'name'               => 'et_pb_contact_captcha_' . $order_index,
					'autocomplete'       => 'off',
				],
			]
		);

		$basic_captcha_wrapper = HTMLUtility::render(
			[
				'tag'               => 'p',
				'tagEscaped'        => true,
				'attributes'        => [
					'class' => 'clearfix',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $basic_captcha_question . ' = ' . $basic_captcha_input,
			]
		);

		$basic_captcha = HTMLUtility::render(
			[
				'tag'               => 'div',
				'tagEscaped'        => true,
				'attributes'        => [
					'class' => 'et_pb_contact_right et_pb_contact_field',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $basic_captcha_wrapper,
			]
		);

		return $basic_captcha;
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
	 * ContactFormModule::set_front_end_data( [
	 *   'selector' => '.et_pb_contact_form_0',
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
				'data_name'    => 'contact_form',
				'data_item_id' => null,
				'data_item'    => [
					'selector' => $selector,
				],
			]
		);
	}

	/**
	 * Loads `ContactFormModule` and registers Front-End render callback and REST API Endpoints.
	 *
	 * @since ??
	 *
	 * @return void
	 */
	public function load() {
		// phpcs:ignore PHPCompatibility.FunctionUse.NewFunctionParameters.dirname_levelsFound -- We have PHP 7 support now, This can be deleted once PHPCS config is updated.
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/contact-form/';

		add_filter( 'divi_conversion_presets_attrs_map', array( ContactFormPresetAttrsMap::class, 'get_map' ), 10, 2 );

		add_filter(
			'render_block_data',
			[ self::class, 'render_block_data' ],
			10,
			3
		);

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

