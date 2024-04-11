import React, { type ReactElement } from 'react';

import {
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
import { getHeadingLevel } from './utils';

/**
 * Text Module's style components.
 *
 * @since ??
 */
const ModuleStyles = ({
  attrs,
  defaultPrintedStyleAttrs,
  parentAttrs,
  mode,
  state,
  orderClass,
  noStyleTag,
  elements,
}: StylesProps<AccordionItemAttrs, AccordionAttrs>):ReactElement => {
  const headingLevel = getHeadingLevel(attrs, parentAttrs);

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
      {/* Content */}
      {elements.style({
        attrName: 'content',
      })}

      {/* Title */}
      {elements.style({
        attrName:   'title',
        styleProps: {
          selector: `${mainClass} ${headingLevel}.et_pb_toggle_title`,
        },
      })}
      {/* Open Toggle */}
      {elements.style({
        attrName:   'openToggle',
        styleProps: {
          font: {
            selector:  `${orderClass}.et_pb_toggle_open ${headingLevel}.et_pb_toggle_title`,
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
            selector:          `${mainClass}.et_pb_toggle_close ${headingLevel}.et_pb_toggle_title`,
            propertySelectors: {
              font: {
                desktop: {
                  value: {
                    color: `${orderClass}.et_pb_toggle_close ${headingLevel}.et_pb_toggle_title`,
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
    </StyleContainer>
  );
};

export {
  ModuleStyles,
};
