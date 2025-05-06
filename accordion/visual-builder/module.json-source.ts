import { type AccordionAttrs, type Metadata } from '@divi/types';

/**
 * Accordion Module Meta Data.
 *
 * Note: The module metadata will be used to generate `module.json` upon build.
 * Variable name must end with `ModuleMetaData` to be picked up by the build script.
 */
const accordionModuleMetaData: Metadata.Values<AccordionAttrs> = {
  name:             'divi/accordion',
  d4Shortcode:      'et_pb_accordion',
  title:            'Accordion',
  titles:           'Accordions',
  moduleIcon:       'divi/module-accordion',
  childModuleName:  'divi/accordion-item',
  childModuleTitle: 'Accordion Item',
  category:         'module',
  childrenName:     ['divi/accordion-item'],
  videos:           [
    {
      id:   'k8-bjvI850I',
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
      type:       'object',
      selector:   '{{selector}}',
      styleProps: {
        border: {
          selector: '{{selector}}.et_pb_accordion .et_pb_accordion_item',
        },
        boxShadow: {
          selector: '{{selector}} .et_pb_toggle',
        },
        spacing: {
          propertySelectors: {
            desktop: {
              value: {
                padding: '{{selector}}.et_pb_accordion .et_pb_toggle_content',
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
      },
      settings: {
        meta: {
          adminLabel: {},
        },
        advanced: {
          link:           {},
          htmlAttributes: {},
          text:           {
            priority:  15,
            component: {
              props: {
                fields: {
                  color: {
                    render: false,
                  },
                  textShadowGroup: {
                    render: true,
                  },
                  orientation: {
                    render: true,
                  },
                },
              },
            },
          },
        },
        decoration: {
          animation:  {},
          background: {},
          conditions: {},
          disabledOn: {},
          filters:    {},
          border:     {},
          boxShadow:  {},
          overflow:   {},
          position:   {},
          scroll:     {
            groupType: 'group-item',
            item:      {
              priority:  20,
              render:    true,
              groupSlug: 'advancedScrollModule',
              component: {
                type: 'group',
                name: 'divi/scroll',

                props: {
                  grouped: false,
                  fields:  {
                    gridMotion: {
                      render: true,
                    },
                  },
                },
              },
            },
          },
          sizing:     {},
          spacing:    {},
          sticky:     {},
          transform:  {},
          transition: {},
          zIndex:     {},
        },
      },
    },
    title: {
      type:     'object',
      selector: '{{selector}} h1.et_pb_toggle_title, {{selector}} h2.et_pb_toggle_title, {{selector}} h3.et_pb_toggle_title, {{selector}} h4.et_pb_toggle_title, {{selector}} h5.et_pb_toggle_title, {{selector}} h6.et_pb_toggle_title',
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
                    color: {
                      render:   true,
                      priority: 5,
                    },
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
    closedToggleIcon: {
      type:       'object',
      selector:   '{{selector}} .et_pb_toggle_close',
      styleProps: {
        icon: {
          selector:  '{{selector}} .et_pb_toggle_title:before',
          important: {
            desktop: {
              value: {
                'font-family': true,
                content:       true,
                'font-weight': true,
              },
            },
          },
        },
      },
      settings: {
        decoration: {
          icon: {
            groupType: 'group-items',
            items:     {
              contentIcon: {
                groupSlug: 'contentToggleIcon',
                attrName:  'closedToggleIcon.decoration.icon',
                priority:  10,
                render:    true,

                // Built-in group component
                component: {
                  type: 'group',
                  name: 'divi/icon',

                  props: {
                    grouped:    false,
                    groupLabel: 'Toggle Icon',

                    fields: {
                      icon: {
                        render: true,
                      },
                      color: {
                        render: false,
                      },
                      useSize: {
                        render: false,
                      },
                      size: {
                        render: false,
                      },
                    },
                  },
                },
              },
              designIcon: {
                groupSlug: 'designToggleIcon',
                attrName:  'closedToggleIcon.decoration.icon',
                priority:  10,
                render:    true,

                // Built-in group component
                component: {
                  type: 'group',
                  name: 'divi/icon',

                  props: {
                    grouped:    false,
                    fieldLabel: 'Icon',

                    fields: {
                      icon: {
                        render: false,
                      },
                      color: {
                        render: true,
                      },
                      useSize: {
                        render: true,
                      },
                      size: {
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
    },
    content: {
      type:     'object',
      selector: '{{selector}}.et_pb_accordion .et_pb_toggle_content',
      settings: {
        decoration: {
          bodyFont: {
            priority: 30,

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
        },
      },
    },
    openToggle: {
      type:       'object',
      selector:   '{{selector}} .et_pb_toggle_open',
      styleProps: {
        font: {
          selector: '{{selector}}.et_pb_accordion .et_pb_toggle_open .et_pb_toggle_title',
        },
      },
      settings: {
        decoration: {
          background: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designToggle',
              attrName:    'openToggle.decoration.background',
              subName:     'color',
              label:       'Open Toggle Background Color',
              description: 'You can pick unique background colors for toggles when they are in their open and closed states. Choose the open state background color here.',
              priority:    10,
              render:      true,

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
          font: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designTitleText',
              attrName:    'openToggle.decoration.font.font',
              subName:     'color',
              label:       'Open Title Text Color',
              description: 'You can pick unique text colors for toggle titles when they are open and closed. Choose the open state title color here.',
              priority:    5,
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
    closedToggle: {
      type:       'object',
      selector:   '{{selector}} .et_pb_toggle_close',
      styleProps: {
        font: {
          selector: '{{selector}} .et_pb_toggle_close h1.et_pb_toggle_title,{{selector}} .et_pb_toggle_close h2.et_pb_toggle_title,{{selector}} .et_pb_toggle_close h3.et_pb_toggle_title,{{selector}} .et_pb_toggle_close h4.et_pb_toggle_title,{{selector}} .et_pb_toggle_close h5.et_pb_toggle_title,{{selector}} .et_pb_toggle_close h6.et_pb_toggle_title',
        },
      },
      settings: {
        decoration: {
          background: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designToggle',
              attrName:    'closedToggle.decoration.background',
              subName:     'color',
              label:       'Closed Toggle Background Color',
              description: 'You can pick unique background colors for toggles when they are in their open and closed states. Choose the closed state background color here.',
              priority:    10,
              render:      true,

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
          font: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designClosedTitleText',
              attrName:  'closedToggle.decoration.font',
              priority:  10,
              render:    true,

              // Built-in component
              component: {
                type: 'group',
                name: 'divi/font',

                props: {
                  grouped:    false,
                  groupLabel: 'Closed Title Text',
                  fieldLabel: 'Closed Title',

                  fields: {
                    color: {
                      priority: 5,
                      render:   true,
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
  customCssFields: {
    toggle: {
      label:          'Toggle',
      subName:        'toggle',
      selectorSuffix: ' .et_pb_toggle',
    },
    openToggle: {
      label:          'Open Toggle',
      subName:        'openToggle',
      selectorSuffix: ' .et_pb_toggle_open',
    },
    toggleTitle: {
      label:          'Toggle Title',
      subName:        'toggleTitle',
      selectorSuffix: ' .et_pb_toggle_title',
    },
    toggleIcon: {
      label:          'Toggle Icon',
      subName:        'toggleIcon',
      selectorSuffix: ' .et_pb_toggle_title:before',
    },
    toggleContent: {
      label:          'Toggle Content',
      subName:        'toggleContent',
      selectorSuffix: ' .et_pb_toggle_content',
    },
  },
  settings: {
    content:  'auto',
    design:   'auto',
    advanced: 'auto',

    groups: {
      // Content > Toggle Icon
      contentToggleIcon: {
        panel:     'content',
        priority:  10,
        groupName: 'contentToggleIcon',

        component: {
          name:  'divi/composite',
          props: {
            groupLabel: 'Toggle Icon',
          },
        },
      },

      // Design > Icon
      designToggleIcon: {
        panel:     'design',
        priority:  5,
        groupName: 'designToggleIcon',

        component: {
          name:  'divi/composite',
          props: {
            groupLabel: 'Icon',
          },
        },
      },

      // Design > Toggle
      designToggle: {
        panel:     'design',
        priority:  10,
        groupName: 'designToggle',

        component: {
          name:  'divi/composite',
          props: {
            groupLabel: 'Toggle',
          },
        },
      },

      // Design > Title Text
      designTitleText: {
        panel:     'design',
        priority:  20,
        groupName: 'designTitleText',

        component: {
          name:  'divi/composite',
          props: {
            groupLabel:  'Title Text',
            presetGroup: 'divi/font',
          },
        },
      },

      // Design > Closed Title Text
      designClosedTitleText: {
        panel:     'design',
        priority:  30,
        groupName: 'designClosedTitleText',

        component: {
          name:  'divi/composite',
          props: {
            groupLabel:  'Closed Title Text',
            presetGroup: 'divi/font',
          },
        },
      },
    },
  },
  mousetrap: {
    inner: {

      // Default mousetrap only appears in space between accordion item. This is enabled so `InnerMousetrap` can be
      // rendered in child module (accordion item) for accordion.
      edited: true,
    },
  },
};

export {
  accordionModuleMetaData,
};
