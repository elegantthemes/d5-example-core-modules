import {
  type Metadata,
  type PricingTableAttrs,
} from '@divi/types';


/**
 * Pricing Table Module Default Render Attributes.
 *
 * Note: The module default render attributes will be used to generate
 * `module-default-render-attributes.json` upon build.
 */
const pricingTableModuleDefaultRenderAttributes: Metadata.DefaultAttributes<PricingTableAttrs> = {
  module: {
    advanced: {
      featured: {
        desktop: {
          value: 'off',
        },
      },
    },
  },
};

export {
  pricingTableModuleDefaultRenderAttributes,
};
