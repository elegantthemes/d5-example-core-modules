import {
  type AccordionAttrs,
  type Metadata,
} from '@divi/types';


/**
 * Accordion Module Default Render Attributes.
 *
 * Note: The module default render attributes will be used to generate
 * `module-default-render-attributes.json` upon build.
 */
const accordionModuleDefaultRenderAttributes: Metadata.DefaultAttributes<AccordionAttrs> = {
  module: {
    meta: {
      adminLabel: {
        desktop: {
          value: 'Accordion',
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
              headingLevel: 'h5',
            },
          },
        },
      },
    },
  },
  closedToggleIcon: {
    decoration: {
      icon: {
        desktop: {
          value: {
            useSize: 'off',
          },
        },
      },
    },
  },
};

export {
  accordionModuleDefaultRenderAttributes,
};
