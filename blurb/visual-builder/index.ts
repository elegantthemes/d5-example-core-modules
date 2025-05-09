import { addFilter } from '@wordpress/hooks';

import {
  type BlurbAttrs,
  type ModuleLibrary,
} from '@divi/types';

import { conversionOutline } from './conversion-outline';
import { BlurbEdit } from './edit';
import { blurbModuleMetaData } from './module.json-source';
import { blurbModuleDefaultPrintedStyleAttributes } from './module-default-printed-style-attributes.json-source';
import { blurbModuleDefaultRenderAttributes } from './module-default-render-attributes.json-source';
import { ModuleStyles } from './module-styles';
import {
  optionGroupPresetPrimaryAttrNameResolverBlurb,
} from './option-group-preset-resolver';
import { placeholderContent } from './placeholder-content';
import { SettingsAdvanced } from './settings-advanced';
import { SettingsContent } from './settings-content';
import { SettingsDesign } from './settings-design';


// Register the filters for Option Group Preset Data Resolver.
addFilter('divi.optionGroupPresetPrimaryAttrNameResolver.diviBlurb', 'divi', optionGroupPresetPrimaryAttrNameResolverBlurb);

/**
 * Defines `Blurb` module for Visual Builder.
 *
 * @since ??
 */
export const blurb: ModuleLibrary.Module.RegisterDefinition<BlurbAttrs> = {
  metadata:                 blurbModuleMetaData,
  defaultAttrs:             blurbModuleDefaultRenderAttributes,
  defaultPrintedStyleAttrs: blurbModuleDefaultPrintedStyleAttributes,
  settings:                 {
    content:  SettingsContent,
    design:   SettingsDesign,
    advanced: SettingsAdvanced,
  },
  renderers: {
    edit: BlurbEdit,

    // Presets prototype.
    // To have presets support, module needs to declare its style component so its style component can be reused
    // to render preset data.
    styles: ModuleStyles,
  },
  placeholderContent,
  conversionOutline,
};
