import {
  type Metadata,
  type SliderAttrs,
} from '@divi/types';


/**
 * Slider Module Default Render Attributes.
 *
 * Note: The module default render attributes will be used to generate
 * `module-default-render-attributes.json` upon build.
 */
const sliderModuleDefaultRenderAttributes: Metadata.DefaultAttributes<SliderAttrs> = {
  module: {
    meta: {
      adminLabel: {
        desktop: {
          value: 'Slider',
        },
      },
    },
    advanced: {
      autoSpeed: {
        desktop: {
          value: '7000',
        },
      },
    },
  },
  arrows: {
    advanced: {
      show: {
        desktop: {
          value: 'on',
        },
      },
    },
  },
  pagination: {
    advanced: {
      show: {
        desktop: {
          value: 'on',
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
              headingLevel: 'h2',
            },
          },
        },
      },
    },
  },
  button: {
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
  children: {
    button: {
      advanced: {
        showOnMobile: {
          desktop: {
            value: 'on',
          },
        },
      },
    },
    content: {
      advanced: {
        showOnMobile: {
          desktop: {
            value: 'on',
          },
        },
      },
    },
  },
};

export {
  sliderModuleDefaultRenderAttributes,
};
