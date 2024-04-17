import React, { type ReactElement } from 'react';

import {
  StyleContainer,
  type StylesProps,
} from '@divi/module';
import { type CtaAttrs } from '@divi/types';

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

    {/* Content */}
    {elements.style({
      attrName: 'content',
    })}

    {/* Button */}
    {elements.style({
      attrName: 'button',
    })}
  </StyleContainer>
  );

export {
  ModuleStyles,
};
