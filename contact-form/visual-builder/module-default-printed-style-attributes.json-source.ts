import {
  type ContactFormAttrs,
  type Metadata,
} from '@divi/types';


/**
 * Contact Form Module Default Printed Style Attributes.
 *
 * Note: The module default printed style attributes will be used to generate
 * `module-default-printed-style-attributes.json` upon build.
 */
const contactFormModuleDefaultPrintedStyleAttributes: Metadata.DefaultAttributes<ContactFormAttrs> = {
  module: {
    decoration: {
      layout: {
        desktop: {
          value: {
            columnGap:     '15px',
            flexDirection: 'row',
            flexWrap:      'wrap',
            rowGap:        '15px',
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
              size:       '26px',
              lineHeight: '1em',
            },
          },
        },
      },
    },
  },
  captcha: {
    decoration: {
      font: {
        font: {
          desktop: {
            value: {
              lineHeight: '1.7em',
            },
          },
        },
      },
    },
  },
};

export {
  contactFormModuleDefaultPrintedStyleAttributes,
};
