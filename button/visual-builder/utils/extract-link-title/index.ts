import {
  wpKses,
} from '@divi/dynamic-data';


/**
 * Extract the title for a link.
 *
 * @since ??
 *
 * @param {string} htmlContent The HTML content of the link.
 *
 * @returns {string} The extracted title.
 */
export const extractLinkTitle = (htmlContent: string):string => wpKses(htmlContent);
