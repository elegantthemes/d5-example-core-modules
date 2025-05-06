import React, { type ReactElement } from 'react';

import {
  CssStyle,
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

    {/* Module
      * This is only to output the CSS form Custom CSS from Advanced Tab
      * at the very end of the DOM, so that it can override the css from
      * design tab. This is to fix the issue for re-ordering css
      * https://github.com/elegantthemes/Divi/issues/38331
      *
      * This may not be the ideal solution as per the conversation here
      * https://elegantthemes.slack.com/archives/C01CW343ZJ9/p1724934785470029?
      * thread_ts=1708688820.993489&cid=C01CW343ZJ9
      * so might need to re-visit this sometime later.
    */}
    <CssStyle
      selector={orderClass}
      attr={attrs.css}
      cssFields={cssFields}
    />
  </StyleContainer>
);

export {
  ModuleStyles,
};
