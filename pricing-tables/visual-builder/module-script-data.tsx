import React, {
  Fragment,
  type ReactElement,
} from 'react';

import {
  type ScriptDataProps,
} from '@divi/module';
import { type PricingTablesAttrs } from '@divi/types';


/**
 * Pricing Tables module's script data component.
 *
 * @since ??
 *
 * @returns {ReactElement}
 */
export const ModuleScriptData = <TProps extends ScriptDataProps<PricingTablesAttrs>>({
  elements,
}: TProps): ReactElement => (
  <Fragment>
    {elements.scriptData({
      attrName: 'module',
    })}
  </Fragment>
  );
