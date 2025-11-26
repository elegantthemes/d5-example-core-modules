import {
  type ModuleMetadata,
} from '@divi/types';

import {
  signupModuleMetaData,
} from './module.json-source';

/**
 * Module custom CSS fields.
 *
 * @since ??
 *
 * @returns {object} Custom CSS fields.
 */
export const cssFields = ():ModuleMetadata['customCssFields'] => signupModuleMetaData?.customCssFields;
