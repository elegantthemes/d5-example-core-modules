import { type BlurbAttrs, type Metadata } from '@divi/types';

/**
 * Blurb Module Meta Data.
 *
 * Note: The module metadata will be used to generate `module.json` upon build.
 * Variable name must end with `ModuleMetaData` to be picked up by the build script.
 */
const blurbModuleMetaData: Metadata.Values<BlurbAttrs> = {
  name:        'divi/blurb',
  d4Shortcode: 'et_pb_blurb',
  title:       'Blurb',
  titles:      'Blurbs',
  moduleIcon:  'divi/module-blurb',
  category:    'module',
  videos:      [
    {
      id:   'SFuDWEMH-qg',
      name: 'An introduction to the Blurb module',
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
    imageIcon: {
      type:     'object',
      selector: '{{selector}} .et_pb_main_blurb_image img',
      settings: {
        innerContent: {
          groupType: 'group-items',
          items:     {
            useIcon: {
              groupSlug:   'contentImageIcon',
              attrName:    'imageIcon.innerContent',
              subName:     'useIcon',
              label:       'Use Icon',
              description: 'Here you can choose whether icon set below should be used.',
              features:    {
                hover:      false,
                sticky:     false,
                responsive: false,
                preset:     'content',
              },
              render:   true,
              priority: 10,

              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
            icon: {
              groupSlug:   'contentImageIcon',
              attrName:    'imageIcon.innerContent',
              subName:     'icon',
              label:       'Icon',
              description: 'Choose an icon to display with your blurb.',
              features:    {
                sticky: false,
                preset: 'content',
              },
              render:   true,
              priority: 10,

              component: {
                type: 'field',
                name: 'divi/icon-picker',
              },
            },
            src: {
              groupSlug:   'contentImageIcon',
              attrName:    'imageIcon.innerContent',
              subName:     'src',
              label:       'Image',
              description: 'Upload an image to display at the top of your blurb.',
              features:    {
                dynamicContent: {
                  type: 'image',
                },
                sticky:     false,
                responsive: true,
                hover:      true,
                preset:     'content',
              },
              render:   true,
              priority: 10,

              component: {
                type:  'field',
                name:  'divi/upload',
                props: {
                  syncImageData: {
                    src:       true,
                    id:        true,
                    alt:       true,
                    titleText: false,
                  },
                },
              },
            },
            alt: {
              groupSlug:   'advancedAttributes',
              attrName:    'imageIcon.innerContent',
              subName:     'alt',
              label:       'Image Alt Text',
              description: 'Define the HTML ALT text for your image here.',
              features:    {
                dynamicContent: {
                  type: 'text',
                },
                sticky:     false,
                responsive: false,
                hover:      false,
                preset:     ['html'],
              },
              render:   true,
              priority: 10,

              component: {
                type: 'field',
                name: 'divi/text',
              },
            },
            animation: {
              groupSlug:   'designAnimation',
              attrName:    'imageIcon.innerContent',
              subName:     'animation',
              label:       'Image/Icon Animation',
              description: 'This controls the direction of the lazy-loading animation.',
              features:    {
                sticky: false,
                hover:  false,
                preset: ['html'],
              },
              render:   true,
              priority: 20,

              component: {
                type:  'field',
                name:  'divi/select',
                props: {
                  options: {
                    top: {
                      label: 'Top To Bottom',
                    },
                    left: {
                      label: 'Left To Right',
                    },
                    right: {
                      label: 'Right To Left',
                    },
                    bottom: {
                      label: 'Bottom To Top',
                    },
                    off: {
                      label: 'No Animation',
                    },
                  },
                },
              },
            },
          },
        },
        advanced: {
          color: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designImageIcon',
              attrName:    'imageIcon.advanced.color',
              label:       'Icon Color',
              description: 'Here you can define a custom color for your icon.',
              render:      true,
              priority:    10,

              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
          placement: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designImageIcon',
              attrName:    'imageIcon.advanced.placement',
              label:       'Image/Icon Placement',
              description: 'Here you can choose where to place the icon.',
              render:      true,
              priority:    30,
              features:    {
                hover:  false,
                sticky: false,
              },

              component: {
                type:  'field',
                name:  'divi/select',
                props: {
                  options: {
                    top: {
                      label: 'Top',
                    },
                    left: {
                      label: 'Left',
                    },
                  },
                },
              },
            },
          },
          width: {
            groupType: 'group-items',
            items:     {
              image: {
                groupSlug:   'designImageIcon',
                attrName:    'imageIcon.advanced.width',
                subName:     'image',
                label:       'Image Width',
                description: 'Here you can choose image width.',
                render:      true,
                priority:    40,

                component: {
                  type:  'field',
                  name:  'divi/range', // has unit-picker
                  props: {
                    cssProperty: 'width',
                    min:         1,
                    max:         200,
                  },
                },
                features: {
                  preset:         ['html'],
                  dynamicContent: {
                    type: 'number',
                  },
                },
              },
              icon: {
                groupSlug:   'designImageIcon',
                attrName:    'imageIcon.advanced.width',
                subName:     'icon',
                label:       'Icon Width',
                description: 'Here you can choose icon width.',
                render:      true,
                priority:    40,

                component: {
                  type:  'field',
                  name:  'divi/range', // has unit-picker
                  props: {
                    cssProperty: 'font-size',
                    min:         1,
                    max:         200,
                  },
                },
                features: {
                  preset:         ['html'],
                  dynamicContent: {
                    type: 'number',
                  },
                },
              },
            },
          },
          alignment: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designImageIcon',
              attrName:    'imageIcon.advanced.alignment',
              label:       'Image/Icon Alignment',
              description: 'Align image/icon to the left, right or center.',
              render:      true,
              priority:    50,
              features:    {
                hover:  false,
                sticky: false,
              },

              component: {
                type:  'field',
                name:  'divi/button-options',
                props: {
                  options: {
                    left: {
                      icon: 'divi/align-left',
                    },
                    center: {
                      icon: 'divi/align-center',
                    },
                    right: {
                      icon: 'divi/align-right',
                    },
                  },
                  showLabel: false,
                },
              },
            },
          },
        },
        decoration: {
          background: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designImageIcon',
              attrName:    'imageIcon.decoration.background',
              subName:     'color',
              label:       'Image/Icon Background Color',
              description: 'Here you can define a custom background color.',
              render:      true,
              priority:    20,

              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
          border: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designImageIcon',
              priority:  60,
              render:    true,
              component: {
                type:  'group',
                name:  'divi/border',
                props: {
                  grouped:    false,
                  fieldLabel: 'Image/Icon',
                },
              },
            },
          },
          spacing: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designImageIcon',
              priority:  60,
              render:    true,
              component: {
                type:  'group',
                name:  'divi/spacing',
                props: {
                  grouped:    false,
                  fieldLabel: 'Image/Icon',
                },
              },
            },
          },
          boxShadow: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designImageIcon',
              priority:  60,
              render:    true,
              component: {
                type:  'group',
                name:  'divi/box-shadow',
                props: {
                  grouped:    false,
                  fieldLabel: 'Image',
                },
              },
            },
          },
          filters: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designImageIcon',
              priority:  60,
              render:    true,
              component: {
                type:  'group',
                name:  'divi/filters',
                props: {
                  grouped:    false,
                  fieldLabel: 'Image/Icon',
                },
              },
            },
          },
        },
      },
      styleProps: {
        selector: '{{selector}} .et-pb-icon, {{selector}} .et_pb_image_wrap',
        spacing:  {
          selector:  '{{selector}} .et_pb_main_blurb_image .et_pb_only_image_mode_wrap, {{selector}} .et_pb_main_blurb_image .et-pb-icon',
          important: true,
        },
        boxShadow: {
          selector:   '{{selector}} .et_pb_main_blurb_image .et_pb_image_wrap',
          useOverlay: true,
        },
        filters: {
          selector:  '{{selector}} .et_pb_main_blurb_image',
          selectors: {
            desktop: {
              value: '{{selector}} .et_pb_main_blurb_image',
              hover: '{{selector}}{{:hover}} .et_pb_main_blurb_image',
            },
          },
        },
        border: {
          selector:  '{{selector}} .et_pb_main_blurb_image .et_pb_only_image_mode_wrap, {{selector}} .et_pb_main_blurb_image .et-pb-icon',
          selectors: {
            desktop: {
              value: '{{selector}} .et_pb_main_blurb_image .et_pb_only_image_mode_wrap, {{selector}} .et_pb_main_blurb_image .et-pb-icon',
              hover: '{{selector}}{{:hover}} .et_pb_main_blurb_image .et_pb_only_image_mode_wrap, {{selector}}{{:hover}} .et_pb_main_blurb_image .et-pb-icon',
            },
          },
        },
        background: {
          selector:  '{{selector}} .et_pb_main_blurb_image .et_pb_only_image_mode_wrap, {{selector}} .et_pb_main_blurb_image .et-pb-icon',
          selectors: {
            desktop: {
              value: '{{selector}} .et_pb_main_blurb_image .et_pb_only_image_mode_wrap, {{selector}} .et_pb_main_blurb_image .et-pb-icon',
              hover: '{{selector}}{{:hover}} .et_pb_main_blurb_image .et_pb_only_image_mode_wrap, {{selector}}{{:hover}} .et_pb_main_blurb_image .et-pb-icon',
            },
          },
        },
      },
      styleComponentsProps: {
        background: false,
        boxShadow:  {
          settings: {
            overlay: true,
          },
        },
      },
    },
    module: {
      type:     'object',
      selector: '{{selector}}',
      settings: {
        meta: {
          adminLabel: {},
        },
        advanced: {
          link:           {},
          htmlAttributes: {},
          text:           {},
        },
        decoration: {
          animation: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designAnimation',
              priority:  10,
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
          background: {},
          border:     {},
          boxShadow:  {},
          conditions: {},
          disabledOn: {},
          order:      {},
          filters:    {},
          overflow:   {},
          position:   {},
          scroll:     {},
          sizing:     {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designSizing',
              priority:  20,
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
      styleProps: {
        spacing: {
          important: true,
        },
      },
    },
    title: {
      type:     'object',
      selector: '{{selector}} .et_pb_module_header, {{selector}} .et_pb_module_header a',
      settings: {
        innerContent: {},
        decoration:   {
          font: {},
        },
      },
      attributes: {
        class: 'et_pb_module_header',
      },
      tagName:           'h4',
      inlineEditor:      'plainText',
      elementType:       'headingLink',
      childrenSanitizer: 'et_core_esc_previously',
      styleProps:        {
        font: {
          selectors: {
            desktop: {
              value: '{{selector}} .et_pb_module_header, {{selector}} .et_pb_module_header a',
              hover: '{{selector}}{{:hover}} .et_pb_module_header, {{selector}}{{:hover}} .et_pb_module_header a',
            },
          },
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
    },
    content: {
      type:        'object',
      selector:    '{{selector}} .et_pb_blurb_description',
      elementType: 'content',
      attributes:  {
        class: 'et_pb_blurb_description',
      },
      settings: {
        innerContent: {
          item: {
            groupSlug: 'contentText',
            features:  {
              dynamicContent: { type: 'text' },
            },
          },
        },
        decoration: {
          bodyFont: {},
        },
      },
      styleProps: {
        bodyFont: {
          selectors: {
            desktop: {
              value: '{{selector}} .et_pb_blurb_description',
              hover: '{{selector}}{{:hover}}, {{selector}}{{:hover}} .et_pb_blurb_description',
            },
          },
        },
      },
    },
    contentContainer: {
      type:        'object',
      selector:    '{{selector}} .et_pb_blurb_content',
      elementType: 'wrapper',
      attributes:  {
        class: 'et_pb_blurb_content',
      },
      settings: {
        decoration: {
          sizing: {
            groupType: 'group-items',
            items:     {
              maxWidth: {
                groupSlug:   'designSizing',
                attrName:    'contentContainer.decoration.sizing',
                subName:     'maxWidth',
                label:       'Content Width',
                description: 'Adjust the width of the content within the blurb.',
                priority:    10,
                render:      true,
                component:   {
                  type:  'field',
                  name:  'divi/range', // has unit-picker
                  props: {
                    cssProperty: 'width',
                    max:         1100,
                  },
                },
                features: {
                  dynamicContent: {
                    type: 'number',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  customCssFields: {
    blurbImage: {
      label:          'Blurb Image',
      subName:        'blurbImage',
      selectorSuffix: ' .et_pb_main_blurb_image',
    },
    blurbTitle: {
      label:          'Blurb Title',
      subName:        'blurbTitle',
      selectorSuffix: ' .et_pb_module_header',
    },
    blurbContent: {
      label:          'Blurb Content',
      subName:        'blurbContent',
      selectorSuffix: ' .et_pb_blurb_content',
    },
  },
  settings: {
    groups: {
      // Content => Image & Icon
      contentImageIcon: {
        panel:         'content',
        priority:      20,
        groupName:     'imageIcon',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel: 'Image & Icon',
          },
        },
      },

      // Design => Image & Icon
      designImageIcon: {
        panel:         'design',
        priority:      10,
        groupName:     'imageIcon',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel:        'Image & Icon',
            clipboardCategory: 'style',
          },
        },
      },

      // Design => Sizing
      designSizing: {
        panel:         'design',
        priority:      60,
        groupName:     'sizing',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel:        'Sizing',
            clipboardCategory: 'style',
            presetGroup:       'divi/sizing',
          },
        },
      },

      // Design => Animation
      designAnimation: {
        panel:         'design',
        priority:      120,
        groupName:     'animation',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel:        'Animation',
            clipboardCategory: 'style',
            presetGroup:       'divi/animation',
          },
        },
      },

      // Advanced => Attributes
      advancedAttributes: {
        panel:         'advanced',
        priority:      30,
        groupName:     'attributes',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel: 'Attributes',
          },
        },
      },
    },
  },
  mousetrap: {
    inner: {

      // Blurb has content wrapper which covers the surface of the module. Thus inner mousetrap needs to be added
      // inside content wrapper.
      edited: true,
    },
  },
};

export {
  blurbModuleMetaData,
};
