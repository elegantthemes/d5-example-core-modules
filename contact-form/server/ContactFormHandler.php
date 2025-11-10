<?php
/**
 * ModuleLibrary: Contact Form Handler class.
 *
 * @package Builder\Packages\ModuleLibrary
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\ContactForm;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use WP_Error;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\Packages\ModuleLibrary\ContactField\ContactFieldModule;
use ET\Builder\Services\SpamProtectionService\SpamProtectionService;
use ET\Builder\Packages\ModuleLibrary\ContactForm\ContactFormUtils;

/**
 * Class ContactFormHandler handles contact form submissions.
 *
 * @since ??
 */
class ContactFormHandler {

	/**
	 * Module ID.
	 *
	 * @since ??
	 *
	 * @var string
	 */
	private $_module_id;

	/**
	 * Store instance.
	 *
	 * @since ??
	 *
	 * @var string
	 */
	private $_store_instance;

	/**
	 * Form handler error.
	 *
	 * @since ??
	 *
	 * @var WP_Error
	 */
	private $_error;

	/**
	 * Form fields raw data.
	 *
	 * @since ??
	 *
	 * @var array
	 */
	private $_fields_raw = [];

	/**
	 * Form fields
	 *
	 * The fields are validated and filtered by conditional logic.
	 *
	 * @since ??
	 *
	 * @var array
	 */
	private $_fields = [];

	/**
	 * The skipped field IDs due to conditional logic.
	 *
	 * @since 5.0.0
	 *
	 * @var array
	 */
	private $_skipped_fields = [];

	/**
	 * Form submitted flag.
	 *
	 * @since ??
	 *
	 * @var bool
	 */
	private $_submitted = false;

	/**
	 * Email sent flag.
	 *
	 * @since ??
	 *
	 * @var bool
	 */
	private $_mail_sent = false;

	/**
	 * This PHP function is a constructor that initializes variables and processes data if the form is
	 * submitted.
	 *
	 * @since ??
	 *
	 * @param string $module_id Module ID.
	 * @param int    $store_instance Store instance.
	 */
	public function __construct( string $module_id, int $store_instance ) {
		$this->_module_id      = $module_id;
		$this->_store_instance = $store_instance;
		$this->_error          = new WP_Error();

		$this->process();
	}

