import {
  type ModuleLibrary,
  type SliderAttrs,
} from '@divi/types';

import { conversionOutline } from './conversion-outline';
import { SliderEdit } from './edit';
import { sliderModuleMetaData } from './module.json-source';
import { sliderModuleDefaultPrintedStyleAttributes } from './module-default-printed-style-attributes.json-source';
import { sliderModuleDefaultRenderAttributes } from './module-default-render-attributes.json-source';
import { ModuleStyles } from './module-styles';
import { SettingsAdvanced } from './settings-advanced';
import { SettingsContent } from './settings-content';
import { SettingsDesign } from './settings-design';


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
    content:  SettingsContent,
    design:   SettingsDesign,
    advanced: SettingsAdvanced,
  },
  renderers: {
    edit:   SliderEdit,
    styles: ModuleStyles,
  },
  template: [
    ['divi/slide', {}],
    ['divi/slide', {}],
  ],
  conversionOutline,
};
