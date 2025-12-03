import { addFilter } from '@wordpress/hooks';

import {
  type ModuleLibrary,
  type SignupCustomFieldAttrs,
} from '@divi/types';

import {
  conversionOutline,
} from './conversion-outline';
import {
  SignupCustomFieldEdit,
} from './edit';
import {
  signupCustomFieldModuleMetaData,
} from './module.json-source';
import { signupCustomFieldModuleDefaultPrintedStyleAttributes } from './module-default-printed-style-attributes.json-source';
import { signupCustomFieldModuleDefaultRenderAttributes } from './module-default-render-attributes.json-source';
import { ModuleStyles } from './module-styles';
import {
  optionGroupPresetPrimaryAttrNameResolverSignupCustomField,
} from './option-group-preset-resolver';
import { SettingsContent } from './settings-content';
import { SettingsDesign } from './settings-design';

// Register the filters for Option Group Preset Data Resolver.
addFilter('divi.optionGroupPresetPrimaryAttrNameResolver.diviSignupCustomField', 'divi', optionGroupPresetPrimaryAttrNameResolverSignupCustomField);

/**
 * Custom Field module.
 *
 * @since ??
 */
export const signupCustomField: ModuleLibrary.Module.RegisterDefinition<SignupCustomFieldAttrs> = {
  metadata:                 signupCustomFieldModuleMetaData,
  defaultAttrs:             signupCustomFieldModuleDefaultRenderAttributes,
  defaultPrintedStyleAttrs: signupCustomFieldModuleDefaultPrintedStyleAttributes,
  renderers:                {
    edit:   SignupCustomFieldEdit,
    styles: ModuleStyles,
  },
  conversionOutline,
  settings: {
    design:  SettingsDesign,
    content: SettingsContent,
  },
  parentsName: ['divi/signup'],
};
