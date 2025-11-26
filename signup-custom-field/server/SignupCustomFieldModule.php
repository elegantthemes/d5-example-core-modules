<?php
/**
 * ModuleLibrary: Custom Field Module class.
 *
 * @package Builder\Packages\ModuleLibrary
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\SignupCustomField;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- WordPress uses snakeCase in \WP_Block_Parser_Block

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\Framework\Utility\SanitizerUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewScriptData;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Element\ElementClassnames;
use ET\Builder\Packages\Module\Options\Element\ElementStyle;
use ET\Builder\Packages\Module\Options\FormField\FormFieldStyle;
use ET\Builder\Packages\Module\Options\Text\TextClassnames;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use WP_Block_Type_Registry;
use WP_Block;
use ET\Builder\Packages\GlobalData\GlobalPresetItemGroup;

/**
 * `SignupCustomFieldModule` is consisted of functions used for Custom Field Module such as Front-End rendering, REST API Endpoints etc.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 */
class SignupCustomFieldModule implements DependencyInterface {

	/**
	 * Module custom CSS fields.
	 *
	 * This function is equivalent of JS function cssFields located in
	 * visual-builder/packages/module-library/src/components/signup-custom-field/custom-css.ts.
	 *
	 * @since ??
	 *
	 * @return array The array of custom CSS fields.
	 */
	public static function custom_css():array {
		return WP_Block_Type_Registry::get_instance()->get_registered( 'divi/signup-custom-field' )->customCssFields;
	}

