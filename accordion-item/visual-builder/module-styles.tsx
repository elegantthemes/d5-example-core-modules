import React, { type ReactElement } from 'react';

import {
  CssStyle,
  StyleContainer,
  type StylesProps,
} from '@divi/module';
import {
  type AccordionAttrs,
  type AccordionItemAttrs,
} from '@divi/types';

import { cssFields } from './custom-css';
import {
  accordionItemBorderStyleDeclaration,
  toggleCloseIconSizeStyleDeclaration,
  toggleCloseOverlaySizingStyleDeclaration,
  toggleOpenOverlaySizingStyleDeclaration,
} from './style-declarations';

/**
 * Text Module's style components.
 *
 * @since ??
 */
const ModuleStyles = ({
  attrs,
  defaultPrintedStyleAttrs,
  mode,
  state,
  orderClass,
  noStyleTag,
  elements,
}: StylesProps<AccordionItemAttrs, AccordionAttrs>):ReactElement => {
  // Classnames.
  const mainClass = `${orderClass}.et_pb_toggle`;

  // TODO: Fix position issue.

  return (
    <StyleContainer mode={mode} state={state} noStyleTag={noStyleTag}>
      {/* Module */}
      {elements.style({
        attrName:   'module',
        styleProps: {
          defaultPrintedStyleAttrs: defaultPrintedStyleAttrs?.module?.decoration,
          advancedStyles:           [
            {
              componentName: 'divi/text',
              props:         {
                selector:          orderClass,
                attr:              attrs?.module?.advanced?.text,
                propertySelectors: {
                  textShadow: {
                    desktop: {
                      value: {
                        'text-shadow': mainClass,
                      },
                    },
                  },
                },
              },
            },
            {
              componentName: 'divi/common',
              props:         {
                selector:            `.et_pb_accordion .et_pb_module${mainClass}`,
                attr:                attrs?.module?.decoration?.border,
                declarationFunction: accordionItemBorderStyleDeclaration,
              },
            },
          ],
        },
      })}
      {/* Content */}
      {elements.style({
        attrName: 'content',
      })}

      {/* Title */}
      {elements.style({
        attrName:   'title',
        styleProps: {
          selector: `${mainClass} h1.et_pb_toggle_title, ${mainClass} h2.et_pb_toggle_title, ${mainClass} h3.et_pb_toggle_title, ${mainClass} h4.et_pb_toggle_title, ${mainClass} h5.et_pb_toggle_title, ${mainClass} h6.et_pb_toggle_title`,
        },
      })}
      {/* Open Toggle */}
      {elements.style({
        attrName:   'openToggle',
        styleProps: {
          font: {
            selector:  `${orderClass}.et_pb_toggle_open h1.et_pb_toggle_title, ${orderClass}.et_pb_toggle_open h2.et_pb_toggle_title, ${orderClass}.et_pb_toggle_open h3.et_pb_toggle_title, ${orderClass}.et_pb_toggle_open h4.et_pb_toggle_title, ${orderClass}.et_pb_toggle_open h5.et_pb_toggle_title, ${orderClass}.et_pb_toggle_open h6.et_pb_toggle_title`,
            important: {
              font: {
                desktop: {
                  value: {
                    color: true,
                  },
                },
              },
            },
          },
        },
      })}
      {/* Closed Toggle */}
      {elements.style({
        attrName:   'closedToggle',
        styleProps: {
          font: {
            selector:          `${mainClass}.et_pb_toggle_close h1.et_pb_toggle_title, ${mainClass}.et_pb_toggle_close h2.et_pb_toggle_title, ${mainClass}.et_pb_toggle_close h3.et_pb_toggle_title, ${mainClass}.et_pb_toggle_close h4.et_pb_toggle_title, ${mainClass}.et_pb_toggle_close h5.et_pb_toggle_title, ${mainClass}.et_pb_toggle_close h6.et_pb_toggle_title`,
            propertySelectors: {
              font: {
                desktop: {
                  value: {
                    color: `${orderClass}.et_pb_toggle_close h1.et_pb_toggle_title, ${orderClass}.et_pb_toggle_close h2.et_pb_toggle_title, ${orderClass}.et_pb_toggle_close h3.et_pb_toggle_title, ${orderClass}.et_pb_toggle_close h4.et_pb_toggle_title, ${orderClass}.et_pb_toggle_close h5.et_pb_toggle_title, ${orderClass}.et_pb_toggle_close h6.et_pb_toggle_title`,
                  },
                },
              },
            },
            important: {
              font: {
                desktop: {
                  value: {
                    color: true,
                  },
                },
              },
            },
          },
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
                selector:            `${mainClass}.et_pb_toggle_open .et_vb_toggle_overlay`,
                attr:                attrs?.closedToggleIcon?.decoration?.icon,
                declarationFunction: toggleOpenOverlaySizingStyleDeclaration,
              },
            },
            {
              componentName: 'divi/common',
              props:         {
                selector: [
                  `${orderClass}.et_pb_toggle_close .et_pb_toggle_title:before`,
                  `${orderClass}.et_pb_toggle_close .et_vb_toggle_overlay`,
                ].join(','),
                attr:                attrs?.closedToggleIcon?.decoration?.icon,
                declarationFunction: toggleCloseIconSizeStyleDeclaration,
              },
            },
            {
              componentName: 'divi/common',
              props:         {
                selector:            `${orderClass}.et_pb_toggle_close .et_vb_toggle_overlay`,
                attr:                attrs?.closedToggleIcon?.decoration?.icon,
                declarationFunction: toggleCloseOverlaySizingStyleDeclaration,
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
};

export {
  ModuleStyles,
};
