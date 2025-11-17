import {
  type ContactFormAttrs,
  type Metadata,
} from '@divi/types';


/**
 * Contact Form Module Default Render Attributes.
 *
 * Note: The module default render attributes will be used to generate
 * `module-default-render-attributes.json` upon build.
 */
const contactFormModuleDefaultRenderAttributes: Metadata.DefaultAttributes<ContactFormAttrs> = {
  module: {
    meta: {
      adminLabel: {
        desktop: {
          value: 'Contact Form',
        },
      },
    },
    advanced: {
      spamProtection: {
        desktop: {
          value: {
            enabled:         'off',
            useBasicCaptcha: 'on',
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
              headingLevel: 'h1',
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
          text: 'Submit',
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
  redirect: {
    advanced: {
      useRedirect: {
        desktop: {
          value: 'off',
        },
      },
    },
  },
};

export {
  contactFormModuleDefaultRenderAttributes,
};
