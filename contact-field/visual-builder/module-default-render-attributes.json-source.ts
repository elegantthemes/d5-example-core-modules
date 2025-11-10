import {
  type ContactFieldAttrs,
  type Metadata,
} from '@divi/types';


/**
 * Contact Field Module Default Render Attributes.
 *
 * Note: The module default render attributes will be used to generate
 * `module-default-render-attributes.json` upon build.
 */
const contactFieldModuleDefaultRenderAttributes: Metadata.DefaultAttributes<ContactFieldAttrs> = {
  module: {
    decoration: {
      sizing: {
        desktop: {
          value: {
            flexType: '24_24',
          },
        },
      },
    },
  },
  fieldItem: {
    advanced: {
      id: {
        desktop: {
          value: '',
        },
      },
      type: {
        desktop: {
          value: 'input',
        },
      },
      required: {
        desktop: {
          value: 'on',
        },
      },
    },
    innerContent: {
      desktop: {
        value: 'New Field',
      },
    },
  },
};

export {
  contactFieldModuleDefaultRenderAttributes,
};
