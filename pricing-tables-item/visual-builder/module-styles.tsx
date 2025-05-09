import React, { type ReactElement } from 'react';

import {
  CssStyle,
  StyleContainer,
  type StylesProps,
} from '@divi/module';
import {
  getAttrByMode,
} from '@divi/module-utils';
import {
  type PricingTableAttrs,
  type PricingTablesAttrs,
} from '@divi/types';

import { filterButtonDecorationAttrs } from './attrs-filter';
import {
  pricingTableBorderStyleDeclaration,
} from './style-declarations';


export const ModuleStyles = ({
  attrs,
  baseOrderClass,
  parentAttrs,
  settings,
  orderClass,
  mode,
  state,
  noStyleTag,
  defaultPrintedStyleAttrs,
  elements,
  selectorPrefix = '',
}: StylesProps<PricingTableAttrs, PricingTablesAttrs>): ReactElement => {
  const parentButtonAttr = getAttrByMode(parentAttrs?.button?.decoration?.button);

  return (
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
                selector: [
                  `${orderClass}.et_pb_pricing_table`,
                  `${orderClass} .et_pb_pricing_content`,
                ].join(', '),
                attr:              attrs?.module?.advanced?.text,
                propertySelectors: {
                  textShadow: {
                    desktop: {
                      value: {
                        'text-shadow': [
                          `${orderClass} .et_pb_pricing_heading`,
                          `${orderClass} .et_pb_pricing_content_top`,
                          `${orderClass} .et_pb_pricing_content`,
                        ].join(', '),
                      },
                    },
                  },
                },
              },
            },
            {
              componentName: 'divi/common',
              props:         {
                selector:            `${selectorPrefix}.et_pb_pricing .et_pb_pricing_table${baseOrderClass}`,
                attr:                attrs?.module?.decoration?.border,
                declarationFunction: pricingTableBorderStyleDeclaration,
              },
            },
          ],
        },
      })}

      {/* Price */}
      {elements.style({
        attrName: 'price',
      })}

      {/* Title */}
      {elements.style({
        attrName: 'title',
      })}
      {/* Description */}
      {elements.style({
        attrName:   'content',
        styleProps: {
          advancedStyles: [
            {
              componentName: 'divi/common',
              props:         {
                selector:  `${orderClass} ul.et_pb_pricing li span::before`,
                attr:      attrs.content?.advanced?.bulletColor,
                property:  'border-color',
                important: true,
              },
            },
          ],
        },
      })}
      {/* Best Value */}
      {elements.style({
        attrName: 'subtitle',
      })}
      {/* Currency */}
      {elements.style({
        attrName: 'currencyFrequency',
      })}
      {/* Price Not Available */}
      {elements.style({
        attrName: 'excluded',
      })}
      {elements.style({
        attrName:   'button',
        styleProps: {
          attrsFilter: decorationAttrs => filterButtonDecorationAttrs(
            decorationAttrs, parentButtonAttr,
          ),
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
        cssFields={elements?.moduleMetadata?.customCssFields}
      />
    </StyleContainer>
  );
};
