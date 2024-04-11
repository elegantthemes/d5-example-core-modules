import React, { type ReactElement } from 'react';

import {
  ConditionsGroup,
  CssGroup,
  PositionSettingsGroup,
  ScrollGroup,
  TransitionGroup,
  VisibilitySettingsGroup,
} from '@divi/module';
import {
  type AccordionItemAttrs,
  type Module,
} from '@divi/types';

import { cssFields } from './custom-css';


export const SettingsAdvanced = ({
  defaultSettingsAttrs,
}: Module.Settings.Panel.Props<AccordionItemAttrs>):ReactElement => (
  <React.Fragment>
    <CssGroup
      mainSelector=".et_pb_toggle"
      cssFields={cssFields}
    />
    <ConditionsGroup />
    <VisibilitySettingsGroup
      fields={{
        disabledOnGroup: {
          render: false,
        },
      }}
    />
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
    <ScrollGroup
      attrName="module.decoration.scroll"
    />
  </React.Fragment>
);
