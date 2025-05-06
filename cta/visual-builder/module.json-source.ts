import { type CtaAttrs, type Metadata } from '@divi/types';


/**
 * CTA Module Meta Data.
 *
 * Note: The module metadata will be used to generate `module.json` upon build.
 * Variable name must end with `ModuleMetaData` to be picked up by the build script.
 */
const ctaModuleMetaData: Metadata.Values<CtaAttrs> = {
  name:                 'divi/cta',
  d4Shortcode:          'et_pb_cta',
  moduleClassName:      'et_pb_promo',
  moduleOrderClassName: 'et_pb_cta',
  title:                'Call To Action',
  titles:               'Call To Actions',
  moduleIcon:           'divi/module-cta',
  category:             'module',
  videos:               [
    {
      id:   'gV-l14jA2hE',
      name: 'An introduction to the Call To Action module',
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
          animation:  {},
          background: {},
          border:     {},
          boxShadow:  {},
          conditions: {},
          disabledOn: {},
          filters:    {},
          overflow:   {},
          position:   {},
          scroll:     {},
          sizing:     {},
          spacing:    {},
          sticky:     {},
          transform:  {},
          transition: {},
          zIndex:     {},
        },
      },
      styleProps: {
        background: {
          selector: '{{selector}}.et_pb_promo',
        },
        border: {
          selector: '{{selector}}.et_pb_promo',
        },
        overflow: {
          selector: '{{selector}}.et_pb_promo',
        },
        spacing: {
          selector:  '{{selector}}.et_pb_promo',
          important: true,
        },
        sizing: {
          propertySelectors: {
            desktop: {
              value: {
                'margin-left':  '{{selector}}.et_pb_promo.et_pb_module',
                'margin-right': '{{selector}}.et_pb_promo.et_pb_module',
              },
            },
          },
          important: {
            desktop: {
              value: {
                'margin-left':  true,
                'margin-right': true,
              },
            },
          },
        },
      },
    },
    title: {
      type:     'object',
      label:    'Title',
      selector: '{{selector}} h2, {{selector}} h1.et_pb_module_header, {{selector}} h3.et_pb_module_header, {{selector}} h4.et_pb_module_header, {{selector}} h5.et_pb_module_header, {{selector}} h6.et_pb_module_header',
      settings: {
        innerContent: {},
        decoration:   {
          font: {},
        },
      },
      attributes: {
        class: 'et_pb_module_header',
      },
      tagName:           'h2',
      inlineEditor:      'plainText',
      elementType:       'heading',
      childrenSanitizer: 'et_core_esc_previously',
      styleProps:        {
        selector: '{{selector}}.et_pb_promo h2, {{selector}}.et_pb_promo h1.et_pb_module_header, {{selector}}.et_pb_promo h3.et_pb_module_header, {{selector}}.et_pb_promo h4.et_pb_module_header, {{selector}}.et_pb_promo h5.et_pb_module_header, {{selector}}.et_pb_promo h6.et_pb_module_header',
        font:     {
          important: true,
        },
      },
    },
    content: {
      type:        'object',
      label:       'Body',
      elementType: 'content',
      selector:    '{{selector}} .et_pb_promo_description .et_pb_promo_content',
      settings:    {
        innerContent: {
          groupType: 'group-item',
          item:      {
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
      attributes: {
        class: 'et_pb_promo_content',
      },
      styleProps: {
        selector: '{{selector}}.et_pb_promo .et_pb_promo_description div',
        bodyFont: {
          important: {
            body: {
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
    },
    button: {
      type:     'object',
      selector: 'body #page-container {{selector}} .et_pb_promo_button.et_pb_button',
      settings: {
        innerContent: {},
        decoration:   {
          background: {},
          border:     {},
          boxShadow:  {},
          button:     {},
          font:       {},
          spacing:    {},
        },
      },
      attributes: {
        class: 'et_pb_promo_button',
      },
      elementType:  'button',
      elementProps: {
        hasWrapper: true,
      },
      styleProps: {
        selector:  'body #page-container {{selector}}.et_pb_promo .et_pb_promo_button.et_pb_button',
        boxShadow: {
          propertySelectors: {
            desktop: {
              value: {
                'box-shadow': '{{selector}} .et_pb_button',
              },
            },
          },
        },
        button: {
          propertySelectors: {
            desktop: {
              value: {
                'text-align': '{{selector}}.et_pb_promo .et_pb_button_wrapper',
              },
            },
          },
        },
        font: {
          important: {
            font: {
              desktop: {
                value: {
                  color:         true,
                  'line-height': true,
                },
              },
            },
          },
        },
        spacing: {
          propertySelectors: {
            desktop: {
              value: {
                margin:  '{{selector}}.et_pb_promo  .et_pb_button_wrapper .et_pb_promo_button.et_pb_button',
                padding: '{{selector}}.et_pb_promo  .et_pb_button_wrapper .et_pb_promo_button.et_pb_button',
              },
            },
          },
          important: {
            desktop: {
              value: {
                margin:  true,
                padding: true,
              },
            },
          },
        },
      },
    },
  },
  customCssFields: {
    description: {
      label:          'Promo Description',
      subName:        'description',
      selectorSuffix: ' .et_pb_promo_description',
    },
    button: {
      label:          'Promo Button',
      subName:        'button',
      selectorSuffix: '.et_pb_promo .et_pb_button.et_pb_promo_button',
    },
    title: {
      label:          'Promo Title',
      subName:        'title',
      selectorSuffix: ' .et_pb_promo_description h2',
    },
  },
  settings: {
    content:  'auto',
    design:   'auto',
    advanced: 'auto',
  },
};

export {
  ctaModuleMetaData,
};
