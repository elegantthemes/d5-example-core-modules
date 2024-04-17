import React, { type ReactElement } from 'react';

import {
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
  parentAttrs,
  settings,
  orderClass,
  mode,
  state,
  noStyleTag,
  defaultPrintedStyleAttrs,
  elements,
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
                selector:            `.et_pb_pricing .et_pb_pricing_table${orderClass}`,
                attr:                attrs?.module?.decoration?.border,
                declarationFunction: pricingTableBorderStyleDeclaration,
              },
            },
            {
              componentName: 'divi/css',
              props:         {
                attr:      attrs.css,
                cssFields: elements?.moduleMetadata?.customCssFields,
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
    </StyleContainer>
  );
};
