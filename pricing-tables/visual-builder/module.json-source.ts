import {
  type Metadata,
  type PricingTablesAttrs,
} from '@divi/types';

/**
 * Pricing Tables Meta Data.
 *
 * Note: The module metadata will be used to generate `module.json` upon build.
 * Variable name must end with `ModuleMetaData` to be picked up by the build script.
 */
const pricingTablesModuleMetaData: Metadata.Values<PricingTablesAttrs> = {
  name:             'divi/pricing-tables',
  d4Shortcode:      'et_pb_pricing_tables',
  title:            'Pricing Tables',
  titles:           'Pricing Tables',
  moduleIcon:       'divi/module-pricing-tables',
  childModuleName:  'divi/pricing-table',
  childModuleTitle: 'Pricing Table',
  category:         'module',
  videos:           [
    {
      id:   'BVzu4WnjgYI',
      name: 'An introduction to the Pricing Tables module',
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
          text:           {
            groupType: 'group',
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
          selector: '{{selector}} .et_pb_pricing_table',
        },
        border: {
          selector: '{{selector}} .et_pb_pricing_table',
        },
        spacing: {
          selector:          '{{selector}} .et_pb_pricing_heading,{{selector}} .et_pb_pricing_content_top,{{selector}} .et_pb_pricing_content',
          propertySelectors: {
            desktop: {
              value: {
                'padding-left':   '{{selector}} .et_pb_pricing_heading,{{selector}} .et_pb_pricing_content_top,{{selector}} .et_pb_pricing_content,{{selector}} .et_pb_button_wrapper',
                'padding-right':  '{{selector}} .et_pb_pricing_heading,{{selector}} .et_pb_pricing_content_top,{{selector}} .et_pb_pricing_content,{{selector}} .et_pb_button_wrapper',
                'padding-bottom': '{{selector}} .et_pb_pricing_heading,{{selector}} .et_pb_pricing_content_top,{{selector}} .et_pb_pricing_content',
              },
            },
          },
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
      },
    },
    title: {
      type:     'object',
      selector: '{{selector}} .et_pb_pricing_heading h2,{{selector}} .et_pb_pricing_heading h1.et_pb_pricing_title,{{selector}} .et_pb_pricing_heading h3.et_pb_pricing_title,{{selector}} .et_pb_pricing_heading h4.et_pb_pricing_title,{{selector}} .et_pb_pricing_heading h5.et_pb_pricing_title,{{selector}} .et_pb_pricing_heading h6.et_pb_pricing_title',
      settings: {
        decoration: {
          background: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designTitleText',
              subName:     'color',
              label:       'Table Header Background Color',
              description: 'Pick a color to use for the background behind pricing table titles.',
              priority:    30,
              render:      true,

              // Built-in component.
              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
          font: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designTitleText',
              priority:  40,
              render:    true,

              // Built-in component.
              component: {
                name:  'divi/font',
                type:  'group',
                props: {
                  grouped:    false,
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
      attributes: {
        class: 'et_pb_pricing_title',
      },
      tagName:           'h2',
      inlineEditor:      'plainText',
      elementType:       'heading',
      childrenSanitizer: 'et_core_esc_previously',
      styleProps:        {
        background: {
          selector: '{{selector}} .et_pb_pricing_heading',
        },
        font: {
          selector:     '{{selector}} .et_pb_pricing_heading h2,{{selector}} .et_pb_pricing_heading h1.et_pb_pricing_title,{{selector}} .et_pb_pricing_heading h3.et_pb_pricing_title,{{selector}} .et_pb_pricing_heading h4.et_pb_pricing_title,{{selector}} .et_pb_pricing_heading h5.et_pb_pricing_title,{{selector}} .et_pb_pricing_heading h6.et_pb_pricing_title',
          headingLevel: 'h2',
          important:    true,
        },
      },
    },
    subtitle: {
      type:     'object',
      selector: '{{selector}} .et_pb_best_value',
      settings: {
        decoration: {
          font: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designSubtitleText',
              priority:  20,
              render:    true,

              // Built-in component.
              component: {
                name:  'divi/font',
                type:  'group',
                props: {
                  grouped:    false,
                  fieldLabel: 'Subtitle',
                },
              },
            },
          },
        },
      },
      styleProps: {
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
    price: {
      type:     'object',
      selector: '{{selector}} .et_pb_et_price .et_pb_sum,{{selector}} .et_pb_pricing_content_top',
      settings: {
        decoration: {
          background: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designPriceText',
              subName:     'color',
              label:       'Pricing Area Background Color',
              description: 'Pick a color to use for the background area that appears behind the pricing text.',
              priority:    30,
              render:      true,

              // Built-in component.
              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
          font: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designPriceText',
              priority:  40,
              render:    true,

              // Built-in component.
              component: {
                name:  'divi/font',
                type:  'group',
                props: {
                  grouped:    false,
                  fieldLabel: 'Price',
                },
              },
            },
          },
          border: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designPriceText',
              priority:  50,
              render:    true,

              // Built-in component.
              component: {
                name:  'divi/border',
                type:  'group',
                props: {
                  grouped: false,
                },
              },
            },
          },
        },
      },
      styleProps: {
        background: {
          selector: '{{selector}} .et_pb_pricing_content_top',
        },
        border: {
          selector: '{{selector}} .et_pb_pricing_content_top',
        },
        font: {
          selector:          '{{selector}} .et_pb_sum',
          propertySelectors: {
            font: {
              desktop: {
                value: {
                  'text-align': '{{selector}} .et_pb_pricing_content_top',
                },
              },
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
    currencyFrequency: {
      type:     'object',
      selector: '{{selector}} .et_pb_frequency,{{selector}} .et_pb_dollar_sign',
      settings: {
        decoration: {
          font: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designCurrencyFrequencyText',
              priority:  20,
              render:    true,

              // Built-in component.
              component: {
                name:  'divi/font',
                type:  'group',
                props: {
                  grouped:    false,
                  fieldLabel: 'Currency & Frequency',
                },
              },
            },
          },
        },
      },
      styleProps: {
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
    content: {
      type:     'object',
      selector: '{{selector}} .et_pb_pricing li',
      settings: {
        decoration: {
          bodyFont: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designBodyText',
              priority:  20,
              render:    true,

              // Built-in component.
              component: {
                name:  'divi/font-body',
                type:  'group',
                props: {
                  grouped: false,
                  groups:  {
                    body: {
                      fieldLabel: 'Body',
                    },
                  },
                },
              },
            },
          },
        },
        advanced: {
          bulletColor: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designBullet',
              label:       'Bullet Color',
              description: 'Pick a color to use for the bullets that appear next to each list item within the pricing table\'s feature area.',
              priority:    20,
              render:      true,

              // Built-in component.
              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
          showBullet: {
            groupType:  'group',
            panel:      'content',
            priority:   10,
            groupName:  'elements',
            groupLabel: 'Elements',
            component:  {
              name:  'divi/composite',
              props: {
                groupLabel: 'Elements',
                fields:     {
                  showBullet: {
                    render:      true,
                    priority:    10,
                    id:          'showBullet',
                    label:       'Show Bullets',
                    description: 'Disabling bullets will remove the bullet points that appear next to each list item within the pricing table\'s feature area.',
                    features:    {
                      sticky: false,
                    },

                    //
                    component: {
                      name: 'divi/toggle',
                    },
                  },
                },
              },
            },
          },
        },
      },
      styleProps: {
        selector: '{{selector}} .et_pb_pricing li',
        bodyFont: {
          selector: '{{selector}} .et_pb_pricing li',
        },
      },
    },
    excluded: {
      type:     'object',
      selector: '{{selector}} ul.et_pb_pricing li.et_pb_not_available,{{selector}} ul.et_pb_pricing li.et_pb_not_available span,{{selector}} ul.et_pb_pricing li.et_pb_not_available a',
      settings: {
        decoration: {
          font: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designExcludedItemText',
              priority:  20,
              render:    true,

              // Built-in component.
              component: {
                name:  'divi/font',
                type:  'group',
                props: {
                  grouped:    false,
                  fieldLabel: 'Excluded Item',
                },
              },
            },
          },
        },
      },
    },
    featuredTable: {
      type:     'object',
      selector: '{{selector}} .et_pb_featured_table',
      settings: {
        decoration: {

          // Featured table only displays background color instead of full background options.
          background: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designLayout',
              subName:     'color',
              label:       'Featured Background Color',
              description: 'Pick a unique color to be used for the background of featured pricing tables. This helps featured tables stand out from the rest.',
              groupName:   'divi/background',
              priority:    10,
              render:      true,

              // Built-in component.
              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
        },
        advanced: {
          showDropShadow: {
            groupType: 'group-item',
            item:      {
              description: 'Featured pricing tables have a drop shadow that helps them stand out from the rest. This shadow can be disabled if you wish.',
              groupSlug:   'designLayout',
              label:       'Show Featured Drop Shadow',
              priority:    20,
              render:      true,

              features: {
                hover:  false,
                sticky: false,
              },

              // Built-in component.
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
        },
      },
    },
    featuredTitle: {
      type:     'object',
      selector: '{{selector}} .et_pb_featured_table .et_pb_pricing_heading',
      settings: {
        decoration: {
          background: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designTitleText',
              subName:     'color',
              label:       'Featured Header Background Color',
              description: 'Pick a unique color to use for the background behind pricing table titles in featured pricing tables. Unique colors can help featured items stand out from the rest.',
              priority:    3,
              render:      true,

              // Built-in component.
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
              attrName:    'featuredTitle.decoration.font.font',
              subName:     'color',
              label:       'Featured Title Text Color',
              description: 'Pick a unique color to use for title text in featured pricing tables. Unique colors can help featured items stand out from the rest.',
              priority:    5,
              render:      true,

              // Built-in component.
              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
        },
      },
      styleProps: {
        background: {
          important: {
            desktop: {
              value: {
                color: true,
              },
            },
          },
        },
        font: {
          selector:          '{{selector}} .et_pb_featured_table .et_pb_pricing_title',
          propertySelectors: {
            font: {
              desktop: {
                value: {
                  color: '{{selector}} .et_pb_featured_table .et_pb_pricing_heading h2, {{selector}} .et_pb_featured_table .et_pb_pricing_heading .et_pb_pricing_title',
                },
              },
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
    featuredContent: {
      type:     'object',
      selector: '{{selector}} .et_pb_featured_table .et_pb_pricing li',
      settings: {
        decoration: {
          font: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designBodyText',
              attrName:    'featuredContent.decoration.font.font',
              subName:     'color',
              label:       'Featured Body Text Color',
              description: 'Pick a unique color to use for body text in featured pricing tables. Unique colors can help featured items stand out from the rest.',
              priority:    10,
              render:      true,

              // Built-in component.
              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
        },
        advanced: {
          bulletColor: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designBullet',
              label:       'Featured Bullet Color',
              description: 'Pick a unique color to use for the bullets that appear next to each list items within featured tabes. Unique colors can help featured items stand out from the rest.',
              priority:    10,
              render:      true,

              // Built-in component.
              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
        },
      },
      styleProps: {
        font: {
          selector:  '{{selector}} .et_pb_featured_table .et_pb_pricing li',
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
    featuredSubtitle: {
      type:     'object',
      selector: '{{selector}} .et_pb_featured_table .et_pb_best_value',
      settings: {
        decoration: {
          font: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designSubtitleText',
              attrName:    'featuredSubtitle.decoration.font.font',
              subName:     'color',
              label:       'Featured Subtitle Text Color',
              description: 'Pick a unique color to use for subtitles in featured pricing tables. Unique colors can help featured items stand out from the rest.',
              priority:    10,
              render:      true,

              // Built-in component.
              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
        },
      },
      styleProps: {
        font: {
          selector:          '{{selector}} .et_pb_featured_table .et_pb_best_value',
          propertySelectors: {
            font: {
              desktop: {
                value: {
                  color: '{{selector}} .et_pb_featured_table .et_pb_best_value',
                },
              },
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
    featuredPrice: {
      type:     'object',
      selector: '{{selector}} .et_pb_featured_table .et_pb_pricing_content_top',
      settings: {
        decoration: {
          background: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designPriceText',
              subName:     'color',
              label:       'Featured Pricing Area Background Color',
              description: 'Pick a unique color to use for the background area that appears behind the pricing text in featured tables. Unique colors can help featured items stand out from the rest.',
              priority:    10,
              render:      true,

              // Built-in component.
              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
          font: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designPriceText',
              attrName:    'featuredPrice.decoration.font.font',
              subName:     'color',
              label:       'Featured Price Text Color',
              description: 'Pick a unique color to use for price text within featured pricing tables. Unique colors can help featured items stand out from the rest.',
              priority:    20,
              render:      true,

              // Built-in component.
              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
        },
      },
      styleProps: {
        font: {
          selector:          '{{selector}} .et_pb_featured_table .et_pb_et_price .et_pb_sum',
          propertySelectors: {
            font: {
              desktop: {
                value: {
                  color: '{{selector}} .et_pb_featured_table .et_pb_sum',
                },
              },
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
    featuredCurrencyFrequency: {
      type:     'object',
      settings: {
        decoration: {
          font: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designCurrencyFrequencyText',
              attrName:    'featuredCurrencyFrequency.decoration.font.font',
              subName:     'color',
              label:       'Featured Currency & Frequency Text Color',
              description: 'Pick a unique color to use for currency and frequency text within featured pricing tables. Unique colors can help featured items stand out from the rest.',
              priority:    10,
              render:      true,

              // Built-in component.
              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
        },
      },
      selector:   '{{selector}} .et_pb_featured_table .et_pb_frequency,{{selector}} .et_pb_featured_table .et_pb_dollar_sign',
      styleProps: {
        font: {
          selector:  '{{selector}} .et_pb_featured_table .et_pb_frequency,{{selector}} .et_pb_featured_table .et_pb_dollar_sign',
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
    featuredExcluded: {
      type:     'object',
      settings: {
        decoration: {
          font: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designExcludedItemText',
              attrName:    'featuredExcluded.decoration.font.font',
              subName:     'color',
              label:       'Featured Excluded Item Color',
              description: 'Pick a unique color to use for excluded list items within featured pricing tables. Unique colors can help featured items stand out from the rest.',
              priority:    10,
              render:      true,

              // Built-in component.
              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
        },
      },
      selector: '{{selector}} .et_pb_featured_table ul.et_pb_pricing li.et_pb_not_available,{{selector}} .et_pb_featured_table ul.et_pb_pricing li.et_pb_not_available span,{{selector}} .et_pb_featured_table ul.et_pb_pricing li.et_pb_not_available a',
    },
    button: {
      type:     'object',
      selector: '{{selector}} .et_pb_button',
      settings: {
        innerContent: {
          groups: {
            text: {
              groupType: 'group-item',
              item:      {
                render:    false,
                groupSlug: 'contentText',
              },
            },
            link: {
              groupType: 'group-item',
              item:      {
                groupSlug: 'contentLink',
                render:    false,
              },
            },
            attributes: {
              groupType: 'group-item',
              item:      {
                groupSlug: 'advancedAttributes',
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
              name:  'divi/button',
              props: {
                fields: {
                  alignment: {
                    description:     'Align you button to the left, right or center of the module.',
                    visible:         true,
                    multipleChoices: false,
                    component:       {
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
            },
          },
          font:    {},
          spacing: {},
        },
      },
      attributes: {
        class: 'et_pb_pricing_table_button',
      },
      elementType: 'button',
      styleProps:  {
        selector: '{{selector}} .et_pb_pricing_table_button.et_pb_button',
        border:   {
          important: {
            desktop: {
              value: {
                'border-width': true,
              },
            },
          },
        },
        button: {
          propertySelectors: {
            desktop: {
              value: {
                'text-align': '{{selector}} .et_pb_button_wrapper',
              },
            },
          },
        },
        font: {
          selector:  '{{selector}} .et_pb_pricing_table_button.et_pb_button',
          important: {
            font: true,
          },
        },
        spacing: {
          selector:  '{{selector}} .et_pb_pricing_table_button.et_pb_button',
          important: {
            desktop: {
              value: {
                padding: true,
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
            groupSlug: 'advancedButtonAttributes',
            priority:  25,
            render:    true,

            // Built-in component.
            component: {
              name:  'divi/attributes-rel',
              type:  'group',
              props: {
                grouped:    false,
                fieldLabel: 'Button',
                attrName:   'children.button.innerContent',
              },
            },
          },
        },
      },
    },
  },
  customCssFields: {
    pricingHeading: {
      label:          'Pricing Heading',
      subName:        'pricingHeading',
      selectorSuffix: ' .et_pb_pricing_heading',
    },
    pricingTitle: {
      label:          'Pricing Title',
      subName:        'pricingTitle',
      selectorSuffix: ' .et_pb_pricing_heading h2',
    },
    pricingSubtitle: {
      label:          'Pricing Subtitle',
      subName:        'pricingSubtitle',
      selectorSuffix: ' .et_pb_pricing_heading .et_pb_best_value',
    },
    pricingTop: {
      label:          'Pricing Top',
      subName:        'pricingTop',
      selectorSuffix: ' .et_pb_pricing_content_top',
    },
    price: {
      label:          'Price',
      subName:        'price',
      selectorSuffix: ' .et_pb_et_price',
    },
    currency: {
      label:          'Currency',
      subName:        'currency',
      selectorSuffix: ' .et_pb_dollar_sign',
    },
    frequency: {
      label:          'Frequency',
      subName:        'frequency',
      selectorSuffix: ' .et_pb_frequency',
    },
    pricingContent: {
      label:          'Pricing Content',
      subName:        'pricingContent',
      selectorSuffix: ' .et_pb_pricing_content',
    },
    pricingItem: {
      label:          'Pricing Item',
      subName:        'pricingItem',
      selectorSuffix: ' ul.et_pb_pricing li',
    },
    pricingItemExcluded: {
      label:          'Excluded Item',
      subName:        'pricingItemExcluded',
      selectorSuffix: ' ul.et_pb_pricing li.et_pb_not_available',
    },
    pricingButton: {
      label:          'Pricing Button',
      subName:        'pricingButton',
      selectorSuffix: ' .et_pb_pricing_table_button',
    },
    featuredTable: {
      label:          'Featured Table',
      subName:        'featuredTable',
      selectorSuffix: ' .et_pb_featured_table',
    },
  },
  settings: {
    content:  'auto',
    design:   'auto',
    advanced: 'auto',
    groups:   {
      // Design > Layout
      designLayout: {
        panel:     'design',
        priority:  5,
        groupName: 'layout',
        component: {
          name:  'divi/composite',
          props: {
            groupLabel: 'Layout',
          },
        },
      },

      // Design > Bullet
      designBullet: {
        panel:         'design',
        priority:      8,
        groupName:     'bullet',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel: 'Bullet',
          },
        },
      },

      // Design > Title Text
      designTitleText: {
        panel:         'design',
        priority:      20,
        groupName:     'titleText',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel: 'Title Text',
          },
        },
      },

      // Design Body Text
      designBodyText: {
        panel:         'design',
        priority:      22,
        groupName:     'bodyText',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel: 'Body Text',
          },
        },
      },

      // Design > Subtitle Text
      designSubtitleText: {
        panel:         'design',
        priority:      24,
        groupName:     'subtitleText',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel: 'Subtitle Text',
          },
        },
      },

      // Design > Price Text
      designPriceText: {
        panel:         'design',
        priority:      26,
        groupName:     'priceText',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel: 'Price Text',
          },
        },
      },

      // Design > Currency & Frequency Text
      designCurrencyFrequencyText: {
        panel:         'design',
        priority:      28,
        groupName:     'currencyFrequencyText',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel: 'Currency & Frequency Text',
          },
        },
      },

      // Design > Excluded Item Text
      designExcludedItemText: {
        panel:         'design',
        priority:      29,
        groupName:     'excludedItemText',
        multiElements: true,
        component:     {
          name:  'divi/composite',
          props: {
            groupLabel: 'Excluded Item Text',
          },
        },
      },

      // Advanced > Button Attributes.
      advancedButtonAttributes: {
        panel:         'advanced',
        priority:      25,
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
  pricingTablesModuleMetaData,
};
