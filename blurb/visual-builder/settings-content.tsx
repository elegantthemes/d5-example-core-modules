import React, { type ReactElement } from 'react';
import { set } from 'lodash';

import {
  ModuleGroups,
} from '@divi/module';
import {
  type BlurbAttrs,
  type Module,
} from '@divi/types';


/**
 * Content panel component for the Search module settings modal.
 *
 * @since ??
 *
 * @param {Module.Settings.Panel.Props} param0 Content panel props.
 *
 * @returns {ReactElement}
 */
export const SettingsContent = ({
  attrs,
  groupConfiguration,
}: Module.Settings.Panel.Props<BlurbAttrs>): ReactElement => {
  // Show Icon or Image.
  const showIcon  = 'on' === attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon;
  const showImage = 'on' !== attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon;


  // Insert props value to `imageIcon` group.
  if (groupConfiguration?.contentImageIcon?.component?.props) {
    set(groupConfiguration, ['contentImageIcon', 'component', 'props', 'fields', 'src', 'visible'], showImage);
    set(groupConfiguration, ['contentImageIcon', 'component', 'props', 'fields', 'icon', 'visible'], showIcon);
  }

  return (
    <ModuleGroups
      groups={groupConfiguration}
    />
  );
};
