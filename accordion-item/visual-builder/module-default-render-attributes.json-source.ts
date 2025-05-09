import {
  type AccordionItemAttrs,
  type Metadata,
} from '@divi/types';


/**
 * Accordion Item Module Default Render Attributes.
 *
 * Note: The module default render attributes will be used to generate
 * `module-default-render-attributes.json` upon build.
 */
const accordionItemModuleDefaultRenderAttributes: Metadata.DefaultAttributes<AccordionItemAttrs> = {
  module: {
    advanced: {
      open: {
        desktop: {
          value: 'off',
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
  accordionItemModuleDefaultRenderAttributes,
};
