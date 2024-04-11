import { type BlogAttrs, type ModuleMetadata } from '@divi/types';

/**
 * Blurb Module Meta Data.
 *
 * Note: The module metadata will be used to generate `module.json` upon build.
 * Variable name must end with `ModuleMetaData` to be picked up by the build script.
 */
const blogModuleMetaData: ModuleMetadata<BlogAttrs> = {
  name:        'divi/blog',
  d4Shortcode: 'et_pb_blog',
  title:       'Blog',
  titles:      'Blogs',
  moduleIcon:  'divi/module-blog',
  category:    'module',
  attributes:  {
    module: {
      type:     'object',
      selector: '{{selector}}',
      default:  {
        advanced: {
          text: {
            text: {
              desktop: {
                value: {
                  color: 'light',
                },
              },
            },
          },
        },
      },
      styleProps: {
        boxShadow: {
          selector: '{{selector}} article.et_pb_post',
        },
      },
    },
    post: {
      type:     'object',
      selector: '{{selector}} .et_pb_blog_grid .et_pb_post',
      default:  {
        advanced: {
          type: {
            desktop: {
              value: 'post',
            },
          },
          number: {
            desktop: {
              value: '10',
            },
          },
          dateFormat: {
            desktop: {
              value: 'M j, Y',
            },
          },
          offset: {
            desktop: {
              value: '0',
            },
          },
          excerptContent: {
            desktop: {
              value: 'off',
            },
          },
          excerptManual: {
            desktop: {
              value: 'on',
            },
          },
          showExcerpt: {
            desktop: {
              value: 'on',
            },
          },
          excerptLength: {
            desktop: {
              value: '270',
            },
          },
        },
      },
    },
    image: {
      type:     'object',
      selector: '{{selector}} .et_pb_post .entry-featured-image-url,{{selector}} .et_pb_post .et_pb_slides,{{selector}} .et_pb_post .et_pb_video_overlay',
      default:  {
        advanced: {
          enable: {
            desktop: {
              value: 'on',
            },
          },
        },
      },
      styleProps: {
        boxShadow: {
          selector: '{{selector}} .et_pb_post .entry-featured-image-url,{{selector}} .et_pb_post img,{{selector}} .et_pb_post .et_pb_slides,{{selector}} .et_pb_post .et_pb_video_overlay',
        },
        filters: {
          selector: '{{selector}} img,{{selector}} .et_pb_slides,{{selector}} .et_pb_video_overlay',
        },
      },
    },
    readMore: {
      type:     'object',
      selector: '{{selector}} .et_pb_post div.post-content a.more-link',
      default:  {
        advanced: {
          enable: {
            desktop: {
              value: 'off',
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
    pagination: {
      type:     'object',
      selector: '{{selector}} .wp-pagenavi a, {{selector}} .wp-pagenavi span, {{selector}} .pagination a',
      default:  {
        advanced: {
          enable: {
            desktop: {
              value: 'on',
            },
          },
        },
      },
    },
    meta: {
      type:     'object',
      selector: '{{selector}} .et_pb_post .post-meta, {{selector}} .et_pb_post .post-meta a, #left-area {{selector}} .et_pb_post .post-meta, #left-area {{selector}} .et_pb_post .post-meta a',
      default:  {
        advanced: {
          showAuthor: {
            desktop: {
              value: 'on',
            },
          },
          showDate: {
            desktop: {
              value: 'on',
            },
          },
          showCategories: {
            desktop: {
              value: 'on',
            },
          },
          showComments: {
            desktop: {
              value: 'off',
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
    title: {
      type:     'object',
      selector: '{{selector}} .et_pb_post .entry-title, {{selector}} .not-found-title',
      default:  {
        decoration: {
          font: {
            font: {
              desktop: {
                value: {
                  headingLevel: 'h2',
                },
              },
            },
          },
        },
      },
      defaultPrintedStyle: {
        decoration: {
          font: {
            font: {
              desktop: {
                value: {
                  size:       '18px',
                  lineHeight: '1em',
                },
              },
            },
          },
        },
      },
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
    },
    overlay: {
      type:     'object',
      selector: '{{selector}} .et_overlay',
    },
    overlayIcon: {
      type:     'object',
      selector: '{{selector}} .et_overlay::before',
      default:  {
        decoration: {
          icon: {
            desktop: {
              value: {
                unicode: '&#xe050;',
                type:    'divi',
                weight:  '400',
              },
            },
          },
        },
      },
      styleProps: {
        icon: {
          important: true,
        },
      },
    },
    fullwidth: {
      type:     'object',
      selector: '{{selector}}:not(.et_pb_blog_grid_wrapper) .et_pb_post',
      default:  {
        advanced: {
          enable: {
            desktop: {
              value: 'on',
            },
          },
        },
      },
    },
    masonry: {
      type:     'object',
      selector: '{{selector}} .et_pb_blog_grid .et_pb_post',
    },
  },
  script: [
    'divi-module-library-script-blog',
  ],
};

export {
  blogModuleMetaData,
};
