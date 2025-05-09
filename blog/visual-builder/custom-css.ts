import { mapValues } from 'lodash';

import { __ } from '@wordpress/i18n';

import { blogModuleMetaData } from './module.json-source';


const { customCssFields } = blogModuleMetaData;

const labels: Record<string, string> = {
  title:         __('Title', 'et_builder'),
  content:       __('Body', 'et_builder'),
  postMeta:      __('Post Meta', 'et_builder'),
  pagenavi:      __('Pagenavi', 'et_builder'),
  featuredImage: __('Featured Image', 'et_builder'),
  readMore:      __('Read More Button', 'et_builder'),
};

const cssFields = mapValues(customCssFields, (field, key) => ({
  ...field,
  label: labels[key],
}));

export { cssFields };
