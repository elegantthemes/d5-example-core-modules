<?php
/**
 * SignupHandler: Form submission handler.
 *
 * @package Builder\Packages\ModuleLibrary
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\Signup;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Services\SpamProtectionService\SpamProtectionService;
use ET_Core_API_Email_Providers;
use ET_Core_API_Email_Provider;

/**
 * `SignupHandler` is consisted of functions used for form submission handler.
 *
 * @since ??
 */
class SignupHandler {

	/**
	 * Handles form submission.
	 *
	 * @since ??
	 *
	 * @return void
	 */
	public static function handle_form_submit() {
		if ( ! isset( $_POST['et_frontend_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( $_POST['et_frontend_nonce'] ), 'et_frontend_nonce' ) ) {
			wp_send_json_error(
				[
					'error' => esc_html__( 'Invalid nonce', 'et_builder_5' ),
				]
			);
		}

		$checksum = isset( $_POST['et_checksum'] ) ? sanitize_text_field( $_POST['et_checksum'] ) : '';

		if ( ! $checksum ) {
			wp_send_json_error(
				[
					'error' => esc_html__( 'Configuration Error: Invalid data.', 'et_builder_5' ),
				]
			);
		}

		$selected_provider = isset( $_POST['et_provider'] ) ? sanitize_text_field( $_POST['et_provider'] ) : '';
		$selected_account  = isset( $_POST['et_account'] ) ? sanitize_text_field( $_POST['et_account'] ) : '';
		$provider          = ET_Core_API_Email_Providers::instance()->get( $selected_provider, $selected_account, 'builder' );

		if ( ! ( $provider instanceof ET_Core_API_Email_Provider ) ) {
			wp_send_json_error(
				[
					'error' => esc_html__( 'Configuration Error: Invalid provider.', 'et_builder_5' ),
				]
			);
		}

		$use_spam_service = get_option( 'et_pb_signup_' . $checksum, 'off' );

		if ( 'on' === $use_spam_service ) {
			$spam_protection_provider  = get_option( 'et_pb_signup_provider_' . $checksum, 'recaptcha' );
			$spam_protection_account   = get_option( 'et_pb_signup_account_' . $checksum, '' );
			$spam_protection_min_score = (float) get_option( 'et_pb_signup_min_score_' . $checksum, 0.0 );

			if ( ! SpamProtectionService::validate_token( $spam_protection_provider, $spam_protection_account, $spam_protection_min_score ) ) {
				wp_send_json_error(
					[
						'error' => esc_html__( 'You must be a human to submit this form.', 'et_builder_5' ),
					]
				);
			}
		}

		$list_id       = isset( $_POST['et_list_id'] ) ? sanitize_text_field( $_POST['et_list_id'] ) : '';
		$email         = isset( $_POST['et_email'] ) ? sanitize_text_field( $_POST['et_email'] ) : '';
		$name          = isset( $_POST['et_firstname'] ) ? sanitize_text_field( $_POST['et_firstname'] ) : '';
		$last_name     = isset( $_POST['et_lastname'] ) ? sanitize_text_field( $_POST['et_lastname'] ) : '';
		$ip_address    = isset( $_POST['et_ip_address'] ) ? sanitize_text_field( $_POST['et_ip_address'] ) : '';
		$custom_fields = isset( $_POST['et_custom_fields'] ) ? (array) map_deep( (array) $_POST['et_custom_fields'], 'sanitize_text_field' ) : [];

		$args = array(
			'list_id'       => $list_id,
			'email'         => $email,
			'name'          => $name,
			'last_name'     => $last_name,
			'ip_address'    => $ip_address,
			'custom_fields' => $custom_fields,
		);

		if ( ! is_email( $args['email'] ) ) {
			wp_send_json_error(
				[
					'error' => esc_html__( 'Please input a valid email address.', 'et_builder_5' ),
				]
			);
		}

		if ( '' === (string) $args['list_id'] ) {
			wp_send_json_error(
				[
					'error' => esc_html__( 'Configuration Error: No list has been selected for this form.', 'et_builder_5' ),
				]
			);
		}

		et_builder_email_maybe_migrate_accounts();

		$result = $provider->subscribe( $args );

		if ( 'success' !== $result ) {
			wp_send_json_error(
				[
					'error' => esc_html__( 'Subscription Error: ', 'et_builder_5' ) . $result,
				]
			);
		}

		wp_send_json_success();
	}

}
