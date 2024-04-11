import React, { type ReactElement } from 'react';

import {
  CssGroup,
  IdClassesGroup,
  PositionGroup,
  ScrollGroup,
  TransitionGroup,
  VisibilitySettingsGroup,
} from '@divi/module';

import { cssFields } from './custom-css';

/**
 * Advanced panel component for the Blog module settings modal.
 *
 * @since ??
 *
 * @returns {ReactElement}
 */
export const SettingsAdvanced = ():ReactElement => (
  <React.Fragment>
    <IdClassesGroup />
    <CssGroup
      mainSelector=".et_pb_blog"
      cssFields={cssFields}
    />
    <VisibilitySettingsGroup />
    <TransitionGroup />
    <PositionGroup />
    <ScrollGroup />
  </React.Fragment>
);
