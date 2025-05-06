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
  groupConfiguration,
}: Module.Settings.Panel.Props<BlurbAttrs>): ReactElement => {
  // Show Icon or Image.
  const showIconCallback = (params: Module.Settings.Field.CallbackParams<BlurbAttrs>) => {
    const { attrs } = params;
    const showIcon  = params?.isActivePreset ? true : 'on' === attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon;

    return showIcon;
  };

  const showImageCallback = (params: Module.Settings.Field.CallbackParams<BlurbAttrs>) => {
    const { attrs } = params;
    const showImage = params?.isActivePreset ? true : 'on' !== attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon;

    return showImage;
  };

  const imageIconPlacementCallback = (params: Module.Settings.Field.CallbackParams<BlurbAttrs>) => {
    const { attrs }          = params;
    const imageIconPlacement = params?.isActivePreset ? true : attrs?.imageIcon?.advanced?.placement?.desktop?.value;

    return 'left' !== imageIconPlacement;
  };

  // Insert props value to `imageIcon` group.
  if (groupConfiguration?.designImageIcon?.component?.props) {
    set(groupConfiguration, ['designImageIcon', 'component', 'props', 'clipboardCategory'], 'style');
    set(groupConfiguration, ['designImageIcon', 'component', 'props', 'fields', 'imageIconAdvancedColor', 'visible'], showIconCallback);
    set(groupConfiguration, ['designImageIcon', 'component', 'props', 'fields', 'icon', 'visible'], showIconCallback);
    set(groupConfiguration, ['designImageIcon', 'component', 'props', 'fields', 'image', 'visible'], showImageCallback);
    set(groupConfiguration, ['designImageIcon', 'component', 'props', 'fields', 'imageIconAdvancedAlignment', 'visible'], imageIconPlacementCallback);
    set(groupConfiguration, ['designImageIcon', 'component', 'props', 'fields', 'imageIconDecorationBoxshadow', 'component', 'props', 'visible'], showImageCallback);
  }

  return (
    <ModuleGroups
      groups={groupConfiguration}
    />
  );
};
