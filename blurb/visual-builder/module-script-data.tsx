import React, {
  Fragment,
  type ReactElement,
} from 'react';

import {
  type ScriptDataProps,
} from '@divi/module';
import { type BlurbAttrs } from '@divi/types';


/**
 * Blurb module's script data component.
 *
 * @since ??
 *
 * @returns {ReactElement}
 */
export const ModuleScriptData = <TProps extends ScriptDataProps<BlurbAttrs>>({
  elements,
}: TProps): ReactElement => (
  <Fragment>
    {elements.scriptData({
      attrName: 'module',
    })}
  </Fragment>
  );
