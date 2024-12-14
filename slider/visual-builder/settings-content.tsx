import React, { type ReactElement } from 'react';

import { __ } from '@wordpress/i18n';

import {
  DraggableListContainer,
  ToggleContainer,
} from '@divi/field-library';
import {
  AdminLabelGroup,
  BackgroundGroup,
  DraggableChildModuleListContainer,
  FieldContainer,
  GroupContainer,
  LinkGroup,
} from '@divi/module';
import {
  type Module,
  type SlideAttrs,
  type SliderAttrs,
} from '@divi/types';


export const SettingsContent = ({
  defaultSettingsAttrs,
}: Module.Settings.Panel.Props<SliderAttrs>):ReactElement => (
  <React.Fragment>
    <DraggableChildModuleListContainer
      childModuleName="divi/slide"
      addTitle={__('Add New Slide', 'et_builder')}
      itemTitleCallback={(attrs: SlideAttrs) => {
        const heading    = attrs?.title?.innerContent.desktop?.value;
        const adminTitle = attrs?.module?.meta?.adminLabel?.desktop?.value;
        let title        = __('New Slide', 'et_builder');

        if (adminTitle) {
          title = adminTitle;
        } else if (heading) {
          title = heading;
        }

        return title;
      }}
    >
      <DraggableListContainer />
    </DraggableChildModuleListContainer>
    <GroupContainer
      id="elements"
      title={__('Elements', 'et_builder')}
    >
      <FieldContainer
        attrName="arrows.advanced.show"
        label={__('Show Arrows', 'et_builder')}
        description={__('This setting will turn on and off the navigation arrows.', 'et_builder')}
        defaultAttr={defaultSettingsAttrs?.arrows?.advanced?.show}
        features={{
          sticky: false,
          preset: ['html'],
        }}
      >
        <ToggleContainer />
      </FieldContainer>
      <FieldContainer
        attrName="pagination.advanced.show"
        label={__('Show Controls', 'et_builder')}
        description={__('This setting will turn on and off the circle buttons at the bottom of the slider.', 'et_builder')}
        defaultAttr={defaultSettingsAttrs?.pagination?.advanced?.show}
        features={{
          sticky: false,
          preset: ['html'],
        }}
      >
        <ToggleContainer />
      </FieldContainer>
    </GroupContainer>
    <LinkGroup />
    <BackgroundGroup
      attrName="children.module.decoration.background"
      defaultGroupAttr={defaultSettingsAttrs?.children?.module?.decoration?.background?.asMutable({ deep: true })}
    />
    <AdminLabelGroup
      defaultGroupAttr={defaultSettingsAttrs?.module?.meta?.adminLabel}
    />
  </React.Fragment>
);
