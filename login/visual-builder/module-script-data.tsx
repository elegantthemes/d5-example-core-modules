import React, {
  Fragment,
  type ReactElement,
} from 'react';

import {
  type ModuleScriptDataProps,
} from '@divi/module';
import { type LoginAttrs } from '@divi/types';

/**
 * Login module's script data component.
 *
 * @since ??
 *
 * @returns {ReactElement}
 */
export const ModuleScriptData = ({
  elements,
}: ModuleScriptDataProps<LoginAttrs>): ReactElement => (
  <Fragment>
    {elements.scriptData({
      attrName: 'module',
    })}
  </Fragment>
);
