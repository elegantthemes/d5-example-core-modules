import {
  type ContactFormAttrs,
} from '@divi/types';

import {
  type ModuleEditProps,
} from '../types-module';


export interface ContactFormEditProps extends ModuleEditProps<ContactFormAttrs> {
  urls?: {
    admin: string;
    ajax: string;
    adminOptionsGeneralUrl: string;
    currentPageUrl: string;
    forgotPasswordUrl: string;
    homeUrl: string;
    loginFormUrl: string;
  };
}
