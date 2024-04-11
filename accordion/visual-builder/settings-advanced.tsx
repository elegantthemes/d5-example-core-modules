import React, { type ReactElement } from 'react';

import {
  ConditionsGroup,
  CssGroup,
  IdClassesGroup,
  PositionSettingsGroup,
  ScrollSettingsGroup,
  TransitionGroup,
  VisibilitySettingsGroup,
} from '@divi/module';

import { cssFields } from './custom-css';


export const SettingsAdvanced = ():ReactElement => (
  <React.Fragment>
    <IdClassesGroup />
    <CssGroup
      mainSelector=".et_pb_accordion"
      cssFields={cssFields}
    />
    <VisibilitySettingsGroup />
    <ConditionsGroup />
    <TransitionGroup />
    <PositionSettingsGroup />
    <ScrollSettingsGroup />
  </React.Fragment>
);
