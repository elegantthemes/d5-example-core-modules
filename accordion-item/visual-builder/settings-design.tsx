import React, {
  type ReactElement,
  useContext,
} from 'react';
import { set } from 'lodash';

import { moduleContext } from '@divi/context-library';
import { useSelect } from '@divi/data';
import {
  ModuleGroups,
} from '@divi/module';
import { mergeAttrs } from '@divi/module-utils';
import {
  type AccordionAttrs,
  type AccordionItemAttrs,
  type Module,
} from '@divi/types';


export const SettingsDesign = ({
  defaultSettingsAttrs,
  groupConfiguration,
}: Module.Settings.Panel.Props<AccordionItemAttrs, AccordionAttrs>): ReactElement => {
  const { moduleId } = useContext(moduleContext);

  const {
    parentTitleFontAttr,
    parentClosedToggleTitleFontAttr,
  } = useSelect(selectStore => {
    const parentModuleId = selectStore('divi/edit-post').getParentModuleId(moduleId);

    return {
      parentTitleFontAttr:             selectStore('divi/edit-post').getModuleAttr<AccordionAttrs['title']['decoration']['font']>(parentModuleId, 'title.decoration.font'),
      parentClosedToggleTitleFontAttr: selectStore('divi/edit-post').getModuleAttr<AccordionAttrs['closedToggle']['decoration']['font']>(parentModuleId, 'closedToggle.decoration.font'),
    };
  });

  let defaultTitleFont             = defaultSettingsAttrs?.title?.decoration?.font?.asMutable({ deep: true }) ?? {};
  let defaultClosedToggleTitleFont = defaultSettingsAttrs?.closedToggle?.decoration?.font?.asMutable({
    deep: true,
  }) ?? {};

  defaultTitleFont = mergeAttrs({
    defaultAttrs: defaultTitleFont,
    attrs:        parentTitleFontAttr?.asMutable({ deep: true }) ?? {},
  });

  defaultClosedToggleTitleFont = mergeAttrs({
    defaultAttrs: defaultClosedToggleTitleFont,
    attrs:        parentClosedToggleTitleFontAttr?.asMutable({ deep: true }) ?? {},
  });

  // Insert defaultGroupAttr value to `designTitleText` group.
  if (groupConfiguration?.designTitleText?.component?.props) {
    set(groupConfiguration, ['designTitleText', 'component', 'props', 'fields', 'titleDecorationFont', 'component', 'props', 'defaultGroupAttr'], defaultTitleFont);
  }

  // Insert defaultGroupAttr value to `designClosedToggleText` group.
  if (groupConfiguration?.designClosedToggleText?.component?.props) {
    set(groupConfiguration, ['designClosedToggleText', 'component', 'props', 'fields', 'font', 'component', 'props', 'defaultGroupAttr'], defaultClosedToggleTitleFont);
  }

  return (
    <ModuleGroups
      groups={groupConfiguration}
    />
  );
};
