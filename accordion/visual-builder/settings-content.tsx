import React, { type ReactElement } from 'react';

import { __ } from '@wordpress/i18n';

import {
  DraggableListContainer,
} from '@divi/field-library';
import {
  AdminLabelGroup,
  BackgroundGroup,
  DraggableChildModuleListContainer,
  IconGroup,
  LinkGroup,
} from '@divi/module';
import {
  type AccordionAttrs,
  type Module,
} from '@divi/types';


export const SettingsContent = ({
  defaultSettingsAttrs,
}:Module.Settings.Panel.Props<AccordionAttrs>):ReactElement => (
  <React.Fragment>
    <DraggableChildModuleListContainer
      childModuleName="divi/accordion-item"
      addTitle={__('Add New Accordion Item', 'et_builder')}
    >
      <DraggableListContainer />
    </DraggableChildModuleListContainer>
    <IconGroup
      attrName="closedToggleIcon.decoration.icon"
      defaultGroupAttr={defaultSettingsAttrs?.closedToggleIcon?.decoration?.icon}
      groupLabel={__('Toggle Icon', 'et_builder')}
      fields={{
        color: {
          render: false,
        },
        useSize: {
          render: false,
        },
        size: {
          render: false,
        },
      }}
    />
    <LinkGroup />
    <BackgroundGroup />
    <AdminLabelGroup
      defaultGroupAttr={defaultSettingsAttrs?.module?.meta?.adminLabel}
    />
  </React.Fragment>
);
