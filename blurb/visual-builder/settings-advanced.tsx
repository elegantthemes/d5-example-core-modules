import React, { type ReactElement } from 'react';
import { set } from 'lodash';

import { ModuleGroups } from '@divi/module';
import {
  type BlurbAttrs,
  type Module,
} from '@divi/types';


export const SettingsAdvanced = ({
  attrs,
  groupConfiguration,
}: Module.Settings.Panel.Props<BlurbAttrs>):ReactElement => {
  // Show Attributes.
  const showAttributes = 'on' !== attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon;


  // Insert props value to `advancedAttributes` group.
  if (groupConfiguration?.advancedAttributes?.component?.props) {
    set(groupConfiguration, ['advancedAttributes', 'component', 'props', 'visible'], showAttributes);
  }

  return (
    <ModuleGroups
      groups={groupConfiguration}
    />
  );
};
