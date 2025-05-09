import {
  type Metadata,
  type PricingTablesAttrs,
} from '@divi/types';


/**
 * Pricing Tables Module Default Printed Style Attributes.
 *
 * Note: The module default printed style attributes will be used to generate
 * `module-default-printed-style-attributes.json` upon build.
 */
const pricingTablesModuleDefaultPrintedStyleAttributes: Metadata.DefaultAttributes<PricingTablesAttrs> = {
  module: {
    decoration: {
      border: {
        desktop: {
          value: {
            styles: {
              all: {
                width: '1px',
              },
              top: {
                width: '1px',
              },
              right: {
                width: '1px',
              },
              bottom: {
                width: '1px',
              },
              left: {
                width: '1px',
              },
            },
          },
        },
      },
      position: {
        desktop: {
          value: {
            mode:   'relative',
            origin: {
              relative: 'top left',
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
              size:       '22px',
              lineHeight: '1em',
            },
          },
        },
      },
    },
  },
  subtitle: {
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
  price: {
    decoration: {
      font: {
        font: {
          desktop: {
            value: {
              size:       '80px',
              lineHeight: '82px',
            },
          },
        },
      },
    },
  },
  currencyFrequency: {
    decoration: {
      font: {
        font: {
          desktop: {
            value: {
              size: '16px',
            },
          },
        },
      },
    },
  },
};

export {
  pricingTablesModuleDefaultPrintedStyleAttributes,
};
