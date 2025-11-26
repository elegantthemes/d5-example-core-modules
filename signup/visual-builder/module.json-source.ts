import {
  type Metadata,
  type SignupAttrs,
} from '@divi/types';

/**
 * Email Optin Module Meta Data.
 *
 * Note: The module metadata will be used to generate `module.json` upon build.
 * Variable name must end with `ModuleMetaData` to be picked up by the build script.
 */
const signupModuleMetaData: Metadata.Values<SignupAttrs> = {
  name:                      'divi/signup',
  d4Shortcode:               'et_pb_signup',
  moduleClassName:           'et_pb_signup',
  moduleOrderClassName:      'et_pb_signup',
  title:                     'Email Optin',
  titles:                    'Email Optins',
  moduleIcon:                'divi/module-signup',
  category:                  'module',
  childModuleName:           'divi/signup-custom-field',
  childModuleTitle:          'Field',
  childModuleTitleAttribute: 'fieldItem',
  childrenName:              [], // Supports any module type as child elements
  videos:                    [
    {
      id:   'mXL1_M-Z4p8',
      name: 'An introduction to the Email Optin module',
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
      type:        'object',
      selector:    '{{selector}}',
      elementType: 'element',
      settings:    {
        meta: {
          adminLabel: {},
        },
        advanced: {
          elements: {},
          link:     {},
          loop:     {},
          text:     {},
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
          layout:       {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designLayout',
              priority:  20,
              render:    true,
              component: {
                type:  'group',
                name:  'divi/layout',
                props: {
                  grouped: false,
                },
              },
            },
          },
          overflow:   {},
          order:      {},
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
        spacing: {
          important: true,
        },
      },
    },
    title: {
      type:                     'object',
      label:                    'Title',
      selector:                 '{{selector}} h2, {{selector}} h1.et_pb_module_header, {{selector}} h3.et_pb_module_header, {{selector}} h4.et_pb_module_header, {{selector}} h5.et_pb_module_header, {{selector}} h6.et_pb_module_header',
      supportsCustomAttributes: true,
      elementType:              'heading',
      attributes:               {
        class: 'et_pb_module_header',
      },
      tagName:           'h2',
      inlineEditor:      'plainText',
      childrenSanitizer: 'et_core_esc_previously',
      styleProps:        {
        selector: '{{selector}}.et_pb_subscribe .et_pb_newsletter_description h2, {{selector}}.et_pb_subscribe .et_pb_newsletter_description h1.et_pb_module_header, {{selector}}.et_pb_subscribe .et_pb_newsletter_description h3.et_pb_module_header, {{selector}}.et_pb_subscribe .et_pb_newsletter_description h4.et_pb_module_header, {{selector}}.et_pb_subscribe .et_pb_newsletter_description h5.et_pb_module_header, {{selector}}.et_pb_subscribe .et_pb_newsletter_description h6.et_pb_module_header',
        font:     {
          important: true,
        },
      },
      settings: {
        innerContent: {},
        decoration:   {
          font: {},
        },
      },
    },
    content: {
      type:                     'object',
      label:                    'Description',
      selector:                 '{{selector}} .et_pb_newsletter_description div',
      supportsCustomAttributes: true,
      elementType:              'content',
      attributes:               {
        class: 'et_pb_newsletter_description_content',
      },
      tagName:           'div',
      inlineEditor:      'richText',
      childrenSanitizer: 'et_core_esc_previously',
      styleProps:        {
        selector: '{{selector}}.et_pb_subscribe .et_pb_newsletter_description_content, {{selector}}.et_pb_subscribe .et_pb_newsletter_footer',
        bodyFont: {
          important: {
            body: {
              font: {
                desktop: {
                  value: {
                    'font-size': true,
                  },
                },
              },
            },
          },
          propertySelectors: {
            body: {
              font: {
                desktop: {
                  value: {
                    'line-height': '{{selector}}.et_pb_subscribe p',
                    'text-align':  '{{selector}}.et_pb_subscribe p',
                  },
                },
              },
            },
            link: {
              font: {
                desktop: {
                  value: {
                    'font-family': '{{selector}}.et_pb_subscribe .et_pb_newsletter_description a',
                    'font-size':   '{{selector}}.et_pb_subscribe .et_pb_newsletter_description a',
                    color:         '{{selector}}.et_pb_subscribe .et_pb_newsletter_description a',
                  },
                },
              },
            },
            ul: {
              list: {
                desktop: {
                  value: {
                    'padding-left': '{{selector}}.et_pb_subscribe .et_pb_newsletter_description ul',
                  },
                },
              },
            },
            ol: {
              list: {
                desktop: {
                  value: {
                    'padding-left': '{{selector}}.et_pb_subscribe .et_pb_newsletter_description ol',
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
            priority:    30,
            groupSlug:   'contentText',
            render:      true,
            attrName:    'content.innerContent',
            label:       'Body',
            description: 'This content will appear below the title.',
            features:    {
              dynamicContent: {
                type: 'text',
              },
              sticky: false,
              preset: 'content',
            },
            component: {
              name: 'divi/richtext',
              type: 'field',
            },
          },
        },
        decoration: {
          bodyFont: {},
        },
      },
    },
    resultMessage: {
      type:        'object',
      selector:    '',
      elementType: 'element',
      styleProps:  {
        selector: '{{selector}}.et_pb_subscribe .et_pb_newsletter_form .et_pb_newsletter_result h2',
      },
      settings: {
        decoration: {
          font: {
            groupType: 'group',
            priority:  40,
            component: {
              props: {
                groupLabel: 'Result Message Text',
                fieldLabel: 'Result Message',
              },
            },
          },
        },
      },
    },
    formField: {
      type:        'object',
      selector:    '',
      elementType: 'element',
      styleProps:  {
        selectors: {
          desktop: {
            value: '{{selector}}.et_pb_contact_field .et_pb_contact_field_options_title, {{selector}}.et_pb_subscribe .et_pb_newsletter_form .input, {{selector}}.et_pb_subscribe .et_pb_newsletter_form .input::-webkit-input-placeholder, {{selector}}.et_pb_subscribe .et_pb_newsletter_form .input::-moz-placeholder, {{selector}}.et_pb_subscribe .et_pb_newsletter_form .input:-ms-input-placeholder, {{selector}}.et_pb_subscribe .et_pb_newsletter_form .input[type=checkbox] + label, {{selector}}.et_pb_subscribe .et_pb_newsletter_form .input[type=radio] + label',
            hover: '{{selector}}.et_pb_contact_field .et_pb_contact_field_options_title:hover, {{selector}}.et_pb_subscribe .et_pb_newsletter_form .input:hover, {{selector}}.et_pb_subscribe .et_pb_newsletter_form .input:hover::-webkit-input-placeholder, {{selector}}.et_pb_subscribe .et_pb_newsletter_form .input:hover::-moz-placeholder, {{selector}}.et_pb_subscribe .et_pb_newsletter_form .input:hover:-ms-input-placeholder, {{selector}}.et_pb_subscribe .et_pb_newsletter_form .input[type=checkbox] + label:hover, {{selector}}.et_pb_subscribe .et_pb_newsletter_form .input[type=radio] + label:hover',
          },
        },
        selector: '{{selector}} .et_pb_newsletter_form p .input',
      },
    },
    button: {
      type:                     'object',
      selector:                 '{{selector}}.et_pb_subscribe .et_pb_newsletter_button.et_pb_button',
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
        selector:  '{{selector}}.et_pb_subscribe .et_pb_newsletter_button.et_pb_button',
        boxShadow: {
          propertySelectors: {
            desktop: {
              value: {
                'box-shadow': '{{selector}} .et_pb_newsletter_button',
              },
            },
          },
          selector: '{{selector}} .et_pb_newsletter_button',
        },
        spacing: {
          important: true,
        },
      },
      settings: {
        innerContent: {
          groupType: 'into-multiple-groups',
          groups:    {
            text: {
              groupType: 'group-item',
              item:      {
                priority:    20,
                groupSlug:   'contentText',
                render:      true,
                attrName:    'button.innerContent',
                subName:     'text',
                label:       'Button',
                description: 'Define the text which will be displayed on "Read More" button. leave blank for default ( Read More )',
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
                },
              },
            },
          },
          font:    {},
          spacing: {},
        },
      },
    },
    field: {
      type:                     'object',
      selector:                 '{{selector}} .input',
      supportsCustomAttributes: true,
      elementType:              'field',
      attributes:               {
        class: 'input',
      },
      styleProps: {
        border: {
          propertySelectors: {
            desktop: {
              value: {
                'border-radius': '{{selector}} .et_pb_newsletter_form p input[type="text"], {{selector}} .et_pb_newsletter_form p textarea, {{selector}} .et_pb_newsletter_form p select, {{selector}} .et_pb_newsletter_form p .input[type="radio"] + label i, {{selector}} .et_pb_newsletter_form p .input[type="checkbox"] + label i',
                'border-style':  '{{selector}} .et_pb_newsletter_form p input[type="text"], {{selector}} .et_pb_newsletter_form p textarea, {{selector}} .et_pb_newsletter_form p select, {{selector}} .et_pb_newsletter_form p .input[type="radio"] + label i, {{selector}} .et_pb_newsletter_form p .input[type="checkbox"] + label i',
              },
            },
          },
        },
        boxShadow: {
          selector: '{{selector}} .et_pb_newsletter_form .input',
        },
      },
      settings: {
        advanced: {
          focusUseBorder: {
            groupType: 'group-item',
            item:      {
              priority:    100,
              render:      true,
              groupSlug:   'designFieldField',
              attrName:    'field.advanced.focusUseBorder',
              label:       'Use Focus Borders',
              description: 'Enabling this option will add borders to input fields when focused.',

              // Built-in component.
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
          focus: {
            groupType: 'group-items',
            items:     {
              focusBorderGroup: {
                render:    true,
                groupSlug: 'designFieldField',
              },
              focusFont: {
                priority:  40,
                render:    true,
                groupSlug: 'designFieldField',

                // Built-in component.
                component: {
                  props: {
                    fields: {
                      letterSpacing: {
                        render: false,
                      },
                      lineHeight: {
                        render: false,
                      },
                      size: {
                        render: false,
                      },
                    },
                  },
                },
              },
            },
          },
          nameFieldOnly: {
            groupType: 'group-item',
            item:      {
              priority:    20,
              groupSlug:   'contentFields',
              render:      true,
              attrName:    'field.advanced.nameFieldOnly',
              label:       'Name',
              description: 'Whether or not the Name field should be included in the opt-in form.',
              features:    {
                responsive: false,
                sticky:     false,
                hover:      false,
                preset:     'content',
              },
              component: {
                name: 'divi/toggle',
                type: 'field',
              },
            },
          },
          nameField: {
            groupType: 'group-item',
            item:      {
              priority:    20,
              groupSlug:   'contentFields',
              render:      true,
              attrName:    'field.advanced.nameField',
              label:       'Use Single Name Field',
              description: 'Whether or not to use a single Name field in the opt-in form.',
              features:    {
                responsive: false,
                sticky:     false,
                hover:      false,
                preset:     'content',
              },
              component: {
                name: 'divi/toggle',
                type: 'field',
              },
            },
          },
          firstNameField: {
            groupType: 'group-item',
            item:      {
              priority:    20,
              groupSlug:   'contentFields',
              render:      true,
              attrName:    'field.advanced.firstNameField',
              label:       'Show First Name Field',
              description: 'Whether or not the First Name field should be included in the opt-in form.',
              features:    {
                responsive: false,
                sticky:     false,
                hover:      false,
                preset:     'content',
              },
              component: {
                name: 'divi/toggle',
                type: 'field',
              },
            },
          },
          lastNameField: {
            groupType: 'group-item',
            item:      {
              priority:    20,
              groupSlug:   'contentFields',
              render:      true,
              attrName:    'field.advanced.lastNameField',
              label:       'Show Last Name Field',
              description: 'Whether or not the Last Name field should be included in the opt-in form.',
              features:    {
                responsive: false,
                sticky:     false,
                hover:      false,
                preset:     'content',
              },
              component: {
                name: 'divi/toggle',
                type: 'field',
              },
            },
          },
          nameFullwidth: {
            groupType: 'group-item',
            item:      {
              priority:    20,
              groupSlug:   'designLayout',
              render:      true,
              attrName:    'field.advanced.nameFullwidth',
              label:       'Name Fullwidth',
              description: 'Enabling this will extend the input field to 100% of the width of the module.',
              features:    {
                sticky: false,
                hover:  false,
                preset: ['html'],
              },
              component: {
                name: 'divi/toggle',
                type: 'field',
              },
            },
          },
          firstNameFullwidth: {
            groupType: 'group-item',
            item:      {
              priority:    20,
              groupSlug:   'designLayout',
              render:      true,
              attrName:    'field.advanced.firstNameFullwidth',
              label:       'First Name Fullwidth',
              description: 'Enabling this will extend the input field to 100% of the width of the module.',
              features:    {
                sticky: false,
                hover:  false,
                preset: ['html'],
              },
              component: {
                name: 'divi/toggle',
                type: 'field',
              },
            },
          },
          lastNameFullwidth: {
            groupType: 'group-item',
            item:      {
              priority:    20,
              groupSlug:   'designLayout',
              render:      true,
              attrName:    'field.advanced.lastNameFullwidth',
              label:       'Last Name Fullwidth',
              description: 'Enabling this will extend the input field to 100% of the width of the module.',
              features:    {
                sticky: false,
                hover:  false,
                preset: ['html'],
              },
              component: {
                name: 'divi/toggle',
                type: 'field',
              },
            },
          },
          emailFullwidth: {
            groupType: 'group-item',
            item:      {
              priority:    20,
              groupSlug:   'designLayout',
              render:      true,
              attrName:    'field.advanced.emailFullwidth',
              label:       'Email Fullwidth',
              description: 'Enabling this will extend the input field to 100% of the width of the module.',
              features:    {
                sticky: false,
                hover:  false,
                preset: ['html'],
              },
              component: {
                name: 'divi/toggle',
                type: 'field',
              },
            },
          },
          ipAddress: {
            groupType: 'group-item',
            item:      {
              priority:    20,
              groupSlug:   'advancedPrivacy',
              render:      true,
              attrName:    'field.advanced.ipAddress',
              label:       'Include IP Address',
              description: 'Include the subscriber\'s ip address in the data sent to your email provider.',
              features:    {
                responsive: false,
                sticky:     false,
                hover:      false,
                preset:     ['html'],
              },
              component: {
                name: 'divi/toggle',
                type: 'field',
              },
            },
          },

        },
        decoration: {
          background: {},
          border:     {},
          boxShadow:  {},
          spacing:    {},
          font:       {},
        },
      },
    },
    footerContent: {
      type:                     'object',
      label:                    'Footer',
      selector:                 '{{selector}} .et_pb_newsletter_footer',
      supportsCustomAttributes: true,
      attributes:               {
        class: 'et_pb_newsletter_footer',
      },
      elementType:       'content',
      tagName:           'div',
      inlineEditor:      'richText',
      childrenSanitizer: 'et_core_esc_previously',
      settings:          {
        innerContent: {
          groupType: 'group-item',
          item:      {
            priority:    30,
            groupSlug:   'contentText',
            render:      true,
            attrName:    'footerContent.innerContent',
            label:       'Footer',
            description: 'This content will appear below the subscribe button.',
            features:    {
              dynamicContent: {
                type: 'text',
              },
              sticky: false,
              preset: 'content',
            },
            component: {
              name: 'divi/richtext',
              type: 'field',
            },
          },
        },
      },
    },
    customFields: {
      type:     'object',
      settings: {
        advanced: {
          enable: {
            groupType: 'group-item',
            item:      {
              priority:    20,
              groupSlug:   'contentFields',
              render:      true,
              attrName:    'customFields.advanced.enable',
              label:       'Use Custom Fields',
              description: 'Enable this option to use custom fields in your opt-in form. Learn more <a href="https://www.elegantthemes.com/documentation/divi/modules/adding-custom-fields-to-the-divi-email-optin-module">here</a>',
              features:    {
                responsive: false,
                sticky:     false,
                hover:      false,
                preset:     'content',
              },
              component: {
                name: 'divi/toggle',
                type: 'field',
              },
            },
          },
          fields: {
            groupType: 'group-item',
            item:      {
              priority:  20,
              groupSlug: 'contentFields',
              render:    true,
              attrName:  '', // This one is not an attribute. So, we don't need to set it.
              features:  {
                responsive: false,
                sticky:     false,
                hover:      false,
                preset:     'content',
              },
              component: {
                name: 'divi/draggable-list',
                type: 'field',
              },
            },
          },
          notice: {
            groupType: 'group-item',
            item:      {
              priority:  20,
              groupSlug: 'contentFields',
              attrName:  '',
              label:     '',
              render:    true,
              features:  {
                responsive: false,
                sticky:     false,
                hover:      false,
                preset:     'content',
              },
              component: {
                name:  'divi/warning',
                type:  'field',
                props: {
                  message: 'You have not defined any custom fields in your email provider account. Once you have defined some fields, click the "Fetch Lists" button in the Email Account toggle above. Learn more <a href="https://www.elegantthemes.com/documentation/divi/modules/adding-custom-fields-to-the-divi-email-optin-module">here</a>',
                },
              },
            },
          },
        },
      },
    },
    success: {
      type:     'object',
      settings: {
        advanced: {
          action: {
            groupType: 'group-item',
            item:      {
              priority:    20,
              groupSlug:   'contentSuccessAction',
              render:      true,
              attrName:    'success.advanced.action',
              label:       'Action',
              description: 'Choose what happens when a site visitor has been successfully subscribed to your list.',
              features:    {
                responsive: false,
                sticky:     false,
                hover:      false,
                preset:     'content',
              },
              component: {
                name:  'divi/select',
                type:  'field',
                props: {
                  options: {
                    message: {
                      label: 'Display a message.',
                    },
                    redirect: {
                      label: 'Redirect to a custom URL.',
                    },
                  },
                },
              },
            },
          },
          message: {
            groupType: 'group-item',
            item:      {
              priority:    20,
              groupSlug:   'contentSuccessAction',
              render:      true,
              attrName:    'success.advanced.message',
              label:       'Message',
              description: 'The message that will be shown to site visitors who subscribe to your list.',
              features:    {
                responsive:     false,
                sticky:         false,
                hover:          false,
                preset:         'content',
                dynamicContent: {
                  type: 'text',
                },
              },
              component: {
                name: 'divi/text',
                type: 'field',
              },
            },
          },
          redirectUrl: {
            groupType: 'group-item',
            item:      {
              priority:    20,
              groupSlug:   'contentSuccessAction',
              render:      true,
              attrName:    'success.advanced.redirectUrl',
              label:       'Redirect URL',
              description: 'Site visitors who subscribe to your list will be redirected to this URL.',
              features:    {
                responsive:     false,
                sticky:         false,
                hover:          false,
                preset:         'content',
                dynamicContent: {
                  type: 'url',
                },
              },
              component: {
                name: 'divi/text',
                type: 'field',
              },
            },
          },
          redirectQuery: {
            groupType: 'group-item',
            item:      {
              priority:    20,
              groupSlug:   'contentSuccessAction',
              render:      true,
              attrName:    'success.advanced.redirectQuery',
              label:       'Redirect URL Query',
              description: 'Choose what data (if any) to include in the redirect URL as query arguments.',
              features:    {
                responsive: false,
                sticky:     false,
                hover:      false,
                preset:     'content',
              },
              component: {
                name:  'divi/checkboxes',
                type:  'field',
                props: {
                  options: [
                    {
                      value: 'name',
                      label: 'Name',
                    },
                    {
                      value: 'last_name',
                      label: 'Last Name',
                    },
                    {
                      value: 'email',
                      label: 'Email',
                    },
                    {
                      value: 'ip_address',
                      label: 'IP Address',
                    },
                    {
                      value: 'css_id',
                      label: 'CSS ID',
                    },
                  ],
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
      label:          'Opt-in Title',
      subName:        'newsletterTitle',
      selectorSuffix: ' .et_pb_newsletter_description h2, .et_pb_subscribe .et_pb_newsletter_description h1.et_pb_module_header, .et_pb_subscribe .et_pb_newsletter_description h3.et_pb_module_header, .et_pb_subscribe .et_pb_newsletter_description h4.et_pb_module_header, .et_pb_subscribe .et_pb_newsletter_description h5.et_pb_module_header, .et_pb_subscribe .et_pb_newsletter_description h6.et_pb_module_header',
    },
    newsletterDescription: {
      label:          'Opt-in Description',
      subName:        'newsletterDescription',
      selectorSuffix: ' .et_pb_newsletter_description',
    },
    newsletterForm: {
      label:          'Opt-in Form',
      subName:        'newsletterForm',
      selectorSuffix: ' .et_pb_newsletter_form',
    },
    newsletterFields: {
      label:          'Opt-in Form Fields',
      subName:        'newsletterFields',
      selectorSuffix: ' .et_pb_newsletter_form p input[type="text"], .et_pb_newsletter_form p textarea, .et_pb_newsletter_form p select, .et_pb_newsletter_form p .input[type="radio"] + label i, .et_pb_newsletter_form p .input[type="checkbox"] + label i',
    },
    newsletterButton: {
      label:          'Subscribe Button',
      subName:        'newsletterButton',
      selectorSuffix: '.et_pb_subscribe .et_pb_newsletter_button.et_pb_button',
    },
  },
  script: [
    'divi-module-library-script-signup',
  ],
  settings: {
    advanced: 'auto',
    groups:   {
      // Content => Text
      contentText: {
        panel:         'content',
        priority:      5,
        groupName:     'text',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel: 'Text',
            preset:     'content',
          },
        },
      },

      // Content > Email Account.
      contentEmailService: {
        panel:         'content',
        priority:      10,
        groupName:     'contentEmailService',
        multiElements: true,
        component:     {
          name:  'divi/email-service',
          props: {
            groupLabel: 'Email Account',
            preset:     'content',
          },
        },
      },

      // Content => Fields
      contentFields: {
        panel:         'content',
        priority:      15,
        groupName:     'fields',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel: 'Fields',
            preset:     'content',
          },
        },
      },

      // Content => Success Action
      contentSuccessAction: {
        panel:         'content',
        priority:      16,
        groupName:     'successAction',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel: 'Success Action',
            preset:     'content',
          },
        },
      },

      // Content > Spam Protection.
      contentSpamProtection: {
        panel:         'content',
        priority:      17,
        groupName:     'contentSpamProtection',
        multiElements: true,
        component:     {
          name:  'divi/spam-protection',
          props: {
            groupLabel: 'Spam Protection',
            fields:     {
              useBasicCaptcha: {
                render: false,
              },
            },
            preset: 'content',
          },
        },
      },

      // Design => Layout
      designLayout: {
        panel:         'design',
        priority:      5,
        groupName:     'layout',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            clipboardCategory: 'style',
            groupLabel:        'Layout',
          },
        },
      },

      // Design > Fields.
      designFieldField: {
        panel:         'design',
        priority:      5,
        groupName:     'field',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            clipboardCategory: 'style',
            groupLabel:        'Fields',
          },
        },
      },

      // Advanced > Privacy.
      advancedPrivacy: {
        panel:         'advanced',
        priority:      100,
        groupName:     'privacy',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel: 'Privacy',
          },
        },
      },
    },
  },
};

export {
  signupModuleMetaData,
};
