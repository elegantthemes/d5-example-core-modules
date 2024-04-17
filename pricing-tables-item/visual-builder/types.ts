import { type ImmutableObject } from 'seamless-immutable';

import {
  type Module,
  type PricingTableAttrs,
  type PricingTablesAttrs,
} from '@divi/types';

import {
  type ModuleEditProps,
} from '../types-module';


declare global {
  interface Window {

    // Note. Here we have used this naming convention because we are using D4 function.
    // eslint-disable-next-line @typescript-eslint/naming-convention
    et_fix_pricing_currency_position?: ($pricingTable: JQuery<HTMLElement>) => ReturnType<typeof setTimeout>;
  }
}


export type PricingTableEditProps = ModuleEditProps<PricingTableAttrs, PricingTablesAttrs>;

export type PricingTableFieldCallbackParams = Module.Settings.Field.CallbackParams<PricingTableAttrs>;

export interface PricingTableSettingsDesign {
  parentAttrs?: ImmutableObject<PricingTablesAttrs>;
}
