import { type BlurbAttrs, type ModuleMetadata } from '@divi/types';

/**
 * Blurb Module Meta Data.
 *
 * Note: The module metadata will be used to generate `module.json` upon build.
 * Variable name must end with `ModuleMetaData` to be picked up by the build script.
 */
const blurbModuleMetaData: ModuleMetadata<BlurbAttrs> = {
  name:        'divi/blurb',
  d4Shortcode: 'et_pb_blurb',
  title:       'Blurb',
  titles:      'Blurbs',
  moduleIcon:  'divi/module-blurb',
  category:    'module',
  videos:      [
    {
      id:   'XW7HR86lp8U',
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
      selector: '{{selector}} .et-pb-icon, {{selector}} .et_pb_image_wrap',
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
              },
              render:   true,
              priority: 10,

              component: {
                type: 'field',
                name: 'divi/upload',
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
                  name:  'divi/range',
                  props: {
                    min:          1,
                    max:          200,
                    allowedUnits: [
                      '%',
                      'em',
                      'rem',
                      'px',
                      'cm',
                      'mm',
                      'in',
                      'pt',
                      'pc',
                      'ex',
                      'vh',
                      'vw',
                    ],
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
                  name:  'divi/range',
                  props: {
                    min:          1,
                    max:          200,
                    allowedUnits: [
                      '%',
                      'em',
                      'rem',
                      'px',
                      'cm',
                      'mm',
                      'in',
                      'pt',
                      'pc',
                      'ex',
                      'vh',
                      'vw',
                    ],
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
      default: {
        innerContent: {
          desktop: {
            value: {
              useIcon:   'off',
              animation: 'top',
            },
          },
        },
        advanced: {
          color: {
            desktop: {
              value: '#7ebec5',
            },
          },
          placement: {
            desktop: {
              value: 'top',
            },
          },
        },
      },
      defaultPrintedStyle: {
        advanced: {
          width: {
            desktop: {
              value: {
                icon:  '96px',
                image: '100%',
              },
            },
          },
        },
      },
      styleProps: {
        spacing: {
          selector:  '{{selector}} .et_pb_main_blurb_image .et_pb_only_image_mode_wrap, {{selector}} .et_pb_main_blurb_image .et-pb-icon',
          important: true,
        },
        boxShadow: {
          selector:   '{{selector}} .et_pb_main_blurb_image .et_pb_image_wrap',
          useOverlay: true,
        },
        filter: {
          selector: '{{selector}} .et_pb_main_blurb_image',
        },
        border: {
          selector: '{{selector}} .et_pb_main_blurb_image .et_pb_only_image_mode_wrap, {{selector}} .et_pb_main_blurb_image .et-pb-icon',
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
      default: {
        meta: {
          adminLabel: {
            desktop: {
              value: 'Blurb',
            },
          },
        },
        advanced: {
          text: {
            text: {
              desktop: {
                value: {
                  orientation: 'left',
                  color:       'light',
                },
              },
            },
          },
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
      defaultPrintedStyle: {
        innerContent: {
          desktop: {
            value: {
              target: 'off',
            },
          },
        },
      },
      default: {
        decoration: {
          font: {
            font: {
              desktop: {
                value: {
                  headingLevel: 'h4',
                },
              },
            },
          },
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
              hover: '{{selector}}:hover .et_pb_module_header, {{selector}}:hover .et_pb_module_header a',
            },
          },
        },
      },
    },
    content: {
      type:        'object',
      selector:    '{{selector}}, {{selector}} .et_pb_blurb_description',
      elementType: 'content',
      attributes:  {
        class: 'et_pb_blurb_description',
      },
      settings: {
        innerContent: {},
        decoration:   {
          bodyFont: {},
        },
      },
      styleProps: {
        bodyFont: {
          selectors: {
            desktop: {
              value: '{{selector}}, {{selector}} .et_pb_blurb_description',
              hover: '{{selector}}:hover, {{selector}}:hover .et_pb_blurb_description',
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
                  name:  'divi/range',
                  props: {
                    max:          1100,
                    allowedUnits: [
                      '%',
                      'em',
                      'rem',
                      'px',
                      'cm',
                      'mm',
                      'in',
                      'pt',
                      'pc',
                      'ex',
                      'vh',
                      'vw',
                    ],
                  },
                },
              },
            },
          },
        },
      },
      defaultPrintedStyle: {
        decoration: {
          sizing: {
            desktop: {
              value: {
                maxWidth: '550px',
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
            groupLabel: 'Image & Icon',
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
            groupLabel: 'Sizing',
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
            groupLabel: 'Animation',
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
};

export {
  blurbModuleMetaData,
};
