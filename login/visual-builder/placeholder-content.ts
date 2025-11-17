import { placeholderContent as placeholder } from '@divi/module-utils';
import { type LoginAttrs } from '@divi/types';

/**
 * Placeholder content for a newly added Login module.
 *
 * @since ??
 *
 * @type {object}
 * @property {object} title
 * @property {object} content
 */
export const placeholderContent: LoginAttrs = {
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
