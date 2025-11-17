import React, { type ReactElement } from 'react';

import {
  CssStyle,
  ElementStyle,
  FormFieldStyle,
  StyleContainer,
  type StylesProps,
} from '@divi/module';
import {
  type ContactFormAttrs,
} from '@divi/types';


/**
 * Set CSS styles to the module.
 *
 * @param {StylesProps<ContactFormAttrs>} props React component props.
 *
 * @returns {ReactElement} The CSS styles for the module.
 */
export const ModuleStyles = ({
  attrs,
  elements,
  orderClass,
  defaultPrintedStyleAttrs,
  mode,
  state,
  noStyleTag,
  settings,
}: StylesProps<ContactFormAttrs>): ReactElement => (
  <StyleContainer mode={mode} state={state} noStyleTag={noStyleTag}>
    {/* module */}
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
              attr:              attrs?.module?.advanced?.text,
              selector:          `${orderClass}.et_pb_contact_form_container`,
              propertySelectors: {
                text: {
                  desktop: {
                    value: {
                      'text-align': `${orderClass} input, ${orderClass} textarea, ${orderClass} label`,
                    },
                  },
                },
                textShadow: {
                  desktop: {
                    value: {
                      'text-shadow': `${orderClass}, ${orderClass} input, ${orderClass} textarea, ${orderClass} label, ${orderClass} select`,
                    },
                  },
                },
              },
            },
          },
        ],
      },
    })}
    {/* title */}
    {elements.style({
      attrName: 'title',
    })}
    {/* captcha */}
    {elements.style({
      attrName: 'captcha',
    })}
    {/* button */}
    {elements.style({
      attrName:   'button',
      styleProps: {
        spacing: {
          selector: [`${orderClass}.et_pb_contact_form_container.et_pb_module .et_pb_button`,
            `${orderClass}.et_pb_contact_form_container.et_pb_module .et_pb_button:hover`].join(', '),
          important: true,
        },
      },
    })}
    {/* Contact form field */}
    {/* TODO feat(D5, Transition Styles) Convert FormFieldStyle into advanced styles */}
    {/* @see https://github.com/elegantthemes/Divi/issues/34446 */}
    <FormFieldStyle
      selector={[
        `${orderClass} .input[type=checkbox] + label`,
        `${orderClass} .input[type=radio] + label`,
        `${orderClass} .input`,
      ].join(', ')}
      attr={attrs?.field}
      orderClass={orderClass}
      propertySelectors={{
        spacing: {
          desktop: {
            value: {
              margin:  `${orderClass} .et_pb_contact_field`,
              padding: `${orderClass} .et_pb_contact_field .input`,
            },
          },
        },
        background: {
          desktop: {
            value: {
              'background-color': [
                `${orderClass} .et_pb_contact_field .input`,
                `${orderClass} .et_pb_contact_field .input[type="checkbox"] + label i`,
                `${orderClass} .et_pb_contact_field .input[type="radio"] + label i`,
              ].join(', '),
            },
            hover: {
              'background-color': [
                `${orderClass} .et_pb_contact_field .input:hover`,
                `${orderClass} .et_pb_contact_field .input[type="checkbox"] + label:hover i`,
                `${orderClass} .et_pb_contact_field .input[type="radio"] + label:hover i`,
              ].join(', '),
            },
          },
        },
        font: {
          font: {
            desktop: {
              value: {
                color: [
                  `${orderClass} .input[type="checkbox"]:checked + label i:before`,
                  `${orderClass}.et_pb_contact_form_container .input`,
                  `${orderClass}.et_pb_contact_form_container .input[type="checkbox"] + label`,
                  `${orderClass}.et_pb_contact_form_container .input[type="radio"] + label`,
                ].join(', '),
              },
              hover: {
                color: [
                  `${orderClass} .input[type="checkbox"]:checked + label i:before`,
                  `${orderClass}.et_pb_contact_form_container .input:hover`,
                  `${orderClass}.et_pb_contact_form_container .input[type="checkbox"]:hover + label`,
                  `${orderClass}.et_pb_contact_form_container .input[type="radio"]:hover + label`,
                ].join(', '),
              },
            },
          },
        },
        focus: {
          background: {
            desktop: {
              value: {
                'background-color': [
                  `${orderClass} .input[type="checkbox"]:active + label i`,
                  `${orderClass} .input[type="radio"]:active + label i`,
                  `${orderClass} .input`,
                ].join(', '),
              },
              hover: {
                'background-color': [
                  `${orderClass} .input[type="checkbox"]:active:hover + label i`,
                  `${orderClass} .input[type="radio"]:active:hover + label i`,
                  `${orderClass} .input`,
                ].join(', '),
              },
            },
          },
          font: {
            font: {
              desktop: {
                value: {
                  color: [
                    `${orderClass} .input`,
                  ].join(', '),
                },
                hover: {
                  color: [
                    `${orderClass} .input[type="checkbox"]:active:hover + label`,
                    `${orderClass} .input[type="radio"]:active:hover + label`,
                    `${orderClass} .input[type="checkbox"]:checked:active:hover + label i:before`,
                    `${orderClass} .input`,
                  ].join(', '),
                },
              },
            },
          },
        },
      }}
    />
    {/* ::*placeholder style can't handle multiple selectors used the same statements. */}
    <ElementStyle
      selector={`${orderClass}.et_pb_contact_form_container .input::placeholder`}
      attrs={{
        font: attrs?.field?.decoration?.font,
      }}
      orderClass={orderClass}
    />
    <ElementStyle
      selector={`${orderClass}.et_pb_contact_form_container .input::-webkit-input-placeholder`}
      attrs={{
        font: attrs?.field?.decoration?.font,
      }}
      orderClass={orderClass}
    />
    <ElementStyle
      selector={`${orderClass}.et_pb_contact_form_container .input::-moz-placeholder`}
      attrs={{
        font: attrs?.field?.decoration?.font,
      }}
      orderClass={orderClass}
    />
    <ElementStyle
      selector={`${orderClass}.et_pb_contact_form_container .input::-ms-input-placeholder`}
      attrs={{
        font: attrs?.field?.decoration?.font,
      }}
      orderClass={orderClass}
    />
    <CssStyle
      selector={orderClass}
      attr={attrs.css}
      cssFields={elements?.moduleMetadata?.customCssFields}
    />
  </StyleContainer>
);
