import {
  type BlogAttrs,
  type Metadata,
} from '@divi/types';


/**
 * Blog Module Default Printed Style Attributes.
 *
 * Note: The module default printed style attributes will be used to generate
 * `module-default-printed-style-attributes.json` upon build.
 */
const blogModuleDefaultPrintedStyleAttributes: Metadata.DefaultAttributes<BlogAttrs> = {
  title: {
    decoration: {
      font: {
        font: {
          desktop: {
            value: {
              size:       '18px',
              lineHeight: '1em',
            },
          },
        },
      },
    },
  },
  post: {
    decoration: {
      border: {
        desktop: {
          value: {
            styles: {
              all: {
                width: '1px',
              },
            },
          },
        },
      },
    },
  },
};

export {
  blogModuleDefaultPrintedStyleAttributes,
};
