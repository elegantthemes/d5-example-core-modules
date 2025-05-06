import { type Metadata, type SliderAttrs } from '@divi/types';

/**
 * Slider Meta Data.
 *
 * Note: The module metadata will be used to generate `module.json` upon build.
 * Variable name must end with `ModuleMetaData` to be picked up by the build script.
 */
const sliderModuleMetaData: Metadata.Values<SliderAttrs> = {
  name:             'divi/slider',
  d4Shortcode:      'et_pb_slider',
  title:            'Slider',
  titles:           'Sliders',
  moduleIcon:       'divi/module-slider',
  childModuleName:  'divi/slide',
  childModuleTitle: 'Slide',
  category:         'module',
  childrenName:     ['divi/slide'],
  videos:           [
    {
      id:   'edx-BkUC6us',
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
      settings: {
        meta: {
          adminLabel: {},
        },
        advanced: {
          link:           {},
          htmlAttributes: {},
          text:           {
            priority:  30,
            component: {
              props: {
                fields: {
                  color: {
                    render: false,
                  },
                },
              },
            },
          },
          auto: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designAnimation',
              attrName:    'module.advanced.auto',
              label:       'Automatic Animation',
              description: 'If you would like the slider to slide automatically, without the visitor having to click the next button, enable this option and then adjust the rotation speed below if desired.',
              priority:    10,
              render:      true,
              features:    {
                responsive: false,
                hover:      false,
                sticky:     false,
                preset:     ['script'],
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },

          autoSpeed: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designAnimation',
              attrName:    'module.advanced.autoSpeed',
              label:       'Automatic Animation Speed (in ms)',
              description: 'Here you can designate how fast the slider fades between each slide, if \'Automatic Animation\' option is enabled above. The higher the number the longer the pause between each rotation.',
              priority:    10,
              render:      true,
              features:    {
                responsive: false,
                hover:      false,
                sticky:     false,
                preset:     ['script'],
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/text',
              },
            },
          },
          autoIgnoreHover: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designAnimation',
              attrName:    'module.advanced.autoIgnoreHover',
              label:       'Continue Automatic Slide on Hover',
              description: 'Turning this on will allow automatic sliding to continue on mouse hover.',
              priority:    10,
              render:      true,
              features:    {
                responsive: false,
                hover:      false,
                sticky:     false,
                preset:     ['script'],
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
        },
        decoration: {
          animation: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designAnimation',
              priority:  5,
              render:    true,
              component: {
                type:  'group',
                name:  'divi/animation',
                props: {
                  grouped: false,
                },
              },
            },
          },
          conditions: {},
          disabledOn: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'advancedVisibility',
              priority:  60,
              render:    true,

              // Built-in group component
              component: {
                type: 'group',
                name: 'divi/disabled-on',

                props: {
                  grouped: false,
                },
              },
            },
          },
          filters:   {},
          border:    {},
          boxShadow: {},
          overflow:  {
            groupType: 'group-item',
            item:      {
              groupSlug: 'advancedVisibility',
              priority:  60,
              render:    true,
              component: {
                type:  'group',
                name:  'divi/overflow',
                props: {
                  grouped: false,
                },
              },
            },
          },
          position: {},
          scroll:   {},
          sizing:   {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designSizing',
              priority:  80,
              render:    true,
              component: {
                type:  'group',
                name:  'divi/sizing',
                props: {
                  grouped: false,
                },
              },
            },
          },
          spacing:    {},
          sticky:     {},
          transform:  {},
          transition: {},
          zIndex:     {},
        },
      },
    },
    arrows: {
      type:     'object',
      selector: '{{selector}} .et-pb-slider-arrows .et-pb-arrow-prev, {{selector}} .et-pb-slider-arrows .et-pb-arrow-next',
      settings: {
        advanced: {
          color: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designNavigation',
              attrName:    'arrows.advanced.color',
              label:       'Arrow Color',
              description: 'Pick a color to use for the slider arrows that are used to navigate through each slide.',
              priority:    10,
              render:      true,

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
          show: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'contentElements',
              attrName:    'arrows.advanced.show',
              label:       'Show Arrows',
              description: 'This setting will turn on and off the navigation arrows.',
              priority:    10,
              render:      true,
              features:    {
                sticky: false,
                preset: ['html'],
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
        },
      },
    },
    pagination: {
      type:     'object',
      settings: {
        advanced: {
          show: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'contentElements',
              attrName:    'pagination.advanced.show',
              label:       'Show Controls',
              description: 'This setting will turn on and off the circle buttons at the bottom of the slider.',
              priority:    10,
              render:      true,
              features:    {
                sticky: false,
                preset: ['html'],
              },
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
        },
      },
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
      settings: {
        decoration: {
          font: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designTitleText',
              priority:  10,
              render:    true,

              // Built-in component
              component: {
                type: 'group',
                name: 'divi/font',

                props: {
                  grouped:    false,
                  groupLabel: 'Title Text',
                  fieldLabel: 'Title',

                  fields: {
                    headingLevel: {
                      render: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    button: {
      type:       'object',
      selector:   'body #page-container {{selector}} .et_pb_more_button.et_pb_button',
      styleProps: {
        spacing: {
          important: true,
        },
        font: {
          important: {
            font: {
              desktop: {
                value: {
                  color: true,
                },
              },
            },
          },
        },
      },
      settings: {
        decoration: {
          button: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designButton',
              priority:  10,
              render:    true,

              // Built-in component
              component: {
                type: 'group',
                name: 'divi/button',

                props: {
                  grouped:    false,
                  fieldLabel: 'Button',
                  attrName:   'button',

                  fields: {
                    fontGroup: {
                      component: {
                        props: {
                          fields: {
                            lineHeight: {
                              render: false,
                            },
                            textAlign: {
                              render: false,
                            },
                          },
                        },
                      },
                    },
                    borderGroup: {
                      component: {
                        props: {
                          fields: {
                            styles: {
                              render: false,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
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
      settings: {
        decoration: {
          bodyFont: {
            priority: 50,

            // Built-in component
            component: {
              props: {
                groups: {
                  body: {
                    groupLabel: 'Body Text',
                    fieldLabel: 'Body',
                  },
                },
              },
            },
          },
          sizing: {
            groupType: 'group-items',
            items:     {
              width: {
                groupSlug:   'designSizing',
                attrName:    'content.decoration.sizing',
                subName:     'width',
                label:       'Content Width',
                description: 'By default, elements will extend the full width of their parent element. If you would like to set a custom static width, you can do so using this option.',
                priority:    10,
                render:      true,

                // Built-in component
                component: {
                  type:  'field',
                  name:  'divi/range', // has unit-picker
                  props: {
                    cssProperty: 'width',
                    defaultUnit: '%',
                    max:         100,
                  },
                },
              },
              maxWidth: {
                groupSlug:   'designSizing',
                attrName:    'content.decoration.sizing',
                subName:     'maxWidth',
                label:       'Content Max Width',
                description: 'Setting a maximum width will prevent your element from ever surpassing the defined width value. Maximum width can be used in combination with the standard width setting. Maximum width supersedes the normal width value.',
                priority:    20,
                render:      true,

                // Built-in component
                component: {
                  type:  'field',
                  name:  'divi/range', // has unit-picker
                  props: {
                    cssProperty: 'max-width',
                    defaultUnit: '%',
                    max:         100,
                  },
                },
              },
            },
          },
        },
      },
    },
    children: {
      type:     'object',
      settings: {
        innerContent: {
          groupType: 'group-item',
          item:      {
            groupSlug: 'advancedAttributes',
            priority:  20,
            render:    true,

            // Built-in group component.
            component: {
              type: 'group',
              name: 'divi/attributes-rel',

              props: {
                grouped:    false,
                fieldLabel: 'Button',
                attrName:   'children.button.innerContent',
              },
            },
          },
        },
        advanced: {
          slideOverlay: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designOverlay',
              attrName:    'children.slideOverlay.advanced.use',
              label:       'Use Background Overlay',
              description: 'When enabled, a custom overlay color will be added above your background image and behind your slider content.',
              priority:    10,
              render:      true,
              features:    {
                responsive: false,
                hover:      false,
                sticky:     false,
                preset:     ['html'],
              },

              // Built-in component.
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
          contentOverlay: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designOverlay',
              attrName:    'children.contentOverlay.advanced.use',
              label:       'Use Text Overlay',
              description: 'When enabled, a background color is added behind the slider text to make it more readable atop background images.',
              priority:    20,
              render:      true,
              features:    {
                responsive: false,
                hover:      false,
                sticky:     false,
                preset:     ['html'],
              },

              // Built-in component.
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
          content: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'advancedVisibility',
              attrName:    'children.content.advanced.showOnMobile',
              label:       'Show Content On Mobile',
              description: 'This setting will toggle visibility of content on mobile devices.',
              priority:    10,
              render:      true,
              features:    {
                responsive: false,
                hover:      false,
                sticky:     false,
                preset:     ['html'],
              },
              defaultAttr: {
                desktop: {
                  value: 'on',
                },
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
          button: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'advancedVisibility',
              attrName:    'children.button.advanced.showOnMobile',
              label:       'Show CTA On Mobile',
              description: 'This setting will toggle visibility of CTA on mobile devices.',
              priority:    20,
              render:      true,
              features:    {
                responsive: false,
                hover:      false,
                sticky:     false,
                preset:     ['html'],
              },
              defaultAttr: {
                desktop: {
                  value: 'on',
                },
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
        },
        decoration: {
          background: {
            groupType: 'group-items',
            items:     {
              contentBackground: {
                groupSlug: 'contentBackground',
                priority:  10,
                render:    true,

                // Built-in group component
                component: {
                  type: 'group',
                  name: 'divi/background',

                  props: {
                    grouped:  false,
                    attrName: 'children.module.decoration.background',
                  },
                },
              },
              contentOverlayUseBackground: {
                groupSlug:   'designOverlay',
                attrName:    'children.slideOverlay.decoration.background',
                subName:     'color',
                label:       'Background Overlay Color',
                description: 'Use the color picker to choose a color for the background overlay.',
                priority:    10,
                render:      true,
                features:    {
                  hover:  false,
                  sticky: false,
                },

                // Built-in component
                component: {
                  type: 'field',
                  name: 'divi/color-picker',
                },
              },
              contentOverlayUseText: {
                groupSlug:   'designOverlay',
                attrName:    'children.contentOverlay.decoration.background',
                subName:     'color',
                label:       'Text Overlay Color',
                description: 'Use the color picker to choose a color for the text overlay.',
                priority:    20,
                render:      true,
                features:    {
                  hover:  false,
                  sticky: false,
                },

                // Built-in component
                component: {
                  type: 'field',
                  name: 'divi/color-picker',
                },
              },
            },
          },
          border: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designOverlay',
              attrName:    'children.contentOverlay.decoration.border',
              subName:     'radius',
              label:       'Text Overlay Border Radius',
              description: 'Increasing the border radius will increase the roundness of the overlay corners. Setting this value to 0 will result in squared corners.',
              priority:    30,
              render:      true,
              features:    {
                hover:  false,
                sticky: false,
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/border-radius',
              },
            },
          },
        },
      },
    },
    image: {
      type:     'object',
      selector: '{{selector}} .et_pb_slide_image img',
      settings: {
        advanced: {
          showOnMobile: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'advancedVisibility',
              attrName:    'image.advanced.showOnMobile',
              label:       'Show Image / Video On Mobile',
              description: 'This setting will toggle visibility of Images/Video on mobile devices.',
              priority:    20,
              render:      true,
              features:    {
                responsive: false,
                hover:      false,
                sticky:     false,
                preset:     ['html'],
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
        },
        decoration: {
          border: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designImage',
              priority:  10,
              render:    true,

              // Built-in component
              component: {
                type: 'group',
                name: 'divi/border',

                props: {
                  grouped:    false,
                  fieldLabel: 'Image',
                },
              },
            },
          },
          boxShadow: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designImage',
              priority:  20,
              render:    true,

              // Built-in component
              component: {
                type: 'group',
                name: 'divi/box-shadow',

                props: {
                  grouped:    false,
                  fieldLabel: 'Image',
                },
              },
            },
          },
        },
      },
    },
    dotNav: {
      type:     'object',
      selector: '{{selector}} .et-pb-controllers a, {{selector}} .et-pb-controllers .et-pb-active-control',
      settings: {
        decoration: {
          background: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designNavigation',
              attrName:    'dotNav.decoration.background',
              subName:     'color',
              label:       'Dot Navigation Color',
              description: 'Pick a color to use for the dot navigation that appears at the bottom of the slider to designate which slide is active.',
              priority:    10,
              render:      true,

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
        },
      },
    },
  },
  customCssFields: {
    slideDescription: {
      label:          'Slide Description',
      subName:        'slideDescription',
      selectorSuffix: ' .et_pb_slide_description',
    },
    slideTitle: {
      label:          'Slide Title',
      subName:        'slideTitle',
      selectorSuffix: ' .et_pb_slide_description .et_pb_slide_title',
    },
    slideButton: {
      label:          'Slide Button',
      subName:        'slideButton',
      selectorSuffix: '.et_pb_slider .et_pb_slide .et_pb_slide_description a.et_pb_more_button.et_pb_button',
    },
    slideControllers: {
      label:          'Slide Controllers',
      subName:        'slideControllers',
      selectorSuffix: ' .et-pb-controllers',
    },
    slideActiveController: {
      label:          'Slide Active Controller',
      subName:        'slideActiveController',
      selectorSuffix: ' .et-pb-controllers .et-pb-active-control',
    },
    slideImage: {
      label:          'Slide Image',
      subName:        'slideImage',
      selectorSuffix: ' .et_pb_slide_image',
    },
    slideArrows: {
      label:          'Slide Arrows',
      subName:        'slideArrows',
      selectorSuffix: ' .et-pb-slider-arrows a',
    },
  },
  settings: {
    content:  'auto',
    advanced: 'auto',

    groups: {
      // Content => Background
      contentBackground: {
        panel:     'content',
        groupName: 'background',
        priority:  90,

        component: {
          name:  'divi/composite',
          props: {
            groupLabel:  'Background',
            presetGroup: 'divi/background',
          },
        },
      },

      // Content > Elements
      contentElements: {
        panel:     'content',
        priority:  10,
        groupName: 'elements',

        component: {
          name:  'divi/composite',
          props: {
            groupLabel: 'Elements',
          },
        },
      },

      // Design > Overlay
      designOverlay: {
        panel:     'design',
        priority:  10,
        groupName: 'designOverlay',

        component: {
          name:  'divi/composite',
          props: {
            groupLabel: 'Overlay',
          },
        },
      },

      // Design > Navigation
      designNavigation: {
        panel:     'design',
        priority:  20,
        groupName: 'designNavigation',

        component: {
          name:  'divi/composite',
          props: {
            groupLabel: 'Navigation',
          },
        },
      },

      // Design > Image
      designImage: {
        panel:     'design',
        priority:  30,
        groupName: 'designImage',

        component: {
          name:  'divi/composite',
          props: {
            groupLabel: 'Image',
          },
        },
      },

      // Design > Title Text
      designTitleText: {
        panel:     'design',
        priority:  40,
        groupName: 'designTitleText',

        component: {
          name:  'divi/composite',
          props: {
            groupLabel:  'Title Text',
            presetGroup: 'divi/font',
          },
        },
      },

      // Design > Button
      designButton: {
        panel:     'design',
        priority:  60,
        groupName: 'designButton',

        component: {
          name:  'divi/composite',
          props: {
            groupLabel:  'Button',
            presetGroup: 'divi/button',
          },
        },
      },

      // Design > Sizing
      designSizing: {
        panel:     'design',
        priority:  60,
        groupName: 'designSizing',

        component: {
          name:  'divi/composite',
          props: {
            groupLabel:  'Sizing',
            presetGroup: 'divi/sizing',
          },
        },
      },

      // Design > Animation
      designAnimation: {
        panel:     'design',
        priority:  199,
        groupName: 'designAnimation',

        component: {
          name:  'divi/composite',
          props: {
            groupLabel:  'Animation',
            presetGroup: 'divi/animation',
          },
        },
      },

      // Advanced > Attributes
      advancedAttributes: {
        panel:     'advanced',
        priority:  30,
        groupName: 'attributes',

        component: {
          name:  'divi/composite',
          props: {
            groupLabel: 'Attributes',
          },
        },
      },

      // Advanced > Visibility
      advancedVisibility: {
        panel:     'advanced',
        priority:  40,
        groupName: 'visibility',

        component: {
          name:  'divi/composite',
          props: {
            groupLabel:  'Visibility',
            presetGroup: 'divi/visibility-settings',
          },
        },
      },
    },
  },
  mousetrap: {
    inner: {
      // Child module covers entire module area so inner mousetrap needs to be rendered on the child module.
      edited: true,
    },
    zIndex: {
      hovered: 'aboveModuleElements', // Should be higher from `.et_pb_slides` and `.et-pb-slider-arrows`.
    },
  },
};

export {
  sliderModuleMetaData,
};
