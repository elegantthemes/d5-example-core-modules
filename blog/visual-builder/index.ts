import { addFilter } from '@wordpress/hooks';

import {
  type BlogAttrs,
  type ModuleLibrary,
} from '@divi/types';

import { conversionOutline } from './conversion-outline';
import { BlogEdit } from './edit';
import { blogModuleMetaData } from './module.json-source';
import { blogModuleDefaultPrintedStyleAttributes } from './module-default-printed-style-attributes.json-source';
import { blogModuleDefaultRenderAttributes } from './module-default-render-attributes.json-source';
import { ModuleStyles } from './module-styles';
import {
  optionGroupPresetPrimaryAttrNameResolverBlog,
  optionGroupPresetResolverAttrNameBlog,
} from './option-group-preset-resolver';
import { placeholderContent } from './placeholder-content';
import { SettingsContent } from './settings-content';
import { SettingsDesign } from './settings-design';

// Register the filter to resolve the option group presets data.
addFilter('divi.optionGroupPresetPrimaryAttrNameResolver.diviBlog', 'divi', optionGroupPresetPrimaryAttrNameResolverBlog);
addFilter('divi.optionGroupPresetResolverAttrName', 'divi', optionGroupPresetResolverAttrNameBlog);

/**
 * Defines `Blog` module for Visual Builder.
 *
 * @since ??
 */
export const blog: ModuleLibrary.Module.RegisterDefinition<BlogAttrs> = {
  metadata:                 blogModuleMetaData,
  defaultAttrs:             blogModuleDefaultRenderAttributes,
  defaultPrintedStyleAttrs: blogModuleDefaultPrintedStyleAttributes,
  settings:                 {
    content: SettingsContent,
    design:  SettingsDesign,
  },
  renderers: {
    edit:   BlogEdit,
    styles: ModuleStyles,
  },
  placeholderContent,
  conversionOutline,
};
