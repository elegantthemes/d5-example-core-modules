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
  groupConfiguration,
  defaultSettingsAttrs,
}: Module.Settings.Panel.Props<BlurbAttrs>): ReactElement => {
  // Show Icon or Image.
  const showImageCallback = (params: Module.Settings.Field.CallbackParams<BlurbAttrs>) => {
    const { attrs }      = params;
    const useIconDefault = defaultSettingsAttrs?.imageIcon?.innerContent?.desktop?.value?.useIcon;
    const useIcon        = attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon;
    const showIcon       = 'on' === (useIcon ?? useIconDefault);
    const showImage      = ! showIcon;

    return showImage;
  };

  const showIconCallback = (params: Module.Settings.Field.CallbackParams<BlurbAttrs>) => {
    const { attrs }      = params;
    const useIconDefault = defaultSettingsAttrs?.imageIcon?.innerContent?.desktop?.value?.useIcon;
    const useIcon        = attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon;
    const showIcon       = 'on' === (useIcon ?? useIconDefault);

    return showIcon;
  };

  // Insert props value to `imageIcon` group.
  if (groupConfiguration?.contentImageIcon?.component?.props) {
    set(groupConfiguration, ['contentImageIcon', 'component', 'props', 'fields', 'src', 'visible'], showImageCallback);
    set(groupConfiguration, ['contentImageIcon', 'component', 'props', 'fields', 'icon', 'visible'], showIconCallback);
  }

  return (
    <ModuleGroups
      groups={groupConfiguration}
    />
  );
};
