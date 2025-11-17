import {
  type ContactFieldAttrs,
  type Metadata,
} from '@divi/types';


/**
 * Contact Field Module Default Printed Style Attributes.
 *
 * Note: The module default printed style attributes will be used to generate
 * `module-default-printed-style-attributes.json` upon build.
 */
const contactFieldModuleDefaultPrintedStyleAttributes: Metadata.DefaultAttributes<ContactFieldAttrs> = {
  module: {
    decoration: {
      layout: {
        desktop: {
          value: {
            flexDirection: 'column',
            rowGap:        '10px',
            columnGap:     '10px',
          },
        },
      },
    },
  },
  fieldItem: {
    advanced: {
      minLength: {
        desktop: {
          value: '0',
        },
      },
      maxLength: {
        desktop: {
          value: '0',
        },
      },
      allowedSymbols: {
        desktop: {
          value: 'all',
        },
      },
    },
  },
};

export {
  contactFieldModuleDefaultPrintedStyleAttributes,
};
