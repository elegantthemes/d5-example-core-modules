<?php
/**
 * ModuleLibrary: Contact Form Utils class.
 *
 * @package Builder\Packages\ModuleLibrary
 * @since ??
 */

namespace ET\Builder\Packages\ModuleLibrary\ContactForm;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

/**
 * `ContactFormUtils` is consisted of functions used as utility for Contact Form Module.
 *
 * @since ??
 */
class ContactFormUtils {

	/**
	 * Build the message.
	 *
	 * @since ??
	 *
	 * @param array $fields The array of contact form fields.
	 *
	 * @return string The message text.
	 */
	public static function build_message( array $fields ):string {
		$message = $fields['message']['value'] ?? '';

		foreach ( $fields as $key => $field ) {
			if ( in_array( $key, [ 'message', 'name', 'email' ], true ) ) {
				continue;
			}

			$value = $field['value'] ?? '';

			// Skip fields with empty string value.
			if ( '' === trim( (string) $value ) ) {
				continue;
			}

			$message .= "\r\n";

			$label = $field['label'] ?? '';

			if ( '' === $label ) {
				$label = $key;
			}

			$message .= sprintf( '%1$s: %2$s', $label, $value );
		}

		// Strip all tags from the message content.
		$message = wp_strip_all_tags( $message );

		return $message;
	}

	/**
	 * Build the message from template.
	 *
	 * @since ??
	 *
	 * @param array  $fields           The array of contact form fields.
	 * @param string $message_template The message template.
	 * @param array  $skipped_fields   The array of skipped field IDs due to conditional logic.
	 *
	 * @return string The message text.
	 */
	public static function build_message_by_template( array $fields, string $message_template, array $skipped_fields = [] ):string {
		$message = html_entity_decode( $message_template );

		foreach ( $fields as $key => $field ) {
			// strip all tags from each field. Don't strip tags from the entire message to allow using HTML in the pattern.
			$message = str_ireplace( "%%{$key}%%", wp_strip_all_tags( $field['value'] ?? '' ), $message );
		}

		// Remove placeholders for skipped fields (matching Divi 4 behavior).
		if ( ! empty( $skipped_fields ) ) {
			foreach ( $skipped_fields as $skipped_field_id ) {
				// First try to remove the placeholder with its line if it's alone on a line.
				$escaped_field_id = preg_quote( $skipped_field_id, '/' );
				$pattern = "/^[ \t]*%%{$escaped_field_id}%%[ \t]*\r?\n/m";
				if ( preg_match( $pattern, $message ) ) {
					$message = preg_replace( $pattern, '', $message );
				} else {
					// If not alone on a line, just remove the placeholder token.
					$message = str_ireplace( "%%{$skipped_field_id}%%", '', $message );
				}
			}
		}

		// Process conditional logic strings.
		// String example: {{if:field_name}}show me{{/if}}.
		// If the `field_name` key is exists in the `$fields` array, then the `show me` text will be printed within the message.
		$message = preg_replace_callback(
			// Test regex: https://regex101.com/r/L8d4D7/2.
			"/{{if:([a-zA-Z0-9-_]+)}}([^{]+){{\/if}}\n?/m",
			function( $matches ) use ( $fields ) {
				$key = strtolower( $matches[1] );

				if ( ! isset( $fields[ $key ] ) ) {
					return '';
				}

				return $matches[2];
			},
			$message
		);

		return $message;
	}

}