	/**
	 * The function processes a contact form in PHP, verifying the nonce and validating the form fields,
	 * specifically checking for a valid email address.
	 *
	 * @since ??
	 *
	 * @return void
	 */
	public function process():void {
		// If the request method is not `POST`, return.
		if ( ! isset( $_SERVER['REQUEST_METHOD'] ) || 'POST' !== $_SERVER['REQUEST_METHOD'] ) {
			return;
		}

		$module = BlockParserStore::get( $this->_module_id, $this->_store_instance );

		// If the module is not found, return.
		if ( ! $module ) {
			return;
		}

		$order_index = $module->orderIndex ?? 0; // phpcs:ignore ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- This is a property of the WP Core class.

		// Set the submitted flag by checking is the nonce field is set.
		$this->_submitted = isset( $_POST[ '_wpnonce-et-pb-contact-form-submitted-' . $order_index ] );

		// Bail if the form is not submitted.
		if ( ! $this->_submitted ) {
			return;
		}

		// Verify the nonce.
		// Bail if the nonce is invalid.
		if ( ! wp_verify_nonce( sanitize_text_field( $_POST[ '_wpnonce-et-pb-contact-form-submitted-' . $order_index ] ), 'et-pb-contact-form-submit-' . $order_index ) ) {
			$this->_add_error( 'invalid_nonce', esc_html__( 'Nonce verification failed. Please refresh the page and try again.', 'et_builder_5' ) );
			return;
		}

		// check whether captcha field is not empty.
		$use_basic_captcha = $module->attrs['module']['advanced']['spamProtection']['desktop']['value']['useBasicCaptcha'] ?? 'on';
		$use_spam_service  = $module->attrs['module']['advanced']['spamProtection']['desktop']['value']['enabled'] ?? 'off';

		if ( 'on' === $use_basic_captcha && 'off' === $use_spam_service ) {
			$captcha_answer = sanitize_text_field( $_POST[ 'et_pb_contact_captcha_' . $order_index ] ?? '' );
			$first_digit    = sanitize_text_field( $_POST[ 'et_pb_contact_captcha_first_digit_' . $order_index ] ?? '' );
			$second_digit   = sanitize_text_field( $_POST[ 'et_pb_contact_captcha_second_digit_' . $order_index ] ?? '' );

			if ( ! $captcha_answer || ( (int) $first_digit + (int) $second_digit ) !== (int) $captcha_answer ) {
				$this->_add_error( 'invalid_captcha', esc_html__( 'Make sure you entered the correct captcha.', 'et_builder_5' ) );
			}
		} elseif ( 'on' === $use_spam_service ) {
			$provider  = $module->attrs['module']['advanced']['spamProtection']['desktop']['value']['provider'] ?? 'recaptcha';
			$account   = $module->attrs['module']['advanced']['spamProtection']['desktop']['value']['account'] ?? '';
			$min_score = (float) ( $module->attrs['module']['advanced']['spamProtection']['desktop']['value']['minScore'] ?? 0.0 );

			if ( empty( $_POST['token'] ) || ! SpamProtectionService::validate_token( $provider, $account, $min_score ) ) {
				$this->_add_error( 'spam_submission', esc_html__( 'You must be a human to submit this form.', 'et_builder_5' ) );
			}
		}

		$fields = BlockParserStore::get_children( $this->_module_id, $this->_store_instance );

		// Populate the form fields.
		foreach ( $fields as $field ) {
			$field_unique_id = ContactFieldModule::get_field_unique_id( $field->id, $this->_store_instance );
			$field_type      = $field->attrs['fieldItem']['advanced']['type']['desktop']['value'] ?? 'input';
			$field_id        = $field->attrs['fieldItem']['advanced']['id']['desktop']['value'] ?? '';
			$field_key       = strtolower( $field_id );
			$field_label     = $field->attrs['fieldItem']['innerContent']['desktop']['value'] ?? '';

			if ( ! $field_label ) {
				$field_label = __( 'New Field', 'et_builder_5' );
			}

			$this->_fields_raw[ $field_key ]['id']             = $field_id;
			$this->_fields_raw[ $field_key ]['label']          = $field_label;
			$this->_fields_raw[ $field_key ]['type']           = $field_type;
			$this->_fields_raw[ $field_key ]['allowedSymbols'] = $field->attrs['fieldItem']['advanced']['allowedSymbols']['desktop']['value'] ?? '';
			$this->_fields_raw[ $field_key ]['maxLength']      = $field->attrs['fieldItem']['advanced']['maxLength']['desktop']['value'] ?? '';
			$this->_fields_raw[ $field_key ]['minLength']      = $field->attrs['fieldItem']['advanced']['minLength']['desktop']['value'] ?? '';
			$this->_fields_raw[ $field_key ]['isRequired']     = 'on' === ( $field->attrs['fieldItem']['advanced']['required']['desktop']['value'] ?? 'on' );

			$this->_fields_raw[ $field_key ]['conditionalLogic'] = [
				'enabled'  => 'on' === ( $field->attrs['conditionalLogic']['advanced']['enable']['desktop']['value'] ?? 'off' ),
				'matchAll' => 'on' === ( $field->attrs['conditionalLogic']['advanced']['relation']['desktop']['value'] ?? 'off' ),
				'rules'    => $field->attrs['conditionalLogic']['innerContent']['desktop']['value'] ?? [],
			];

			if ( 'text' === $field_type ) {
				$this->_fields_raw[ $field_key ]['value'] = isset( $_POST[ $field_unique_id ] ) ? sanitize_textarea_field( $_POST[ $field_unique_id ] ) : '';
			} elseif ( 'checkbox' === $field_type ) {
				// For checkbox fields, decode and sanitize immediately, store as array.
        // phpcs:ignore ET.Sniffs.ValidatedSanitizedInput.InputNotSanitized -- Remove slashes (possibly) added by WordPress for magic quotes compatibility.
				$raw_value = isset( $_POST[ $field_unique_id ] ) ? wp_unslash( $_POST[ $field_unique_id ] ) : '';

				if ( '' !== $raw_value ) {
					// Split the URL-encoded comma-separated values.
					$parts                                    = explode( ',', $raw_value );
					$parts                                    = array_map( 'urldecode', $parts );
					$parts                                    = array_map( 'sanitize_text_field', $parts );
					$parts                                    = array_map( 'trim', $parts );
					$this->_fields_raw[ $field_key ]['value'] = $parts;
				} else {
					$this->_fields_raw[ $field_key ]['value'] = [];
				}
			} else {
				$this->_fields_raw[ $field_key ]['value'] = isset( $_POST[ $field_unique_id ] ) ? sanitize_text_field( $_POST[ $field_unique_id ] ) : '';
			}

			switch ( $field_type ) {
				case 'checkbox':
					$options = $field->attrs['fieldItem']['advanced']['checkboxOptions']['desktop']['value'] ?? [];

					$this->_fields_raw[ $field_key ]['options'] = is_array( $options ) ? array_map(
						function( $option ) {
							return $option['value'];
						},
						$options
					) : [];
					break;

				case 'radio':
					$options = $field->attrs['fieldItem']['advanced']['radioOptions']['desktop']['value'] ?? [];

					$this->_fields_raw[ $field_key ]['options'] = is_array( $options ) ? array_map(
						function( $option ) {
							return $option['value'];
						},
						$options
					) : [];
					break;

				case 'select':
					$options = $field->attrs['fieldItem']['advanced']['selectOptions']['desktop']['value'] ?? [];

					$this->_fields_raw[ $field_key ]['options'] = is_array( $options ) ? array_map(
						function( $option ) {
							return $option['value'];
						},
						$options
					) : [];
					break;

				default:
					$this->_fields_raw[ $field_key ]['options'] = [];
					break;
			}
		}

		// Validate the form fields.
		$this->validate_fields();

		// Additional info to be passed on the `et_pb_contact_form_submit` hook.
		$contact_form_info = array(
			'contact_form_id'        => $module->attrs['module']['advanced']['htmlAttributes']['desktop']['value']['id'] ?? 'et_pb_contact_form_' . $order_index,
			'contact_form_number'    => $module->orderIndex, // phpcs:ignore ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- This is a property of the WP Core class.
			'contact_form_unique_id' => $module->id,
			'module_slug'            => $module->blockName, // phpcs:ignore ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- This is a property of the WP Core class.
			'post_id'                => $this->get_current_post_id_reverse(),
		);

		/**
		 * Fires after contact form is submitted.
		 *
		 * Use $et_contact_error variable to check whether there is an error on the form
		 * entry submit process or not.
		 *
		 * @since 4.13.1
		 *
		 * @param array $processed_fields_values Processed fields values.
		 * @param bool  $et_contact_error        Whether there is an error on the form
		 *                                       entry submit process or not.
		 * @param array $contact_form_info       Additional contact form info.
		 *
		 * @see https://github.com/elegantthemes/Divi/issues/24865
		 */
		do_action( 'et_pb_contact_form_submit', $this->_fields, $this->_error->has_errors(), $contact_form_info ); // TODO: feat(D5, Contact Form) Need to introduce a D5 action and deprecate this action.

		if ( ! $this->_error->has_errors() ) {
			$message_pattern = $module->attrs['email']['innerContent']['desktop']['value'] ?? '';

			if ( $message_pattern ) {
				$message = ContactFormUtils::build_message_by_template( $this->_fields, $message_pattern, $this->_skipped_fields );
			} else {
				$message = ContactFormUtils::build_message( $this->_fields );
			}

			$contact_name  = $this->_fields['name']['value'] ?? '';
			$contact_email = $this->_fields['email']['value'] ?? '';

			$http_host = str_replace( 'www.', '', sanitize_text_field( $_SERVER['HTTP_HOST'] ?? '' ) );

			$headers[] = "From: \"{$contact_name}\" <mail@{$http_host}>";

			// Set `Reply-To` email header based on contact_name and contact_email values.
			if ( ! empty( $contact_email ) ) {
				$contact_name = ! empty( $contact_name ) ? $contact_name : $contact_email;
				$headers[]    = "Reply-To: \"{$contact_name}\" <{$contact_email}>";
			}

			add_filter( 'et_get_safe_localization', 'et_allow_ampersand' ); // TODO: feat(D5, Contact Form) Need to introduce a D5 filter and deprecate this filter.

			// don't strip tags at this point to properly send the HTML from pattern. All the unwanted HTML stripped at this point.
			$email_message = trim( stripslashes( $message ) );

			$site_name = strval( get_option( 'blogname' ) );
			$email_to  = $module->attrs['email']['advanced']['receiver']['desktop']['value'] ?? '';
			$title     = $module->attrs['title']['innerContent']['desktop']['value'] ?? '';

			// If $email_to is empty or not a string, use the site's admin email as a fallback.
			if ( empty( $email_to ) || ! is_string( $email_to ) ) {
				$email_to = get_site_option( 'admin_email' );
			} else {
				// Trim the input to remove extra spaces and check if it's a single valid email.
				$trimmed_email = trim( $email_to );

				if ( is_email( $trimmed_email ) ) {
					// If it's a single valid email, store it as an array for consistency.
					$valid_emails = [ $trimmed_email ];
				} else {
					// Otherwise, assume it is a comma-separated list and process accordingly.
					$valid_emails = array_filter(
						array_map( 'trim', explode( ',', $email_to ) ), // Split into an array, trim spaces.
						'is_email' // Validate each email and filter out invalid ones.
					);
				}

				// If we have valid emails, convert them back into a comma-separated string.
				// Otherwise, fallback to the site's admin email.
				$email_to = ! empty( $valid_emails ) ? join( ',', $valid_emails ) : get_site_option( 'admin_email' );
			}

			$this->_mail_sent = wp_mail(
				apply_filters( 'et_contact_page_email_to', $email_to ), // TODO: feat(D5, Contact Form) Need to introduce a D5 filter and deprecate this filter.
				et_get_safe_localization( // TODO: feat(D5, Contact Form) Need to write `et_get_safe_localization` in D5.
					sprintf(
						__( 'New Message From %1$s%2$s', 'et_builder_5' ),
						sanitize_text_field( html_entity_decode( $site_name, ENT_QUOTES, 'UTF-8' ) ),
						( '' !== $title ? sprintf( _x( ' - %s', 'contact form title separator', 'et_builder_5' ), $title ) : '' )
					)
				),
				! empty( $email_message ) ? $email_message : ' ',
				apply_filters( 'et_contact_page_headers', $headers, $contact_name, $contact_email ) // TODO: feat(D5, Contact Form) Need to introduce a D5 filter and deprecate this filter.
			);

			remove_filter( 'et_get_safe_localization', 'et_allow_ampersand' );
		}
	}

