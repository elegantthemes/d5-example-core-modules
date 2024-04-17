import {
  type Metadata,
  type PricingTablesAttrs,
} from '@divi/types';


/**
 * Pricing Tables Module Default Render Attributes.
 *
 * Note: The module default render attributes will be used to generate
 * `module-default-render-attributes.json` upon build.
 */
const pricingTablesModuleDefaultRenderAttributes: Metadata.DefaultAttributes<PricingTablesAttrs> = {
  module: {
    meta: {
      adminLabel: {
        desktop: {
          value: 'Pricing Tables',
        },
      },
    },
  },
  content: {
    advanced: {
      showBullet: {
        desktop: {
          value: 'on',
        },
      },
    },
  },
  featuredTable: {
    advanced: {
      showDropShadow: {
        desktop: {
          value: 'on',
        },
      },
    },
  },
  button: {
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

export {
  pricingTablesModuleDefaultRenderAttributes,
};
