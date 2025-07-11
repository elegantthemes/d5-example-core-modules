/* eslint-disable @typescript-eslint/naming-convention */
import { convertFontIcon, convertInlineFont } from '@divi/conversion';
import { type ModuleConversionOutline } from '@divi/types';

// Compare this to wp.data.select('divi/settings').getSetting('shortcodeModuleDefinitions').et_pb_accordion_item.fields

export const conversionOutline: ModuleConversionOutline = {
  advanced: {
    admin_label: 'module.meta.adminLabel',
    background:  'module.decoration.background',
    borders:     {
      default: 'module.decoration.border',
    },
    box_shadow: {
      default: 'module.decoration.boxShadow',
    },
    display_conditions: 'module.decoration.conditions',
    filters:            {
      default: 'module.decoration.filters',
    },
    fonts: {
      body:          'content.decoration.bodyFont.body',
      body_link:     'content.decoration.bodyFont.link',
      body_ol:       'content.decoration.bodyFont.ol',
      body_quote:    'content.decoration.bodyFont.quote',
      body_ul:       'content.decoration.bodyFont.ul',
      closed_title:  'closedToggle.decoration.font',
      closed_toggle: 'closedToggle.decoration.font',
      title:         'title.decoration.font',
      toggle:        'title.decoration.font',
    },
    height:          'module.decoration.sizing',
    link_options:    'module.advanced.link',
    margin_padding:  'module.decoration.spacing',
    max_width:       'module.decoration.sizing',
    overflow:        'module.decoration.overflow',
    position_fields: 'module.decoration.position',
    scroll:          'module.decoration.scroll',
    text:            'module.advanced.text',
    text_shadow:     {
      default: 'module.advanced.text.textShadow',
    },
    transform:  'module.decoration.transform',
    transition: 'module.decoration.transition',
    z_index:    'module.decoration.zIndex',
  },
  css: {
    after:          'css.*.after',
    free_form:      'css.*.freeForm',
    before:         'css.*.before',
    main_element:   'css.*.mainElement',
    open_toggle:    'css.*.openToggle',
    toggle:         'css.*.toggle',
    toggle_content: 'css.*.toggleContent',
    toggle_icon:    'css.*.toggleIcon',
    toggle_title:   'css.*.toggleTitle',
  },
  module: {
    content:                        'content.innerContent.*',
    title:                          'title.innerContent.*',
    open_toggle_background_color:   'openToggle.decoration.background.*.color',
    open_toggle_text_color:         'openToggle.decoration.font.font.*.color',
    icon_color:                     'closedToggleIcon.decoration.icon.*.color',
    toggle_icon:                    'closedToggleIcon.decoration.icon.*',
    use_icon_font_size:             'closedToggleIcon.decoration.icon.*.useSize',
    icon_font_size:                 'closedToggleIcon.decoration.icon.*.size',
    closed_toggle_background_color: 'closedToggle.decoration.background.*.color',
    closed_title_font_size:         'closedToggle.decoration.font.font.*.size',
    closed_toggle_text_color:       'closedToggle.decoration.font.font.*.color',
    title_font_size:                'title.decoration.font.font.*.size',
    title_level:                    'title.decoration.font.font.*.headingLevel',
    title_text_align:               'title.decoration.font.font.*.textAlign',
    title_text_color:               'title.decoration.font.font.*.color',
    open:                           'module.advanced.open.*',
    toggle_level:                   'title.decoration.font.font.*.headingLevel',
    inline_fonts:                   'content.decoration.inlineFont.*.families',
  },
  valueExpansionFunctionMap: {
    toggle_icon:  convertFontIcon,
    inline_fonts: convertInlineFont,
  },
};
