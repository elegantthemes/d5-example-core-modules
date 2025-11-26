import React, { type ReactElement } from 'react';
import { set } from 'lodash';

import {
  ModuleGroups,
} from '@divi/module';
import {
  getAttrValue,
} from '@divi/module-utils';
import {
  type Module,
  type SignupAttrs,
} from '@divi/types';

/**
 * Design panel component for the Email Optin module settings modal.
 *
 * @since ??
 *
 * @param {Module.Settings.Panel.Props} param0 Design panel props.
 *
 * @returns {ReactElement}
 */
export const SettingsDesign = ({
  groupConfiguration,
}: Module.Settings.Panel.Props<SignupAttrs>): ReactElement => {
  const useFocusBordersCallback = (
    params: Module.Settings.Group.VisibleCallback.Params<SignupAttrs>,
  ) => {
    const useFocusBorderValue = getAttrValue({
      attr:            params?.attrs?.field?.advanced?.focusUseBorder,
      baseBreakpoint:  params?.baseBreakpoint,
      breakpoint:      params?.breakpoint,
      breakpointNames: params?.breakpointNames,
      state:           params?.state,
    });
    const useFocusBorders     = 'on' === useFocusBorderValue || params?.isActivePreset;

    return useFocusBorders;
  };

  const singleNameFieldCallback = (
    params: Module.Settings.Field.CallbackParams<SignupAttrs>,
  ) => {
    const singleNameField = getAttrValue({
      attr:            params?.attrs?.field?.advanced?.nameField,
      baseBreakpoint:  params?.baseBreakpoint,
      breakpoint:      params?.breakpoint,
      breakpointNames: params?.breakpointNames,
      state:           params?.state,
    }) ?? 'off';

    return 'on' === singleNameField;
  };

  // Insert props value to `designFieldField` group.
  if (groupConfiguration?.designFieldField?.component?.props) {
    set(groupConfiguration, ['designFieldField', 'component', 'props', 'fields', 'focusBorderGroup', 'component', 'props', 'visible'], useFocusBordersCallback);
  }

  // Insert props value to `designLayout` group.
  if (groupConfiguration?.designLayout?.component?.props) {
    set(groupConfiguration, ['designLayout', 'component', 'props', 'fields', 'fieldAdvancedNamefullwidth', 'visible'], singleNameFieldCallback);
  }

  return (
    <ModuleGroups
      groups={groupConfiguration}
    />
  );
};
