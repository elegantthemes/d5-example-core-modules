import { __ } from '@wordpress/i18n';


export const cssFields = {
  title: {
    subName:        'title',
    label:          __('Title', 'et_builder'),
    selectorSuffix: ' .entry-title',
  },
  content: {
    subName:        'content',
    label:          __('Body', 'et_builder'),
    selectorSuffix: ' .post-content',
  },
  postMeta: {
    subName:        'postMeta',
    label:          __('Post Meta', 'et_builder'),
    selectorSuffix: ' .post-meta',
  },
  pagenavi: {
    subName:        'pagenavi',
    label:          __('Pagenavi', 'et_builder'),
    selectorSuffix: ' .wp_pagenavi',
  },
  featuredImage: {
    subName:        'featuredImage',
    label:          __('Featured Image', 'et_builder'),
    selectorSuffix: ' .entry-featured-image-url img',
  },
  readMore: {
    subName:        'readMore',
    label:          __('Read More Button', 'et_builder'),
    selectorSuffix: ' a.more-link',
  },
};
