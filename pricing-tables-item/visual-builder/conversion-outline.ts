/* eslint-disable @typescript-eslint/naming-convention */
import { convertInlineFont } from '@divi/conversion';
import { type ModuleConversionOutline } from '@divi/types';

// Compare this to wp.data.select('divi/settings').getSetting('shortcodeModuleDefinitions').et_pb_pricing_table.fields

export const conversionOutline: ModuleConversionOutline = {
  advanced: {
    background: 'module.decoration.background',
    borders:    {
      default: 'module.decoration.border',
      price:   'price.decoration.border',
    },
    box_shadow: {
      button:  'button.decoration.boxShadow',
      default: 'module.decoration.boxShadow',
    },
    button: {
      button: 'button',
    },
    display_conditions: 'module.decoration.conditions',
    filters:            {
      default: 'module.decoration.filters',
    },
    fonts: {
      body:               'content.decoration.bodyFont.body',
      body_link:          'content.decoration.bodyFont.link',
      body_ol:            'content.decoration.bodyFont.ol',
      body_quote:         'content.decoration.bodyFont.quote',
      body_ul:            'content.decoration.bodyFont.ul',
      currency_frequency: 'currencyFrequency.decoration.font',
      excluded:           'excluded.decoration.font',
      header:             'title.decoration.font',
      price:              'price.decoration.font',
      subheader:          'subtitle.decoration.font',
    },
    link_options:    'module.advanced.link',
    margin_padding:  'module.decoration.spacing',
    overflow:        'module.decoration.overflow',
    position_fields: 'module.decoration.position',
    text:            'module.advanced.text',
    text_shadow:     {
      default: 'module.advanced.text.textShadow',
    },
    transform:  'module.decoration.transform',
    transition: 'module.decoration.transition',
    z_index:    'module.decoration.zIndex',
  },
  css: {
    after:                 'css.*.after',
    free_form:             'css.*.freeForm',
    before:                'css.*.before',
    main_element:          'css.*.mainElement',
    currency:              'css.*.currency',
    frequency:             'css.*.frequency',
    price:                 'css.*.price',
    pricing_button:        'css.*.pricingButton',
    pricing_content:       'css.*.pricingContent',
    pricing_heading:       'css.*.pricingHeading',
    pricing_item:          'css.*.pricingItem',
    pricing_item_excluded: 'css.*.pricingItemExcluded',
    pricing_subtitle:      'css.*.pricingSubtitle',
    pricing_title:         'css.*.pricingTitle',
    pricing_top:           'css.*.pricingTop',
  },
  module: {
    bullet_color:            'content.advanced.bulletColor.*',
    button_text:             'button.innerContent.*.text',
    button_url:              'button.innerContent.*.linkUrl',
    url_new_window:          'button.innerContent.*.linkTarget',
    content:                 'content.innerContent.*',
    currency:                'currencyFrequency.innerContent.*.currency',
    featured:                'module.advanced.featured.*',
    header_background_color: 'title.decoration.background.*.color',
    per:                     'currencyFrequency.innerContent.*.per',
    price_background_color:  'price.decoration.background.*.color',
    subtitle:                'subtitle.innerContent.*',
    sum:                     'price.innerContent.*',
    title:                   'title.innerContent.*',

    // Style conversion.
    header_level: 'title.decoration.font.font.*.headingLevel',
    inline_fonts: 'content.decoration.inlineFont.*.families',
  },
  valueExpansionFunctionMap: {
    inline_fonts: convertInlineFont,
  },
};
