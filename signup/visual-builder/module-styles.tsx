import React, { type ReactElement } from 'react';

import {
  CssStyle,
  ElementStyle,
  FormFieldStyle,
  StyleContainer,
  type StylesProps,
} from '@divi/module';
import {
  type SignupAttrs,
} from '@divi/types';

import {
  fieldBorderStyleDeclaration,
  overflowStyleDeclaration,
} from './style-declarations';

/**
 * Set CSS styles to the module.
 *
 * @param {StylesProps<SignupAttrs>} props React component props.
 *
 * @returns {ReactElement} The CSS styles for the module.
 */
export const ModuleStyles = ({
  attrs,
  elements,
  defaultPrintedStyleAttrs,
  mode,
  state,
  noStyleTag,
  settings,
  orderClass,
}: StylesProps<SignupAttrs>): ReactElement => (
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
              selector:          `${orderClass} .et_pb_newsletter_description p, ${orderClass} .et_pb_newsletter_description .et_pb_module_header`,
              propertySelectors: {
                textShadow: {
                  desktop: {
                    value: {
                      'text-shadow': `${orderClass} .et_pb_newsletter_description p, ${orderClass} .et_pb_newsletter_description .et_pb_module_header`,
                    },
                  },
                },
              },
            },
          },
          {
            componentName: 'divi/common',
            props:         {
              attr:                attrs?.module?.decoration?.border,
              declarationFunction: overflowStyleDeclaration,
            },
          },
          {
            componentName: 'divi/common',
            props:         {
              selector:            `${orderClass}.et_pb_subscribe`,
              attr:                attrs?.module?.decoration?.border,
              declarationFunction: fieldBorderStyleDeclaration,
            },
          },
          {
            componentName: 'divi/common',
            props:         {
              selector: [
                `${orderClass} .et_pb_newsletter_form p input[type="text"]`,
                `${orderClass} .et_pb_newsletter_form p textarea`,
                `${orderClass} .et_pb_newsletter_form p select`,
                `${orderClass} .et_pb_newsletter_form p .input[type="checkbox"] + label i`,
                `${orderClass} .et_pb_newsletter_form p .input[type="radio"] + label i`,
              ].join(', '),
              attr:                attrs?.field?.decoration?.border,
              declarationFunction: fieldBorderStyleDeclaration,
            },
          },
        ],
      },
    })}
    {/* title */}
    {elements.style({
      attrName: 'title',
    })}
    {/* content */}
    {elements.style({
      attrName: 'content',
    })}
    {/* button */}
    {elements.style({
      attrName: 'button',
    })}
    {/* Email optin module form field */}
    <FormFieldStyle
      selector={[
        `${orderClass} .et_pb_newsletter_form p .input[type=checkbox] + label`,
        `${orderClass} .et_pb_newsletter_form p .input[type=radio] + label`,
        `${orderClass} .et_pb_newsletter_form p .input`,
      ].join(', ')}
      attr={attrs?.field}
      important={{
        spacing: true,
        font:    {
          font: {
            desktop: {
              value: {
                color:       true,
                'font-size': true,
              },
            },
          },
        },
      }}
      propertySelectors={{
        boxShadow: {
          desktop: {
            value: {
              'box-shadow': `${orderClass} .et_pb_newsletter_form p .input`,
            },
          },
        },
        border: {
          desktop: {
            value: {
              'border-radius': [
                `${orderClass} .et_pb_newsletter_form p input[type="text"]`,
                `${orderClass} .et_pb_newsletter_form p textarea`,
                `${orderClass} .et_pb_newsletter_form p select`,
                `${orderClass} .et_pb_newsletter_form p .input[type="checkbox"] + label i`,
                `${orderClass} .et_pb_newsletter_form p .input[type="radio"] + label i`,
              ].join(', '),
              'border-style': [
                `${orderClass} .et_pb_newsletter_form p input[type="text"]`,
                `${orderClass} .et_pb_newsletter_form p textarea`,
                `${orderClass} .et_pb_newsletter_form p select`,
                `${orderClass} .et_pb_newsletter_form p .input[type="checkbox"] + label i`,
                `${orderClass} .et_pb_newsletter_form p .input[type="radio"] + label i`,
              ].join(', '),
            },
          },
        },
        spacing: {
          desktop: {
            value: {
              margin:  `${orderClass} .et_pb_newsletter_form p.et_pb_newsletter_field`,
              padding: [
                `${orderClass} .et_pb_newsletter_form .input`,
                `${orderClass} .et_pb_newsletter_form input[type="text"]`,
                `${orderClass} .et_pb_newsletter_form p.et_pb_newsletter_field input[type="text"]`,
                `${orderClass} .et_pb_newsletter_form textarea`,
                `${orderClass} .et_pb_newsletter_form p.et_pb_newsletter_field textarea`,
                `${orderClass} .et_pb_newsletter_form p select`,
              ].join(', '),
            },
          },
        },
        background: {
          desktop: {
            value: {
              'background-color': [
                `${orderClass} .et_pb_newsletter_form p input[type="text"]`,
                `${orderClass} .et_pb_newsletter_form p textarea`,
                `${orderClass} .et_pb_newsletter_form p select`,
                `${orderClass} .et_pb_newsletter_form p .input[type="checkbox"] + label i`,
                `${orderClass} .et_pb_newsletter_form p .input[type="radio"] + label i`,
              ].join(', '),
            },
            hover: {
              'background-color': [
                `${orderClass} .et_pb_newsletter_form p input[type="text"]:hover`,
                `${orderClass} .et_pb_newsletter_form p textarea:hover`,
                `${orderClass} .et_pb_newsletter_form p select:hover`,
                `${orderClass} .et_pb_newsletter_form p .input[type="checkbox"] + label:hover i`,
                `${orderClass} .et_pb_newsletter_form p .input[type="radio"] + label:hover i`,
              ].join(', '),
            },
          },
        },
        font: {
          font: {
            desktop: {
              value: {
                color: [
                  `${orderClass} .et_pb_newsletter_form p input[type="text"]`,
                  `${orderClass} .et_pb_newsletter_form p textarea`,
                  `${orderClass} .et_pb_newsletter_form p select`,
                  `${orderClass} .et_pb_newsletter_form p .input[type="checkbox"] + label i:before`,
                  `${orderClass} .et_pb_newsletter_form p .input[type="radio"] + label i:before`,
                ].join(', '),
              },
              hover: {
                color: [
                  `${orderClass} .et_pb_newsletter_form p input[type="text"]:hover`,
                  `${orderClass} .et_pb_newsletter_form p textarea:hover`,
                  `${orderClass} .et_pb_newsletter_form p select:hover`,
                  `${orderClass} .et_pb_newsletter_form p .input[type="checkbox"] + label:hover i:before`,
                  `${orderClass} .et_pb_newsletter_form p .input[type="radio"] + label:hover i:before`,
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
                  `${orderClass} .et_pb_newsletter_form p textarea`,
                  `${orderClass} .et_pb_newsletter_form p select`,
                  `${orderClass} .et_pb_newsletter_form p input.input`,
                ].join(', '),
              },
              hover: {
                'background-color': [
                  `${orderClass} .et_pb_newsletter_form p textarea`,
                  `${orderClass} .et_pb_newsletter_form p select`,
                  `${orderClass} .et_pb_newsletter_form p input.input`,
                ].join(', '),
              },
            },
          },
          font: {
            font: {
              desktop: {
                value: {
                  color: [
                    `${orderClass} .et_pb_newsletter_form p .input[type="checkbox"]:active + label`,
                    `${orderClass} .et_pb_newsletter_form p .input[type="radio"]:active + label`,
                    `${orderClass} .et_pb_newsletter_form p .input[type="checkbox"]:checked:active + label i:before`,
                    `${orderClass} .et_pb_newsletter_form p .input`,
                  ].join(', '),
                },
                hover: {
                  color: [
                    `${orderClass} .et_pb_newsletter_form p .input[type="checkbox"]:active:hover + label`,
                    `${orderClass} .et_pb_newsletter_form p .input[type="radio"]:active:hover + label`,
                    `${orderClass} .et_pb_newsletter_form p .input[type="checkbox"]:checked:active:hover + label i:before`,
                    `${orderClass} .et_pb_newsletter_form p .input`,
                  ].join(', '),
                },
              },
            },
          },
          border: {
            desktop: {
              value: {
                'border-radius': `${orderClass} .et_pb_newsletter_form p input[type="text"]`,
                'border-style':  `${orderClass} .et_pb_newsletter_form p input[type="text"]`,
              },
            },
          },
        },
      }}
      orderClass={orderClass}
    />
    {/* ::*placeholder style can't handle multiple selectors used the same statements. */}
    <ElementStyle
      selector={[
        `${orderClass} .et_pb_newsletter_form p .input::placeholder`,
        `${orderClass} .et_pb_newsletter_form p textarea::placeholder`,
        `${orderClass} .et_pb_newsletter_form p .input:focus::placeholder`,
        `${orderClass} .et_pb_newsletter_form p textarea:focus::placeholder`,
      ].join(', ')}
      attrs={{
        font: attrs?.field?.decoration?.font,
      }}
      orderClass={orderClass}
    />
    <ElementStyle
      selector={[
        `${orderClass} .et_pb_newsletter_form p .input::-webkit-input-placeholder`,
        `${orderClass} .et_pb_newsletter_form p textarea::-webkit-input-placeholder`,
        `${orderClass} .et_pb_newsletter_form p .input:focus::-webkit-input-placeholder`,
        `${orderClass} .et_pb_newsletter_form p textarea:focus::-webkit-input-placeholder`,
      ].join(', ')}
      attrs={{
        font: attrs?.field?.decoration?.font,
      }}
      orderClass={orderClass}
    />
    <ElementStyle
      selector={[
        `${orderClass} .et_pb_newsletter_form p .input::-moz-placeholder`,
        `${orderClass} .et_pb_newsletter_form p textarea::-moz-placeholder`,
        `${orderClass} .et_pb_newsletter_form p .input:focus::-moz-placeholder`,
        `${orderClass} .et_pb_newsletter_form p textarea:focus::-moz-placeholder`,
      ].join(', ')}
      attrs={{
        font: attrs?.field?.decoration?.font,
      }}
      orderClass={orderClass}
    />
    <ElementStyle
      selector={[
        `${orderClass} .et_pb_newsletter_form p .input::-ms-input-placeholder`,
        `${orderClass} .et_pb_newsletter_form p textarea::-ms-input-placeholder`,
        `${orderClass} .et_pb_newsletter_form p .input:focus::-ms-input-placeholder`,
        `${orderClass} .et_pb_newsletter_form p textarea:focus::-ms-input-placeholder`,
      ].join(', ')}
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
