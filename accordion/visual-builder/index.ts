import { addFilter } from '@wordpress/hooks';

import {
  type AccordionAttrs,
  type AccordionItemAttrs,
  type ModuleLibrary,
} from '@divi/types';

import {
  onAddItem,
  onChange,
  onDuplicateItem,
  onRemoveItem,
} from './callbacks';
import { conversionOutline } from './conversion-outline';
import { AccordionEdit } from './edit';
import { accordionModuleMetaData } from './module.json-source';
import { accordionModuleDefaultPrintedStyleAttributes } from './module-default-printed-style-attributes.json-source';
import { accordionModuleDefaultRenderAttributes } from './module-default-render-attributes.json-source';
import { ModuleStyles } from './module-styles';
import {
  optionGroupPresetPrimaryAttrNameResolverAccordion,
} from './option-group-preset-resolver';

// Register the filters for Option Group Preset Data Resolver.
addFilter('divi.optionGroupPresetPrimaryAttrNameResolver.diviAccordion', 'divi', optionGroupPresetPrimaryAttrNameResolverAccordion);

/**
 * Accordion module.
 *
 * @since ??
 */
export const accordion: ModuleLibrary.Module.RegisterDefinition<AccordionAttrs, AccordionItemAttrs> = {
  metadata:                 accordionModuleMetaData,
  defaultAttrs:             accordionModuleDefaultRenderAttributes,
  defaultPrintedStyleAttrs: accordionModuleDefaultPrintedStyleAttributes,
  renderers:                {
    edit:   AccordionEdit,
    styles: ModuleStyles,
  },
  callbacks: {
    content: {
      'divi/accordion-item': {
        onAddCallback:       onAddItem,
        onChangeCallback:    onChange,
        onDuplicateCallback: onDuplicateItem,
        onRemoveCallback:    onRemoveItem,
      },
    },
  },
  template: [
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