	/**
	 * Validates the form fields.
	 *
	 * @since ??
	 *
	 * @return void
	 */
	public function validate_fields():void {
		foreach ( $this->_fields_raw as $field_id => $field ) {
			if ( $this->_is_skip_field( $field ) ) {
				$this->_skipped_fields[] = $field_id;
				continue;
			}

			$field_value = $field['value'];
			$field_label = $field['label'];
			$field_type  = $field['type'];

			// Handle required field validation for both strings and arrays (checkbox).
			$is_empty = is_array( $field_value ) ? empty( $field_value ) : '' === $field_value;

			if ( $field['isRequired'] && $is_empty ) {
				$this->_add_error( 'field_required_' . $field_id, sprintf( esc_html__( '%s: The field is required.', 'et_builder_5' ), $field_label ) );
				continue;
			}

			if ( ! $is_empty ) {
				switch ( $field_type ) {
					case 'email':
						if ( ! is_email( $field_value ) ) {
							$this->_add_error( 'value_not_email_' . $field_id, sprintf( esc_html__( '%s: The value must be a valid email address.', 'et_builder_5' ), $field_label ) );
							continue 2;
						}
						break;

					case 'radio':
					case 'select':
						if ( ! in_array( wp_unslash( $field_value ), $field['options'], true ) ) {
							$this->_add_error( 'value_not_exists_' . $field_id, sprintf( esc_html__( '%s: The selected value is invalid.', 'et_builder_5' ), $field_label ) );
							continue 2;
						}
						break;

					case 'checkbox':
						// Value is already an array of decoded, sanitized values.
						// Remove any extra spaces from the options.
						$field_options = array_map(
							function( $option ) {
								return preg_replace( '/\s+/', ' ', trim( $option ) );
							},
							$field['options']
						);

						foreach ( $field_value as $checkbox_value ) {
							if ( ! in_array( $checkbox_value, $field_options, true ) ) {
								$this->_add_error( 'value_not_exists_' . $field_id, sprintf( esc_html__( '%s: The selected value is not exist.', 'et_builder_5' ), $field_label ) );
								continue 3;
							}
						}

						// Convert array to comma-separated string for email.
						$field['value']                          = implode( ', ', $field_value );
						$this->_fields_raw[ $field_id ]['value'] = $field['value'];
						break;

					case 'input':
						$allowed_symbols = $field['allowedSymbols'];

						if ( 'letters' === $allowed_symbols && ! preg_match( '/^[a-zA-Z\s\-]+$/', $field_value ) ) {
							$this->_add_error( 'value_not_letters_' . $field_id, sprintf( esc_html__( '%s: The value may only contain letters.', 'et_builder_5' ), $field_label ) );
							continue 2;
						}

						if ( 'numbers' === $allowed_symbols && ! preg_match( '/^[0-9\s\-]+$/', $field_value ) ) {
							$this->_add_error( 'value_not_numbers_' . $field_id, sprintf( esc_html__( '%s: The value may only contain numbers.', 'et_builder_5' ), $field_label ) );
							continue 2;
						}

						if ( 'alphanumeric' === $allowed_symbols && ! preg_match( '/^[\w\s\-]+$/', $field_value ) ) {
							$this->_add_error( 'value_not_letters_and_numbers_' . $field_id, sprintf( esc_html__( '%s: The value may only contain letters and numbers.', 'et_builder_5' ), $field_label ) );
							continue 2;
						}

						$max_length = (int) $field['maxLength'];

						if ( $max_length > 0 && strlen( $field_value ) > $max_length ) {
							$this->_add_error( 'value_max_length_' . $field_id, sprintf( esc_html__( '%1$s: The value may not be greater than %2$d characters.', 'et_builder_5' ), $field_label, $max_length ) );
							continue 2;
						}

						$min_length = (int) $field['minLength'];

						if ( $min_length > 0 && strlen( $field_value ) < $min_length ) {
							$this->_add_error( 'value_min_length_' . $field_id, sprintf( esc_html__( '%1$s: The value must be at least %2$d characters.', 'et_builder_5' ), $field_label, $min_length ) );
							continue 2;
						}
						break;

					default:
						// Do nothing.
						break;
				}
			}

			$this->_fields[ $field_id ] = $field;
		}
	}


