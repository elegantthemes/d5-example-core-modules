import { placeholderContent as placeholder } from '@divi/module-utils';
import { type CtaAttrs } from '@divi/types';

/**
 * Placeholder content for a newly added Cta module.
 *
 * @since ??
 *
 * @type {object}
 * @property {object} title
 * @property {object} content
 * @property {object} button
 */
export const placeholderContent: CtaAttrs = {
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
  button: {
    innerContent: {
      desktop: {
        value: {
          text: placeholder.button,
        },
      },
    },
  },
};
