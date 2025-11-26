import React, { type ReactElement } from 'react';

import {
  CssStyle,
  ElementStyle,
  FormFieldStyle,
  StyleContainer,
  type StylesProps,
} from '@divi/module';
import {
  type SignupCustomFieldAttrs,
} from '@divi/types';


/**
 * Set CSS styles to the module.
 *
 * @param {StylesProps<SignupCustomFieldAttrs>} props React component props.
 *
 * @returns {ReactElement} The CSS styles for the module.
 */
export const ModuleStyles = ({
  attrs,
  elements,
  defaultPrintedStyleAttrs,
  orderClass,
  mode,
  state,
  noStyleTag,
  settings,
}: StylesProps<SignupCustomFieldAttrs>): ReactElement => (
  <StyleContainer mode={mode} state={state} noStyleTag={noStyleTag}>
    {/* module */}
    {elements.style({
      attrName:   'module',
      styleProps: {
        defaultPrintedStyleAttrs: defaultPrintedStyleAttrs?.module?.decoration,
        disabledOn:               {
          disabledModuleVisibility: settings?.disabledModuleVisibility,
        },
        spacing: {
          selector:          `.et_pb_newsletter_form p${orderClass}`,
          propertySelectors: {
            desktop: {
              value: {
                padding: `.et_pb_newsletter_form p${orderClass}.et_pb_newsletter_field.et_pb_signup_custom_field`,
              },
            },
          },
        },
        border: {
          selector: `.et_pb_newsletter_form .et_pb_newsletter_fields p${orderClass} .input, .et_pb_newsletter_form .et_pb_newsletter_fields p${orderClass} .input[type="checkbox"] + label i, .et_pb_newsletter_form .et_pb_newsletter_fields p${orderClass} .input[type="radio"] + label i`,
        },
        boxShadow: {
          selector: `${orderClass} input, ${orderClass} select, ${orderClass} textarea, ${orderClass} .et_pb_contact_field_options_list label > i`,
        },
        advancedStyles: [
          {
            componentName: 'divi/text',
            props:         {
              attr:     attrs?.module?.advanced?.text,
              selector: `${orderClass} input, ${orderClass} textarea, ${orderClass} label`,
            },
          },
        ],
      },
    })}
    {/* Contact form field */}
    {/* TODO feat(D5, Transition Styles) Convert FormFieldStyle into advanced styles */}
    {/* @see https://github.com/elegantthemes/Divi/issues/34446 */}
    <FormFieldStyle
      selector={`.et_pb_newsletter_form .et_pb_newsletter_fields p${orderClass} .input[type="radio"] + label, .et_pb_newsletter_form .et_pb_newsletter_fields p${orderClass} .input, .et_pb_newsletter_form .et_pb_newsletter_fields p${orderClass} .input[type="checkbox"] + label, ${orderClass}.et_pb_contact_field .et_pb_contact_field_options_title`}
      attr={attrs?.field}
      important={{
        font: {
          font: {
            desktop: {
              value: {
                color: true,
              },
            },
          },
        },
      }}
      propertySelectors={{
        background: {
          desktop: {
            value: {
              'background-color': `.et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} input[type="text"], .et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} textarea, .et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} select, .et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} .input[type="checkbox"] + label i, .et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} .input[type="radio"] + label i`,
            },
            hover: {
              'background-color': `.et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} input[type="text"]:hover, .et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} textarea:hover, .et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} select:hover, .et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} .input[type="checkbox"] + label:hover i, .et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} .input[type="radio"] + label:hover i`,
            },
          },
        },
        font: {
          font: {
            desktop: {
              value: {
                color: `.et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} input[type="text"], .et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} textarea, .et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} select, .et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} .input[type="checkbox"] + label i::before, .et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} .input::placeholder`,
              },
              hover: {
                color: `.et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} input[type="text"]:hover, .et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} textarea:hover, .et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} select:hover, .et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} .input[type="checkbox"] + label:hover i::before, .et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} .input:hover::placeholder`,
              },
            },
          },
        },
        focus: {
          background: {
            desktop: {
              value: {
                'background-color': `.et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} input.input, .et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} textarea, .et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} select`,
              },
            },
          },
          font: {
            font: {
              desktop: {
                value: {
                  color: `.et_pb_newsletter_form .et_pb_newsletter_fields ${orderClass} .input`,
                },
              },
            },
          },
        },
      }}
      orderClass={orderClass}
    />
    {/* ::*placeholder style can't handle multiple selectors used the same statements. */}
    <ElementStyle
      selector={`.et_pb_newsletter_form .et_pb_newsletter_fields p${orderClass} .input::placeholder`}
      attrs={{
        font: attrs?.field?.decoration?.font,
      }}
      orderClass={orderClass}
    />
    <ElementStyle
      selector={`.et_pb_newsletter_form .et_pb_newsletter_fields p${orderClass} .input::-webkit-input-placeholder`}
      attrs={{
        font: attrs?.field?.decoration?.font,
      }}
      orderClass={orderClass}
    />
    <ElementStyle
      selector={`.et_pb_newsletter_form .et_pb_newsletter_fields p${orderClass} .input::-moz-placeholder`}
      attrs={{
        font: attrs?.field?.decoration?.font,
      }}
      orderClass={orderClass}
    />
    <ElementStyle
      selector={`.et_pb_newsletter_form .et_pb_newsletter_fields p${orderClass} .input::-ms-input-placeholder`}
      attrs={{
        font: attrs?.field?.decoration?.font,
      }}
      orderClass={orderClass}
    />

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
