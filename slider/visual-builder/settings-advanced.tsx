import React, { type ReactElement } from 'react';

import { __ } from '@wordpress/i18n';

import { ToggleContainer } from '@divi/field-library';
import {
  AttributesGroup,
  ConditionsGroup,
  CssGroup,
  FieldContainer,
  GroupContainer,
  IdClassesGroup,
  PositionSettingsGroup,
  ScrollSettingsGroup,
  TransitionGroup,
  VisibilitySettingsGroup,
} from '@divi/module';
import {
  type Module,
  type SliderAttrs,
} from '@divi/types';

import { cssFields } from './custom-css';


const moduleClassName = '.et_pb_slider';

export const SettingsAdvanced = ({
  defaultSettingsAttrs,
}: Module.Settings.Panel.Props<SliderAttrs>):ReactElement => (
  <React.Fragment>
    <IdClassesGroup />
    <CssGroup
      mainSelector={moduleClassName}
      cssFields={cssFields}
    />
    <AttributesGroup
      attrName="children.button.innerContent"
      fieldLabel={__('Button', 'et_button')}
    />
    <ConditionsGroup />
    <GroupContainer
      id="visibility"
      title={__('Visibility', 'et_builder')}
    >
      <FieldContainer
        attrName="children.content.advanced.showOnMobile"
        label={__('Show Content On Mobile', 'et_builder')}
        description={__('This setting will toggle visibility of content on mobile devices.', 'et_builder')}
        defaultAttr={defaultSettingsAttrs?.children?.content?.advanced?.showOnMobile}
        features={{
          responsive: false,
          hover:      false,
          sticky:     false,
          preset:     ['html'],
        }}
      >
        <ToggleContainer />
      </FieldContainer>
      <FieldContainer
        attrName="children.button.advanced.showOnMobile"
        label={__('Show CTA On Mobile', 'et_builder')}
        description={__('This setting will toggle visibility of CTA on mobile devices.', 'et_builder')}
        defaultAttr={defaultSettingsAttrs?.children?.button?.advanced?.showOnMobile}
        features={{
          responsive: false,
          hover:      false,
          sticky:     false,
          preset:     ['html'],
        }}
      >
        <ToggleContainer />
      </FieldContainer>
      <FieldContainer
        attrName="image.advanced.showOnMobile"
        label={__('Show Image / Video On Mobile', 'et_builder')}
        description={__('This setting will toggle visibility of Images/Video on mobile devices.', 'et_builder')}
        features={{
          responsive: false,
          hover:      false,
          sticky:     false,
          preset:     ['html'],
        }}
      >
        <ToggleContainer />
      </FieldContainer>

      <VisibilitySettingsGroup
        grouped={false}
      />
    </GroupContainer>

    <TransitionGroup />
    <PositionSettingsGroup
      fields={{
        positionGroup: {
          component: {
            props: {
              defaultGroupAttr: defaultSettingsAttrs?.module?.decoration?.position,
            },
          },
        },
      }}
    />
    <ScrollSettingsGroup />
  </React.Fragment>
);
