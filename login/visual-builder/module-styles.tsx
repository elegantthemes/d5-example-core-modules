import React, { type ReactElement } from 'react';
import { merge } from 'lodash';

import {
  CssStyle,
  FormFieldStyle,
  StyleContainer,
  type StylesProps,
} from '@divi/module';
import { type LoginAttrs } from '@divi/types';

import {
  iconSpacingDeclaration,
  overflowStyleDeclaration,
} from './style-declarations';

/**
 * Login Module's style components.
 *
 * @since ??
 */
const ModuleStyles = <TProps extends StylesProps<LoginAttrs>>({
  attrs,
  elements,
  orderClass,
  mode,
  settings,
  state,
  noStyleTag,
}: TProps): ReactElement => {
  const iconPlacement = 'left' === attrs?.button?.decoration?.button?.desktop?.value?.icon?.placement ? 'before' : 'after';

  // TODO - Styles are not 100% matching D4. Need to check and implement. the D4 style fully.

  // If the form field is processed with the `style` method of module elements and along with the additional styles
  // under the `advancedStyles` property, we don't need to copy the transition attribute because the `style` method
  // will handle it. However, the `FormFieldStyle` component is basically a collection of `ElementStyle` components,
  // not just one. So, we can't use `style` method of module elements and need to copy the transition attribute from
  // the `module` decoration to the `field` decoration because the `transition` attribute is on module level and not
  // on field level. This is needed to make sure custom transitions setting values are applied to the form field.
  if (attrs.field?.decoration && attrs?.module?.decoration?.transition) {
    attrs.field.decoration.transition = { ...attrs?.module?.decoration?.transition };
  }

  return (
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
                  `${orderClass} .et_pb_module_header`,
                  `${orderClass} .et_pb_newsletter_description_content`,
                  `${orderClass} .et_pb_forgot_password a`,
                ].join(', '),
                attr:        attrs?.module?.advanced?.text,
                orientation: false,
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

      {/* TODO feat(D5, Transition Styles) Convert FormFieldStyle into advanced styles */}
      {/* @see https://github.com/elegantthemes/Divi/issues/34446 */}
      <FormFieldStyle
        selector={[`${orderClass} input[type="password"]`,
          `${orderClass} input[type="text"]`,
          `${orderClass} textarea`,
          `${orderClass} input`].join(', ')}
        attr={attrs?.field}
        important={{
          spacing: {
            desktop: {
              value: {
                padding: true,
              },
            },
          },
        }}
        propertySelectors={{
          font: {
            font: {
              desktop: {
                value: {
                  color: [`${orderClass} input[type="password"]`,
                    `${orderClass} input[type="text"]`,
                    `${orderClass} textarea`,
                    `${orderClass} input`,
                    `${orderClass} input::placeholder`].join(', '),
                },
              },
            },
          },
          placeholder: {
            font: {
              font: {
                desktop: {
                  value: {
                    color: `${orderClass} .et_pb_newsletter_form p input`,
                  },
                },
              },
            },
          },
          boxShadow: {
            desktop: {
              value: {
                'box-shadow': `${orderClass} .et_pb_newsletter_form input`,
              },
            },
          },
          border: {
            desktop: {
              value: {
                border: `${orderClass} .et_pb_newsletter_form p input`,
              },
            },
          },
          focus: {
            background: {
              desktop: {
                value: {
                  'background-color': `${orderClass} .et_pb_newsletter_form p input`,
                },
              },
            },
            border: {
              desktop: {
                value: {
                  border: `${orderClass} .et_pb_newsletter_form p input`,
                },
              },
            },
            font: {
              font: {
                desktop: {
                  value: {
                    color: `${orderClass} .et_pb_newsletter_form p input`,
                  },
                },
              },
            },
          },
        }}
        orderClass={orderClass}
      />

      {/* Title */}
      {elements.style({
        attrName: 'title',
      })}
      {/* Description */}
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
                selector:            `${orderClass}.et_pb_login .et_pb_newsletter_form .et_pb_newsletter_button.et_pb_button:${iconPlacement}`,
                attr:                merge({}, attrs?.button?.decoration?.font, attrs?.button?.decoration?.button),
                declarationFunction: iconSpacingDeclaration,
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
        cssFields={elements?.moduleMetadata?.customCssFields}
      />

    </StyleContainer>
  );
};

export {
  ModuleStyles,
};
