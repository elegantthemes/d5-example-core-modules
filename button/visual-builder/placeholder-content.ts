import { placeholderContent as placeholder } from '@divi/module';
import { type ButtonAttrs } from '@divi/types';

/**
 * Placeholder content for a newly added Button module.
 *
 * @since ??
 *
 * @type {object}
 * @property {object} button
 */
export const placeholderContent: ButtonAttrs = {
  button: {
    innerContent: {
      desktop: {
        value: {
          text: placeholder.button,
        },
      },
    },
    decoration: {
      button: {
        desktop: {
          value: {
            icon: {
              enable: 'on',
            },
          },
        },
      },
    },
  },
};