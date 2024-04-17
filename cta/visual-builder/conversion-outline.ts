/* eslint-disable @typescript-eslint/naming-convention */
import { convertInlineFont } from '@divi/conversion';
import { type ModuleConversionOutline } from '@divi/types';

// Compare this to wp.data.select('divi/settings').getSetting('shortcodeModuleDefinitions').et_pb_cta.fields

export const conversionOutline: ModuleConversionOutline = {
  advanced: {
    // The following advanced options has no capability to be looped.
    // Thus when they are used, the attribute name will likely to be
    // consistent across on all modules.
    admin_label:     'module.meta.adminLabel',
    animation:       'module.decoration.animation',
    background:      'module.decoration.background',
    disabled_on:     'module.decoration.disabledOn',
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
    transform:       'module.decoration.transform',
    transition:      'module.decoration.transition',
    z_index:         'module.decoration.zIndex',


    // The following advanced options has capability to be looped.
    // This means, for example, there will be multiple advanced options
    // button in CTA.
    borders: {
      default: 'module.decoration.border',
    },
    box_shadow: {
      button:  'button.decoration.boxShadow',
      default: 'module.decoration.boxShadow',
    },
    button: {
      button: 'button',
    },
    fonts: {
      body:       'content.decoration.bodyFont.body',
      body_link:  'content.decoration.bodyFont.link',
      body_ol:    'content.decoration.bodyFont.ol',
      body_quote: 'content.decoration.bodyFont.quote',
      body_ul:    'content.decoration.bodyFont.ul',
      header:     'title.decoration.font',
    },
    text_shadow: {
      default: 'module.advanced.text.textShadow',
    },

    // Filter are in weird situation. It can't be looped but given certain
    // property, it will generate filter attribute prefixed by `child_filter_*`
    filters: {
      default: 'module.decoration.filters',
    },
  },
  css: {
    after:             'css.*.after',
    before:            'css.*.before',
    main_element:      'css.*.mainElement',
    promo_button:      'css.*.button',
    promo_description: 'css.*.description',
    promo_title:       'css.*.title',
  },
  module: {
    // NOTE: This is different than current CTA conversion map. Looks like
    // it was wrong this whole time.
    button_text:    'button.innerContent.*.text',
    button_url:     'button.innerContent.*.linkUrl',
    content:        'content.innerContent.*',
    url_new_window: 'button.innerContent.*.linkTarget',
    title:          'title.innerContent.*',

    // Style conversion.
    header_level: 'title.decoration.font.font.*.headingLevel',
    inline_fonts: 'content.decoration.inlineFont.*.families',
  },
  valueExpansionFunctionMap: {
    inline_fonts: convertInlineFont,
  },
};
