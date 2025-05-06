import { addFilter } from '@wordpress/hooks';

import {
  type AccordionItemAttrs,
  type ModuleLibrary,
} from '@divi/types';

import { conversionOutline } from './conversion-outline';
import { AccordionItemEdit } from './edit';
import { accordionItemModuleMetaData } from './module.json-source';
import { accordionItemModuleDefaultPrintedStyleAttributes } from './module-default-printed-style-attributes.json-source';
import { accordionItemModuleDefaultRenderAttributes } from './module-default-render-attributes.json-source';
import { ModuleStyles } from './module-styles';
import {
  optionGroupPresetPrimaryAttrNameResolverAccordionItem,
} from './option-group-preset-resolver';
import { placeholderContent } from './placeholder-content';
import { SettingsDesign } from './settings-design';

// Register the filters for Option Group Preset Data Resolver.
addFilter('divi.optionGroupPresetPrimaryAttrNameResolver.diviAccordionItem', 'divi', optionGroupPresetPrimaryAttrNameResolverAccordionItem);

/**
 * Accordion Item module.
 *
 * @since ??
 */
export const accordionItem: ModuleLibrary.Module.RegisterDefinition<AccordionItemAttrs> = {
  metadata:                 accordionItemModuleMetaData,
  defaultAttrs:             accordionItemModuleDefaultRenderAttributes,
  defaultPrintedStyleAttrs: accordionItemModuleDefaultPrintedStyleAttributes,
  settings:                 {
    design: SettingsDesign,
  },
  renderers: {
    edit:   AccordionItemEdit,
    styles: ModuleStyles,
  },
  parentsName: ['divi/accordion'],
  placeholderContent,
  conversionOutline,
};
