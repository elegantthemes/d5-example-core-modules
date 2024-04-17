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
  title: {
    decoration: {
      font: {
        font: {
          desktop: {
            value: {
              headingLevel:  'h2',
              weight:        '400',
              size:          '26px',
              letterSpacing: '0px',
              lineHeight:    '1em',
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
