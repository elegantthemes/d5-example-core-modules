import {
  type CtaAttrs,
  type Metadata,
} from '@divi/types';


/**
 * CTA Module Default Render Attributes.
 *
 * Note: The module default render attributes will be used to generate
 * `module-default-render-attributes.json` upon build.
 */
const ctaModuleDefaultRenderAttributes: Metadata.DefaultAttributes<CtaAttrs> = {
  module: {
    meta: {
      adminLabel: {
        desktop: {
          value: 'Call To Action',
        },
      },
    },
    decoration: {
      background: {
        desktop: {
          value: {
            color: 'var(--gcid-primary-color)',
          },
        },
      },
    },
    advanced: {
      text: {
        text: {
          desktop: {
            value: {
              orientation: 'center',
              color:       'dark',
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
              headingLevel: 'h2',
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
    },
  },
};

export {
  ctaModuleDefaultRenderAttributes,
};
