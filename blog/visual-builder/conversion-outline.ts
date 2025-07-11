/* eslint-disable @typescript-eslint/naming-convention */
import { convertFontIcon } from '@divi/conversion';
import { type ModuleConversionOutline } from '@divi/types';

import { includedCategories } from './utils';

// Compare this to wp.data.select('divi/settings').getSetting('shortcodeModuleDefinitions').et_pb_blog.fields

export const conversionOutline: ModuleConversionOutline = {
  advanced: {
    admin_label: 'module.meta.adminLabel',
    animation:   'module.decoration.animation',
    box_shadow:  {
      default: 'module.decoration.boxShadow',
      image:   'image.decoration.boxShadow',
    },
    disabled_on:     'module.decoration.disabledOn',
    module:          'module.advanced.htmlAttributes',
    overflow:        'module.decoration.overflow',
    position_fields: 'module.decoration.position',
    scroll:          'module.decoration.scroll',
    sticky:          'module.decoration.sticky',
    text_shadow:     {
      default: 'module.advanced.text.textShadow',
    },
    transform:  'module.decoration.transform',
    transition: 'module.decoration.transition',
    z_index:    'module.decoration.zIndex',
    fonts:      {
      header:     'title.decoration.font',
      meta:       'meta.decoration.font',
      read_more:  'readMore.decoration.font',
      pagination: 'pagination.decoration.font',
      body:       'content.decoration.bodyFont.body',
      body_link:  'content.decoration.bodyFont.link',
      body_ul:    'content.decoration.bodyFont.ul',
      body_ol:    'content.decoration.bodyFont.ol',
      body_quote: 'content.decoration.bodyFont.quote',
    },
    background: 'module.decoration.background',
    borders:    {
      default:   'post.decoration.border', // There are no module.decoration.border settings for blog module.
      fullwidth: 'fullwidth.decoration.border',
      image:     'image.decoration.border',
    },
    height:         'module.decoration.sizing',
    margin_padding: 'module.decoration.spacing',
    text:           'module.advanced.text',
    filters:        {
      default: 'module.decoration.filters',
      child:   'image.decoration.filters',
    },
    max_width:          'module.decoration.sizing',
    link_options:       'module.advanced.link',
    display_conditions: 'module.decoration.conditions',
  },
  css: {
    before:         'css.*.before',
    main_element:   'css.*.mainElement',
    after:          'css.*.after',
    free_form:      'css.*.freeForm',
    title:          'css.*.title',
    content:        'css.*.content',
    post_meta:      'css.*.postMeta',
    pagenavi:       'css.*.pagenavi',
    featured_image: 'css.*.featuredImage',
    read_more:      'css.*.readMore',
  },
  module: {
    fullwidth:                     'fullwidth.advanced.enable.*',
    use_current_loop:              'post.advanced.currentLoop.*',
    post_type:                     'post.advanced.type.*',
    posts_number:                  'post.advanced.number.*',
    include_categories:            'post.advanced.categories.*',
    meta_date:                     'post.advanced.dateFormat.*',
    show_thumbnail:                'image.advanced.enable.*',
    show_content:                  'content.advanced.enable.*',
    use_manual_excerpt:            'post.advanced.excerptManual.*',
    excerpt_length:                'post.advanced.excerptLength.*',
    show_more:                     'readMore.advanced.enable.*',
    show_author:                   'meta.advanced.showAuthor.*',
    show_date:                     'meta.advanced.showDate.*',
    show_categories:               'meta.advanced.showCategories.*',
    show_comments:                 'meta.advanced.showComments.*',
    show_excerpt:                  'post.advanced.showExcerpt.*',
    show_pagination:               'pagination.advanced.enable.*',
    offset_number:                 'post.advanced.offset.*',
    use_overlay:                   'overlay.advanced.enable.*',
    overlay_icon_color:            'overlayIcon.decoration.icon.*.color',
    hover_overlay_color:           'overlay.decoration.background.*.color',
    hover_icon:                    'overlayIcon.decoration.icon.*',
    masonry_tile_background_color: 'masonry.decoration.background.*.color',
    header_level:                  'title.decoration.font.font.*.headingLevel',
  },
  valueExpansionFunctionMap: {
    hover_icon:         convertFontIcon,
    include_categories: includedCategories,
  },
};
