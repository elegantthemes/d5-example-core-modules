/**
 * Converts spam provider account from pipe-separated format.
 *
 * Converts D4's pipe-separated format "Account|Account-0" to just "Account" for D5.
 * D4 stores both display name and internal ID separated by a pipe, but D5 only
 * needs the display name portion.
 *
 * @since ??
 *
 * @param {string} value The pipe-separated account value from D4.
 *
 * @returns {string} The account name (part before the pipe) or original value if no pipe found.
 */
export const convertSpamProviderAccount = (value: string): string => {
  if (typeof value !== 'string') {
    return value;
  }

  return value.split('|')[0] || value;
};
