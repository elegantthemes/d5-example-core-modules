import {
  type ButtonAttrs,
  type ModuleLibrary,
} from '@divi/types';

import { conversionOutline } from './conversion-outline';
import { ButtonEdit } from './edit';
import { buttonModuleMetaData } from './module.json-source';
import { buttonModuleDefaultPrintedStyleAttributes } from './module-default-printed-style-attributes.json-source';
import { buttonModuleDefaultRenderAttributes } from './module-default-render-attributes.json-source';
import { ModuleStyles } from './module-styles';
import { placeholderContent } from './placeholder-content';

/**
 * Button module.
 *
 * @since ??
 */
export const button: ModuleLibrary.Module.RegisterDefinition<ButtonAttrs> = {
  metadata:                 buttonModuleMetaData,
  defaultAttrs:             buttonModuleDefaultRenderAttributes,
  defaultPrintedStyleAttrs: buttonModuleDefaultPrintedStyleAttributes,
  renderers:                {
    edit:   ButtonEdit,
    styles: ModuleStyles,
  },
  placeholderContent,
  conversionOutline,
};
