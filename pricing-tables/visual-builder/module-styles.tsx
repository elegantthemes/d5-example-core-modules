import React, { type ReactElement } from 'react';

import {
  StyleContainer,
  type StylesProps,
} from '@divi/module';
import { type PricingTablesAttrs } from '@divi/types';

import {
  pricingTableBodyContentStyleDeclaration,
  pricingTableBorderStyleDeclaration,
  pricingTableDropShadowStyleDeclaration,
  pricingTableSpacingStyleDeclaration,
} from './style-declarations';


export const ModuleStyles = ({
  attrs,
  settings,
  orderClass,
  mode,
  state,
  noStyleTag,
  defaultPrintedStyleAttrs,
  elements,
}: StylesProps<PricingTablesAttrs>): ReactElement => (
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
                `${orderClass} .et_pb_pricing_table`,
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
              selector:            `${orderClass} .et_pb_pricing_table`,
              attr:                attrs?.module?.decoration?.spacing,
              declarationFunction: pricingTableSpacingStyleDeclaration,
            },
          },
          {
            componentName: 'divi/common',
            props:         {
              selector:            `${orderClass} .et_pb_pricing_table`,
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

    {/* Title */}
    {elements.style({
      attrName: 'title',
    })}
    {/* Price */}
    {elements.style({
      attrName: 'price',
    })}
    {/* Description */}
    {elements.style({
      attrName:   'content',
      styleProps: {
        advancedStyles: [
          {
            componentName: 'divi/common',
            props:         {
              selector:            `${orderClass} .et_pb_pricing li`,
              attr:                attrs?.content?.decoration?.bodyFont?.body?.font,
              declarationFunction: pricingTableBodyContentStyleDeclaration,
            },
          },
          {
            componentName: 'divi/common',
            props:         {
              selector: `${orderClass} ul.et_pb_pricing li span::before`,
              attr:     attrs?.content?.advanced?.bulletColor,
              property: 'border-color',
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
      attrName: 'button',
    })}
    {elements.style({
      attrName:   'featuredTable',
      styleProps: {
        advancedStyles: [
          {
            componentName: 'divi/common',
            props:         {
              selector:            `${orderClass} .et_pb_featured_table`,
              attr:                attrs?.featuredTable?.advanced?.showDropShadow,
              declarationFunction: pricingTableDropShadowStyleDeclaration,
            },
          },
        ],
      },
    })}
    {elements.style({
      attrName: 'featuredTitle',
    })}
    {elements.style({
      attrName:   'featuredContent',
      styleProps: {
        advancedStyles: [
          {
            componentName: 'divi/common',
            props:         {
              selector: `${orderClass} .et_pb_featured_table ul.et_pb_pricing li span::before`,
              attr:     attrs?.featuredContent?.advanced?.bulletColor,
              property: 'border-color',
            },
          },
        ],
      },
    })}
    {elements.style({
      attrName: 'featuredSubtitle',
    })}
    {elements.style({
      attrName: 'featuredPrice',
    })}
    {elements.style({
      attrName: 'featuredCurrencyFrequency',
    })}
    {elements.style({
      attrName: 'featuredExcluded',
    })}
  </StyleContainer>
);
