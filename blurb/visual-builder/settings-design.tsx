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
 * Design panel component for the Blurb module settings modal.
 *
 * @since ??
 *
 * @param {Module.Settings.Panel.Props} param0 Design panel props.
 *
 * @returns {ReactElement}
 */
export const SettingsDesign = ({
  attrs,
  groupConfiguration,
}: Module.Settings.Panel.Props<BlurbAttrs>): ReactElement => {
  // Show Icon or Image.
  const showIcon  = 'on' === attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon;
  const showImage = 'on' !== attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon;
  const imageIconPlacement = attrs?.imageIcon?.advanced?.placement?.desktop?.value;


  // Insert props value to `imageIcon` group.
  if (groupConfiguration?.designImageIcon?.component?.props) {
    set(groupConfiguration, ['designImageIcon', 'component', 'props', 'fields', 'imageIconAdvancedColor', 'visible'], showIcon);
    set(groupConfiguration, ['designImageIcon', 'component', 'props', 'fields', 'icon', 'visible'], showIcon);
    set(groupConfiguration, ['designImageIcon', 'component', 'props', 'fields', 'image', 'visible'], showImage);
    set(groupConfiguration, ['designImageIcon', 'component', 'props', 'fields', 'imageIconAdvancedAlignment', 'visible'], 'left' !== imageIconPlacement);
    set(groupConfiguration, ['designImageIcon', 'component', 'props', 'fields', 'imageIconDecorationBoxshadow', 'component', 'props', 'visible'], showImage);
  }

  return (
    <ModuleGroups
      groups={groupConfiguration}
    />
  );
};
