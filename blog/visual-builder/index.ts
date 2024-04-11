import {
  type BlogAttrs,
  type ModuleLibrary,
} from '@divi/types';

import { conversionOutline } from './conversion-outline';
import { BlogEdit } from './edit';
import { blogModuleMetaData as metadata } from './module.json-source';
import { placeholderContent } from './placeholder-content';
import { SettingsAdvanced } from './settings-advanced';
import { SettingsContent } from './settings-content';
import { SettingsDesign } from './settings-design';


/**
 * Defines `Blog` module for Visual Builder.
 *
 * @since ??
 */
export const blog: ModuleLibrary.Module.RegisterDefinition<BlogAttrs> = {
  metadata,
  settings: {
    content:  SettingsContent,
    design:   SettingsDesign,
    advanced: SettingsAdvanced,
  },
  renderers: {
    edit: BlogEdit,
  },
  placeholderContent,
  conversionOutline,
};
