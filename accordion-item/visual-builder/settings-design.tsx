import React, { type ReactElement } from 'react';

import { __ } from '@wordpress/i18n';

import {
  ColorPickerContainer,
} from '@divi/field-library';
import { GroupContainer } from '@divi/modal';
import {
  BorderGroup,
  BoxShadowGroup,
  FieldContainer,
  FiltersGroup,
  FontBodyGroup,
  FontGroup,
  IconGroup,
  SizingGroup,
  SpacingGroup,
  TextGroup,
  TransformGroup,
} from '@divi/module';
import { mergeAttrs } from '@divi/module-utils';
import {
  type AccordionAttrs,
  type AccordionItemAttrs,
  type Module,
} from '@divi/types';


export const SettingsDesign = ({
  parentAttrs,
  defaultSettingsAttrs,
}: Module.Settings.Panel.Props<AccordionItemAttrs, AccordionAttrs>): ReactElement => {
  let defaultTitleFont             = defaultSettingsAttrs?.title?.decoration?.font?.asMutable({ deep: true }) ?? {};
  let defaultClosedToggleTitleFont = defaultSettingsAttrs?.closedToggle?.decoration?.font?.asMutable({
    deep: true,
  }) ?? {};

  defaultTitleFont = mergeAttrs({
    defaultAttrs: defaultTitleFont,
    attrs:        parentAttrs?.title?.decoration?.font?.asMutable({ deep: true }) ?? {},
  });

  defaultClosedToggleTitleFont = mergeAttrs({
    defaultAttrs: defaultClosedToggleTitleFont,
    attrs:        parentAttrs?.closedToggle?.decoration?.font?.asMutable({ deep: true }) ?? {},
  });

  return (
    (
      <React.Fragment>
        <IconGroup
          attrName="closedToggleIcon.decoration.icon"
          defaultGroupAttr={defaultSettingsAttrs?.closedToggleIcon?.decoration?.icon}
          fieldLabel={__('Closed Icon', 'et_builder')}
        />
        <GroupContainer id="toggle" title={__('Toggle', 'et_builder')}>
          <FieldContainer
            attrName="openToggle.decoration.background"
            subName="color"
            label={__('Open Toggle Background Color', 'et_builder')}
            description={__('You can pick unique background colors for toggles when they are in their open and closed states. Choose the open state background color here.', 'et_builder')}
            features={{
              sticky: false,
            }}
          >
            <ColorPickerContainer />
          </FieldContainer>
          <FieldContainer
            attrName="closedToggle.decoration.background"
            subName="color"
            label={__('Closed Toggle Background Color', 'et_builder')}
            description={__('You can pick unique background colors for toggles when they are in their open and closed states. Choose the closed state background color here.', 'et_builder')}
            features={{
              sticky: false,
            }}
          >
            <ColorPickerContainer />
          </FieldContainer>
        </GroupContainer>
        <TextGroup
          fields={{
            color: {
              render: false,
            },
          }}
        />
        <GroupContainer id="titleFont" title={__('Title Text', 'et_builder')}>
          <FieldContainer
            attrName="openToggle.decoration.font.font"
            subName="color"
            label={__('Open Title Text Color', 'et_builder')}
            description={__('You can pick unique text colors for toggle titles when they are open and closed. Choose the open state title color here.', 'et_builder')}
            features={{
              sticky: false,
            }}
          >
            <ColorPickerContainer />
          </FieldContainer>
          <FontGroup
            attrName="title.decoration.font"
            groupLabel={__('Title Text', 'et_builder')}
            fields={{
              headingLevel: {
                render: true,
              },
            }}
            grouped={false}
            defaultGroupAttr={defaultTitleFont}
          />
        </GroupContainer>
        <FontGroup
          attrName="closedToggle.decoration.font"
          groupLabel={__('Closed Title Text', 'et_builder')}
          defaultGroupAttr={defaultClosedToggleTitleFont}
        />
        <FontBodyGroup
          attrName="content.decoration.bodyFont"
        />
        <SizingGroup />
        <SpacingGroup />
        <BorderGroup />
        <BoxShadowGroup />
        <FiltersGroup />
        <TransformGroup />
      </React.Fragment>
    )
  );
};
