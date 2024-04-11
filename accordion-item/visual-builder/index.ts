import {
  type AccordionItemAttrs,
  type ModuleLibrary,
} from '@divi/types';

import { conversionOutline } from './conversion-outline';
import { AccordionItemEdit } from './edit';
import { accordionItemModuleMetaData } from './module.json-source';
import { placeholderContent } from './placeholder-content';
import { SettingsAdvanced } from './settings-advanced';
import { SettingsContent } from './settings-content';
import { SettingsDesign } from './settings-design';

/**
 * Accordion Item module.
 *
 * @since ??
 */
export const accordionItem: ModuleLibrary.Module.RegisterDefinition<AccordionItemAttrs> = {
  metadata: accordionItemModuleMetaData,
  settings: {
    content:  SettingsContent,
    design:   SettingsDesign,
    advanced: SettingsAdvanced,
  },
  renderers: {
    edit: AccordionItemEdit,
  },
  parentsName: ['divi/accordion'],
  placeholderContent,
  conversionOutline,
};
