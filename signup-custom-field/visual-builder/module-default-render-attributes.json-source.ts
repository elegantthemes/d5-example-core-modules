import {
  type Metadata,
  type SignupCustomFieldAttrs,
} from '@divi/types';


/**
 * SignUp Custom Field Module Default Render Attributes.
 *
 * Note: The module default render attributes will be used to generate
 * `module-default-render-attributes.json` upon build.
 */
const signupCustomFieldModuleDefaultRenderAttributes: Metadata.DefaultAttributes<SignupCustomFieldAttrs> = {
  fieldItem: {
    advanced: {
      fullwidth: {
        desktop: {
          value: 'on',
        },
      },
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
  signupCustomFieldModuleDefaultRenderAttributes,
};
