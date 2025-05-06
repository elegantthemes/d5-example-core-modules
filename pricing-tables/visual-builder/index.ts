import { addFilter } from '@wordpress/hooks';

import {
  type ModuleLibrary,
  type PricingTablesAttrs,
} from '@divi/types';

import { conversionOutline } from './conversion-outline';
import { PricingTablesEdit } from './edit';
import { pricingTablesModuleMetaData } from './module.json-source';
import { pricingTablesModuleDefaultPrintedStyleAttributes } from './module-default-printed-style-attributes.json-source';
import { pricingTablesModuleDefaultRenderAttributes } from './module-default-render-attributes.json-source';
import { ModuleStyles } from './module-styles';
import {
  optionGroupPresetPrimaryAttrNameResolverPricingTables,
} from './option-group-preset-resolver';

// Register the filters for Option Group Preset Data Resolver.
addFilter('divi.optionGroupPresetPrimaryAttrNameResolver.diviPricingTables', 'divi', optionGroupPresetPrimaryAttrNameResolverPricingTables);

export const pricingTables: ModuleLibrary.Module.RegisterDefinition<PricingTablesAttrs> = {
  metadata:                 pricingTablesModuleMetaData,
  defaultAttrs:             pricingTablesModuleDefaultRenderAttributes,
  defaultPrintedStyleAttrs: pricingTablesModuleDefaultPrintedStyleAttributes,
  renderers:                {
    edit:   PricingTablesEdit,
    styles: ModuleStyles,
  },
  template: [
    ['divi/pricing-table', {}],
    ['divi/pricing-table', {}],
  ],
  conversionOutline,
};
