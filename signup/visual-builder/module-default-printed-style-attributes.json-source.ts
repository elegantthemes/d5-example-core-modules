import {
  type Metadata,
  type SignupAttrs,
} from '@divi/types';


/**
 * SignUp Module Default Printed Style Attributes.
 *
 * Note: The module default printed style attributes will be used to generate
 * `module-default-printed-style-attributes.json` upon build.
 */
const signupModuleDefaultPrintedStyleAttributes: Metadata.DefaultAttributes<SignupAttrs> = {
  module: {
    decoration: {
      layout: {
        desktop: {
          value: {
            flexDirection: 'column',
          },
        },
      },
    },
  },
  button: {
    innerContent: {
      desktop: {
        value: {
          text: 'Subscribe',
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

export {
  signupModuleDefaultPrintedStyleAttributes,
};
