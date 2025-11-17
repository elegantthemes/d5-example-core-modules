/* eslint-disable @typescript-eslint/naming-convention */
import React, { type ReactElement } from 'react';
import { set } from 'lodash';

import {
  ModuleGroups,
} from '@divi/module';
import {
  type ContactFieldAttrs,
  type Module,
} from '@divi/types';

/**
 * Design panel component for the contact field module settings modal.
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
  // Insert props value to `designFieldField` group.
  if (groupConfiguration?.designFieldField?.component?.props) {
    set(groupConfiguration, ['designFieldField', 'component', 'props', 'fields', 'focusFont', 'component', 'props', 'fields', 'size', 'visible'], false);
    set(groupConfiguration, ['designFieldField', 'component', 'props', 'fields', 'focusFont', 'component', 'props', 'fields', 'letterSpacing', 'visible'], false);
    set(groupConfiguration, ['designFieldField', 'component', 'props', 'fields', 'focusFont', 'component', 'props', 'fields', 'lineHeight', 'visible'], false);
  }

  return (
    <ModuleGroups
      groups={groupConfiguration}
    />
  );
};
