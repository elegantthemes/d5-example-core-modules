import React, {
  type ReactElement,
  useRef,
} from 'react';
import classNames from 'classnames';
import { get } from 'lodash';

import {
  __,
} from '@wordpress/i18n';

import { useSelect } from '@divi/data';
import {
  ChildModulesContainer,
  ModuleContainer,
  useAppState,
} from '@divi/module';
import { getAttrByMode } from '@divi/module-utils';

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
  type SignupEditProps,
} from './types';

/**
 * Edit component of visual builder of Email Opt In Module.
 *
 * @since ??
 *
 * @param {SignupEditProps} props React component props.
 *
 * @returns {ReactElement}
 */
const SignupEdit = ({
  attrs,
  id,
  isFirst,
  isLast,
  name,
  childrenIds,
  elements,
  defaultPrintedStyleAttrs,
  isLooped,
  loopIndex,
}: SignupEditProps): ReactElement => {
  const {
    breakpoint,
  } = useAppState();

  const signupRef            = useRef(null);
  const title                = getAttrByMode(attrs?.title?.innerContent) ?? '';
  const description          = getAttrByMode(attrs?.content?.innerContent) ?? '';
  const hasSignUpDescription = '' !== title || '' !== description;
  const nameFieldOnly        = getAttrByMode(attrs?.field?.advanced?.nameFieldOnly) ?? 'on';
  const nameField            = getAttrByMode(attrs?.field?.advanced?.nameField) ?? 'off';
  const firstNameField       = getAttrByMode(attrs?.field?.advanced?.firstNameField) ?? 'on';
  const lastNameField        = getAttrByMode(attrs?.field?.advanced?.lastNameField) ?? 'on';
  const fullwidthName        = getAttrByMode(attrs?.field?.advanced?.nameFullwidth) ?? 'on';
  const fullwidthFirstName   = getAttrByMode(attrs?.field?.advanced?.firstNameFullwidth) ?? 'on';
  const fullwidthLastName    = getAttrByMode(attrs?.field?.advanced?.lastNameFullwidth) ?? 'on';
  const fullwidthEmail       = getAttrByMode(attrs?.field?.advanced?.emailFullwidth) ?? 'on';
  const enableCustomFields   = getAttrByMode(attrs?.customFields?.advanced?.enable) ?? 'off';

  /**
   * Layout classes for fields element.
   * These classes are merged with the existing 'et_pb_newsletter_fields' class.
   */
  const layoutDisplayValue = get(attrs, 'module.decoration.layout.desktop.value.display', 'flex') as string;
  const isFlexLayout       = 'flex' === layoutDisplayValue;
  const isGridLayout       = 'grid' === layoutDisplayValue;
  const isBlockLayout      = ! isFlexLayout && ! isGridLayout;

  const fieldsLayoutClasses = classNames({
    et_pb_newsletter_fields: true,
    et_flex_module:          isFlexLayout,
    et_grid_module:          isGridLayout,
    et_block_module:         isBlockLayout,
  });

  // Get Email Service Provider and its name fields.
  const selectedProvider           = getAttrByMode(attrs?.module?.advanced?.emailService)?.provider ?? 'mailchimp';
  const emailService               = useSelect(selectData => selectData('divi/email-marketing').getService(selectedProvider));
  const isCustomFieldsEnable       = !! emailService?.getIn(['customFields', 'enable']);
  const providerNameFields         = emailService?.getIn(['nameFields']);
  const showProviderNameFieldOnly  = providerNameFields?.name;
  const showProviderNameField      = providerNameFields?.useSingleNameField;
  const showProviderFirstNameField = providerNameFields?.showFirstNameField;
  const showProviderLastNameField  = providerNameFields?.showLastNameField;
  const showNameFieldOnly          = showProviderNameFieldOnly ? 'on' === nameFieldOnly : 'on' === nameField;
  const showFirstNameField         = 'on' === firstNameField && 'on' !== nameField && ! showProviderNameFieldOnly;
  let fieldCount                   = 0;

  /**
   * Renders Name Field.
   *
   * @returns {string} JSX representation of Name Field.
   */
  const renderNameField = (): ReactElement => {
    // If name field and first name field from provider is not set then return null.
    if (! showProviderNameField && ! showProviderFirstNameField && ! showProviderNameFieldOnly) {
      return null;
    }

    const fullwidthNameField         = showFirstNameField ? fullwidthFirstName : fullwidthName;
    const showNameFieldInDesktopMode = fullwidthNameField && 'on' !== fullwidthNameField;
    const nameFieldClassnames        = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_newsletter_field:          true,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_contact_field_half:        showNameFieldInDesktopMode,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_contact_field_last:        ! showNameFieldInDesktopMode,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_contact_field_half_tablet: 'tablet' === breakpoint && 'on' !== fullwidthNameField,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_contact_field_last_tablet: 'tablet' === breakpoint && 'on' === fullwidthNameField,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_contact_field_half_phone:  'phone' === breakpoint && 'on' !== fullwidthNameField,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_contact_field_last_phone:  'phone' === breakpoint && 'on' === fullwidthNameField,
    };
    const nameFieldLabel             = showNameFieldOnly ? __('Name', 'et_builder') : __('First Name', 'et_builder');

    fieldCount++;

    // If name field and first name field is not set then return null.
    if (! showNameFieldOnly && ! showFirstNameField) {
      return null;
    }

    return (
      <p
        className={classNames(nameFieldClassnames)}
        data-quickaccess-id="form_field"
        data-quickaccess-order="1"
      >
        <label
          className="et_pb_contact_form_label"
          htmlFor="et_pb_signup_firstname"
          style={{ display: 'none' }}
        >
          {nameFieldLabel}
        </label>
        {elements.render({
          attrName:       'field',
          tagName:        'input',
          skipChildren:   true,
          htmlAttributes: {
            id:          'et_pb_signup_firstname',
            type:        'text',
            placeholder: nameFieldLabel,
            name:        'et_pb_signup_firstname',
          },
        })}
      </p>
    );
  };

  /**
   * Renders Last Name Field.
   *
   * @returns {string} JSX representation of Last Name Field.
   */
  const renderLastNameField = (): ReactElement => {
    // If last name field from provider is not set then return null.
    if (! showProviderLastNameField) {
      return null;
    }

    const showLastNameField = 'on' === lastNameField && ! showProviderNameFieldOnly;

    // If name field and first name field is not set then return null.
    if (showNameFieldOnly || ! showLastNameField) {
      return null;
    }

    const showLastNameFieldInDesktopMode = fullwidthLastName && 'on' !== fullwidthLastName;
    const lastNameFieldClassnames        = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_newsletter_field:          true,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_contact_field_half:        showLastNameFieldInDesktopMode,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_contact_field_last:        ! showLastNameFieldInDesktopMode || 0 === fieldCount % 2,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_contact_field_half_tablet: 'tablet' === breakpoint && 'on' !== fullwidthLastName,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_contact_field_last_tablet: ('tablet' === breakpoint && 'on' === fullwidthLastName) || 0 === fieldCount % 2,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_contact_field_half_phone:  'phone' === breakpoint && 'on' !== fullwidthLastName,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_contact_field_last_phone:  ('phone' === breakpoint && 'on' === fullwidthLastName) || 0 === fieldCount % 2,
    };

    fieldCount++;

    return (
      <p
        className={classNames(lastNameFieldClassnames)}
        data-quickaccess-id="form_field"
        data-quickaccess-order="2"
      >
        <label
          className="et_pb_contact_form_label"
          htmlFor="et_pb_signup_lastname"
          style={{ display: 'none' }}
        >
          {__('Last Name', 'et_builder')}
        </label>
        {elements.render({
          attrName:       'field',
          tagName:        'input',
          skipChildren:   true,
          htmlAttributes: {
            id:          'et_pb_signup_lastname',
            type:        'text',
            placeholder: __('Last Name', 'et_builder'),
            name:        'et_pb_signup_lastname',
          },
        })}
      </p>
    );
  };

  /**
   * Renders Email Field.
   *
   * @returns {string} JSX representation of Email Field.
   */
  const renderEmailField = (): ReactElement => {
    const showEmailFieldInDesktopMode = fullwidthEmail && 'on' !== fullwidthEmail;
    const emailFieldClassnames        = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_newsletter_field:          true,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_contact_field_half:        showEmailFieldInDesktopMode,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_contact_field_last:        ! showEmailFieldInDesktopMode || 0 === fieldCount % 2,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_contact_field_half_tablet: 'tablet' === breakpoint && 'on' !== fullwidthEmail,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_contact_field_last_tablet: ('tablet' === breakpoint && 'on' === fullwidthEmail) || 0 === fieldCount % 2,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_contact_field_half_phone:  'phone' === breakpoint && 'on' !== fullwidthEmail,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      et_pb_contact_field_last_phone:  ('phone' === breakpoint && 'on' === fullwidthEmail) || 0 === fieldCount % 2,
    };

    fieldCount++;

    return (
      <p
        className={classNames(emailFieldClassnames)}
        data-quickaccess-id="form_field"
        data-quickaccess-order="3"
      >
        <label
          className="et_pb_contact_form_label"
          htmlFor="et_pb_signup_email"
          style={{ display: 'none' }}
        >
          {__('Email', 'et_builder')}
        </label>
        {elements.render({
          attrName:       'field',
          tagName:        'input',
          skipChildren:   true,
          htmlAttributes: {
            id:          'et_pb_signup_email',
            type:        'text',
            placeholder: __('Email', 'et_builder'),
            name:        'et_pb_signup_email',
          },
        })}
      </p>
    );
  };

  /**
   * Renders Button Field.
   *
   * @returns {string} JSX representation of Button Field.
   */
  const renderSubmitButton = (): ReactElement => (
    <p className="et_pb_newsletter_button_wrap" data-quickaccess-id="button">
      {elements.render({
        attrName:     'button',
        elementProps: {
          hasPreloader:   true,
          hasTextWrapper: true,
          hasWrapper:     false,
        },
      })}
    </p>
  );

  /**
   * Renders Custom Fields.
   *
   * @returns {string} JSX representation of all child custom fields.
   */
  const renderCustomFields = (): ReactElement => {
    if ('on' !== enableCustomFields || ! isCustomFieldsEnable) {
      return null;
    }

    return childrenIds && childrenIds.length > 0
      ? (
        <ChildModulesContainer
          ids={childrenIds}
          isLooped={isLooped}
          loopIndex={loopIndex}
        />
      )
      : null;
  };

  /**
   * Renders Email Optin Form Element.
   *
   * @returns {string} JSX representation of Email Optin Form Element.
   */
  const renderForm = (): ReactElement => (
    <div className="et_pb_newsletter_form">
      <form
        method="post"
        className={classNames({
          /* eslint-disable @typescript-eslint/naming-convention */
          et_pb_newsletter_custom_fields: 'on' === enableCustomFields,
        })}
      >
        <div className="et_pb_newsletter_result et_pb_newsletter_error" />
        <div className="et_pb_newsletter_result et_pb_newsletter_success" />
        <div className={fieldsLayoutClasses}>

          {renderNameField()}
          {renderLastNameField()}
          {renderEmailField()}
          {renderCustomFields()}
          {renderSubmitButton()}

          {/* Footer Content */}
          {elements.render({
            attrName: 'footerContent',
          })}
        </div>
      </form>
    </div>
  );

  return (
    <ModuleContainer
      attrs={attrs}
      domRef={signupRef}
      elements={elements}
      id={id}
      isFirst={isFirst}
      isLast={isLast}
      name={name}
      defaultPrintedStyleAttrs={defaultPrintedStyleAttrs}
      stylesComponent={ModuleStyles}
      scriptDataComponent={ModuleScriptData}
      classnamesFunction={moduleClassnames}
      isLooped={isLooped}
      loopIndex={loopIndex}
    >
      {elements.styleComponents({
        attrName: 'module',
      })}
      <div
        className={classNames({
        /* eslint-disable @typescript-eslint/naming-convention */
          et_pb_newsletter_description: true,
          et_multi_view_hidden:         ! hasSignUpDescription,
        })}
      >
        {/* Title */}
        {elements.render({
          attrName: 'title',
        })}
        {/* Content */}
        {elements.render({
          attrName: 'content',
        })}
      </div>
      {/* Render Form */}
      {renderForm()}

      {/* General child modules (separate from custom form fields) */}
      {childrenIds && childrenIds.length > 0 && 'on' !== enableCustomFields && (
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
  SignupEdit,
};
