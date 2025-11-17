import {
  type LoginAttrs,
  type Metadata,
} from '@divi/types';


/**
 * Login Module Default Render Attributes.
 *
 * Note: The module default render attributes will be used to generate
 * `module-default-render-attributes.json` upon build.
 */
const loginModuleDefaultRenderAttributes: Metadata.DefaultAttributes<LoginAttrs> = {
  module: {
    meta: {
      adminLabel: {
        desktop: {
          value: 'Login',
        },
      },
    },
    advanced: {
      text: {
        text: {
          desktop: {
            value: {
              orientation: 'left',
              color:       'dark',
            },
          },
        },
      },
      currentPageRedirect: {
        desktop: {
          value: 'off',
        },
      },
    },
    decoration: {
      background: {
        desktop: {
          value: {
            color:       '$variable({"type":"color","value":{"name":"gcid-primary-color","settings":{}}})$',
            enableColor: 'on',
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
              headingLevel: 'h2',
            },
          },
        },
      },
    },
  },
  button: {
    innerContent: {
      desktop: {
        value: {
          text:    'Login',
          linkUrl: '#',
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
  loginModuleDefaultRenderAttributes,
};
