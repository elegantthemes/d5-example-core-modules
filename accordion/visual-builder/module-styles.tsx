import React, { type ReactElement } from 'react';

import {
  StyleContainer,
  type StylesProps,
} from '@divi/module';
import {
  type AccordionAttrs,
} from '@divi/types';

import { cssFields } from './custom-css';
import {
  accordionBorderStyleDeclaration,
  toggleIconStyleDeclaration,
} from './style-declarations';

/**
 * Text Module's style components.
 *
 * @since ??
 */
const ModuleStyles = ({
  attrs,
  defaultPrintedStyleAttrs,
  settings,
  mode,
  state,
  orderClass,
  noStyleTag,
  elements,
}: StylesProps<AccordionAttrs>):ReactElement => (
  <StyleContainer mode={mode} state={state} noStyleTag={noStyleTag}>
    {/* Module */}
    {elements.style({
      attrName:   'module',
      styleProps: {
        defaultPrintedStyleAttrs: defaultPrintedStyleAttrs?.module?.decoration,
        disabledOn:               {
          disabledModuleVisibility: settings?.disabledModuleVisibility,
        },
        advancedStyles: [
          {
            componentName: 'divi/text',
            props:         {
              attr: attrs?.module?.advanced?.text,
            },
          },
          {
            componentName: 'divi/common',
            props:         {
              selector:            `${orderClass}.et_pb_accordion .et_pb_accordion_item`,
              attr:                attrs?.module?.decoration?.border,
              declarationFunction: accordionBorderStyleDeclaration,
            },
          },
          {
            componentName: 'divi/css',
            props:         {
              attr: attrs.css,
              cssFields,
            },
          },
        ],
      },
    })}
    {/* Closed Toggle Icon */}
    {elements.style({
      attrName:   'closedToggleIcon',
      styleProps: {
        advancedStyles: [
          {
            componentName: 'divi/common',
            props:         {
              selector:            `${orderClass} .et_pb_toggle_title:before`,
              attr:                attrs?.closedToggleIcon?.decoration?.icon,
              declarationFunction: toggleIconStyleDeclaration,
            },
          },
        ],
      },
    })}
    {/* Open Toggle */}
    {elements.style({
      attrName: 'openToggle',
    })}

    {/* Open Toggle Title */}
    {elements.style({
      attrName: 'title',
    })}
    {/* Content */}
    {elements.style({
      attrName: 'content',
    })}
    {/* Closed Toggle */}
    {elements.style({
      attrName: 'closedToggle',
    })}
  </StyleContainer>
);

export {
  ModuleStyles,
};
