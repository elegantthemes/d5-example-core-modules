import React, { type ReactElement } from 'react';

import {
  CssStyle,
  StyleContainer,
  type StylesProps,
} from '@divi/module';
import { type CtaAttrs } from '@divi/types';

import {
  overflowStyleDeclaration,
} from './style-declarations';

/**
 * CTA Module's style components.
 *
 * @since ??
 */
const ModuleStyles = <TProps extends StylesProps<CtaAttrs>>({
  attrs,
  elements,
  settings,
  orderClass,
  mode,
  state,
  noStyleTag,
}: TProps): ReactElement => (
  <StyleContainer mode={mode} state={state} noStyleTag={noStyleTag}>
    {/* Module */}
    {elements.style({
      attrName:   'module',
      styleProps: {
        disabledOn: {
          disabledModuleVisibility: settings?.disabledModuleVisibility,
        },
        advancedStyles: [
          {
            componentName: 'divi/text',
            props:         {
              selector: [
                `${orderClass} .et_pb_promo_description`,
                `${orderClass} .et_pb_module_header`,
                `${orderClass} .et_pb_button_wrapper`,
              ].join(', '),
              attr:              attrs?.module?.advanced?.text,
              propertySelectors: {
                textShadow: {
                  desktop: {
                    value: {
                      'text-shadow': `${orderClass} .et_pb_promo_description`,
                    },
                  },
                },
              },
            },
          },
          {
            componentName: 'divi/common',
            props:         {
              attr:                attrs?.module?.decoration?.border,
              declarationFunction: overflowStyleDeclaration,
            },
          },
        ],
      },
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
      attrName: 'button',
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
      cssFields={elements?.moduleMetadata?.customCssFields}
    />
  </StyleContainer>
  );

export {
  ModuleStyles,
};
