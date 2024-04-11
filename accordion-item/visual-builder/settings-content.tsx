import React, { type ReactElement } from 'react';

import { __ } from '@wordpress/i18n';

import {
  RichTextContainer,
  TextContainer,
} from '@divi/field-library';
import { GroupContainer } from '@divi/modal';
import {
  BackgroundGroup,
  FieldContainer,
  LinkGroup,
} from '@divi/module';


export const SettingsContent = ():ReactElement => (
  <React.Fragment>
    <GroupContainer
      id="text"
      title={__('Text', 'et_builder')}
    >
      <FieldContainer
        attrName="title.innerContent"
        label={__('Title', 'et_builder')}
        description={__('The title will appear above the content and when the toggle is closed.', 'et_builder')}
        features={{
          dynamicContent: {
            type: 'text',
          },

          sticky: false,
        }}
      >
        <TextContainer />
      </FieldContainer>
      <FieldContainer
        attrName="content.innerContent"
        label={__('Body', 'et_builder')}
        description={__('Input the main text content for your module here.', 'et_builder')}
        features={{
          sticky: false,
        }}
      >
        <RichTextContainer />
      </FieldContainer>
    </GroupContainer>
    <LinkGroup />
    <BackgroundGroup />
  </React.Fragment>
);
