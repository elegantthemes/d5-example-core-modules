import {
  type AccordionAttrs,
  type Module,
} from '@divi/types';

import {
  type ModuleEditProps,
} from '../types-module';


export type AccordionEditProps = ModuleEditProps<AccordionAttrs>;

export type AccordionFieldCallbackParams = Module.Settings.Field.CallbackParams<AccordionAttrs>;
