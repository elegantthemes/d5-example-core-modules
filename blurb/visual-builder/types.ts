import {
  type BlurbAttrs,
  type Module,
} from '@divi/types';

import {
  type ModuleEditProps,
} from '../types-module';


export type BlurbEditProps = ModuleEditProps<BlurbAttrs>;

export type BlurbFieldCallbackParams = Module.Settings.Field.CallbackParams<BlurbAttrs>;
