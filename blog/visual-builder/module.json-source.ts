import { type BlogAttrs, type Metadata } from '@divi/types';

/**
 * Blurb Module Meta Data.
 *
 * Note: The module metadata will be used to generate `module.json` upon build.
 * Variable name must end with `ModuleMetaData` to be picked up by the build script.
 */
const blogModuleMetaData: Metadata.Values<BlogAttrs> = {
  name:        'divi/blog',
  d4Shortcode: 'et_pb_blog',
  title:       'Blog',
  titles:      'Blogs',
  moduleIcon:  'divi/module-blog',
  category:    'module',
  videos:      [
    {
      id:   'bJ0MBUQfmog',
      name: 'An introduction to the Blog module',
    },
    {
      id:   'jETCzKVv6P0',
      name: 'How To Use Divi Blog Post Formats',
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
      type:       'object',
      selector:   '{{selector}}',
      styleProps: {
        boxShadow: {
          selector: '{{selector}} article.et_pb_post',
        },
      },
      settings: {
        meta: {
          adminLabel: {},
        },
        advanced: {
          link:           {},
          htmlAttributes: {},
          text:           {
            priority:  10,
            component: {
              props: {
                fields: {
                  color: {
                    render: true,
                  },
                },
              },
            },
          },
        },
        decoration: {
          animation:  {},
          background: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'contentBackground',
              priority:  10,
              render:    true,

              // Built-in group component
              component: {
                type: 'group',
                name: 'divi/background',

                props: {
                  grouped: false,
                },
              },
            },
          },
          conditions: {},
          disabledOn: {},
          filters:    {},
          overflow:   {},
          position:   {},
          scroll:     {
            groupType: 'group-item',
            item:      {
              priority:  20,
              render:    true,
              groupSlug: 'advancedScrollModule',

              // Built-in group component
              component: {
                name:  'divi/scroll',
                type:  'group',
                props: {
                  grouped: false,
                  fields:  {
                    gridMotion: {
                      render: true,
                    },
                  },
                },
              },
            },
          },
          sizing:     {},
          spacing:    {},
          sticky:     {},
          boxShadow:  {},
          transform:  {},
          transition: {},
          zIndex:     {},
        },
      },
    },
    post: {
      type:     'object',
      selector: '{{selector}} .et_pb_blog_grid .et_pb_post',
      settings: {
        advanced: {
          useCurrentLoop: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'content',
              attrName:    'post.advanced.useCurrentLoop',
              label:       'Posts For Current Page',
              description: 'Display posts for the current page. Useful on archive and index pages.',
              priority:    10,
              render:      true,
              features:    {
                hover:      false,
                sticky:     false,
                responsive: false,
                preset:     'content',
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
          type: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'content',
              attrName:    'post.advanced.type',
              label:       'Post Type',
              description: 'Choose posts of which post type you would like to display.',
              priority:    10,
              render:      true,
              features:    {
                hover:      false,
                sticky:     false,
                responsive: false,
                preset:     'content',
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/select',

                props: {
                  options: {},
                },
              },
            },
          },
          number: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'content',
              attrName:    'post.advanced.number',
              label:       'Post Count',
              description: 'Choose how much posts you would like to display per page.',
              priority:    20,
              render:      true,
              features:    {
                hover:      false,
                sticky:     false,
                responsive: false,
                preset:     'content',
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/text',

                props: {
                  showPlaceholderOnEmpty: true,
                },
              },
            },
          },
          categories: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'content',
              attrName:    'post.advanced.categories',
              label:       'Included Categories',
              description: 'Choose which categories you would like to include in the feed.',
              priority:    30,
              render:      true,
              features:    {
                hover:      false,
                sticky:     false,
                responsive: false,
                preset:     'content',
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/checkboxes',

                props: {
                  options: [],
                },
              },
            },
          },
          dateFormat: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'content',
              attrName:    'post.advanced.dateFormat',
              label:       'Date Format',
              description: 'If you would like to adjust the date format, input the appropriate PHP date format here.',
              priority:    30,
              render:      true,
              features:    {
                hover:      false,
                sticky:     false,
                responsive: false,
                preset:     'content',
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/text',
              },
            },
          },
          excerptContent: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'content',
              attrName:    'post.advanced.excerptContent',
              label:       'Content Length',
              description: 'Showing the full content will not truncate your posts on the index page. Showing the excerpt will only display your excerpt text.',
              priority:    50,
              render:      true,
              features:    {
                sticky: false,
                preset: 'content',
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/select',

                props: {
                  options: {
                    off: {
                      label: 'Show Excerpt',
                    },
                    on: {
                      label: 'Show Content',
                    },

                  },
                },
              },
            },
          },
          excerptManual: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'content',
              attrName:    'post.advanced.excerptManual',
              label:       'Use Post Excerpts',
              description: 'Disable this option if you want to ignore manually defined excerpts and always generate it automatically.',
              priority:    60,
              render:      true,
              features:    {
                hover:      false,
                sticky:     false,
                responsive: false,
                preset:     'content',
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
          excerptLength: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'content',
              attrName:    'post.advanced.excerptLength',
              label:       'Excerpt Length',
              description: 'Define the length of automatically generated excerpts. Leave blank for default ( 270 ) ',
              priority:    70,
              render:      true,
              features:    {
                hover:      false,
                sticky:     false,
                responsive: false,
                preset:     'content',
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/text',
              },
            },
          },
          offset: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'content',
              attrName:    'post.advanced.offset',
              label:       'Post Offset Number',
              description: 'Choose how many posts you would like to skip. These posts will not be shown in the feed.',
              priority:    80,
              render:      true,
              features:    {
                hover:      false,
                sticky:     false,
                responsive: false,
                preset:     'content',
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/text',
              },
            },
          },
          showExcerpt: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'contentElements',
              attrName:    'post.advanced.showExcerpt',
              label:       'Show Excerpt',
              description: 'Turn excerpt on and off.',
              priority:    70,
              render:      true,
              features:    {
                sticky: false,
                preset: ['html'],
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
        },
        decoration: {
          border: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designBorder',
              attrName:  'post.decoration.border',
              priority:  10,
              render:    true,

              // Built-in group component
              component: {
                type: 'group',
                name: 'divi/border',

                props: {
                  grouped:    false,
                  fieldLabel: 'Grid Layout',
                },
              },
            },
          },
        },
      },
    },
    image: {
      type:       'object',
      selector:   '{{selector}} .et_pb_post .entry-featured-image-url,{{selector}} .et_pb_post .et_pb_slides,{{selector}} .et_pb_post .et_pb_video_overlay',
      styleProps: {
        boxShadow: {
          selector: '{{selector}} .et_pb_post .entry-featured-image-url,{{selector}} .et_pb_post img,{{selector}} .et_pb_post .et_pb_slides,{{selector}} .et_pb_post .et_pb_video_overlay',
        },
        filters: {
          selector: '{{selector}} img,{{selector}} .et_pb_slides,{{selector}} .et_pb_video_overlay',
        },
      },
      settings: {
        advanced: {
          enable: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'contentElements',
              attrName:    'image.advanced.enable',
              label:       'Show Featured Image',
              description: 'This will turn thumbnails on and off.',
              priority:    10,
              render:      true,
              features:    {
                sticky: false,
                preset: ['html'],
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
        },
        decoration: {
          border: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designImage',
              priority:  20,
              render:    true,

              // Built-in group component
              component: {
                type: 'group',
                name: 'divi/border',

                props: {
                  grouped: false,
                },
              },
            },
          },
          boxShadow: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designImage',
              priority:  20,
              render:    true,

              // Built-in group component
              component: {
                type: 'group',
                name: 'divi/box-shadow',

                props: {
                  grouped: false,
                },
              },
            },
          },
          filters: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designImage',
              priority:  20,
              render:    true,

              // Built-in group component
              component: {
                type: 'group',
                name: 'divi/filters',

                props: {
                  grouped: false,
                },
              },
            },
          },
        },
      },
    },
    readMore: {
      type:       'object',
      selector:   '{{selector}} .et_pb_post div.post-content a.more-link',
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
      settings: {
        advanced: {
          enable: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'contentElements',
              attrName:    'readMore.advanced.enable',
              label:       'Show Read More Button',
              description: 'Here you can define whether to show "read more" link after the excerpts or not.',
              priority:    20,
              render:      true,
              features:    {
                sticky: false,
                preset: ['html'],
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
        },
        decoration: {
          font: {
            priority: 50,

            // Built-in component
            component: {
              props: {
                groupLabel: 'Read More Text',
                fieldLabel: 'Read More',
              },
            },
          },
        },
      },
    },
    pagination: {
      type:     'object',
      selector: '{{selector}} .wp-pagenavi a, {{selector}} .wp-pagenavi span, {{selector}} .pagination a',
      settings: {
        advanced: {
          enable: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'contentElements',
              attrName:    'pagination.advanced.enable',
              label:       'Show Pagination',
              description: 'Turn pagination on and off.',
              priority:    80,
              render:      true,
              features:    {
                sticky: false,
                preset: ['html'],
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
        },
        decoration: {
          font: {
            priority: 50,

            // Built-in component
            component: {
              props: {
                groupLabel: 'Pagination Text',
                fieldLabel: 'Pagination',
              },
            },
          },
        },
      },
    },
    meta: {
      type:       'object',
      selector:   '{{selector}} .et_pb_post .post-meta, {{selector}} .et_pb_post .post-meta a, #left-area {{selector}} .et_pb_post .post-meta, #left-area {{selector}} .et_pb_post .post-meta a',
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
      settings: {
        advanced: {
          showAuthor: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'contentElements',
              attrName:    'meta.advanced.showAuthor',
              label:       'Show Author',
              description: 'Turn on or off the author link.',
              priority:    30,
              render:      true,
              features:    {
                sticky: false,
                preset: ['html'],
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
          showDate: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'contentElements',
              attrName:    'meta.advanced.showDate',
              label:       'Show Date',
              description: 'Turn the date on or off.',
              priority:    40,
              render:      true,
              features:    {
                sticky: false,
                preset: ['html'],
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
          showCategories: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'contentElements',
              attrName:    'meta.advanced.showCategories',
              label:       'Show Categories',
              description: 'Turn the category links on or off.',
              priority:    50,
              render:      true,
              features:    {
                sticky: false,
                preset: ['html'],
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
          showComments: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'contentElements',
              attrName:    'meta.advanced.showComments',
              label:       'Show Comment Count',
              description: 'Turn comment count on and off.',
              priority:    60,
              render:      true,
              features:    {
                sticky: false,
                preset: ['html'],
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
        },
        decoration: {
          font: {
            priority: 40,

            // Built-in component
            component: {
              props: {
                fieldLabel: 'Meta',
                groupLabel: 'Meta Text',
              },
            },
          },
        },
      },
    },
    title: {
      type:       'object',
      selector:   '{{selector}} .et_pb_post .entry-title, {{selector}} .not-found-title',
      styleProps: {
        selector: '{{selector}} .et_pb_post .entry-title, {{selector}} .et_pb_post .entry-title a, {{selector}} .not-found-title',
        font:     {
          propertySelectors: {
            font: {
              desktop: {
                value: {
                  'font-family':    '{{selector}} .et_pb_post .entry-title a, {{selector}} .not-found-title',
                  'font-weight':    '{{selector}} .et_pb_post .entry-title a, {{selector}} .not-found-title',
                  'text-transform': '{{selector}} .et_pb_post .entry-title a, {{selector}} .not-found-title',
                  color:            '{{selector}} .et_pb_post .entry-title a, {{selector}} .not-found-title',
                },
              },
            },
          },
        },
      },
      settings: {
        decoration: {
          font: {
            priority:  20,
            component: {
              props: {
                groupLabel: 'Title Text',
                fieldLabel: 'Title',

                fields: {
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
    content: {
      type:       'object',
      selector:   '{{selector}} .et_pb_post .post-content, {{selector}}.et_pb_bg_layout_light .et_pb_post .post-content p, {{selector}}.et_pb_bg_layout_dark .et_pb_post .post-content p',
      styleProps: {
        bodyFont: {
          propertySelectors: {
            body: {
              font: {
                desktop: {
                  value: {
                    color:         '{{selector}} .et_pb_post,{{selector}} .et_pb_post .post-content * ',
                    'line-height': '{{selector}} .et_pb_post p',
                  },
                },
              },
            },
          },
          important: {
            body: {
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
      settings: {
        decoration: {
          bodyFont: {
            priority:  30,
            component: {
              props: {
                groups: {
                  body: {
                    groupLabel: 'Body Text',
                    fieldLabel: 'Body',
                  },
                },
              },
            },
          },
        },
      },
    },
    overlay: {
      type:     'object',
      selector: '{{selector}} .et_overlay',
      settings: {
        decoration: {
          background: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designOverlay',
              attrName:    'overlay.decoration.background',
              subName:     'color',
              label:       'Overlay Background Color',
              description: 'Here you can define a custom color for the overlay',
              priority:    30,
              render:      true,
              features:    {
                hover: false,
              },

              component: {
                type: 'field',
                name: 'divi/color-picker',
              },
            },
          },
        },
        advanced: {
          enable: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designOverlay',
              attrName:    'overlay.advanced.enable',
              label:       'Featured Image Overlay',
              description: 'If enabled, an overlay color and icon will be displayed when a visitors hovers over the featured image of a post.',
              priority:    10,
              render:      true,
              features:    {
                hover:      false,
                sticky:     false,
                responsive: false,
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/toggle',
              },
            },
          },
        },
      },
    },
    overlayIcon: {
      type:       'object',
      selector:   '{{selector}} .et_overlay::before',
      styleProps: {
        icon: {
          important: true,
        },
      },
      settings: {
        decoration: {
          icon: {
            groupType: 'group-items',
            items:     {
              color: {
                groupSlug:   'designOverlay',
                attrName:    'overlayIcon.decoration.icon',
                subName:     'color',
                label:       'Overlay Icon Color',
                description: 'Here you can define a custom color for the overlay icon',
                priority:    20,
                render:      true,
                features:    {
                  hover: false,
                },

                component: {
                  type: 'field',
                  name: 'divi/color-picker',
                },
              },
              icon: {
                groupSlug:   'designOverlay',
                attrName:    'overlayIcon.decoration.icon',
                label:       'Overlay Icon',
                description: 'Here you can define a custom icon for the overlay',
                priority:    40,
                render:      true,
                features:    {
                  hover: false,
                },

                component: {
                  type: 'field',
                  name: 'divi/icon-picker',
                },
              },
            },
          },
        },
      },
    },
    fullwidth: {
      type:     'object',
      selector: '{{selector}}:not(.et_pb_blog_grid_wrapper) .et_pb_post',
      settings: {
        advanced: {
          enable: {
            groupType: 'group-item',
            item:      {
              groupSlug:   'designLayout',
              attrName:    'fullwidth.advanced.enable',
              label:       'Layout',
              description: 'Toggle between the various blog layout types.',
              priority:    10,
              render:      true,
              features:    {
                hover:      false,
                sticky:     false,
                responsive: false,
              },

              // Built-in component
              component: {
                type: 'field',
                name: 'divi/select',

                props: {
                  options: {
                    on: {
                      label: 'Fullwidth',
                    },
                    off: {
                      label: 'Grid',
                    },
                  },
                },
              },
            },
          },
        },
        decoration: {
          border: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'designBorder',
              attrName:  'fullwidth.decoration.border',
              priority:  10,
              render:    true,

              // Built-in group component
              component: {
                type: 'group',
                name: 'divi/border',

                props: {
                  grouped: false,
                },
              },
            },
          },
        },
      },
    },
    masonry: {
      type:     'object',
      selector: '{{selector}} .et_pb_blog_grid .et_pb_post',
      settings: {
        decoration: {
          background: {
            groupType: 'group-item',
            item:      {
              groupSlug: 'contentBackground',
              attrName:  'masonry.decoration.background',
              subName:   'color',
              label:     'Grid Tile Background Color',
              priority:  5,
              render:    true,


              component: {
                type: 'field',
                name: 'divi/color-picker',

                props: {
                  showPickerPalettes:        false,
                  addTitle:                  'Add Background Color',
                  showPaletteOnPickerActive: true,
                },
              },
            },
          },
        },
      },
    },
  },
  script: [
    'divi-module-library-script-blog',
  ],
  customCssFields: {
    title: {
      label:          'Title',
      subName:        'title',
      selectorSuffix: ' .entry-title',
    },
    content: {
      label:          'Body',
      subName:        'content',
      selectorSuffix: ' .post-content',
    },
    postMeta: {
      label:          'Post Meta',
      subName:        'postMeta',
      selectorSuffix: ' .post-meta',
    },
    pagenavi: {
      label:          'Pagenavi',
      subName:        'pagenavi',
      selectorSuffix: ' .wp-pagenavi',
    },
    featuredImage: {
      label:          'Featured Image',
      subName:        'featuredImage',
      selectorSuffix: ' .entry-featured-image-url img',
    },
    readMore: {
      label:          'Read More Button',
      subName:        'readMore',
      selectorSuffix: ' a.more-link',
    },
  },
  settings: {
    advanced: 'auto',

    groups: {
      // Content > Content
      content: {
        panel:     'content',
        priority:  10,
        groupName: 'content',

        component: {
          name:  'divi/composite',
          props: {
            groupLabel: 'Content',
          },
        },
      },

      // Content > Elements
      contentElements: {
        panel:         'content',
        priority:      10,
        groupName:     'elements',
        multiElements: true,

        component: {
          name:  'divi/composite',
          props: {
            groupLabel: 'Elements',
          },
        },
      },

      // Content > Background
      contentBackground: {
        panel:     'content',
        groupName: 'background',
        priority:  90,

        component: {
          name:  'divi/composite',
          props: {
            groupLabel:  'Background',
            presetGroup: 'divi/background',
          },
        },
      },

      // Design > Layout
      designLayout: {
        panel:     'design',
        priority:  10,
        groupName: 'designLayout',

        component: {
          name:  'divi/composite',
          props: {
            groupLabel: 'Layout',
          },
        },
      },

      // Design > Overlay
      designOverlay: {
        panel:     'design',
        priority:  10,
        groupName: 'designOverlay',

        component: {
          name:  'divi/composite',
          props: {
            groupLabel: 'Overlay',
          },
        },
      },

      // Design > Image
      designImage: {
        panel:     'design',
        priority:  10,
        groupName: 'designImage',

        component: {
          name:  'divi/composite',
          props: {
            groupLabel: 'Image',
          },
        },
      },

      // Design > Border
      designBorder: {
        panel:     'design',
        priority:  90,
        groupName: 'designBorder',

        component: {
          name:  'divi/composite',
          props: {
            groupLabel:  'Border',
            presetGroup: 'divi/border',
          },
        },
      },
    },
  },
  mousetrap: {
    zIndex: {
      edited: 'aboveModuleElements',
    },
  },
};

export {
  blogModuleMetaData,
};
