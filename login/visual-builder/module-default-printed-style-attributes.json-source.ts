import {
  type LoginAttrs,
  type Metadata,
} from '@divi/types';


/**
 * Login Module Default Printed Style Attributes.
 *
 * Note: The module default printed style attributes will be used to generate
 * `module-default-printed-style-attributes.json` upon build.
 */
const loginModuleDefaultPrintedStyleAttributes: Metadata.DefaultAttributes<LoginAttrs> = {
  module: {
    decoration: {
      layout: {
        desktop: {
          value: {
            flexDirection: 'column',
            rowGap:        '20px',
          },
        },
      },
    },
  },
  button: {
    decoration: {
      border: {
        desktop: {
          value: {
            styles: {
              top: {
                width: '2px',
              },
              bottom: {
                width: '2px',
              },
              left: {
                width: '2px',
              },
              right: {
                width: '2px',
              },
            },
          },
        },
      },
    },
  },
};

export {
  loginModuleDefaultPrintedStyleAttributes,
};
