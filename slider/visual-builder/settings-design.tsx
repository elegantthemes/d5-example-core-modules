import React, { type ReactElement } from 'react';
import { set } from 'lodash';

import {
  ModuleGroups,
  onRadiusChange,
} from '@divi/module';
import { sizingUnits } from '@divi/style-library';
import {
  type Module,
  type SliderAttrs,
} from '@divi/types';

import {
  onAutomaticAnimation,
  onUseBackgroundOverlay,
  onUseTextOverlay,
} from './callbacks';


/**
 * Design panel component for the Slider module settings modal.
 *
 * @since ??
 *
 * @param {Module.Settings.Panel.Props} param0 Design panel props.
 *
 * @returns {ReactElement}
 */
export const SettingsDesign = ({
  groupConfiguration,
}: Module.Settings.Panel.Props<SliderAttrs>): ReactElement => {
  // Insert prop value into `designOverlay` group.
  if (groupConfiguration?.designOverlay?.component) {
    set(groupConfiguration, ['designOverlay', 'component', 'props', 'fields', 'contentOverlayUseBackground', 'visible'], onUseBackgroundOverlay);
    set(groupConfiguration, ['designOverlay', 'component', 'props', 'fields', 'contentOverlayUseText', 'visible'], onUseTextOverlay);

    set(groupConfiguration, ['designOverlay', 'component', 'props', 'fields', 'childrenDecorationBorder', 'visible'], onUseTextOverlay);
    set(groupConfiguration, ['designOverlay', 'component', 'props', 'fields', 'childrenDecorationBorder', 'onChange'], onRadiusChange);
  }

  // Insert prop value into `designAnimation` group.
  if (groupConfiguration?.designAnimation?.component) {
    set(groupConfiguration, ['designAnimation', 'component', 'props', 'fields', 'moduleAdvancedAutospeed', 'visible'], onAutomaticAnimation);
    set(groupConfiguration, ['designAnimation', 'component', 'props', 'fields', 'moduleAdvancedAutoignorehover', 'visible'], onAutomaticAnimation);
  }

  // Insert prop value into `designSizing` group.
  if (groupConfiguration?.designSizing?.component) {
    set(groupConfiguration, ['designSizing', 'component', 'props', 'fields', 'width', 'component', 'props', 'allowedUnits'], sizingUnits);
    set(groupConfiguration, ['designSizing', 'component', 'props', 'fields', 'maxWidth', 'component', 'props', 'allowedUnits'], sizingUnits);
  }

  return (
    <ModuleGroups
      groups={groupConfiguration}
    />
  );
};
