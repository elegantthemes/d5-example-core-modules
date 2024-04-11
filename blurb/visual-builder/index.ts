import {
  type BlurbAttrs,
  type ModuleLibrary,
} from '@divi/types';

import { conversionOutline } from './conversion-outline';
import { BlurbEdit } from './edit';
import { blurbModuleMetaData } from './module.json-source';
import { placeholderContent } from './placeholder-content';
import { SettingsAdvanced } from './settings-advanced';
import { SettingsContent } from './settings-content';
import { SettingsDesign } from './settings-design';

/**
 * Defines `Blurb` module for Visual Builder.
 *
 * @since ??
 */
export const blurb: ModuleLibrary.Module.RegisterDefinition<BlurbAttrs> = {
  metadata: blurbModuleMetaData,
  settings: {
    content:  SettingsContent,
    design:   SettingsDesign,
    advanced: SettingsAdvanced,
  },
  renderers: {
    edit: BlurbEdit,
  },
  placeholderContent,
  conversionOutline,
};
