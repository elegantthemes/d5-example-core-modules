import React, {
  type ChangeEvent,
  type ReactElement,
  useState,
} from 'react';
import { has, isUndefined, noop } from 'lodash';

import { __ } from '@wordpress/i18n';

import {
  ChildModulesContainer,
  ModuleContainer,
} from '@divi/module';
import { getAttrByMode } from '@divi/module-utils';

import { useIsLastContactField } from './utils/is-last-contact-field';
import {
  moduleClassnames,
} from './module-classnames';
import {
  ModuleScriptData,
} from './module-script-data';
import {
  ModuleStyles,
} from './module-styles';
import {
  type ContactFieldEditProps,
} from './types';

/**
 * Edit component of visual builder.
 *
 * @since ??
 *
 * @param { ContactFieldEditProps} props React component props.
 *
 * @returns {ReactElement}
 */
const ContactFieldEdit = ({
  attrs,
  id,
  name,
  elements,
  defaultPrintedStyleAttrs,
  moduleOrderIndex,
  parentId,
  childrenIds,
  isLooped,
  loopIndex,
}: ContactFieldEditProps): ReactElement => {
  const contactFieldRef = React.useRef(null);

  const fieldTitle: string          = getAttrByMode(attrs?.fieldItem?.innerContent) ?? null;
  const fieldType: string           = getAttrByMode(attrs?.fieldItem?.advanced?.type) ?? '';
  const fieldId: string             = getAttrByMode(attrs?.fieldItem?.advanced?.id) ?? '';
  const fieldRequired               = getAttrByMode(attrs?.fieldItem?.advanced?.required) ?? '';
  const fieldFullwidth: string      = getAttrByMode(attrs?.fieldItem?.advanced?.fullwidth) ?? 'off';
  const minLength                   = getAttrByMode(attrs?.fieldItem?.advanced?.minLength) ?? '';
  const maxLength                   = getAttrByMode(attrs?.fieldItem?.advanced?.maxLength) ?? '';
  const allowedSymbols              = getAttrByMode(attrs?.fieldItem?.advanced?.allowedSymbols) ?? '';
  const checkboxOptions             = attrs?.fieldItem?.advanced?.checkboxOptions?.desktop?.value ?? null;
  const radioOptions                = attrs?.fieldItem?.advanced?.radioOptions?.desktop?.value ?? null;
  const selectOptions               = attrs?.fieldItem?.advanced?.selectOptions?.desktop?.value ?? null;
  const inputDataRequired           = 'off' === fieldRequired ? 'not_required' : 'required';
  const [inputValue, setInputValue] = useState('');
  let radioContent: JSX.Element[]   = [];

  // Use the new logic that matches server-side PHP behavior.
  // Note: parentId should be provided by the module architecture for Contact Form fields.
  const isLastContactField = useIsLastContactField(
    id,
    loopIndex || null,
    parentId || '',
    fieldFullwidth,
  );

  const onChangeInputValue = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>): void => {
    const newInputValue = event.target.value;
    setInputValue(newInputValue);
  };

  const getFieldId = (): string => {
    if ('' === fieldId) {
      return '';
    }
    return fieldId?.toLowerCase();
  };

  const getFieldName = (): string => {
    // Prepare field name with combination of field ID and module ID. (In D4 it is current module number)
    const fieldInputId = getFieldId();
    const fieldName    = `et_pb_contact_${fieldInputId}_${id}`;
    return fieldName?.toLowerCase();
  };

  const renderInputFields = (): ReactElement => {
    const inputName           = getFieldName();
    const inputId             = getFieldName();
    const inputDataOriginalId = getFieldId();

    let input: JSX.Element = null;
    let title: string      = null;
    let symbolPattern      = '.';
    const fieldMinLength   = Number(minLength);
    const fieldMaxLength   = Number(maxLength);

    // Determine symbol pattern and title based upon allowedSymbols type.
    const hasSymbolsPattern = ['letters', 'numbers', 'alphanumeric'].includes(allowedSymbols);
    if (hasSymbolsPattern) {
      switch (allowedSymbols) {
        case 'letters':
          symbolPattern = '[A-Z|a-z|\\s-]';
          title         = __('Only letters allowed.', 'et_builder');
          break;

        case 'numbers':
          symbolPattern = '[0-9\\s-]';
          title         = __('Only numbers allowed.', 'et_builder');
          break;

        case 'alphanumeric':
          symbolPattern = '[\\w\\s-]';
          title         = __('Only letters and numbers allowed.', 'et_builder');
          break;

        default:
          break;
      }
    }

    // Determine maxLength value.
    let inputFieldMaxLength   = null;
    const fieldMaxLengthValue = Math.max(fieldMinLength, fieldMaxLength);
    const fieldMinLengthValue = Math.min(fieldMinLength, fieldMaxLength);
    if (0 !== fieldMinLength && 0 !== fieldMaxLength) {
      inputFieldMaxLength = fieldMaxLengthValue > 0 ? fieldMaxLengthValue : null;
    }

    // Determine length pattern for input field.
    let lengthPattern   = '*';
    let pattern: string = null;
    if (0 !== fieldMinLength || 0 !== fieldMaxLength) {
      lengthPattern = '{';

      if (0 !== fieldMinLength) {
        lengthPattern += fieldMinLengthValue;
        title         += __(`Minimum length: ${fieldMinLengthValue} characters.`, 'et_builder');
      }

      if (0 === fieldMaxLength) {
        lengthPattern += ',';
      }

      if (0 === fieldMinLength) {
        lengthPattern += '0';
      }

      if (0 !== fieldMaxLength) {
        lengthPattern += `,${fieldMaxLengthValue}`;
        title         += __(`Maximum length: ${fieldMaxLengthValue} characters.`, 'et_builder');
      }

      lengthPattern += '}';
    }

    // If symbol pattern and length pattern are not default, then combine them.
    if ('.' !== symbolPattern || '*' !== lengthPattern) {
      pattern = `${symbolPattern}${lengthPattern}`;
    }

    // Render input field based on field type.
    switch (fieldType) {
      case 'text':
        input = (
          <textarea
            name={inputName}
            id={inputId}
            className="et_pb_contact_message input"
            data-required_mark={inputDataRequired}
            data-field_type={fieldType}
            data-original_id={inputDataOriginalId}
            placeholder={fieldTitle}
            value={inputValue}
            onChange={onChangeInputValue}
          />
        );
        break;
      case 'textarea':
        input = (
          <textarea
            name={inputName}
            id={inputId}
            className="et_pb_contact_message input"
            data-required_mark={inputDataRequired}
            data-field_type={fieldType}
            data-original_id={inputDataOriginalId}
            placeholder={fieldTitle}
            value={inputValue}
            onChange={onChangeInputValue}
          />
        );
        break;
      case 'input':
        input = (
          <input
            type="text"
            name={inputName}
            id={inputId}
            className="input"
            data-required_mark={inputDataRequired}
            data-field_type={fieldType}
            data-original_id={inputDataOriginalId}
            placeholder={fieldTitle}
            value={inputValue}
            title={title}
            pattern={pattern}
            maxLength={inputFieldMaxLength}
            onChange={onChangeInputValue}
          />
        );
        break;
      case 'email':
        input = (
          <input
            type="text"
            name={inputName}
            id={inputId}
            className="input"
            data-required_mark={inputDataRequired}
            data-field_type={fieldType}
            data-original_id={inputDataOriginalId}
            placeholder={fieldTitle}
            value={inputValue}
            onChange={onChangeInputValue}
          />
        );
        break;
      case 'checkbox':
        if (checkboxOptions) {
          if (checkboxOptions.length) {
            radioContent = checkboxOptions.map((option, key) => {
              const isChecked = '1' === option.checked;
              let link        = null;

              if (! isUndefined(option?.link?.url) && '' !== option?.link?.url) {
                link = <a href={option?.link?.url ?? ''} target="_blank" rel="noreferrer">{option?.link?.text ?? ''}</a>;
              }

              const regexStripTag           = /<(?:.|\n)*?>/gm;
              const htmlStrippedOptionValue = has(option, 'value') ? option.value.replace(regexStripTag, '') : '';

              return (
                // eslint-disable-next-line react/no-array-index-key
                <span className="et_pb_contact_field_checkbox" key={`option-${key}`}>
                  <input
                    type="checkbox"
                    id={`${inputId}_${key}`}
                    checked={isChecked}
                    className="input"
                    value={fieldTitle}
                    name={inputName}
                    data-required_mark={inputDataRequired}
                    data-field_type={fieldType}
                    data-original_id={inputDataOriginalId}
                    onChange={noop}
                    data-id={option.dragID}
                  />
                  {' '}
                  <label htmlFor={`${inputId}_${key}`}>
                    <i />
                    {htmlStrippedOptionValue}
                    {link}
                  </label>
                </span>
              );
            });
          }
        }

        input = (
          <React.Fragment>
            <input
              className="et_pb_checkbox_handle"
              type="hidden"
              name={inputName}
              data-required_mark={inputDataRequired}
              data-field_type={fieldType}
              data-original_id={inputDataOriginalId}
            />
            <span className="et_pb_contact_field_options_wrapper">
              {'' !== fieldTitle && <span className="et_pb_contact_field_options_title">{fieldTitle}</span>}
              <span className="et_pb_contact_field_options_list">
                {radioContent || __('No options added.', 'et_builder')}
              </span>
            </span>
          </React.Fragment>
        );
        break;

      case 'radio':
        if (radioOptions) {
          if (radioOptions.length) {
            radioContent = radioOptions.map((option, key) => {
              const isChecked = '1' === option.checked;
              let link        = null;

              if (! isUndefined(option?.link?.url) && '' !== option?.link?.url) {
                link = <a href={option?.link?.url ?? ''} target="_blank" rel="noreferrer">{option?.link?.text ?? ''}</a>;
              }

              const regexStripTag           = /<(?:.|\n)*?>/gm;
              const htmlStrippedOptionValue = has(option, 'value') ? option.value.replace(regexStripTag, '') : '';

              return (
                // eslint-disable-next-line react/no-array-index-key
                <span className="et_pb_contact_field_radio" key={`option-${key}`}>
                  <input
                    type="radio"
                    id={`${inputId}_${key}`}
                    checked={isChecked}
                    className="input"
                    value={fieldTitle}
                    name={inputName}
                    data-required_mark={inputDataRequired}
                    data-field_type={fieldType}
                    data-original_id={inputDataOriginalId}
                    onChange={noop}
                    data-id={option.dragID}
                  />
                  {' '}
                  <label htmlFor={`${inputId}_${key}`}>
                    <i />
                    {htmlStrippedOptionValue}
                    {link}
                  </label>
                </span>
              );
            });
          }
        }

        input = (
          <React.Fragment>
            <input
              className="et_pb_checkbox_handle"
              type="hidden"
              name={inputName}
              data-required_mark={inputDataRequired}
              data-field_type={fieldType}
              data-original_id={inputDataOriginalId}
            />
            <span className="et_pb_contact_field_options_wrapper">
              {'' !== fieldTitle && <span className="et_pb_contact_field_options_title">{fieldTitle}</span>}
              <span className="et_pb_contact_field_options_list">
                {radioContent || __('No options added.', 'et_builder')}
              </span>
            </span>
          </React.Fragment>
        );
        break;

      case 'select':
        input = (
          <select
            id={inputId}
            className="et_pb_contact_select input"
            name={inputName}
            data-required_mark={inputDataRequired}
            data-field_type={fieldType}
            data-original_id={inputDataOriginalId}
          >
            <option value="">{fieldTitle}</option>
            {selectOptions?.length > 0
              ? selectOptions.map((option, key) => (
                <option
                  // eslint-disable-next-line react/no-array-index-key
                  key={`option-${key}`}
                  value={option.value}
                  data-id={option.dragID}
                >
                  {option.value}
                </option>
              ))
              : null}
          </select>
        );
        break;

      default:
        break;
    }

    return (input);
  };

  return (
    <ModuleContainer
      tag="div"
      attrs={attrs}
      domRef={contactFieldRef}
      isLooped={isLooped}
      loopIndex={loopIndex}
      elements={elements}
      id={id}
      name={name}
      moduleOrderIndex={moduleOrderIndex}
      defaultPrintedStyleAttrs={defaultPrintedStyleAttrs}
      stylesComponent={ModuleStyles}
      scriptDataComponent={ModuleScriptData}
      classnamesFunction={moduleClassnames}
      htmlAttrs={{
        'data-type':           fieldType,
        'data-id':             fieldId,
        'data-quickaccess-id': 'form_field',
      }}
      className={isLastContactField ? 'et_pb_contact_field_last' : ''}
    >
      {elements.styleComponents({
        attrName: 'module',
      })}
      {/* Render Contact Field Title */}
      {elements.render({
        attrName: 'fieldItem',
      })}
      {/* Render Contact Field */}
      {renderInputFields()}
      {childrenIds && childrenIds.length > 0 && (
        <ChildModulesContainer
          ids={childrenIds}
          isLooped={isLooped}
          loopIndex={loopIndex}
        />
      )}
    </ModuleContainer>
  );
};

export {
  ContactFieldEdit,
};
