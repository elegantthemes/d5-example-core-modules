import { elementsCallbacks } from '@divi/module-utils';
import {
  type LoginAttrs,
  type ModuleLibrary,
} from '@divi/types';

import { conversionOutline } from './conversion-outline';
import { LoginEdit } from './edit';
import { loginModuleMetaData } from './module.json-source';
import { loginModuleDefaultPrintedStyleAttributes } from './module-default-printed-style-attributes.json-source';
import { loginModuleDefaultRenderAttributes } from './module-default-render-attributes.json-source';
import { ModuleStyles } from './module-styles';
import { placeholderContent } from './placeholder-content';
import { SettingsDesign } from './settings-design';


/**
 * Defines `Login` module for Visual Builder.
 *
 * @since ??
 */
export const login: ModuleLibrary.Module.RegisterDefinition<LoginAttrs> = {
  metadata:                 loginModuleMetaData,
  defaultAttrs:             loginModuleDefaultRenderAttributes,
  defaultPrintedStyleAttrs: loginModuleDefaultPrintedStyleAttributes,
  callbacks:                {
    content: {
      elements: elementsCallbacks,
    },
  },
  settings: {
    design: SettingsDesign,
  },
  renderers: {
    edit:   LoginEdit,
    styles: ModuleStyles,
  },
  placeholderContent,
  conversionOutline,
};
