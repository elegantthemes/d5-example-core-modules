import React, { type ReactElement } from 'react';

import {
  CssStyle,
  ElementStyle,
  FormFieldStyle,
  StyleContainer,
  type StylesProps,
} from '@divi/module';
import {
  type ContactFieldAttrs,
} from '@divi/types';


/**
 * Set CSS styles to the module.
 *
 * @param {StylesProps<ContactFieldAttrs>} props React component props.
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
}: StylesProps<ContactFieldAttrs>): ReactElement => (
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
              selector:          `.et_pb_contact_form_container ${orderClass}.et_pb_contact_field`,
              propertySelectors: {
                text: {
                  desktop: {
                    value: {
                      'text-align': `${orderClass} input, ${orderClass} textarea, ${orderClass} label`,
                    },
                  },
                },
              },
            },
          },
        ],
      },
    })}
    {/* Contact form field */}
    {/* TODO feat(D5, Transition Styles) Convert FormFieldStyle into advanced styles */}
    {/* @see https://github.com/elegantthemes/Divi/issues/34446 */}
    <FormFieldStyle
      selector={[
        `${orderClass}.et_pb_contact_field .et_pb_contact_field_options_title`,
        `${orderClass}.et_pb_contact_field .input[type=checkbox] + label`,
        `${orderClass}.et_pb_contact_field .input[type=radio] + label`,
        `${orderClass}.et_pb_contact_field .input`,
      ].join(', ')}
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
      orderClass={orderClass}
      propertySelectors={{
        background: {
          desktop: {
            value: {
              'background-color': [
                `${orderClass}.et_pb_contact_field .input`,
                `${orderClass}.et_pb_contact_field .input[type="checkbox"] + label i`,
                `${orderClass}.et_pb_contact_field .input[type="radio"] + label i`,
              ].join(', '),
            },
            hover: {
              'background-color': [
                `${orderClass}.et_pb_contact_field .input:hover`,
                `${orderClass}.et_pb_contact_field .input[type="checkbox"] + label:hover i`,
                `${orderClass}.et_pb_contact_field .input[type="radio"] + label:hover i`,
              ].join(', '),
            },
          },
        },
        font: {
          font: {
            desktop: {
              value: {
                color: [
                  `${orderClass}.et_pb_contact_field .input`,
                  `${orderClass}.et_pb_contact_field .input[type="checkbox"] + label`,
                  `${orderClass}.et_pb_contact_field .input[type="radio"] + label`,
                  `${orderClass}.et_pb_contact_field .input[type="checkbox"]:checked + label i:before`,
                ].join(', '),
              },
              hover: {
                color: [
                  `${orderClass}.et_pb_contact_field .input:hover`,
                  `${orderClass}.et_pb_contact_field .input[type="checkbox"]:hover + label`,
                  `${orderClass}.et_pb_contact_field .input[type="radio"]:hover + label`,
                  `${orderClass}.et_pb_contact_field .input[type="checkbox"]:checked:hover + label i:before`,
                ].join(', '),
              },
            },
          },
        },
        placeholder: {
          font: {
            font: {
              desktop: {
                value: {
                  color: [
                    `${orderClass}.et_pb_contact_field .input`,
                  ].join(', '),
                },
              },
            },
          },
        },
        focus: {
          background: {
            desktop: {
              value: {
                'background-color': [
                  `${orderClass}.et_pb_contact_field .input`,
                ].join(', '),
              },
            },
          },
          font: {
            font: {
              desktop: {
                value: {
                  color: [
                    `${orderClass}.et_pb_contact_field .input`,
                  ].join(', '),
                },
              },
            },
          },
        },
      }}
    />
    {/* Focus Element Selector is different for the checkbox and radio input */}
    <ElementStyle
      selector={[
        `${orderClass}.et_pb_contact_field .input[type="checkbox"]:active + label i`,
        `${orderClass}.et_pb_contact_field .input[type="radio"]:active + label i`,
      ].join(', ')}
      background={{
        selectors: {
          desktop: {
            value: [
              `${orderClass}.et_pb_contact_field .input[type="checkbox"]:active + label i`,
              `${orderClass}.et_pb_contact_field .input[type="radio"]:active + label i`,
            ].join(', '),
            hover: [
              `${orderClass}.et_pb_contact_field .input[type="checkbox"]:active{{:hover}} + label i`,
              `${orderClass}.et_pb_contact_field .input[type="radio"]:active{{:hover}} + label i`,
            ].join(', '),
          },
        },
      }}
      attrs={{
        background: attrs?.field?.advanced?.focus?.background,
      }}
      orderClass={orderClass}
    />
    <ElementStyle
      selector={[
        `${orderClass}.et_pb_contact_field .input[type="checkbox"]:active + label`,
        `${orderClass}.et_pb_contact_field .input[type="radio"]:active + label`,
        `${orderClass}.et_pb_contact_field .input[type="checkbox"]:checked:active + label i:before`,
      ].join(', ')}
      font={{
        selectors: {
          desktop: {
            value: [
              `${orderClass}.et_pb_contact_field .input[type="checkbox"]:active + label`,
              `${orderClass}.et_pb_contact_field .input[type="radio"]:active + label`,
              `${orderClass}.et_pb_contact_field .input[type="checkbox"]:checked:active + label i:before`,
            ].join(', '),
            hover: [
              `${orderClass}.et_pb_contact_field .input[type="checkbox"]:active{{:hover}} + label`,
              `${orderClass}.et_pb_contact_field .input[type="radio"]:active{{:hover}} + label`,
              `${orderClass}.et_pb_contact_field .input[type="checkbox"]:checked:active{{:hover}} + label i:before`,
            ].join(', '),
          },
        },
      }}
      attrs={{
        font: attrs?.field?.advanced?.focus?.font,
      }}
      orderClass={orderClass}
    />
    {/* ::*placeholder style can't handle multiple selectors used the same statements. */}
    <ElementStyle
      selector={`${orderClass}.et_pb_contact_field .input::placeholder`}
      attrs={{
        font: attrs?.field?.decoration?.font,
      }}
      orderClass={orderClass}
    />
    <ElementStyle
      selector={`${orderClass}.et_pb_contact_field .input::-webkit-input-placeholder`}
      attrs={{
        font: attrs?.field?.decoration?.font,
      }}
      orderClass={orderClass}
    />
    <ElementStyle
      selector={`${orderClass}.et_pb_contact_field .input::-moz-placeholder`}
      attrs={{
        font: attrs?.field?.decoration?.font,
      }}
      orderClass={orderClass}
    />
    <ElementStyle
      selector={`${orderClass}.et_pb_contact_field .input::-ms-input-placeholder`}
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
