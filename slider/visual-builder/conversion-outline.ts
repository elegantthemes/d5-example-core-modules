/* eslint-disable @typescript-eslint/naming-convention */
import {
  borderValueConversionFunctionMap,
  buttonValueConversionFunctionMap,
} from '@divi/module';
import { type ModuleConversionOutline } from '@divi/types';

// Compare this to wp.data.select('divi/settings').getSetting('shortcodeModuleDefinitions').et_pb_slider.fields

export const conversionOutline: ModuleConversionOutline = {
  advanced: {
    animation:  'module.decoration.animation',
    background: 'children.module.decoration.background',
    borders:    {
      default: 'module.decoration.border',
      image:   'image.decoration.border',
    },
    box_shadow: {
      button:  'button.decoration..boxShadow',
      default: 'module.decoration.boxShadow',
      image:   'image.decoration.boxShadow',
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
      body:       'content.decoration.bodyFont.body',
      body_link:  'content.decoration.bodyFont.link',
      body_ol:    'content.decoration.bodyFont.ol',
      body_quote: 'content.decoration.bodyFont.quote',
      body_ul:    'content.decoration.bodyFont.ul',
      header:     'title.decoration.font',
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
    after:                   'css.*.after',
    free_form:               'css.*.freeForm',
    before:                  'css.*.before',
    main_element:            'css.*.mainElement',
    slide_active_controller: 'css.*.slideActiveController',
    slide_arrows:            'css.*.slideArrows',
    slide_button:            'css.*.slideButton',
    slide_controllers:       'css.*.slideControllers',
    slide_description:       'css.*.slideDescription',
    slide_image:             'css.*.slideImage',
    slide_title:             'css.*.slideTitle',
  },
  module: {
    auto:                    'module.advanced.auto.*',
    auto_speed:              'module.advanced.autoSpeed.*',
    auto_ignore_hover:       'module.advanced.autoIgnoreHover.*',
    arrows_custom_color:     'arrows.advanced.color.*',
    dot_nav_custom_color:    'dotNav.decoration.background.*.color',
    show_arrows:             'arrows.advanced.show.*',
    show_content_on_mobile:  'children.content.advanced.showOnMobile.*',
    show_cta_on_mobile:      'children.button.advanced.showOnMobile.*',
    show_image_video_mobile: 'image.advanced.showOnMobile.*',
    show_pagination:         'pagination.advanced.show.*',
    use_bg_overlay:          'children.slideOverlay.advanced.use.*',
    bg_overlay_color:        'children.slideOverlay.decoration.background.*.color',
    use_text_overlay:        'children.contentOverlay.advanced.use.*',
    text_overlay_color:      'children.contentOverlay.decoration.background.*.color',
    text_border_radius:      'children.contentOverlay.decoration.border.*.radius',
    header_level:            'title.decoration.font.font.*.headingLevel',
    content_width:           'content.decoration.sizing.*.width',
    content_max_width:       'content.decoration.sizing.*.maxWidth',
    button_rel:              'children.button.innerContent.*.rel',
  },
  valueExpansionFunctionMap: {
    text_border_radius: borderValueConversionFunctionMap.radius,
    button_rel:         buttonValueConversionFunctionMap['innerContent.*.rel'],
  },
};
