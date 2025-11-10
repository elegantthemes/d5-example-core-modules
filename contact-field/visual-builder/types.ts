import {
  type ContactFieldAttrs,
} from '@divi/types';

import {
  type ModuleEditProps,
} from '../types-module';


export interface ContactFieldCondition {
  condition: string;
  field: string;
  value?: string;
}

export type ContactFieldEditProps = ModuleEditProps<ContactFieldAttrs>;
