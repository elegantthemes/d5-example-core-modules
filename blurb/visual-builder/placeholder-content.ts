import { placeholderContent as placeholder } from '@divi/module';
import { type BlurbAttrs } from '@divi/types';

/**
 * Placeholder content for a newly added Blurb module.
 *
 * @since ??
 *
 * @type {object}
 * @property {object} title
 * @property {object} content
 * @property {object} imageIcon
 */
export const placeholderContent: BlurbAttrs = {
  title: {
    innerContent: {
      desktop: {
        value: {
          text: placeholder.title,
        },
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
  imageIcon: {
    innerContent: {
      desktop: {
        value: {
          src: placeholder.image.landscape,
        },
      },
    },
  },
};
