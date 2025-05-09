import {
  type CtaAttrs,
  type Metadata,
} from '@divi/types';


/**
 * CTA Module Default Printed Style Attributes.
 *
 * Note: The module default printed style attributes will be used to generate
 * `module-default-printed-style-attributes.json` upon build.
 */
const ctaModuleDefaultPrintedStyleAttributes: Metadata.DefaultAttributes<CtaAttrs> = {
  module: {
    decoration: {
      spacing: {
        desktop: {
          value: {
            padding: {
              top:    '40px',
              bottom: '40px',
            },
          },
        },
      },
    },
  },
  title: {
    decoration: {
      font: {
        font: {
          desktop: {
            value: {
              lineHeight: '1em',
            },
          },
        },
      },
    },
  },
};

export {
  ctaModuleDefaultPrintedStyleAttributes,
};
