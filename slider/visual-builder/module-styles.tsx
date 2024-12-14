import React, { type ReactElement } from 'react';

import {
  CssStyle,
  StyleContainer,
  type StylesProps,
} from '@divi/module';
import {
  type SliderAttrs,
} from '@divi/types';

import { cssFields } from './custom-css';
import {
  buttonAlignmentStyleDeclaration,
  overflowStyleDeclaration,
} from './style-declarations';

/**
 * Text Module's style components.
 *
 * @since ??
 */
const ModuleStyles = ({
  settings,
  mode,
  state,
  noStyleTag,
  orderClass,
  attrs,
  elements,
  defaultPrintedStyleAttrs,
}: StylesProps<SliderAttrs>):ReactElement => (
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
            componentName: 'divi/common',
            props:         {
              selector: [
                `${orderClass} .et-pb-slider-arrows .et-pb-arrow-prev`,
                `${orderClass} .et-pb-slider-arrows .et-pb-arrow-next`,
              ].join(','),
              attr:     attrs?.arrows?.advanced?.color,
              property: 'color',
            },
          },
          {
            componentName: 'divi/common',
            props:         {
              attr:                attrs?.module?.decoration?.border,
              declarationFunction: overflowStyleDeclaration,
            },
          },
          {
            componentName: 'divi/text',
            props:         {
              selector: `${orderClass} .et_pb_slide .et_pb_slide_description`,
              attr:     attrs?.module?.advanced?.text,
            },
          },
        ],
      },
    })}

    {/* Dot nav */}
    {elements.style({
      attrName: 'dotNav',
    })}
    {/* Image */}
    {elements.style({
      attrName: 'image',
    })}
    {/* Title */}
    {elements.style({
      attrName: 'title',
    })}
    {/* Content */}
    {elements.style({
      attrName: 'content',
    })}
    {/* Button */}
    {elements.style({
      attrName:   'button',
      styleProps: {
        advancedStyles: [
          {
            componentName: 'divi/common',
            props:         {
              selector:            `${orderClass} .et_pb_button_wrapper`,
              attr:                attrs?.button?.decoration?.button,
              declarationFunction: buttonAlignmentStyleDeclaration,
            },
          },
        ],
      },
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
