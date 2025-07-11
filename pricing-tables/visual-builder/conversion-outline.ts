/* eslint-disable @typescript-eslint/naming-convention */
import {
  buttonValueConversionFunctionMap,
} from '@divi/module';
import { type ModuleConversionOutline } from '@divi/types';

// Compare this to wp.data.select('divi/settings').getSetting('shortcodeModuleDefinitions').et_pb_pricing_tables.fields

export const conversionOutline: ModuleConversionOutline = {
  advanced: {
    animation:  'module.decoration.animation',
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
    disabled_on:        'module.decoration.disabledOn',
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
    height:          'module.decoration.sizing',
    link_options:    'module.advanced.link',
    margin_padding:  'module.decoration.spacing',
    max_width:       'module.decoration.sizing',
    module:          'module.advanced.htmlAttributes',
    overflow:        'module.decoration.overflow',
    position_fields: 'module.decoration.position',
    scroll:          'module.decoration.scroll',
    sticky:          'module.decoration.sticky',
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
    featured_table:        'css.*.featuredTable',
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
    bullet_color:                                 'content.advanced.bulletColor.*',
    featured_table_background_color:              'featuredTable.decoration.background.*.color',
    featured_table_bullet_color:                  'featuredContent.advanced.bulletColor.*',
    featured_table_currency_frequency_text_color: 'featuredCurrencyFrequency.decoration.font.font.*.color',
    featured_table_excluded_text_color:           'featuredExcluded.decoration.font.font.*.color',
    featured_table_header_background_color:       'featuredTitle.decoration.background.*.color',
    featured_table_header_text_color:             'featuredTitle.decoration.font.font.*.color',
    featured_table_price_background_color:        'featuredPrice.decoration.background.*.color',
    featured_table_price_color:                   'featuredPrice.decoration.font.font.*.color',
    featured_table_subheader_text_color:          'featuredSubtitle.decoration.font.font.*.color',
    featured_table_text_color:                    'featuredContent.decoration.font.font.*.color',
    header_background_color:                      'title.decoration.background.*.color',
    price_background_color:                       'price.decoration.background.*.color',
    show_bullet:                                  'content.advanced.showBullet.*',
    show_featured_drop_shadow:                    'featuredTable.advanced.showDropShadow.*',
    button_rel:                                   'children.button.innerContent.*.rel',

    // Style conversion.
    header_level: 'title.decoration.font.font.*.headingLevel',
  },
  valueExpansionFunctionMap: {
    button_rel: buttonValueConversionFunctionMap['innerContent.*.rel'],
  },
};