	/**
	 * Set CSS class names to the module.
	 *
	 * This function is equivalent of JS function moduleClassnames located in
	 * visual-builder/packages/module-library/src/components/signup-custom-field/module-classnames.ts.
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
		global $half_width_counter;

		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];

		$fullwidth = $attrs['fieldItem']['advanced']['fullwidth']['desktop']['value'] ?? 'off';
		$hidden    = $attrs['fieldItem']['advanced']['hidden']['desktop']['value'] ?? 'off';

		$half_width_counter = ! isset( $half_width_counter ) ? 0 : $half_width_counter;

		// count fields to add the et_pb_contact_field_last properly.
		if ( 'off' === $fullwidth ) {
			$half_width_counter++;
		} else {
			$half_width_counter = 0;
		}

		$classnames_instance->add( 'et_pb_contact_field', true );
		$classnames_instance->add( 'et_pb_newsletter_field', true );

		$classnames_instance->add( 'et_pb_contact_field--hidden', 'on' === $hidden );
		$classnames_instance->add( 'et_pb_contact_field_half', 'off' === $fullwidth );
		$classnames_instance->add( 'et_pb_contact_field_last', ( 0 === $half_width_counter % 2 ) || 'off' !== $fullwidth );

		// Add background specific class.
		$background = $attrs['module']['decoration']['background']['desktop']['value'] ?? [];
		if ( ! empty( $background ) ) {
			$classnames_instance->add( 'has-background', true );
		}

		// Text options.
		$classnames_instance->add( TextClassnames::text_options_classnames( $attrs['module']['advanced']['text'] ?? [] ), true );

		// Module.
		$classnames_instance->add(
			ElementClassnames::classnames(
				[
					'attrs' => $attrs['module']['decoration'] ?? [],
				]
			)
		);
	}

	/**
	 * Set script data to the module.
	 *
	 * This function is equivalent of JS function ModuleScriptData located in
	 * visual-builder/packages/module-library/src/components/signup-custom-field/module-script-data.tsx.
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

		// Setup input field placeholder.
		MultiViewScriptData::set(
			[
				'id'            => $id,
				'name'          => $name,
				'storeInstance' => $store_instance,
				'hoverSelector' => $selector,
				'setAttrs'      => [
					[
						'selector'      => $selector . ' .input',
						'data'          => [
							'placeholder' => $attrs['fieldItem']['innerContent'] ?? '',
						],
						'valueResolver' => function ( $value ) {
							return $value ?? '';
						},
						'tag'           => 'input',
					],
				],
			]
		);
	}

	/**
	 * Set CSS styles to the module.
	 *
	 * This function is equivalent of JS function ModuleStyles located in
	 * visual-builder/packages/module-library/src/components/signup-custom-field/module-styles.tsx.
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
	public static function module_styles( $args ) {
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
								'spacing'                  => [
									'selector'          => ".et_pb_newsletter_form p{$order_class}",
									'propertySelectors' => [
										'desktop' => [
											'value' => [
												'padding' => ".et_pb_newsletter_form p{$order_class}.et_pb_newsletter_field.et_pb_signup_custom_field",
											],
										],
									],
								],
								'border'                   => [
									'selector' => ".et_pb_newsletter_form .et_pb_newsletter_fields p{$order_class} .input, .et_pb_newsletter_form .et_pb_newsletter_fields p{$order_class} .input[type='checkbox'] + label i, .et_pb_newsletter_form .et_pb_newsletter_fields p{$order_class} .input[type='radio'] + label i",
								],
								'boxShadow'                => [
									'selector' => "{$order_class} input, {$order_class} select, {$order_class} textarea, {$order_class} .et_pb_contact_field_options_list label > i",
								],
								'advancedStyles'           => [
									[
										'componentName' => 'divi/text',
										'props'         => [
											'selector' => ".et_pb_contact_form_container {$order_class}.et_pb_contact_field",
											'attr'     => $attrs['module']['advanced']['text'] ?? [],
											'propertySelectors' => [
												'text' => [
													'desktop' => [
														'value' => [
															'text-align' => "{$order_class} input, {$order_class} textarea, {$order_class} label",
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
					FormFieldStyle::style(
						[
							'attr'              => $attrs['field'] ?? [],
							'selector'          => ".et_pb_newsletter_form .et_pb_newsletter_fields p{$order_class} .input[type=\"radio\"] + label, .et_pb_newsletter_form .et_pb_newsletter_fields p{$order_class} .input, .et_pb_newsletter_form .et_pb_newsletter_fields p{$order_class} .input[type=\"checkbox\"] + label, {$order_class}.et_pb_contact_field .et_pb_contact_field_options_title",
							'important'         => [
								'font' => [
									'font' => [
										'desktop' => [
											'value' => [
												'color' => true,
											],
										],
									],
								],
							],
							'propertySelectors' => [
								'background' => [
									'desktop' => [
										'value' => [
											'background-color' => ".et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} input[type=\"text\"], .et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} textarea, .et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} select, .et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} .input[type=\"checkbox\"] + label i, .et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} .input[type=\"radio\"] + label i",
										],
										'hover' => ".et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} input[type=\"text\"]:hover, .et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} textarea:hover, .et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} select:hover, .et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} .input[type=\"checkbox\"] + label:hover i, .et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} .input[type=\"radio\"] + label:hover i",
									],
								],
								'font'       => [
									'font' => [
										'desktop' => [
											'value' => [
												'color' => ".et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} input[type=\"text\"], .et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} textarea, .et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} select, .et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} .input[type=\"checkbox\"] + label i::before, .et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} .input::placeholder",
											],
											'hover' => [
												'color' => ".et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} input[type=\"text\"]:hover, .et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} textarea:hover, .et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} select:hover, .et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} .input[type=\"checkbox\"] + label:hover i::before, .et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} .input:hover::placeholder",
											],
										],
									],
								],
								'focus'      => [
									'background' => [
										'desktop' => [
											'value' => [
												'background-color' => ".et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} input.input, .et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} textarea, .et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} select",
											],
										],
									],
									'font'       => [
										'font' => [
											'desktop' => [
												'value' => [
													'color' => ".et_pb_newsletter_form .et_pb_newsletter_fields {$order_class} .input",
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
							'selector'   => ".et_pb_newsletter_form .et_pb_newsletter_fields p{$order_class} .input::placeholder",
							'attr'       => [
								'font' => $attrs['field']['decoration']['font'] ?? [],
							],
							'orderClass' => $order_class,
						]
					),
					ElementStyle::style(
						[
							'selector'   => ".et_pb_newsletter_form .et_pb_newsletter_fields p{$order_class} .input::-webkit-input-placeholder",
							'attr'       => [
								'font' => $attrs['field']['decoration']['font'] ?? [],
							],
							'orderClass' => $order_class,
						]
					),
					ElementStyle::style(
						[
							'selector'   => ".et_pb_newsletter_form .et_pb_newsletter_fields p{$order_class} .input::-moz-placeholder",
							'attr'       => [
								'font' => $attrs['field']['decoration']['font'] ?? [],
							],
							'orderClass' => $order_class,
						]
					),
					ElementStyle::style(
						[
							'selector'   => ".et_pb_newsletter_form .et_pb_newsletter_fields p{$order_class} .input::-ms-input-placeholder",
							'attr'       => [
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
	 * This function is equivalent of JS function SignupCustomFieldEdit located in
	 * visual-builder/packages/module-library/src/components/signup-custom-field/edit.tsx.
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
	public static function render_callback( array $attrs, string $content, WP_Block $block, ModuleElements $elements, array $default_printed_style_attrs ): string {
		et_core_nonce_verified_previously();
		// Get parent attrs.
		$parent               = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );
		$default_parent_attrs = ModuleRegistration::get_default_attrs( 'divi/signup' );
		$parent_attrs         = array_replace_recursive( $default_parent_attrs, $parent->attrs ?? [] );

		// Field attrs.
		$field_title                = $attrs['fieldItem']['innerContent']['desktop']['value'] ?? '';
		$field_type                 = $attrs['fieldItem']['advanced']['type']['desktop']['value'] ?? '';
		$field_id                   = $attrs['fieldItem']['advanced']['id']['desktop']['value'] ?? '';
		$field_required             = $attrs['fieldItem']['advanced']['required']['desktop']['value'] ?? '';
		$allowed_symbols            = $attrs['fieldItem']['advanced']['allowedSymbols']['desktop']['value'] ?? '';
		$max_length                 = $attrs['fieldItem']['advanced']['maxLength']['desktop']['value'] ?? '';
		$min_length                 = $attrs['fieldItem']['advanced']['minLength']['desktop']['value'] ?? '';
		$radio_options              = $attrs['fieldItem']['advanced']['radioOptions']['desktop']['value'] ?? [];
		$checkbox_options           = $attrs['fieldItem']['advanced']['checkboxOptions']['desktop']['value'] ?? [];
		$select_options             = $attrs['fieldItem']['advanced']['selectOptions']['desktop']['value'] ?? [];
		$boolean_checkbox_options   = $attrs['fieldItem']['advanced']['booleanCheckboxOptions']['desktop']['value'] ?? [];
		$use_conditional_logic      = $attrs['conditionalLogic']['advanced']['enable']['desktop']['value'] ?? 'off';
		$conditional_logic_relation = $attrs['conditionalLogic']['advanced']['relation']['desktop']['value'] ?? 'off';
		$conditional_logic_rules    = $attrs['conditionalLogic']['innerContent']['desktop']['value'] ?? '';
		$field_id                   = strtolower( $field_id );
		$required                   = 'off' === $field_required ? 'not_required' : 'required';
		$field_unique_id            = self::get_field_unique_id( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );

		// Input field label.
		$label = $elements->render(
			[
				'attrName'   => 'fieldItem',
				'attributes' => [
					'for'   => $field_unique_id,
					'class' => 'et_pb_contact_form_label',
				],
			]
		);

		$input = '';

		$pattern         = null;
		$title           = '';
		$min_length      = intval( $min_length );
		$max_length      = intval( $max_length );
		$symbols_pattern = '.';
		$length_pattern  = '*';

		if ( in_array( $allowed_symbols, array( 'letters', 'numbers', 'alphanumeric' ), true ) ) {
			switch ( $allowed_symbols ) {
				case 'letters':
					$symbols_pattern = '[A-Za-z\s\-]';
					$title           = __( 'Only letters allowed.', 'et_builder_5' );
					break;
				case 'numbers':
					$symbols_pattern = '[0-9\s\-]';
					$title           = __( 'Only numbers allowed.', 'et_builder_5' );
					break;
				case 'alphanumeric':
					$symbols_pattern = '[\w\s\-]';
					$title           = __( 'Only letters and numbers allowed.', 'et_builder_5' );
					break;
			}
		}

		if ( 0 !== $min_length && 0 !== $max_length ) {
			$max_length = max( $min_length, $max_length );
			$min_length = min( $min_length, $max_length );
		}

		if ( 0 !== $min_length || 0 !== $max_length ) {
			$length_pattern = '{';

			if ( 0 !== $min_length ) {
				$length_pattern .= $min_length;
				$title          .= sprintf( __( 'Minimum length: %1$d characters. ', 'et_builder_5' ), $min_length );
			}

			if ( 0 === $max_length ) {
				$length_pattern .= ',';
			}

			if ( 0 === $min_length ) {
				$length_pattern .= '0';
			}

			if ( 0 !== $max_length ) {
				$length_pattern .= ",{$max_length}";
				$title          .= sprintf( __( 'Maximum length: %1$d characters.', 'et_builder_5' ), $max_length );
			}

			$length_pattern .= '}';
		}

		if ( '.' !== $symbols_pattern || '*' !== $length_pattern ) {
			$pattern = $symbols_pattern . $length_pattern;
		}

		switch ( $field_type ) {
			case 'text':
			case 'textarea':
				$input = HTMLUtility::render(
					[
						'tag'        => 'textarea',
						'tagEscaped' => true,
						'attributes' => [
							'name'               => $field_unique_id,
							'id'                 => $field_unique_id,
							'class'              => 'et_pb_contact_message input',
							'data-required_mark' => $required,
							'data-field_type'    => $field_type,
							'data-original_id'   => $field_id,
							'placeholder'        => $field_title,
						],
						'children'   => ( isset( $_POST[ $field_unique_id ] ) ? esc_html( sanitize_textarea_field( $_POST[ $field_unique_id ] ) ) : '' ),
					]
				);
				break;
			case 'input':
			case 'email':
				if ( 'email' === $field_type ) {
					$pattern = null;
				}
				$input = HTMLUtility::render(
					[
						'tag'        => 'input',
						'tagEscaped' => true,
						'attributes' => [
							'type'               => 'text',
							'id'                 => $field_unique_id,
							'class'              => 'input',
							'value'              => ( isset( $_POST[ $field_unique_id ] ) ? esc_html( sanitize_textarea_field( $_POST[ $field_unique_id ] ) ) : '' ),
							'name'               => $field_unique_id,
							'data-required_mark' => $required,
							'data-field_type'    => $field_type,
							'data-original_id'   => $field_id,
							'placeholder'        => $field_title,
							'pattern'            => $pattern,
							'maxlength'          => $max_length > 0 ? $max_length : null,
						],
					]
				);
				break;
			case 'checkbox':
				if ( 'booleancheckbox' === $field_type ) {
					$checkbox_options = $boolean_checkbox_options;
				}

				$input_fields = '';
				if ( $checkbox_options ) {
					foreach ( $checkbox_options as $index => $option ) {
						$checked     = $option['checked'] ?? '0';
						$drag_id     = $option['dragID'] ?? strval( $index );
						$option_link = '';

						if ( ! empty( $option['link']['url'] ) ) {
							$link_text   = isset( $option['link']['text'] ) ? $option['link']['text'] : '';
							$option_link = HTMLUtility::render(
								[
									'tag'        => 'a',
									'tagEscaped' => true,
									'attributes' => [
										'target' => '_blank',
										'href'   => $option['link']['url'] ?? '',
									],
									'children'   => $link_text,
								]
							);
						}

						$checkbox_input = HTMLUtility::render(
							[
								'tag'        => 'input',
								'tagEscaped' => true,
								'attributes' => [
									'type'    => 'checkbox',
									'id'      => $field_unique_id . '_' . $index,
									'class'   => 'input',
									'value'   => SanitizerUtility::wp_strip_all_tags_no_trim( $option['value'] ?? '' ),
									'data-id' => $drag_id,
									'checked' => '1' === $checked,
								],
							]
						);

						$checkbox_label = HTMLUtility::render(
							[
								'tag'               => 'label',
								'tagEscaped'        => true,
								'attributes'        => [
									'for' => $field_unique_id . '_' . $index,
								],
								'childrenSanitizer' => 'et_core_esc_previously',
								'children'          => [
									HTMLUtility::render(
										[
											'tag'        => 'i',
											'tagEscaped' => true,
										]
									),
									SanitizerUtility::wp_strip_all_tags_no_trim( $option['value'] ?? '' ),
									$option_link,
								],
							]
						);

						$input_fields .= HTMLUtility::render(
							[
								'tag'               => 'span',
								'tagEscaped'        => true,
								'childrenSanitizer' => 'et_core_esc_previously',
								'attributes'        => [
									'class' => 'et_pb_contact_field_checkbox',
								],
								'children'          => [
									$checkbox_input,
									$checkbox_label,
								],
							]
						);
					}
				} else {
					$input_fields .= esc_html__( 'No options added.', 'et_builder_5' );
				}

				$checkbox_hidden_input = HTMLUtility::render(
					[
						'tag'        => 'input',
						'tagEscaped' => true,
						'attributes' => [
							'type'               => 'hidden',
							'name'               => $field_unique_id,
							'class'              => 'et_pb_checkbox_handle',
							'data-required_mark' => $required,
							'data-field_type'    => $field_type,
							'data-original_id'   => $field_id,
						],
					]
				);

				$input_wrapper = HTMLUtility::render(
					[
						'tag'               => 'span',
						'tagEscaped'        => true,
						'childrenSanitizer' => 'et_core_esc_previously',
						'attributes'        => [
							'class' => 'et_pb_contact_field_options_wrapper',
						],
						'children'          => [
							HTMLUtility::render(
								[
									'tag'        => 'span',
									'tagEscaped' => true,
									'attributes' => [
										'class' => 'et_pb_contact_field_options_title',
									],
									'children'   => $field_title,
								]
							),
							HTMLUtility::render(
								[
									'tag'               => 'span',
									'tagEscaped'        => true,
									'childrenSanitizer' => 'et_core_esc_previously',
									'attributes'        => [
										'class' => 'et_pb_contact_field_options_list',
									],
									'children'          => $input_fields,
								]
							),
						],
					]
				);

				$input = $checkbox_hidden_input . $input_wrapper;
				break;
			case 'radio':
				$input_fields = '';
				if ( $radio_options ) {
					foreach ( $radio_options as $index => $option ) {
						$checked     = $option['checked'] ?? '0';
						$drag_id     = $option['dragID'] ?? strval( $index );
						$option_link = '';

						if ( ! empty( $option['link']['url'] ) ) {
							$link_text   = isset( $option['link']['text'] ) ? $option['link']['text'] : '';
							$option_link = HTMLUtility::render(
								[
									'tag'        => 'a',
									'tagEscaped' => true,
									'attributes' => [
										'target' => '_blank',
										'href'   => $option['link']['url'] ?? '',
									],
									'children'   => $link_text,
								]
							);
						}

						$radio_input = HTMLUtility::render(
							[
								'tag'        => 'input',
								'tagEscaped' => true,
								'attributes' => [
									'type'               => 'radio',
									'id'                 => $field_unique_id . '_' . $index,
									'class'              => 'input',
									'value'              => SanitizerUtility::wp_strip_all_tags_no_trim( $option['value'] ?? '' ),
									'name'               => $field_unique_id,
									'data-required_mark' => $required,
									'data-field_type'    => $field_type,
									'data-original_id'   => $field_id,
									'data-id'            => $drag_id,
									'checked'            => '1' === $checked,
								],
							]
						);

						$radio_label = HTMLUtility::render(
							[
								'tag'               => 'label',
								'tagEscaped'        => true,
								'attributes'        => [
									'for' => $field_unique_id . '_' . $index,
								],
								'childrenSanitizer' => 'et_core_esc_previously',
								'children'          => [
									HTMLUtility::render(
										[
											'tag'        => 'i',
											'tagEscaped' => true,
										]
									),
									SanitizerUtility::wp_strip_all_tags_no_trim( $option['value'] ?? '' ),
									$option_link,
								],
							]
						);

						$input_fields .= HTMLUtility::render(
							[
								'tag'               => 'span',
								'tagEscaped'        => true,
								'childrenSanitizer' => 'et_core_esc_previously',
								'attributes'        => [
									'class' => 'et_pb_contact_field_radio',
								],
								'children'          => [
									$radio_input,
									$radio_label,
								],
							]
						);
					}
				} else {
					$input_fields .= esc_html__( 'No options added.', 'et_builder_5' );
				}

				$input = HTMLUtility::render(
					[
						'tag'               => 'span',
						'tagEscaped'        => true,
						'childrenSanitizer' => 'et_core_esc_previously',
						'attributes'        => [
							'class' => 'et_pb_contact_field_options_wrapper',
						],
						'children'          => [
							HTMLUtility::render(
								[
									'tag'        => 'span',
									'tagEscaped' => true,
									'attributes' => [
										'class' => 'et_pb_contact_field_options_title',
									],
									'children'   => $field_title,
								]
							),
							HTMLUtility::render(
								[
									'tag'               => 'span',
									'tagEscaped'        => true,
									'childrenSanitizer' => 'et_core_esc_previously',
									'attributes'        => [
										'class' => 'et_pb_contact_field_options_list',
									],
									'children'          => $input_fields,
								]
							),
						],
					]
				);
				break;
			case 'select':
				$options = HTMLUtility::render(
					[
						'tag'        => 'option',
						'tagEscaped' => true,
						'attributes' => [
							'value' => '',
						],
						'children'   => $field_title,
					]
				);

				if ( $select_options ) {
					foreach ( $select_options as $index => $option ) {
						$options .= HTMLUtility::render(
							[
								'tag'        => 'option',
								'tagEscaped' => true,
								'attributes' => [
									'value'   => $option['value'] ?? '',
									'data-id' => $option['dragID'] ?? strval( $index ),
								],
								'children'   => $option['value'] ?? '',
							]
						);
					}
				}

				$input = HTMLUtility::render(
					[
						'tag'               => 'select',
						'tagEscaped'        => true,
						'attributes'        => [
							'id'                 => $field_unique_id,
							'class'              => 'et_pb_contact_select input',
							'name'               => $field_unique_id,
							'data-required_mark' => $required,
							'data-field_type'    => $field_type,
							'data-original_id'   => $field_id,
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => $options,
					]
				);
				break;
		}

		// Prepare Conditional Logic for this field.
		$conditional_logic_rules_value    = '';
		$conditional_logic_relation_value = '';
		if ( 'on' === $use_conditional_logic && ! empty( $conditional_logic_rules ) ) {
			$ruleset = array();
			foreach ( $conditional_logic_rules as $condition_row ) {
				$condition_value = isset( $condition_row['value'] ) ? $condition_row['value'] : '';
				$condition_value = trim( $condition_value );

				$ruleset[] = array(
					strtolower( $condition_row['field'] ),
					$condition_row['condition'],
					$condition_value,
				);
			}

			if ( ! empty( $ruleset ) ) {
				$conditional_logic_rules_value    = wp_json_encode( $ruleset );
				$conditional_logic_relation_value = 'off' === $conditional_logic_relation ? 'any' : 'all';
			}
		}

		return Module::render(
			[
				// FE only.
				'orderIndex'               => $block->parsed_block['orderIndex'],
				'storeInstance'            => $block->parsed_block['storeInstance'],

				// VB equivalent.
				'tag'                      => 'p',
				'attrs'                    => $attrs,
				'id'                       => $block->parsed_block['id'],
				'elements'                 => $elements,
				'name'                     => $block->block_type->name,
				'moduleCategory'           => $block->block_type->category,
				'htmlAttrs'                => [
					'data-id'                   => $field_id,
					'data-type'                 => $field_type,
					'data-conditional-logic'    => '' !== $conditional_logic_rules_value ? $conditional_logic_rules_value : null,
					'data-conditional-relation' => '' !== $conditional_logic_relation_value ? $conditional_logic_relation_value : null,
				],
				'classnamesFunction'       => [ self::class, 'module_classnames' ],
				'stylesComponent'          => [ self::class, 'module_styles' ],
				'scriptDataComponent'      => [ self::class, 'module_script_data' ],
				'defaultPrintedStyleAttrs' => $default_printed_style_attrs,
				'parentAttrs'              => $parent_attrs,
				'parentId'                 => $parent->id ?? '',
				'parentName'               => $parent->blockName ?? '',
				'children'                 => [
					$elements->style_components(
						[
							'attrName' => 'module',
						]
					),
					$label,
					$input,
				],
			]
		);
	}

	/**
	 * Get field unique id.
	 *
	 * @since ??
	 *
	 * @param string $module_id Module ID.
	 * @param int    $store_instance Store instance.
	 *
	 * @return string Field unique id.
	 */
	public static function get_field_unique_id( string $module_id, int $store_instance ):string {
		$parent             = BlockParserStore::get_parent( $module_id, $store_instance );
		$current            = BlockParserStore::get( $module_id, $store_instance );
		$parent_order_index = $parent->orderIndex ?? 0; // phpcs:ignore ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- This is a property of the WP Core class.
		$order_index        = $current->orderIndex ?? 0;// phpcs:ignore ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- This is a property of the WP Core class.
		$field_id           = strtolower( $current->attrs['fieldItem']['advanced']['id']['desktop']['value'] ?? '' );

		return "et_pb_contact_{$parent_order_index}_{$field_id}_{$order_index}";
	}

	/**
	 * Loads `SignupCustomFieldModule` and registers Front-End render callback and REST API Endpoints.
	 *
	 * @since ??
	 *
	 * @return void
	 */
	public function load() {
		// phpcs:ignore PHPCompatibility.FunctionUse.NewFunctionParameters.dirname_levelsFound -- We have PHP 7 support now, This can be deleted once PHPCS config is updated.
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/signup-custom-field/';

		add_filter( 'divi_conversion_presets_attrs_map', array( SignupCustomFieldPresetAttrsMap::class, 'get_map' ), 10, 2 );

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
