import {
  placeholderContent as placeholder,
} from '@divi/module-utils';
import {
  type SignupAttrs,
} from '@divi/types';

/**
 * Placeholder content for a newly added Email Optin module.
 *
 * @since ??
 *
 * @type {object}
 * @property {object} title
 * @property {object} content
 * @property {object} button
 */
export const placeholderContent: SignupAttrs = {
  title: {
    innerContent: {
      desktop: {
        value: placeholder.title,
      },
    },
  },
  content: {
    innerContent: {
      desktop: {
        value: placeholder.body,
      },
    },
  },
};
