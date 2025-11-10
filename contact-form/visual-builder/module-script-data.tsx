import React, {
  Fragment,
  type ReactElement,
} from 'react';

import {
  type ModuleScriptDataProps,
} from '@divi/module';
import {
  type ContactFormAttrs,
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
}: ModuleScriptDataProps<ContactFormAttrs>): ReactElement => (
  <Fragment>
    {elements.scriptData({
      attrName: 'module',
    })}
  </Fragment>
);
