import { addFilter } from '@wordpress/hooks';

import { elementsCallbacks } from '@divi/module-utils';
import {
  type ModuleLibrary,
  type SignupAttrs,
} from '@divi/types';

import {
  conversionOutline,
} from './conversion-outline';
import {
  SignupEdit,
} from './edit';
import {
  signupModuleMetaData,
} from './module.json-source';
import { signupModuleDefaultPrintedStyleAttributes } from './module-default-printed-style-attributes.json-source';
import { signupModuleDefaultRenderAttributes } from './module-default-render-attributes.json-source';
import { ModuleStyles } from './module-styles';
import {
  optionGroupPresetPrimaryAttrNameResolverSignup,
} from './option-group-preset-resolver';
import {
  placeholderContent,
} from './placeholder-content';
import {
  SettingsContent,
} from './settings-content';
import {
  SettingsDesign,
} from './settings-design';

// Register the filters for Option Group Preset Data Resolver.
addFilter('divi.optionGroupPresetPrimaryAttrNameResolver.diviSignup', 'divi', optionGroupPresetPrimaryAttrNameResolverSignup);

/**
 * Email Optin module.
 *
 * @since ??
 */
export const signup: ModuleLibrary.Module.RegisterDefinition<SignupAttrs> = {
  metadata:                 signupModuleMetaData,
  defaultAttrs:             signupModuleDefaultRenderAttributes,
  defaultPrintedStyleAttrs: signupModuleDefaultPrintedStyleAttributes,
  renderers:                {
    edit:   SignupEdit,
    styles: ModuleStyles,
  },
  callbacks: {
    content: {
      elements: elementsCallbacks,
    },
  },
  settings: {
    content: SettingsContent,
    design:  SettingsDesign,
  },
  placeholderContent,
  conversionOutline,
};
