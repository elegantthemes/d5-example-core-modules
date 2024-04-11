/* eslint-disable @typescript-eslint/naming-convention */
import { convertFontIcon, convertInlineFont } from '@divi/conversion';
import {
  convertSpacing,
} from '@divi/module';
import { type ModuleConversionOutline } from '@divi/types';

// Compare this to wp.data.select('divi/settings').getSetting('shortcodeModuleDefinitions').et_pb_blurb.fields

export const conversionOutline: ModuleConversionOutline = {
  advanced: {
    admin_label: 'module.meta.adminLabel',
    animation:   'module.decoration.animation',
    background:  'module.decoration.background',
    borders:     {
      image:   'imageIcon.decoration.border',
      default: 'module.decoration.border',
    },
    box_shadow: {
      default: 'module.decoration.boxShadow',
      image:   'imageIcon.decoration.boxShadow',
    },
    disabled_on: 'module.decoration.disabledOn',
    filters:     {
      child:   'imageIcon.decoration.filters',
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
    image_icon: {
      image_icon: 'imageIcon.decoration',
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
    after:         'css.*.after',
    before:        'css.*.before',
    main_element:  'css.*.mainElement',
    blurb_content: 'css.*.blurbContent',
    blurb_image:   'css.*.blurbImage',
    blurb_title:   'css.*.blurbTitle',
  },
  module: {
    content:                     'content.innerContent.*',
    content_max_width:           'contentContainer.decoration.sizing.*.maxWidth',
    image:                       'imageIcon.innerContent.*.src',
    use_icon:                    'imageIcon.innerContent.*.useIcon',
    font_icon:                   'imageIcon.innerContent.*.icon',
    url_new_window:              'title.innerContent.*.target',
    url:                         'title.innerContent.*.url',
    title:                       'title.innerContent.*.text',
    alt:                         'imageIcon.innerContent.*.alt',
    icon_color:                  'imageIcon.advanced.color.*',
    image_icon_background_color: 'imageIcon.decoration.background.*.color',
    icon_placement:              'imageIcon.advanced.placement.*',
    icon_alignment:              'imageIcon.advanced.alignment.*',
    header_level:                'title.decoration.font.font.*.headingLevel',
    animation:                   'imageIcon.innerContent.*.animation',
    inline_fonts:                'content.decoration.inlineFont.*.families',

    // TODO feat(D5, Blurb, Conversion) - We need to make it possible to convert single
    // D4 module attribute to more than one D5 module attributes. In the Blurb module,
    // The `image_icon_width` should be converted to `imageIcon.advanced.width.*.image`
    // and `imageIcon.advanced.width.*.icon` because unlike in D4, the Blurb image width
    // and icon width are separated in D5.
    // @see https://github.com/elegantthemes/Divi/issues/34247.
    image_icon_width: 'imageIcon.advanced.width.*.image',
  },
  valueExpansionFunctionMap: {
    image_icon_custom_margin:  convertSpacing,
    image_icon_custom_padding: convertSpacing,
    font_icon:                 convertFontIcon,
    inline_fonts:              convertInlineFont,
  },
};
