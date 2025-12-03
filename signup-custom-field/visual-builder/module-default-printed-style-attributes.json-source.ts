import {
  type Metadata,
  type SignupCustomFieldAttrs,
} from '@divi/types';


/**
 * Sign Up Custom Field Module Default Printed Style Attributes.
 *
 * Note: The module default printed style attributes will be used to generate
 * `module-default-printed-style-attributes.json` upon build.
 */
const signupCustomFieldModuleDefaultPrintedStyleAttributes: Metadata.DefaultAttributes<SignupCustomFieldAttrs> = {
  module: {
    decoration: {
      border: {
        desktop: {
          value: {
            radius: {
              sync:        'on',
              topLeft:     '3px',
              topRight:    '3px',
              bottomLeft:  '3px',
              bottomRight: '3px',
            },
            styles: {
              all: {
                width: '0px',
                color: '#333333',
                style: 'solid',
              },
            },
          },
        },
      },
    },
  },
  fieldItem: {
    advanced: {
      predefinedField: {
        desktop: {
          value: 'none',
        },
      },
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
  field: {
    advanced: {
      focus: {
        border: {
          desktop: {
            value: {
              radius: {
                sync:        'on',
                topLeft:     '3px',
                topRight:    '3px',
                bottomLeft:  '3px',
                bottomRight: '3px',
              },
              styles: {
                all: {
                  width: '0px',
                  color: '#333333',
                  style: 'solid',
                },
              },
            },
          },
        },
      },
    },
  },
};

export {
  signupCustomFieldModuleDefaultPrintedStyleAttributes,
};
