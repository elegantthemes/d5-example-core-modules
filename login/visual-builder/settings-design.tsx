/* eslint-disable @typescript-eslint/naming-convention */
import React, { type ReactElement } from 'react';
import { set } from 'lodash';

import {
  ModuleGroups,
} from '@divi/module';
import {
  getAttrValue,
} from '@divi/module-utils';
import {
  type LoginAttrs,
  type Module,
} from '@divi/types';

/**
 * Design panel component for the Menu module settings modal.
 *
 * @since ??
 *
 * @param {Module.Settings.Panel.Props} param0 Design panel props.
 *
 * @returns {ReactElement}
 */
export const SettingsDesign = ({
  groupConfiguration,
}: Module.Settings.Panel.Props<LoginAttrs>): ReactElement => {
  const useFocusBordersCallback = (
    params: Module.Settings.Group.VisibleCallback.Params<LoginAttrs>,
  ) => {
    const useFocusBorderValue = getAttrValue({
      attr:            params?.attrs?.field?.advanced?.focusUseBorder,
      baseBreakpoint:  params?.baseBreakpoint,
      breakpoint:      params?.breakpoint,
      breakpointNames: params?.breakpointNames,
      state:           params?.state,
    });
    const useFocusBorders     = params?.isActivePreset ? true : 'on' === useFocusBorderValue;

    return useFocusBorders;
  };

  // Insert props value to `designFieldField` group.
  if (groupConfiguration?.designFieldField?.component?.props) {
    set(groupConfiguration, ['designFieldField', 'component', 'props', 'fields', 'focusBorderGroup', 'component', 'props', 'visible'], useFocusBordersCallback);
  }

  return (
    <ModuleGroups
      groups={groupConfiguration}
    />
  );
};
