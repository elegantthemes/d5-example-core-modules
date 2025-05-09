import {
  type Metadata,
  type SliderAttrs,
} from '@divi/types';


/**
 * Slider Module Default Printed Style Attributes.
 *
 * Note: The module default printed style attributes will be used to generate
 * `module-default-printed-style-attributes.json` upon build.
 */
const sliderModuleDefaultPrintedStyleAttributes: Metadata.DefaultAttributes<SliderAttrs> = {
  module: {
    advanced: {
      text: {
        text: {
          desktop: {
            value: {
              orientation: 'center',
            },
          },
        },
      },
    },
    decoration: {
      position: {
        desktop: {
          value: {
            mode: 'relative',
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
              size:         '46px',
              lineHeight:   '1em',
              headingLevel: 'h2',
            },
          },
        },
      },
    },
  },
  content: {
    decoration: {
      sizing: {
        desktop: {
          value: {
            maxWidth: 'auto',
            width:    '100%',
          },
        },
      },
    },
  },
  children: {
    content: {
      advanced: {
        showOnMobile: {
          desktop: {
            value: 'on',
          },
        },
      },
    },
    button: {
      advanced: {
        showOnMobile: {
          desktop: {
            value: 'on',
          },
        },
      },
    },
    contentOverlay: {
      decoration: {
        border: {
          desktop: {
            value: {
              radius: {
                sync:        'on',
                bottomLeft:  '3px',
                bottomRight: '3px',
                topLeft:     '3px',
                topRight:    '3px',
              },
            },
          },
        },
      },
    },
  },
};

export {
  sliderModuleDefaultPrintedStyleAttributes,
};
