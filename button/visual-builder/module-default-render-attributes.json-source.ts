import {
  type ButtonAttrs,
  type Metadata,
} from '@divi/types';


/**
 * Button Module Default Render Attributes.
 *
 * Note: The module default render attributes will be used to generate
 * `module-default-render-attributes.json` upon build.
 */
const buttonModuleDefaultRenderAttributes: Metadata.DefaultAttributes<ButtonAttrs> = {
  module: {
    meta: {
      adminLabel: {
        desktop: {
          value: 'Button',
        },
      },
    },
    advanced: {
      text: {
        text: {
          desktop: {
            value: {
              color: 'light',
            },
          },
        },
      },
    },
  },
  button: {
    decoration: {
      button: {
        desktop: {
          value: {
            enable: 'off',
            icon:   {
              enable: 'on',
            },
          },
        },
      },
      border: {
        desktop: {
          value: {
            styles: {
              all: {
                color: '',
              },
            },
          },
        },
      },
      font: {
        font: {
          desktop: {
            value: {
              color: '',
            },
          },
        },
      },
    },
  },
};

export {
  buttonModuleDefaultRenderAttributes,
};
