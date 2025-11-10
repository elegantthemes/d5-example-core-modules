/* eslint-disable @typescript-eslint/naming-convention */
import React, { type ReactElement } from 'react';
import { set } from 'lodash';

import {
  ModuleGroups,
} from '@divi/module';
import {
  type ContactFormAttrs,
  type Module,
} from '@divi/types';

/**
 * Design panel component for the contact form module settings modal.
 *
 * @since ??
 *
 * @param {Module.Settings.Panel.Props} param0 Design panel props.
 *
 * @returns {ReactElement}
 */
export const SettingsDesign = ({
  groupConfiguration,
}: Module.Settings.Panel.Props<ContactFormAttrs>): ReactElement => {
  // Insert props value to `designFieldField` group.
  if (groupConfiguration?.designFieldField?.component?.props) {
    set(groupConfiguration, ['designFieldField', 'component', 'props', 'fields', 'fontTopGroup', 'component', 'props', 'fields', 'headingLevel', 'render'], false);
    set(groupConfiguration, ['designFieldField', 'component', 'props', 'fields', 'focusFont', 'component', 'props', 'fields', 'size', 'render'], false);
    set(groupConfiguration, ['designFieldField', 'component', 'props', 'fields', 'focusFont', 'component', 'props', 'fields', 'letterSpacing', 'render'], false);
    set(groupConfiguration, ['designFieldField', 'component', 'props', 'fields', 'focusFont', 'component', 'props', 'fields', 'lineHeight', 'render'], false);
    set(groupConfiguration, ['designFieldField', 'component', 'props', 'fields', 'focusBorderGroup', 'render'], false);
  }

  return (
    <ModuleGroups
      groups={groupConfiguration}
    />
  );
};