	/**
	 * Retrieve Post ID from 1 of 3 sources depending on which exists:
	 * - get_the_ID()
	 * - $_GET['post']
	 * - $_POST['et_post_id']
	 *
	 * @since ??
	 *
	 * @return int|bool
	 */
	public function get_current_post_id_reverse() {
		// phpcs:disable WordPress.Security.NonceVerification -- This function does not change any state, and is therefore not susceptible to CSRF.
		$post_id = get_the_ID(); // TODO: feat(D5, Contact Form) Need to bring `ET_Builder_Element::_get_main_post_id()` and replace the `get_the_ID()` function with ET_Builder_Element::_get_main_post_id()` in D5.

		// try to get post id from get_post_ID().
		if ( false !== $post_id ) {
			return $post_id;
		}

		if ( wp_doing_ajax() ) {
			// get the post ID if loading data for VB.
			return isset( $_POST['et_post_id'] ) ? absint( $_POST['et_post_id'] ) : false;
		}

		// fallback to $_GET['post'] to cover the BB data loading.
		return isset( $_GET['post'] ) ? absint( $_GET['post'] ) : false;
		// phpcs:enable
	}

	/**
	 * Checks if a given field should be skipped based on its conditional logic rules.
	 *
	 * @since ??
	 *
	 * @param array $field An array containing information about a field, including its conditional logic settings.
	 *
	 * @return {boolean} Returns true if the field should be skipped, false otherwise.
	 */
	private function _is_skip_field( array $field ):bool {
		if ( $field['conditionalLogic']['enabled'] ) {
			$match_all = $field['conditionalLogic']['matchAll'];
			$rules     = $field['conditionalLogic']['rules'];
			$matches   = [];

			foreach ( $rules as $rule ) {
				$rule_field     = strtolower( $rule['field'] );
				$rule_condition = $rule['condition'];
				$rule_value     = $rule['value'];

				$value_to_check = $this->_fields_raw[ $rule_field ]['value'] ?? '';

				// Convert checkbox arrays to comma-separated strings for conditional logic.
				if ( is_array( $value_to_check ) && 'checkbox' === ( $this->_fields_raw[ $rule_field ]['type'] ?? '' ) ) {
					$value_to_check = implode( ', ', $value_to_check );
				}

				switch ( $rule_condition ) {
					case 'is':
						$matches[] = $rule_value === $value_to_check ? 1 : 0;
						break;

					case 'is not':
						$matches[] = $rule_value !== $value_to_check ? 1 : 0;
						break;

					case 'is greater':
						$rule_value_int     = (int) $rule_value;
						$value_to_check_int = (int) $value_to_check;
						$matches[]          = $value_to_check_int > $rule_value_int ? 1 : 0;
						break;

					case 'is less':
						$rule_value_int     = (int) $rule_value;
						$value_to_check_int = (int) $value_to_check;
						$matches[]          = $value_to_check_int < $rule_value_int ? 1 : 0;
						break;

					case 'contains':
						// Escape characters that has special meaning inside a regular expression.
						// Regex text: https://regex101.com/r/1Qw02x/1?
						$re            = '/[\\\\^$*+?.()|[\]{}]/';
						$subst         = "\\\\$0";// phpcs:ignore Squiz.Strings.DoubleQuoteUsage.NotRequired -- intentionally done.
						$regex_pattern = preg_replace( $re, $subst, $rule_value );
						$matches[]     = preg_match( "/$regex_pattern/", $value_to_check ) ? 1 : 0;
						break;

					case 'does not contain':
						// Escape characters that has special meaning inside a regular expression.
						// Regex text: https://regex101.com/r/1Qw02x/1?
						$re            = '/[\\\\^$*+?.()|[\]{}]/';
						$subst         = "\\\\$0";// phpcs:ignore Squiz.Strings.DoubleQuoteUsage.NotRequired -- intentionally done.
						$regex_pattern = preg_replace( $re, $subst, $rule_value );
						$matches[]     = ! preg_match( "/$regex_pattern/", $value_to_check ) ? 1 : 0;
						break;

					case 'is empty':
						$matches[] = '' === $value_to_check ? 1 : 0;
						break;

					case 'is not empty':
						$matches[] = '' !== $value_to_check ? 1 : 0;
						break;

					default:
						$matches[] = 1;
						break;
				}
			}

			// Relation: All.
			if ( $match_all ) {
				return count( $rules ) !== array_sum( $matches ); // Skip the field if any of the rules did not match.
			}

			// Relation: Any.
			return 0 === array_sum( $matches ); // Skip the field if all of the rules did not match.
		}

		return false;
	}

	/**
	 * Retrieves the error object associated with the contact form handler.
	 *
	 * @since ??
	 *
	 * @return WP_Error The error object.
	 */
	public function get_error(): WP_Error {
		return $this->_error;
	}

	/**
	 * Checks if the contact form has been submitted.
	 *
	 * @since ??
	 *
	 * @return bool Returns true if the contact form has been submitted, false otherwise.
	 */
	public function is_submitted():bool {
		return $this->_submitted;
	}

	/**
	 * Check if the email has been sent.
	 *
	 * @since ??
	 *
	 * @return bool Returns true if the email has been sent, false otherwise.
	 */
	public function is_mail_sent():bool {
		return $this->_mail_sent;
	}

	/**
	 * Adds an error or appends an additional message to an existing error.
	 *
	 * @since ??
	 *
	 * @param string $code    Error code.
	 * @param string $message Error message.
	 * @param mixed  $data    Optional. Error data.
	 */
	private function _add_error( string $code, string $message, $data = '' ) {
		$this->_error->remove( $code );
		$this->_error->add( $code, $message, $data );
	}
}
