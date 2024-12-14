import { __ } from '@wordpress/i18n';

import metadata from './module.json';
import { type CustomCssFieldKeys } from './types';


const customCssFields = metadata.customCssFields as Record<
  CustomCssFieldKeys,
  {
    subName: string,
    selectorSuffix: string,
    label: string,
  }
>;

customCssFields.slideDescription.label      = __('Slide Description', 'et_builder');
customCssFields.slideTitle.label            = __('Slide Title', 'et_builder');
customCssFields.slideButton.label           = __('Slide Button', 'et_builder');
customCssFields.slideControllers.label      = __('Slide Controllers', 'et_builder');
customCssFields.slideActiveController.label = __('Slide Active Controllers', 'et_builder');
customCssFields.slideImage.label            = __('Slide Image', 'et_builder');
customCssFields.slideArrows.label           = __('Slide Arrows', 'et_builder');

export const cssFields = { ...customCssFields };
