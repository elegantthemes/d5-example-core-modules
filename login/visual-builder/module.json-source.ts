import { __ } from '@wordpress/i18n';

import { type LoginAttrs, type Metadata } from '@divi/types';

/**
 * Login Meta Data.
 *
 * Note: The module metadata will be used to generate `module.json` upon build.
 * Variable name must end with `ModuleMetaData` to be picked up by the build script.
 */
const loginModuleMetaData: Metadata.Values<LoginAttrs> = {
  name:                 'divi/login',
  moduleClassName:      'et_pb_login',
  moduleOrderClassName: 'et_pb_login',
  d4Shortcode:          'et_pb_login',
  title:                'Login',
  titles:               'Logins',
  moduleIcon:           'divi/module-login',
  category:             'module',
  childrenName:         [], // Supports any module type as child elements
  videos:               [
    {
      id:   'PffCGMlUSTA',
      name: 'An introduction to the Login module',
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
        background: {
          selector: '{{selector}}.et_pb_login',
        },
        spacing: {
          selector:  '{{selector}}.et_pb_login',
          important: true,
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
        },
        border: {
          selector: '{{selector}}.et_pb_login',
        },
        filter: {
          selector: '{{selector}}.et_pb_login',
        },
        position: {
          selector:  '{{selector}}.et_pb_login',
          important: true,
        },
      },
      settings: {
        meta: {
          adminLabel: {},
        },
        advanced: {
          elements:            {},
          link:                {},
          loop:                {},
          text:                {},
          currentPageRedirect: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'contentRedirect',
              priority:    5,
              render:      true,
              label:       __('Redirect To The Current Page', 'et_builder'),
              description: __('Here you can choose whether the user should be redirected back to the current page after logging in.', 'et_builder'),
              defaultAttr: {
                desktop: {
                  value: 'off',
                },
              },
              features: {
                responsive: false,
                hover:      false,
                sticky:     false,
                preset:     'content',
              },
              component: {
                type:  'field',
                name:  'divi/toggle',
                props: {
                  options: {
                    off: __('No', 'et_builder'),
                    on:  __('Yes', 'et_builder'),
                  },
                },
              },
            },
          },
        },
        decoration: {
          animation:    {},
          attributes:   {},
          background:   {},
          border:       {},
          boxShadow:    {},
          conditions:   {},
          disabledOn:   {},
          filters:      {},
          interactions: {},
          layout:       {},
          overflow:     {},
          order:        {},
          position:     {},
          scroll:       {},
          sizing:       {},
          spacing:      {},
          sticky:       {},
          transform:    {},
          transition:   {},
          zIndex:       {},
        },
      },
    },
    title: {
      type:                     'object',
      selector:                 '{{selector}}.et_pb_login h1.et_pb_module_header, {{selector}}.et_pb_login h2, {{selector}}.et_pb_login h3.et_pb_module_header, {{selector}}.et_pb_login h4.et_pb_module_header, {{selector}}.et_pb_login h5.et_pb_module_header, {{selector}}.et_pb_login h6.et_pb_module_header',
      supportsCustomAttributes: true,
      attributes:               {
        class: 'et_pb_module_header',
      },
      tagName:           'h2',
      inlineEditor:      'plainText',
      elementType:       'heading',
      childrenSanitizer: 'et_core_esc_previously',
      styleProps:        {
        font: {
          important: true,
        },
      },
      settings: {
        innerContent: {
          groupType: 'group-item',
          item:      {
            groupSlug:   'contentText',
            priority:    5,
            render:      true,
            label:       __('Title', 'et_builder'),
            description: __('Choose a title of your login box.', 'et_builder'),
            features:    {
              dynamicContent: {
                type: 'text',
              },
              sticky: false,
              preset: 'content',
            },
            component: {
              name: 'divi/text',
              type: 'field',
            },
          },
        },
        decoration: {
          font: {
            priority:  10,
            component: {
              props: {
                groupLabel: 'Title Text',
                fieldLabel: 'Title',
                fields:     {
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
    content: {
      type:                     'object',
      selector:                 '{{selector}}.et_pb_login .et_pb_newsletter_description_content, {{selector}}.et_pb_login p, {{selector}}.et_pb_login span',
      supportsCustomAttributes: true,
      elementType:              'content',
      attributes:               {
        class: 'et_pb_newsletter_description_content',
      },
      styleProps: {
        bodyFont: {
          propertySelectors: {
            body: {
              font: {
                desktop: {
                  value: {
                    'line-height':    '{{selector}}.et_pb_login p',
                    'font-family':    '{{selector}}.et_pb_login, {{selector}}.et_pb_login .et_pb_newsletter_description_content, {{selector}}.et_pb_login p, {{selector}}.et_pb_login span',
                    'font-weight':    '{{selector}}.et_pb_login, {{selector}}.et_pb_login .et_pb_newsletter_description_content, {{selector}}.et_pb_login p, {{selector}}.et_pb_login span',
                    'text-transform': '{{selector}}.et_pb_login .et_pb_newsletter_description_content, {{selector}}.et_pb_login p, {{selector}}.et_pb_login span',
                    'font-size':      '{{selector}}.et_pb_login',
                    color:            '{{selector}}.et_pb_login',
                    'text-align':     '{{selector}}.et_pb_login',
                    'letter-spacing': '{{selector}}.et_pb_login',
                  },
                },
              },
              textShadow: {
                desktop: {
                  value: {
                    'text-shadow': '{{selector}}.et_pb_login, {{selector}}.et_pb_login .et_pb_newsletter_description_content, {{selector}}.et_pb_login p, {{selector}}.et_pb_login span',
                  },
                },
              },
            },
          },
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
      settings: {
        innerContent: {
          groupType: 'group-item',
          item:      {
            groupSlug:   'contentText',
            priority:    10,
            render:      true,
            label:       __('Body', 'et_builder'),
            description: __('Input the main text content for your module here.', 'et_builder'),
            features:    {
              dynamicContent: { type: 'text' },
              sticky:         false,
              preset:         'content',
            },
            component: {
              name: 'divi/richtext',
              type: 'field',
            },
          },
        },
        decoration: {
          bodyFont: {
            priority:  21,
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
    field: {
      type:        'object',
      elementType: 'field',
      selector:    '{{selector}} input[type="password"], {{selector}} input[type="text"], {{selector}} textarea, {{selector}} input',
      attributes:  {
        class: 'input',
      },
      supportsCustomAttributes: true,
      settings:                 {
        decoration: {
          background: {},
          border:     {},
          boxShadow:  {},
          spacing:    {},
          font:       {},
        },
        advanced: {
          focusUseBorder: {
            groupType: 'group-item',
            item:      {
              priority:    100,
              render:      true,
              groupSlug:   'designFieldField',
              label:       __('Use Focus Borders', 'et_builder'),
              description: '',
              defaultAttr: {
                desktop: {
                  value: 'off',
                },
              },

              // Built-in component.
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
          focus: {},
        },
      },
    },
    button: {
      type:                     'object',
      selector:                 '{{selector}}.et_pb_login .et_pb_newsletter_button.et_pb_button',
      supportsCustomAttributes: true,
      elementType:              'button',
      tagName:                  'a',
      attributes:               {
        class: 'et_pb_newsletter_button',
      },
      elementProps: {
        allowEmptyUrl: true,
        type:          'link',
        hasWrapper:    false,
      },
      childrenSanitizer: 'et_core_esc_previously',
      styleProps:        {
        type: 'button',
        font: {
          important: {
            font: {
              desktop: {
                value: {
                  'font-size':             true,
                  'line-height':           true,
                  'text-decoration-color': true,
                  'text-decoration-line':  true,
                  'text-decoration-style': true,
                },
              },
            },
          },
        },
        spacing: {
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
      settings: {
        innerContent: {
          groupType: 'into-multiple-groups',
          groups:    {
            text: {
              groupType: 'group-item',
              item:      {
                priority:    9,
                groupSlug:   'contentText',
                render:      true,
                attrName:    'button.innerContent',
                subName:     'text',
                label:       __('Button', 'et_builder'),
                description: __('Define the text which will be displayed on the login button.', 'et_builder'),
                features:    {
                  dynamicContent: {
                    type: 'text',
                  },
                  sticky: false,
                  preset: 'content',
                },
                component: {
                  name: 'divi/text',
                  type: 'field',
                },
              },
            },
            link: {
              groupType: 'group-item',
              item:      {
                groupSlug: 'contentText',
                render:    false,
              },
            },
          },
        },
        decoration: {
          button: {
            component: {
              props: {
                fields: {
                  alignment: {
                    render: false,
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
                },
              },
            },
          },
        },
      },
    },
  },
  customCssFields: {
    newsletterTitle: {
      label:          __('Login Title', 'et_builder'),
      subName:        'newsletterTitle',
      selectorSuffix: '.et_pb_login h2',
    },
    newsletterDescription: {
      label:          __('Login Description', 'et_builder'),
      subName:        'newsletterDescription',
      selectorSuffix: ' .et_pb_newsletter_description',
    },
    newsletterForm: {
      label:          __('Login Form', 'et_builder'),
      subName:        'newsletterForm',
      selectorSuffix: ' .et_pb_newsletter_form',
    },
    newsletterFields: {
      label:          __('Login Fields', 'et_builder'),
      subName:        'newsletterFields',
      selectorSuffix: ' .et_pb_newsletter_form input',
    },
    newsletterButton: {
      label:          __('Login Button', 'et_builder'),
      subName:        'newsletterButton',
      selectorSuffix: '.et_pb_login .et_pb_login_form .et_pb_newsletter_button.et_pb_button',
    },
  },
  settings: {
    content:  'auto',
    advanced: 'auto',

    groups: {
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

      // Content > Redirect.
      contentRedirect: {
        panel:         'content',
        priority:      15,
        groupName:     'redirect',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel: 'Redirect',
          },
        },
      },

      // Design > Fields.
      designFieldField: {
        panel:         'design',
        priority:      10,
        groupName:     'field',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel:        'Fields',
            clipboardCategory: 'style',
          },
        },
      },

    },
  },
};

export {
  loginModuleMetaData,
};
