import React, {
  Fragment,
  type ReactElement,
} from 'react';

import {
  type ScriptDataProps,
} from '@divi/module';
import { type CtaAttrs } from '@divi/types';

/**
 * CTA module’s script data component.
 *
 * @since ??
 *
 * @returns {ReactElement}
 */
export const ModuleScriptData = <TProps extends ScriptDataProps<CtaAttrs>>({
  elements,
}: TProps): ReactElement => (
  <Fragment>
    {elements.scriptData({
      attrName: 'module',
    })}
  </Fragment>
  );
