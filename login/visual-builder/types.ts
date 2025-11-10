import { type LoginAttrs } from '@divi/types';

import {
  type ModuleEditProps,
} from '../types-module';


export interface LoginEditProps extends ModuleEditProps<LoginAttrs> {
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
