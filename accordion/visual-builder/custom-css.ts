import { __ } from '@wordpress/i18n';

import { type Module } from '@divi/types';

import metadata from './module.json';


const { customCssFields } = metadata;

const cssFields = {
  ...customCssFields as unknown as Record<string, Module.Css.Field>,
};

const labels = {
  toggle:        __('Toggle', 'et_builder'),
  openToggle:    __('Open Toggle', 'et_builder'),
  toggleTitle:   __('Toggle Title', 'et_builder'),
  toggleIcon:    __('Toggle Icon', 'et_builder'),
  toggleContent: __('Toggle Content', 'et_builder'),
};

Object.keys(labels).forEach((key:keyof typeof labels) => {
  if (Object.prototype.hasOwnProperty.call(cssFields, key)) {
    cssFields[key].label = labels[key];
  }
});

export { cssFields };
