import { __ } from '@wordpress/i18n';

import {
  type ContactFieldAttrs,
  type Metadata,
} from '@divi/types';

/**
 * Field Module Meta Data.
 *
 * Note: The module metadata will be used to generate `module.json` upon build.
 * Variable name must end with `ModuleMetaData` to be picked up by the build script.
 */
const contactFieldModuleMetaData: Metadata.Values<ContactFieldAttrs> = {
  name:                 'divi/contact-field',
  d4Shortcode:          'et_pb_contact_field',
  moduleClassName:      'et_pb_contact_field',
  moduleOrderClassName: 'et_pb_contact_field',
  title:                'Field',
  titles:               'Fields',
  category:             'child-module',
  childrenName:         [], // Supports any module type as child elements
  videos:               [],
  attributes:           {
    module: {
      type:        'object',
      selector:    '{{selector}}',
      elementType: 'element',
      styleProps:  {
        background: {
          selector: '{{selector}}',
        },
        sizing: {
          selector: '{{selector}} input[type=text], {{selector}} input[type=email], {{selector}} textarea, {{selector}}[data-type=checkbox], {{selector}}[data-type=radio], {{selector}}[data-type=select], {{selector}}[data-type=select] select',
        },
        spacing: {
          propertySelectors: {
            desktop: {
              value: {
                padding: '{{selectorPrefix}}p{{baseSelector}}',
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
        border: {
          selector:          '.et_pb_contact_form_container {{selector}}.et_pb_contact_field',
          propertySelectors: {
            desktop: {
              value: {
                'border-radius': '.et_pb_contact_form_container {{selector}}.et_pb_contact_field .input, .et_pb_contact_form_container {{selector}}.et_pb_contact_field .input[type="checkbox"] + label i, .et_pb_contact_form_container {{selector}}.et_pb_contact_field .input[type="radio"] + label i',
                'border-style':  '.et_pb_contact_form_container {{selector}}.et_pb_contact_field .input, .et_pb_contact_form_container {{selector}}.et_pb_contact_field .input[type="checkbox"] + label i, .et_pb_contact_form_container {{selector}}.et_pb_contact_field .input[type="radio"] + label i',
              },
            },
          },
        },
        boxShadow: {
          selector:  '{{selector}} input, {{selector}} select, {{selector}} textarea, {{selector}} .et_pb_contact_field_options_list label > i',
          important: true,
        },
        filters: {
          selector: '{{selector}} input, {{selector}} textarea, {{selector}} label',
        },
      },
      settings: {
        meta: {
          adminLabel: {},
        },
        advanced: {
          elements: {},
          link:     {},
          loop:     {},
          text:     {
            component: {
              props: {
                fields: {
                  orientation: {
                    component: {
                      props: {
                        allowClickToUnset:               true,
                        renderEmptyStringAsDefaultValue: true,
                      },
                    },
                  },
                  color: {
                    render: false,
                  },
                  textShadowGroup: {
                    render: false,
                  },
                },
              },
            },
          },
        },
        decoration: {
          layout:     {},
          background: {},
          border:     {
            component: {
              props: {
                fieldLabel: 'Input',
              },
            },
          },
          animation:    {},
          attributes:   {},
          boxShadow:    {},
          conditions:   {},
          disabledOn:   {},
          filters:      {},
          interactions: {},
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
    field: {
      type:        'object',
      elementType: 'field',
      selector:    '{{selector}}.et_pb_contact_field .input',
      settings:    {
        decoration: {
          background: {},
          font:       {},
        },
        advanced: {
          focus: {},
        },
      },
    },
    fieldItem: {
      type:        'object',
      label:       'Field',
      elementType: 'element',
      selector:    '{{selector}} .et_pb_contact_form_label',
      attributes:  {
        class: 'et_pb_contact_form_label',
      },
      tagName:           'label',
      inlineEditor:      'plainText',
      childrenSanitizer: 'et_core_esc_previously',
      settings:          {
        advanced: {
          id: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'contentText',
              priority:    5,
              render:      true,
              attrName:    'fieldItem.advanced.id',
              label:       __('Field ID', 'et_builder'),
              description: __('Define the unique ID of this field. You should use only English characters without special characters and spaces.', 'et_builder'),
              features:    {
                sticky:         false,
                responsive:     false,
                hover:          false,
                preset:         'content',
                dynamicContent: { type: 'text' },
              },
              component: {
                name: 'divi/text',
                type: 'field',
              },
            },
          },
          type: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'contentFieldOptions',
              priority:    5,
              render:      true,
              attrName:    'fieldItem.advanced.type',
              label:       __('Type', 'et_builder'),
              description: __('Choose the type of field', 'et_builder'),
              features:    {
                sticky:     false,
                responsive: false,
                hover:      false,
                preset:     'content',
              },
              component: {
                name:  'divi/select',
                type:  'field',
                props: {
                  options: {
                    input: {
                      label: 'Input Field',
                    },
                    email: {
                      label: 'Email Field',
                    },
                    text: {
                      label: 'Textarea',
                    },
                    checkbox: {
                      label: 'Checkboxes',
                    },
                    radio: {
                      label: 'Radio Buttons',
                    },
                    select: {
                      label: 'Select Dropdown',
                    },
                  },
                },
              },
            },
          },
          minLength: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'contentFieldOptions',
              priority:    5,
              render:      true,
              attrName:    'fieldItem.advanced.minLength',
              label:       __('Minimum Length', 'et_builder'),
              description: __('Leave at 0 to remove restriction', 'et_builder'),
              features:    {
                sticky:     false,
                responsive: false,
                hover:      false,
                preset:     'content',
              },
              component: {
                name:  'divi/range', // TODO Ping design team. Not outputting CSS
                type:  'field',
                props: {
                  allowedUnits: [],
                  defaultUnit:  '',
                },
              },
            },
          },
          maxLength: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'contentFieldOptions',
              priority:    5,
              render:      true,
              attrName:    'fieldItem.advanced.maxLength',
              label:       __('Maximum Length', 'et_builder'),
              description: __('Leave at 0 to remove restriction', 'et_builder'),
              features:    {
                sticky:     false,
                responsive: false,
                hover:      false,
                preset:     'content',
              },
              component: {
                name:  'divi/range', // TODO Ping design team. Not outputting CSS
                type:  'field',
                props: {
                  allowedUnits: [],
                  defaultUnit:  '',
                },
              },
            },
          },
          allowedSymbols: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'contentFieldOptions',
              priority:  5,
              render:    true,
              attrName:  'fieldItem.advanced.allowedSymbols',
              label:     __('Allowed Symbols', 'et_builder'),
              features:  {
                sticky:     false,
                responsive: false,
                hover:      false,
                preset:     'content',
              },
              component: {
                name:  'divi/select',
                type:  'field',
                props: {
                  options: {
                    all: {
                      label: 'All',
                    },
                    letters: {
                      label: 'Letters Only (A-Z)',
                    },
                    numbers: {
                      label: 'Numbers Only (0-9)',
                    },
                    alphanumeric: {
                      label: 'Alphanumeric Only (A-Z, 0-9)',
                    },
                  },
                },
              },
            },
          },
          checkboxOptions: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'contentFieldOptions',
              priority:  5,
              render:    true,
              attrName:  'fieldItem.advanced.checkboxOptions',
              label:     __('Options', 'et_builder'),
              features:  {
                sticky:     false,
                responsive: false,
                hover:      false,
                preset:     'content',
              },
              component: {
                name:  'divi/sortable-list',
                type:  'field',
                props: {
                  isCheckbox:      true,
                  addFirstOnMount: true,
                  actions:         {
                    right: [
                      'move',
                      'link',
                      'copy',
                      'delete',
                    ],
                  },
                },
              },
            },
          },
          radioOptions: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'contentFieldOptions',
              priority:  5,
              render:    true,
              attrName:  'fieldItem.advanced.radioOptions',
              label:     __('Options', 'et_builder'),
              features:  {
                sticky:     false,
                responsive: false,
                hover:      false,
                preset:     'content',
              },
              component: {
                name:  'divi/sortable-list',
                type:  'field',
                props: {
                  isRadio:         true,
                  addFirstOnMount: true,
                  actions:         {
                    right: [
                      'move',
                      'link',
                      'copy',
                      'delete',
                    ],
                  },
                },
              },
            },
          },
          selectOptions: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'contentFieldOptions',
              priority:  5,
              render:    true,
              attrName:  'fieldItem.advanced.selectOptions',
              label:     __('Options', 'et_builder'),
              features:  {
                sticky:     false,
                responsive: false,
                hover:      false,
                preset:     'content',
              },
              component: {
                name:  'divi/sortable-list',
                type:  'field',
                props: {
                  addFirstOnMount: true,
                  actions:         {
                    right: [
                      'move',
                      'copy',
                      'delete',
                    ],
                  },
                },
              },
            },
          },
          required: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'contentFieldOptions',
              priority:    5,
              render:      true,
              attrName:    'fieldItem.advanced.required',
              label:       __('Required Field', 'et_builder'),
              description: __('Define whether the field should be required or optional', 'et_builder'),
              features:    {
                sticky:     false,
                responsive: false,
                hover:      false,
                preset:     'content',
              },
              component: {
                name: 'divi/toggle',
                type: 'field',
              },
            },
          },
        },
        innerContent: {
          groupType: 'group-item',
          item:      {
            groupSlug:   'contentText',
            priority:    10,
            render:      true,
            attrName:    'fieldItem.innerContent',
            label:       __('Title', 'et_builder'),
            description: __('Here you can define the content that will be placed within the current tab.', 'et_builder'),
            features:    {
              sticky:         false,
              preset:         'content',
              dynamicContent: { type: 'text' },
            },
            component: {
              name: 'divi/text',
              type: 'field',
            },
          },
        },
      },
    },
    conditionalLogic: {
      type:     'object',
      settings: {
        innerContent: {
          groupType: 'group-item',
          item:      {
            groupSlug: 'contentConditionalLogic',
            priority:  10,
            render:    true,
            attrName:  'conditionalLogic.innerContent',
            label:     __('Rules', 'et_builder'),
            features:  {
              responsive: false,
              hover:      false,
              sticky:     false,
              preset:     'content',
            },
            component: {
              name: 'divi/conditions',
              type: 'field',
            },
          },
        },
        advanced: {
          enable: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'contentConditionalLogic',
              priority:    5,
              render:      true,
              attrName:    'conditionalLogic.advanced.enable',
              label:       __('Enable', 'et_builder'),
              description: __('Enabling conditional logic makes this field only visible when any or all of the rules below are fulfilled<br><strong>Note:</strong> Only fields with an unique and non-empty field ID can be used', 'et_builder'),
              features:    {
                responsive: false,
                hover:      false,
                sticky:     false,
                preset:     'content',
              },
              component: {
                name: 'divi/toggle',
                type: 'field',
              },
            },
          },
          relation: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'contentConditionalLogic',
              priority:    5,
              render:      true,
              attrName:    'conditionalLogic.advanced.relation',
              label:       __('Relation', 'et_builder'),
              description: __('Choose whether any or all of the rules should be fulfilled', 'et_builder'),
              features:    {
                responsive: false,
                hover:      false,
                sticky:     false,
                preset:     'content',
              },
              component: {
                name:  'divi/toggle',
                type:  'field',
                props: {
                  options: {
                    off: __('Any', 'et_builder'),
                    on:  __('All', 'et_builder'),
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
    advanced: 'auto',
    groups:   {
      // Content > Text.
      contentText: {
        panel:         'content',
        priority:      5,
        groupName:     'text',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel: 'Text',
          },
        },
      },

      // Content > Field Options.
      contentFieldOptions: {
        panel:         'content',
        priority:      10,
        groupName:     'contentFieldOptions',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel: 'Field Options',
          },
        },
      },

      // Content > Conditional Logic.
      contentConditionalLogic: {
        panel:         'content',
        priority:      15,
        groupName:     'contentConditionalLogic',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel: 'Conditional Logic',
          },
        },
      },

    },
  },
};

export {
  contactFieldModuleMetaData,
};
