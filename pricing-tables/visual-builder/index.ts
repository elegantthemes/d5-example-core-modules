import {
  type ModuleLibrary,
  type PricingTablesAttrs,
} from '@divi/types';

import { conversionOutline } from './conversion-outline';
import { PricingTablesEdit } from './edit';
import { pricingTablesModuleMetaData } from './module.json-source';
import { pricingTablesModuleDefaultPrintedStyleAttributes } from './module-default-printed-style-attributes.json-source';
import { pricingTablesModuleDefaultRenderAttributes } from './module-default-render-attributes.json-source';


export const pricingTables: ModuleLibrary.Module.RegisterDefinition<PricingTablesAttrs> = {
  metadata:                 pricingTablesModuleMetaData,
  defaultAttrs:             pricingTablesModuleDefaultRenderAttributes,
  defaultPrintedStyleAttrs: pricingTablesModuleDefaultPrintedStyleAttributes,
  renderers:                {
    edit: PricingTablesEdit,
  },
  childrenName: ['divi/pricing-table'],
  template:     [
    ['divi/pricing-table', {}],
    ['divi/pricing-table', {}],
  ],
  conversionOutline,
};
