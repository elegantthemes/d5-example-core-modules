import { type ButtonAttrs, type Metadata } from '@divi/types';

/**
 * Button Module Meta Data.
 *
 * Note: The module metadata will be used to generate `module.json` upon build.
 * Variable name must end with `ModuleMetaData` to be picked up by the build script.
 */
const buttonModuleMetaData: Metadata.Values<ButtonAttrs> = {
  name:                 'divi/button',
  d4Shortcode:          'et_pb_button',
  moduleClassName:      'et_pb_button',
  moduleOrderClassName: 'et_pb_button',
  title:                'Button',
  titles:               'Buttons',
  moduleIcon:           'divi/module-button',
  category:             'module',
  videos:               [
    {
      id:   'XpM2G7tQQIE',
      name: 'An introduction to the Button module',
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
          selector:          '{{wrapperSelector}}',
          propertySelectors: {
            desktop: {
              value: {
                padding: '{{wrapperSelector}} {{baseSelector}}',
              },
            },
          },
          important: true,
        },
        transform: {
          selector: '{{wrapperSelector}} a',
        },
        position: {
          selector: '{{wrapperSelector}}',
        },
      },
      settings: {
        meta: {
          adminLabel: {},
        },
        advanced: {
          htmlAttributes: {},
          text:           {
            component: {
              props: {
                fields: {
                  orientation: {
                    render: false,
                  },
                  textShadowGroup: {
                    render: false,
                  },
                },
              },
            },
          },
          alignment: {
            groupType: 'group-item',
            item:      {
              groupSlug:       'designAlignment',
              priority:        5,
              render:          true,
              attrName:        'module.advanced.alignment',
              label:           'Button Alignment',
              description:     'Here you can define the alignment of Button.',
              multipleChoices: false,
              features:        {
                hover:  false,
                sticky: false,
                preset: ['html'],
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
          animation:  {},
          boxShadow:  {},
          conditions: {},
          disabledOn: {},
          filters:    {},
          overflow:   {},
          position:   {},
          scroll:     {},
          spacing:    {},
          sticky:     {},
          transform:  {},
          transition: {},
          zIndex:     {},
        },
      },
    },
    button: {
      type:                   'object',
      customPostTypeSelector: 'body.et-db #page-container #et-boc .et-l {{baseSelector}}',
      selector:               'body #page-container .et_pb_section {{baseSelector}}',
      elementType:            'button',
      styleProps:             {
        font: {
          important: {
            font: {
              desktop: {
                value: {
                  color:            true,
                  'font-size':      true,
                  'letter-spacing': true,
                  'line-height':    true,
                },
              },
            },
          },
        },
        spacing: {
          important: true,
        },
      },
      settings: {
        innerContent: {},
        decoration:   {
          background: {},
          border:     {},
          boxShadow:  {},
          button:     {
            component: {
              props: {
                fields: {
                  alignment: {
                    render: false,
                  },
                  boxShadowGroup: {
                    render: false,
                  },
                  buttonIconGroup: {
                    component: {
                      props: {
                        fields: {
                          placement: {
                            features: {
                              hover: false,
                            },
                          },
                          onHover: {
                            features: {
                              hover: false,
                            },
                          },
                        },
                      },
                    },
                  },
                  fontGroup: {
                    component: {
                      props: {
                        fields: {
                          lineHeight: {
                            render: true,
                          },
                          textAlign: {
                            render: false,
                          },
                        },
                      },
                    },
                  },
                  spacingGroup: {
                    render: false,
                  },
                },
              },
            },
          },
          font:    {},
          spacing: {
            component: {
              props: {
                fields: {
                  margin: {
                    render: false,
                  },
                  padding: {
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
  customCssFields: {},
  settings:        {
    content:  'auto',
    design:   'auto',
    advanced: 'auto',

    groups: {
      // Content > Link.
      contentLink: {
        panel:     'content',
        priority:  20,
        groupName: 'link',
        component: {
          name:  'divi/composite',
          props: {
            groupLabel: 'Link',
            preset:     'content',
          },
        },
      },

      // Content > Text.
      contentText: {
        panel:         'content',
        priority:      10,
        groupName:     'text',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel: 'Text',
          },
        },
      },

      // Design > Alignment.
      designAlignment: {
        panel:         'design',
        priority:      5,
        groupName:     'alignment',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel:        'Alignment',
            clipboardCategory: 'style',
          },
        },
      },
    },
  },
  wrapper: {
    status: true,
    tag:    'div',
  },
};

export {
  buttonModuleMetaData,
};
