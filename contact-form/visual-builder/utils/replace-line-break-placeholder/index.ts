/**
 * Replaces the line break placeholder in a string with the actual line break characters.
 *
 * Convert the line break placeholder used in the contact form module to actual line break characters
 * during the conversion process. This is necessary because the line break placeholder is added in D4 during the
 * saving process.
 *
 * @since ??
 *
 * @param {string} string The string containing the line break placeholder.
 *
 * @returns {string} The string with the line break placeholder replaced by line break characters.
 */
export const replaceLineBreakPlaceholder = (string: string):string => string.replace(/\|\|et_pb_line_break_holder\|\|/g, '\r\n');
