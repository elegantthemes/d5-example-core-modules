import React, { type ReactElement } from 'react';
import { set } from 'lodash';

import { ModuleGroups } from '@divi/module';
import {
  type BlurbAttrs,
  type Module,
} from '@divi/types';


export const SettingsAdvanced = ({
  groupConfiguration,
}: Module.Settings.Panel.Props<BlurbAttrs>):ReactElement => {
  const showAttributesCallback = (
    params: Module.Settings.Group.VisibleCallback.Params<BlurbAttrs>,
  ): Module.Settings.Group.VisibleCallback.ReturnValue => {
    // Show Attributes.
    const showAttributes = params?.isActivePreset ? true : 'on' !== params?.attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon;

    return showAttributes;
  };


  // Insert props value to `advancedAttributes` group.
  if (groupConfiguration?.advancedAttributes?.component?.props) {
    set(groupConfiguration, ['advancedAttributes', 'component', 'props', 'visible'], showAttributesCallback);
  }

  return (
    <ModuleGroups
      groups={groupConfiguration}
    />
  );
};
