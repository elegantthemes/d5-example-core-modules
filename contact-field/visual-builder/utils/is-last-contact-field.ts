import { useGlobalFieldPosition } from '@divi/module-utils';

/**
 * Determine if a contact field should have the `et_pb_contact_field_last` CSS class.
 * This matches the server-side PHP logic that uses a global $half_width_counter.
 *
 * @since ??
 *
 * @param {string} fieldId          The ID of the current contact field module.
 * @param {number|null} loopedPosition The position within loop iterations (1-based), null for non-looped fields.
 * @param {string} parentId         The ID of the parent Contact Form module.
 * @param {string} fullwidth        The fullwidth setting value ('on' or 'off').
 *
 * @returns {boolean} Whether the field should have the `et_pb_contact_field_last` class.
 */
export const useIsLastContactField = (
  fieldId: string,
  loopedPosition: number | null,
  parentId: string,
  fullwidth: string,
): boolean => {
  // Handle isolated field testing - no parent context means no "last" class.
  // This allows isolated component tests to work correctly while preserving
  // the correct behavior for real contact forms with proper parent context.
  // See: test/integration/test/module-library/src/components/contact-field/edit.ts
  if (! parentId || '' === parentId) {
    return false;
  }

  const globalPosition = useGlobalFieldPosition(fieldId, loopedPosition, parentId);

  // Apply the same logic as PHP: (globalPosition % 2 === 0) || (fullwidth === 'on')
  return (0 === globalPosition % 2) || ('off' !== fullwidth);
};
