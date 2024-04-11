import {
  type BlogAttrs,
  type Module,
} from '@divi/types';

import {
  type ModuleEditProps,
} from '../types-module';


declare global {
  interface Window {
    divi: {
      scriptLibrary: {
        scriptLibrarySalvattore: {
          recreateColumns: (dom: HTMLElement) => void;
          registerGrid: (dom: HTMLElement) => void;
        }
      }
    }
  }
}


export type BlogEditProps = ModuleEditProps<BlogAttrs>;

export type BlogFieldCallbackParams = Module.Settings.Field.CallbackParams<BlogAttrs>;
