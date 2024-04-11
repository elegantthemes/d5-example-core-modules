import { type ImmutableObject } from 'seamless-immutable';

import {
  type AccordionAttrs,
  type AccordionItemAttrs,
  type Module,
} from '@divi/types';

import {
  type ModuleEditProps,
} from '../types-module';


export type AccordionItemEditProps = ModuleEditProps<AccordionItemAttrs, AccordionAttrs>;

export type AccordionItemFieldCallbackParams = Module.Settings.Field.CallbackParams<AccordionItemAttrs>;

export interface AccordionItemSettingsDesign {
  parentAttrs?: ImmutableObject<AccordionAttrs>;
}
