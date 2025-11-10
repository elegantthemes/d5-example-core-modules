import { addFilter } from '@wordpress/hooks';

import { elementsCallbacks } from '@divi/module-utils';
import {
  type ContactFieldAttrs,
  type ModuleLibrary,
} from '@divi/types';

import { isParentBlockLayoutCallback } from './callbacks';
import {
  conversionOutline,
} from './conversion-outline';
import {
  ContactFieldEdit,
} from './edit';
import {
  contactFieldModuleMetaData,
} from './module.json-source';
import { contactFieldModuleDefaultPrintedStyleAttributes } from './module-default-printed-style-attributes.json-source';
import { contactFieldModuleDefaultRenderAttributes } from './module-default-render-attributes.json-source';
import { ModuleStyles } from './module-styles';
import {
  placeholderContent,
} from './placeholder-content';
import {
  SettingsContent,
} from './settings-content';
import {
  SettingsDesign,
} from './settings-design';
import {
  generateCloneFieldId,
  generateNewFieldId,
} from './utils';


addFilter('divi.cloneModule.attrs', 'divi', generateCloneFieldId);
addFilter('divi.addModule.attrs', 'divi', generateNewFieldId);

/**
 * Contact Field module.
 *
 * @since ??
 */
export const contactField: ModuleLibrary.Module.RegisterDefinition<ContactFieldAttrs> = {
  metadata:                 contactFieldModuleMetaData,
  defaultAttrs:             contactFieldModuleDefaultRenderAttributes,
  defaultPrintedStyleAttrs: contactFieldModuleDefaultPrintedStyleAttributes,
  renderers:                {
    edit:   ContactFieldEdit,
    styles: ModuleStyles,
  },
  settings: {
    content: SettingsContent,
    design:  SettingsDesign,
  },
  callbacks: {
    content: {
      elements: elementsCallbacks,
    },
    design: {
      designLayout: {
        fields: {
          fieldItemAdvancedFullwidth: {
            visible: isParentBlockLayoutCallback,
          },
        },
      },
    },
  },
  parentsName: ['divi/contact-form'],
  placeholderContent,
  conversionOutline,
};
