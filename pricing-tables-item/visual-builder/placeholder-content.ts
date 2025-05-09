import { _x } from '@wordpress/i18n';

import { placeholderContent as placeholder } from '@divi/module-utils';
import { type PricingTableAttrs } from '@divi/types';

/**
 * Placeholder content for a newly added Pricing Table module.
 *
 * @since ??
 *
 * @type {object}
 * @property {object} title
 * @property {object} subtitle
 * @property {object} currencyFrequency
 * @property {object} content
 * @property {object} price
 */
export const placeholderContent: PricingTableAttrs = {
  title: {
    innerContent: {
      desktop: {
        value: _x('Table Title', 'Modules dummy content', 'et_builder'),
      },
    },
  },
  subtitle: {
    innerContent: {
      desktop: {
        value: placeholder.subtitle,
      },
    },
  },
  currencyFrequency: {
    innerContent: {
      desktop: {
        value: {
          currency: _x('$', 'Modules dummy content', 'et_builder'),
        },
      },
    },
  },
  content: {
    innerContent: {
      desktop: {
        value: _x(
          '+ This feature is included\n+ This feature is included\n+ This feature is included\n+ This feature is included\n- This feature is not included\n- This feature is not included', 'Modules dummy content', 'et_builder',
        ),
      },
    },
  },
  price: {
    innerContent: {
      desktop: {
        value: placeholder.number,
      },
    },
  },
};
