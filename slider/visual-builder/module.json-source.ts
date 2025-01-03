import { type Metadata, type SliderAttrs } from '@divi/types';

/**
 * Slider Meta Data.
 *
 * Note: The module metadata will be used to generate `module.json` upon build.
 * Variable name must end with `ModuleMetaData` to be picked up by the build script.
 */
const sliderModuleMetaData: Metadata.Values<SliderAttrs> = {
  name:         'divi/slider',
  d4Shortcode:  'et_pb_slider',
  title:        'Slider',
  titles:       'Sliders',
  moduleIcon:   'divi/module-slider',
  category:     'module',
  childrenName: ['divi/slide'],
  videos:       [
    {
      id:   '-YeoR2xSLOY',
      name: 'An introduction to the Slider module',
    },
    {
      id:   '1iqjhnHVA9Y',
      name: 'Design Settings and Advanced Module Settings',
    },
    {
      id:   'boNZZ0MYU0E',
      name: 'Saving and loading from the library',
    },
  ],
  attributes: {
    module: {
      type:       'object',
      selector:   '{{selector}}',
      styleProps: {
        spacing: {
          propertySelectors: {
            desktop: {
              value: {
                padding: '{{selector}} .et_pb_slide_description, {{selector}}.et_pb_slider_fullwidth_off .et_pb_slide_description',
              },
            },
          },
          important: {
            desktop: {
              value: {
                margin: true,
              },
            },
          },
        },
        boxShadow: {
          useOverlay: true,
        },
        sizing: {
          important: {
            desktop: {
              value: {
                'margin-left':  true,
                'margin-right': true,
              },
            },
          },
          propertySelectors: {
            desktop: {
              value: {
                'margin-left':  '{{selector}}.et_pb_module',
                'margin-right': '{{selector}}.et_pb_module',
                height:         '{{selector}}, {{selector}} .et_pb_slide',
                'min-height':   '{{selector}}, {{selector}} .et_pb_slide',
                'max-height':   '{{selector}}, {{selector}} .et_pb_slide',
              },
            },
          },
        },
      },
      styleComponentsProps: {
        boxShadow: {
          settings: {
            overlay: true,
          },
        },
      },
    },
    arrows: {
      type:     'object',
      selector: '{{selector}} .et-pb-slider-arrows .et-pb-arrow-prev, {{selector}} .et-pb-slider-arrows .et-pb-arrow-next',
    },
    pagination: {
      type: 'object',
    },
    title: {
      type:       'object',
      selector:   '{{selector}}.et_pb_slider .et_pb_slide_description .et_pb_slide_title',
      styleProps: {
        font: {
          propertySelectors: {
            font: {
              tablet: {
                value: {
                  'font-size': '{{selector}}.et_pb_slider .et_pb_slides .et_pb_slide_description .et_pb_slide_title',
                },
              },
              phone: {
                value: {
                  'font-size': '{{selector}}.et_pb_slider .et_pb_slides .et_pb_slide_description .et_pb_slide_title',
                },
              },
            },
          },
          important: {
            font: {
              desktop: {
                value: {
                  'font-size': true,
                  color:       true,
                },
              },
            },
          },
        },
      },
    },
    button: {
      type:       'object',
      selector:   '{{selector}} .et_pb_more_button.et_pb_button',
      styleProps: {
        spacing: {
          important: true,
        },
      },
    },
    content: {
      type:       'object',
      selector:   '{{selector}}.et_pb_slider .et_pb_slide_content',
      styleProps: {
        bodyFont: {
          propertySelectors: {
            body: {
              font: {
                desktop: {
                  value: {
                    'line-height': '{{selector}}.et_pb_slider, {{selector}}.et_pb_slider .et_pb_slide_content',
                  },
                },
                tablet: {
                  value: {
                    'font-size':   '{{selector}}.et_pb_slider .et_pb_slides .et_pb_slide_content',
                    'line-height': '{{selector}}.et_pb_slider .et_pb_slides .et_pb_slide_content',
                  },
                },
                phone: {
                  value: {
                    'font-size':   '{{selector}}.et_pb_slider .et_pb_slides .et_pb_slide_content',
                    'line-height': '{{selector}}.et_pb_slider .et_pb_slides .et_pb_slide_content',
                  },
                },
              },
            },
          },
        },
        sizing: {
          selector: '{{selector}} .et_pb_slide > .et_pb_container',
        },
      },
    },
    children: {
      type: 'object',
    },
    image: {
      type:     'object',
      selector: '{{selector}} .et_pb_slide_image img',
    },
    dotNav: {
      type:     'object',
      selector: '{{selector}} .et-pb-controllers a, {{selector}} .et-pb-controllers .et-pb-active-control',
    },
  },
  customCssFields: {
    slideDescription: {
      subName:        'slideDescription',
      selectorSuffix: ' .et_pb_slide_description',
    },
    slideTitle: {
      subName:        'slideTitle',
      selectorSuffix: ' .et_pb_slide_description .et_pb_slide_title',
    },
    slideButton: {
      subName:        'slideButton',
      selectorSuffix: '.et_pb_slider .et_pb_slide .et_pb_slide_description a.et_pb_more_button.et_pb_button',
    },
    slideControllers: {
      subName:        'slideControllers',
      selectorSuffix: ' .et-pb-controllers',
    },
    slideActiveController: {
      subName:        'slideActiveController',
      selectorSuffix: ' .et-pb-controllers .et-pb-active-control',
    },
    slideImage: {
      subName:        'slideImage',
      selectorSuffix: ' .et_pb_slide_image',
    },
    slideArrows: {
      subName:        'slideArrows',
      selectorSuffix: ' .et-pb-slider-arrows a',
    },
  },
};

export {
  sliderModuleMetaData,
};
