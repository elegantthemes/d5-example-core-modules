<?php
/**
 * ModuleLibrary: Field Module class.
 *
 * @package Builder\Packages\ModuleLibrary
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\ContactField;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- WordPress uses snakeCase in \WP_Block_Parser_Block

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\HTMLUtility;
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
use ET\Builder\Packages\ModuleUtils\ChildrenUtils;
use WP_Block_Type_Registry;
use WP_Block;

/**
 * `ContactFieldModule` is consisted of functions used for Field Module such as Front-End rendering, REST API Endpoints etc.
 *
 * This is a dependency class and can be used as a dependency for `DependencyTree`.
 *
 * @since ??
 */
class ContactFieldModule implements DependencyInterface {

	/**
	 * Module custom CSS fields.
	 *
	 * This function is equivalent of JS function cssFields located in
	 * visual-builder/packages/module-library/src/components/contact-field/custom-css.ts.
	 *
	 * @since ??
	 *
	 * @return array The array of custom CSS fields.
	 */
	public static function custom_css():array {
		return WP_Block_Type_Registry::get_instance()->get_registered( 'divi/contact-field' )->customCssFields;
	}

	/**
	 * Set CSS class names to the module.
	 *
	 * This function is equivalent of JS function moduleClassnames located in
	 * visual-builder/packages/module-library/src/components/contact-field/module-classnames.ts.
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
		$parent_attrs        = $args['parentAttrs'] ?? [];

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
	 * visual-builder/packages/module-library/src/components/contact-field/module-script-data.tsx.
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
	 * visual-builder/packages/module-library/src/components/contact-field/module-styles.tsx.
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
	 *     @type int|null       $storeInstance    The ID of instance where this block stored in BlockParserStore.
	 *     @type int            $orderIndex       The order index of the element.
	 *     @type ModuleElements $elements         The ModuleElements instance.
	 * }
	 */
	public static function module_styles( array $args ) : void {
		$attrs                       = $args['attrs'] ?? [];
		$elements                    = $args['elements'];
		$settings                    = $args['settings'] ?? [];
		$order_class                 = $args['orderClass'] ?? '';
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
							'selector'          => implode(
								', ',
								[
									"{$order_class}.et_pb_contact_field .et_pb_contact_field_options_title",
									"{$order_class}.et_pb_contact_field .input[type=checkbox] + label",
									"{$order_class}.et_pb_contact_field .input[type=radio] + label",
									"{$order_class}.et_pb_contact_field .input",
								]
							),
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
								'background'  => [
									'desktop' => [
										'value' => [
											'background-color' => implode(
												', ',
												[
													"{$order_class}.et_pb_contact_field .input",
													"{$order_class}.et_pb_contact_field .input[type=\"checkbox\"] + label i",
													"{$order_class}.et_pb_contact_field .input[type=\"radio\"] + label i",
												]
											),
										],
										'hover' => [
											'background-color' => implode(
												', ',
												[
													"{$order_class}.et_pb_contact_field .input:hover",
													"{$order_class}.et_pb_contact_field .input[type=\"checkbox\"] + label:hover i",
													"{$order_class}.et_pb_contact_field .input[type=\"radio\"] + label:hover i",
												]
											),
										],
									],
								],
								'font'        => [
									'font' => [
										'desktop' => [
											'value' => [
												'color' => implode(
													', ',
													[
														"{$order_class}.et_pb_contact_field .input",
														"{$order_class}.et_pb_contact_field .input[type=\"checkbox\"] + label",
														"{$order_class}.et_pb_contact_field .input[type=\"radio\"] + label",
														"{$order_class}.et_pb_contact_field .input[type=\"checkbox\"]:checked + label i:before",
													]
												),
											],
											'hover' => [
												'color' => implode(
													', ',
													[
														"{$order_class}.et_pb_contact_field .input:hover",
														"{$order_class}.et_pb_contact_field .input[type=\"checkbox\"]:hover + label",
														"{$order_class}.et_pb_contact_field .input[type=\"radio\"]:hover + label",
														"{$order_class}.et_pb_contact_field .input[type=\"checkbox\"]:checked:hover + label i:before",
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
													'color' => "{$order_class}.et_pb_contact_field .input",
												],
											],
										],
									],
								],
								'focus'       => [
									'background' => [
										'desktop' => [
											'value' => [
												'background-color' => "{$order_class}.et_pb_contact_field .input",
											],
											'hover' => [
												'background-color' => "{$order_class}.et_pb_contact_field .input",
											],
										],
									],
									'font'       => [
										'font' => [
											'desktop' => [
												'value' => [
													'color' => "{$order_class}.et_pb_contact_field .input",
												],
												'hover' => [
													'color' => "{$order_class}.et_pb_contact_field .input",
												],
											],
										],
									],
								],
							],
							'orderClass'        => $order_class,
						]
					),
					// Focus Element Selector is different for the checkbox and radio input.
					ElementStyle::style(
						[
							'selector'   => implode(
								', ',
								[
									"{$order_class}.et_pb_contact_field .input[type=\"checkbox\"]:active + label i",
									"{$order_class}.et_pb_contact_field .input[type=\"radio\"]:active + label i",
								]
							),
							'background' => [
								'selectors' => [
									'desktop' => [
										'value' => implode(
											', ',
											[
												"{$order_class}.et_pb_contact_field .input[type=\"checkbox\"]:active + label i",
												"{$order_class}.et_pb_contact_field .input[type=\"radio\"]:active + label i",
											]
										),
										'hover' => implode(
											', ',
											[
												"{$order_class}.et_pb_contact_field .input[type=\"checkbox\"]:active:hover + label i",
												"{$order_class}.et_pb_contact_field .input[type=\"radio\"]:active:hover + label i",
											]
										),
									],
								],
							],
							'attrs'      => [
								'font' => $attrs['field']['advanced']['focus']['background'] ?? [],
							],
							'orderClass' => $order_class,
						]
					),
					ElementStyle::style(
						[
							'selector'   => implode(
								', ',
								[
									"{$order_class}.et_pb_contact_field .input[type=\"checkbox\"]:active + label",
									"{$order_class}.et_pb_contact_field .input[type=\"radio\"]:active + label",
									"{$order_class}.et_pb_contact_field .input[type=\"checkbox\"]:checked:active + label i:before",
								]
							),
							'font'       => [
								'selectors' => [
									'desktop' => [
										'value' => implode(
											', ',
											[
												"{$order_class}.et_pb_contact_field .input[type=\"checkbox\"]:active + label",
												"{$order_class}.et_pb_contact_field .input[type=\"radio\"]:active + label",
												"{$order_class}.et_pb_contact_field .input[type=\"checkbox\"]:checked:active + label i:before",
											]
										),
										'hover' => implode(
											', ',
											[
												"{$order_class}.et_pb_contact_field .input[type=\"checkbox\"]:active:hover + label",
												"{$order_class}.et_pb_contact_field .input[type=\"radio\"]:active:hover + label",
												"{$order_class}.et_pb_contact_field .input[type=\"checkbox\"]:checked:active:hover + label i:before",
											]
										),
									],
								],
							],
							'attrs'      => [
								'font' => $attrs['field']['advanced']['focus']['font'] ?? [],
							],
							'orderClass' => $order_class,
						]
					),

					// ::*placeholder style can't handle multiple selectors used the same statements.
					ElementStyle::style(
						[
							'selector'   => "{$order_class}.et_pb_contact_field .input::placeholder",
							'attrs'      => [
								'font' => $attrs['field']['decoration']['font'] ?? [],
							],
							'orderClass' => $order_class,
						]
					),
					ElementStyle::style(
						[
							'selector'   => "{$order_class}.et_pb_contact_field .input::-webkit-input-placeholder",
							'attrs'      => [
								'font' => $attrs['field']['decoration']['font'] ?? [],
							],
							'orderClass' => $order_class,
						]
					),
					ElementStyle::style(
						[
							'selector'   => "{$order_class}.et_pb_contact_field .input::-moz-placeholder",
							'attrs'      => [
								'font' => $attrs['field']['decoration']['font'] ?? [],
							],
							'orderClass' => $order_class,
						]
					),
					ElementStyle::style(
						[
							'selector'   => "{$order_class}.et_pb_contact_field .input::-ms-input-placeholder",
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
	 * This function is equivalent of JS function ContactFieldEdit located in
	 * visual-builder/packages/module-library/src/components/contact-field/edit.tsx.
	 *
	 * @since ??
	 *
	 * @param array          $attrs                       Block attributes that were saved by Divi Builder.
	 * @param string         $child_modules_content       The child modules content.
	 * @param WP_Block       $block                       Parsed block object that is being rendered.
	 * @param ModuleElements $elements                    An instance of the ModuleElements class.
	 * @param array          $default_printed_style_attrs Default printed style attributes.
	 *
	 * @return string The module HTML output.
	 */
	public static function render_callback( array $attrs, string $child_modules_content, WP_Block $block, ModuleElements $elements, array $default_printed_style_attrs ): string {
		et_core_nonce_verified_previously();
		// Get parent attrs.
		$parent               = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );
		$default_parent_attrs = ModuleRegistration::get_default_attrs( 'divi/contact-form' );
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

		// Input field label.
		$label = $elements->render(
			[
				'attrName' => 'fieldItem',
			]
		);

		$input = '';

		$field_unique_id = self::get_field_unique_id( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );

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
							'name'               => $field_unique_id,
							'id'                 => $field_unique_id,
							'class'              => 'input',
							'data-required_mark' => $required,
							'data-field_type'    => $field_type,
							'data-original_id'   => $field_id,
							'placeholder'        => $field_title,
							'pattern'            => $pattern,
							'title'              => $title,
							'maxlength'          => $max_length > 0 ? $max_length : null,
							'value'              => ( isset( $_POST[ $field_unique_id ] ) ? esc_html( sanitize_textarea_field( $_POST[ $field_unique_id ] ) ) : '' ),
						],
					]
				);
				break;
			case 'checkbox':
			case 'booleancheckbox':
				if ( 'booleancheckbox' === $field_type ) {
					$checkbox_options = $boolean_checkbox_options;
				}

				$input_fields = '';
				if ( $checkbox_options ) {
					foreach ( $checkbox_options as $index => $option ) {
						$checked     = $option['checked'] ?? '0';
						$drag_id     = $option['dragID'] ?? '';
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
									'type'               => 'checkbox',
									'id'                 => $field_unique_id . '_' . $index,
									'class'              => 'input',
									'value'              => wp_strip_all_tags( $option['value'] ?? '' ),
									'data-required_mark' => $required,
									'data-field_type'    => $field_type,
									'data-original_id'   => $field_id,
									'checked'            => '1' === $checked,
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
									wp_strip_all_tags( $option['value'] ?? '' ),
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
						$drag_id     = $option['dragID'] ?? '';
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
									'name'               => $field_unique_id,
									'id'                 => $field_unique_id . '_' . $index,
									'class'              => 'input',
									'value'              => wp_strip_all_tags( $option['value'] ?? '' ),
									'data-required_mark' => $required,
									'data-field_type'    => $field_type,
									'data-original_id'   => $field_id,
									'checked'            => '1' === $checked,
									'data-id'            => $drag_id,
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
									wp_strip_all_tags( $option['value'] ?? '' ),
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
							'value' => $field_title,
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
									'data-id' => $option['id'] ?? '',
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
							'name'               => $field_unique_id,
							'id'                 => $field_unique_id,
							'class'              => 'et_pb_contact_select input',
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

		// Extract child modules IDs using helper utility.
		$children_ids = ChildrenUtils::extract_children_ids( $block );

		return Module::render(
			[
				// FE only.
				'orderIndex'               => $block->parsed_block['orderIndex'],
				'storeInstance'            => $block->parsed_block['storeInstance'],

				// VB equivalent.
				'tag'                      => 'div',
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
				'childrenIds'              => $children_ids,
				'children'                 => [
					$elements->style_components(
						[
							'attrName' => 'module',
						]
					),
					$label,
					$input,
					$child_modules_content,
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
	 * Loads `ContactFieldModule` and registers Front-End render callback and REST API Endpoints.
	 *
	 * @since ??
	 *
	 * @return void
	 */
	public function load() {
		// phpcs:ignore PHPCompatibility.FunctionUse.NewFunctionParameters.dirname_levelsFound -- We have PHP 7 support now, This can be deleted once PHPCS config is updated.
		$module_json_folder_path = dirname( __DIR__, 4 ) . '/visual-builder/packages/module-library/src/components/contact-field/';

		add_filter( 'divi_conversion_presets_attrs_map', array( ContactFieldPresetAttrsMap::class, 'get_map' ), 10, 2 );

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
