import React, {
  Fragment,
  type ReactElement,
} from 'react';

import {
  type ModuleScriptDataProps,
} from '@divi/module';
import {
  type SignupCustomFieldAttrs,
} from '@divi/types';

/**
 * Set script data to the module.
 *
 * @since ??
 *
 * @returns {ReactElement}
 */
export const ModuleScriptData = ({
  elements,
}: ModuleScriptDataProps<SignupCustomFieldAttrs>): ReactElement => (
  <Fragment>
    {elements.scriptData({
      attrName: 'module',
    })}
  </Fragment>
);
