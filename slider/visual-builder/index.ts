import { addFilter } from '@wordpress/hooks';

import {
  type ModuleLibrary,
  type SliderAttrs,
} from '@divi/types';

import { itemTitleCallback } from './callbacks';
import { conversionOutline } from './conversion-outline';
import { SliderEdit } from './edit';
import { sliderModuleMetaData } from './module.json-source';
import { sliderModuleDefaultPrintedStyleAttributes } from './module-default-printed-style-attributes.json-source';
import { sliderModuleDefaultRenderAttributes } from './module-default-render-attributes.json-source';
import { ModuleStyles } from './module-styles';
import { optionGroupPresetResolverAttrNameSlider } from './option-group-preset-resolver';
import { SettingsDesign } from './settings-design';

// Register the filter.
addFilter('divi.optionGroupPresetResolverAttrName', 'divi', optionGroupPresetResolverAttrNameSlider);


/**
 * Slider module.
 *
 * @since ??
 */
export const slider: ModuleLibrary.Module.RegisterDefinition<SliderAttrs> = {
  metadata:                 sliderModuleMetaData,
  defaultAttrs:             sliderModuleDefaultRenderAttributes,
  defaultPrintedStyleAttrs: sliderModuleDefaultPrintedStyleAttributes,
  settings:                 {
    design: SettingsDesign,
  },
  renderers: {
    edit:   SliderEdit,
    styles: ModuleStyles,
  },
  callbacks: {
    content: {
      'divi/slide': {
        itemTitleCallback,
      },
    },
  },
  template: [
    ['divi/slide', {}],
    ['divi/slide', {}],
  ],
  conversionOutline,
};
