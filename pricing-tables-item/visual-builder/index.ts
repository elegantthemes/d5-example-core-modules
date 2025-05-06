import {
  type ModuleLibrary,
  type PricingTableAttrs,
} from '@divi/types';

import { conversionOutline } from './conversion-outline';
import { PricingTableEdit } from './edit';
import { pricingTableModuleMetaData } from './module.json-source';
import { pricingTableModuleDefaultPrintedStyleAttributes } from './module-default-printed-style-attributes.json-source';
import { pricingTableModuleDefaultRenderAttributes } from './module-default-render-attributes.json-source';
import { ModuleStyles } from './module-styles';
import { placeholderContent } from './placeholder-content';


export const pricingTable: ModuleLibrary.Module.RegisterDefinition<PricingTableAttrs> = {
  metadata:                 pricingTableModuleMetaData,
  defaultAttrs:             pricingTableModuleDefaultRenderAttributes,
  defaultPrintedStyleAttrs: pricingTableModuleDefaultPrintedStyleAttributes,
  renderers:                {
    edit:   PricingTableEdit,
    styles: ModuleStyles,
  },
  parentsName: ['divi/pricing-tables'],
  placeholderContent,
  conversionOutline,
};
