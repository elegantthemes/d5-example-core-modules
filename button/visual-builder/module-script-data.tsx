import React, {
  Fragment,
  type ReactElement,
} from 'react';

import {
  type ScriptDataProps,
} from '@divi/module';
import { type ButtonAttrs } from '@divi/types';


/**
 * Button module's script data component.
 *
 * @since ??
 *
 * @returns {ReactElement}
 */
export const ModuleScriptData = <TProps extends ScriptDataProps<ButtonAttrs>>({
  elements,
}: TProps): ReactElement => (
  <Fragment>
    {elements.scriptData({
      attrName: 'module',
    })}
  </Fragment>
  );
