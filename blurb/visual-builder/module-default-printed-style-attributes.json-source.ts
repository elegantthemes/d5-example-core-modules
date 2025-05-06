import {
  type BlurbAttrs,
  type Metadata,
} from '@divi/types';


/**
 * Blurb Module Default Printed Style Attributes.
 *
 * Note: The module default printed style attributes will be used to generate
 * `module-default-printed-style-attributes.json` upon build.
 */
const blurbModuleDefaultPrintedStyleAttributes: Metadata.DefaultAttributes<BlurbAttrs> = {
  imageIcon: {
    advanced: {
      width: {
        desktop: {
          value: {
            icon:  '96px',
            image: '100%',
          },
        },
      },
    },
  },
  title: {
    innerContent: {
      desktop: {
        value: {
          target: 'off',
        },
      },
    },
  },
  contentContainer: {
    decoration: {
      sizing: {
        desktop: {
          value: {
            maxWidth: '550px',
          },
        },
      },
    },
  },
};

export {
  blurbModuleDefaultPrintedStyleAttributes,
};
