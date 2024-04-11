import { placeholderContent as placeholder } from '@divi/module';
import { type AccordionItemAttrs } from '@divi/types';

/**
 * Placeholder content for a newly added Accordion item module.
 *
 * @since ??
 *
 * @type {object}
 * @property {object} title
 * @property {object} content
 */
export const placeholderContent: AccordionItemAttrs = {
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
