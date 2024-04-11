import { type AccordionItemAttrs, type ModuleMetadata } from '@divi/types';

/**
 * Accordion Item Module Meta Data.
 *
 * Note: The module metadata will be used to generate `module.json` upon build.
 * Variable name must end with `ModuleMetaData` to be picked up by the build script.
 */
const accordionItemModuleMetaData: ModuleMetadata<AccordionItemAttrs> = {
  name:        'divi/accordion-item',
  d4Shortcode: 'et_pb_accordion_item',
  title:       'Accordion Item',
  titles:      'Accordion Items',
  moduleIcon:  'divi/module-accordion-item',
  category:    'child-module',
  videos:      [
    {
      id:   'OBbuKXTJyj8',
      name: 'An introduction to the Accordion module',
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
      default:  {
        advanced: {
          open: {
            desktop: {
              value: 'off',
            },
          },
        },
      },
      defaultPrintedStyle: {
        decoration: {
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
      styleProps: {
        background: {
          selector: '{{selector}}.et_pb_toggle',
        },
        border: {
          selector: '.et_pb_accordion .et_pb_module{{selector}}.et_pb_toggle',
        },
        boxShadow: {
          important: true,
        },
        spacing: {
          selector:  '{{selector}}.et_pb_toggle',
          important: true,
        },
      },
    },
    title: {
      type:       'object',
      selector:   '{{selector}} .et_pb_toggle_title',
      attributes: {
        class: 'et_pb_toggle_title',
      },
      defaultPrintedStyle: {
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
      inlineEditor:      'plainText',
      childrenSanitizer: 'et_core_esc_previously',
      styleProps:        {
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
    },
    closedToggleIcon: {
      type:     'object',
      selector: '{{selector}}.et_pb_toggle_close',
      default:  {
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
      defaultPrintedStyle: {
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
      styleProps: {
        icon: {
          selector:          '{{selector}}.et_pb_toggle_close .et_pb_toggle_title:before',
          propertySelectors: {
            desktop: {
              value: {
                'font-size': '{{selector}}.et_pb_toggle_close .et_pb_toggle_title:before, {{selector}}.et_pb_toggle_close .et_vb_toggle_overlay',
              },
            },
          },
          important: {
            desktop: {
              value: {
                'font-family': true,
                'font-size':   true,
                content:       true,
                'font-weight': true,
              },
            },
          },
        },
      },
    },
    openToggle: {
      type:     'object',
      selector: '{{selector}}.et_pb_toggle_open',
    },
    closedToggle: {
      type:     'object',
      selector: '{{selector}}.et_pb_toggle_close',
    },
    content: {
      type:        'object',
      selector:    '{{selector}}.et_pb_toggle .et_pb_toggle_content',
      elementType: 'content',
      attributes:  {
        class: 'et_pb_toggle_content clearfix',
      },
      styleProps: {
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
  },
  customCssFields: {
    openToggle: {
      subName:        'openToggle',
      selectorSuffix: ' .et_pb_toggle.et_pb_toggle_open',
    },
    toggleTitle: {
      subName:        'toggleTitle',
      selectorSuffix: ' .et_pb_toggle_title',
    },
    toggleIcon: {
      subName:        'toggleIcon',
      selectorSuffix: ' .et_pb_toggle_title:before',
    },
    toggleContent: {
      subName:        'toggleContent',
      selectorSuffix: ' .et_pb_toggle_content',
    },
  },
};

export {
  accordionItemModuleMetaData,
};
