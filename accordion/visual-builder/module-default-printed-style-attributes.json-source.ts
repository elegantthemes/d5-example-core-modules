import {
  type AccordionAttrs,
  type Metadata,
} from '@divi/types';


/**
 * Accordion Module Default Printed Style Attributes.
 *
 * Note: The module default printed style attributes will be used to generate
 * `module-default-printed-style-attributes.json` upon build.
 */
const accordionModuleDefaultPrintedStyleAttributes: Metadata.DefaultAttributes<AccordionAttrs> = {
  module: {
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
  title: {
    decoration: {
      font: {
        font: {
          desktop: {
            value: {
              size:       '16px',
              lineHeight: '1em',
            },
          },
        },
      },
    },
  },
  closedToggle: {
    decoration: {
      font: {
        font: {
          desktop: {
            value: {
              size:          '16px',
              letterSpacing: '0px',
              lineHeight:    '1.7em',
            },
          },
        },
      },
    },
  },
  closedToggleIcon: {
    decoration: {
      font: {
        font: {
          desktop: {
            value: {
              size:       '16px',
              lineHeight: '1em',
            },
          },
        },
      },
      icon: {
        desktop: {
          value: {
            size: '16px',
          },
        },
      },
    },
  },
};

export {
  accordionModuleDefaultPrintedStyleAttributes,
};
