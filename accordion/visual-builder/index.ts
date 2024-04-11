import {
  type AccordionAttrs,
  type AccordionItemAttrs,
  type ModuleLibrary,
} from '@divi/types';

import { conversionOutline } from './conversion-outline';
import { AccordionEdit } from './edit';
import { accordionModuleMetaData } from './module.json-source';
import { SettingsAdvanced } from './settings-advanced';
import { SettingsContent } from './settings-content';
import { SettingsDesign } from './settings-design';

/**
 * Accordion module.
 *
 * @since ??
 */
export const accordion: ModuleLibrary.Module.RegisterDefinition<AccordionAttrs, AccordionItemAttrs> = {
  metadata: accordionModuleMetaData,
  settings: {
    content:  SettingsContent,
    design:   SettingsDesign,
    advanced: SettingsAdvanced,
  },
  renderers: {
    edit: AccordionEdit,
  },
  childrenName: ['divi/accordion-item'],
  template:     [
    ['divi/accordion-item', {
      module: {
        advanced: {
          open: {
            desktop: {
              value: 'on',
            },
          },
        },
      },
    }],
    ['divi/accordion-item', {}],
  ],
  conversionOutline,
};
