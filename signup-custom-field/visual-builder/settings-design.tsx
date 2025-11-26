/* eslint-disable @typescript-eslint/naming-convention */
import React, { type ReactElement } from 'react';
import { set } from 'lodash';

import {
  ModuleGroups,
} from '@divi/module';
import { getAttrValue } from '@divi/module-utils';
import {
  type ContactFieldAttrs,
  type Module,
} from '@divi/types';

/**
 * Design panel component for the signup custom field module settings modal.
 *
 * @since ??
 *
 * @param {Module.Settings.Panel.Props} param0 Design panel props.
 *
 * @returns {ReactElement}
 */
export const SettingsDesign = ({
  groupConfiguration,
}: Module.Settings.Panel.Props<ContactFieldAttrs>): ReactElement => {
  const useFocusBorderCallback = (
    params: Module.Settings.Group.VisibleCallback.Params<ContactFieldAttrs>,
  ) => {
    const useFocusBorder = getAttrValue({
      attr:            params?.attrs?.field?.advanced?.focusUseBorder,
      baseBreakpoint:  params?.baseBreakpoint,
      breakpoint:      params?.breakpoint,
      breakpointNames: params?.breakpointNames,
      state:           params?.state,
    }) ?? 'off';

    return 'on' === useFocusBorder;
  };

  // Insert props value to `designFieldField` group.
  if (groupConfiguration?.designFieldField?.component?.props) {
    set(groupConfiguration, ['designFieldField', 'component', 'props', 'fields', 'focusFont', 'component', 'props', 'fields', 'size', 'visible'], false);
    set(groupConfiguration, ['designFieldField', 'component', 'props', 'fields', 'focusFont', 'component', 'props', 'fields', 'letterSpacing', 'visible'], false);
    set(groupConfiguration, ['designFieldField', 'component', 'props', 'fields', 'focusFont', 'component', 'props', 'fields', 'lineHeight', 'visible'], false);
  }

  if (groupConfiguration?.designBorder?.component?.props) {
    set(groupConfiguration, ['designBorder', 'component', 'props', 'fields', 'focusBorderGroup', 'component', 'props', 'visible'], useFocusBorderCallback);
  }

  return (
    <ModuleGroups
      groups={groupConfiguration}
    />
  );
};
