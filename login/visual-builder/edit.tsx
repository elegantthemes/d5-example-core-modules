import React, {
  type ReactElement, useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { __ } from '@wordpress/i18n';

import {
  ChildModulesContainer,
  ModuleContainer,
} from '@divi/module';

import { moduleClassnames } from './module-classnames';
import { ModuleScriptData } from './module-script-data';
import { ModuleStyles } from './module-styles';
import { type LoginEditProps } from './types';
import './style.scss';

/**
 * Renders `Login` edit component for visual builder.
 *
 * @since ??
 *
 * @param {LoginEditProps} props React component props.
 *
 * @returns {ReactElement}
 */
const LoginEdit = (props: LoginEditProps): ReactElement => {
  /**
   * Setups initial variables.
   */
  const {
    attrs,
    childrenIds,
    defaultPrintedStyleAttrs,
    id,
    isFirst,
    isLast,
    name,
    urls,
    elements,
    isLooped,
    loopIndex,
  } = props;

  const [login, setLogin]       = useState('');
  const [password, setPassword] = useState('');

  const loginRef          = useRef(null);
  const currentPageUrl    = urls?.currentPageUrl ?? '';
  const loginFormUrl      = urls?.loginFormUrl ?? '';
  const forgotPasswordUrl = urls?.forgotPasswordUrl ?? '';

  const redirectCurrentPage = 'on' === attrs?.module?.advanced?.currentPageRedirect?.desktop?.value;

  const renderLoginForm = () => {
    const redirectInputMarkup = (
      <input
        type="hidden"
        name="redirect_to"
        value={currentPageUrl}
      />
    );

    const redirectInput = redirectCurrentPage ? redirectInputMarkup : '';

    // Show the full login form in VB.
    return (
      <div
        className="et_pb_newsletter_form et_pb_login_form"
      >
        <form
          action={loginFormUrl}
          method="post"
        >
          <input type="text" defaultValue={__('Note: this field is used to disable browser autofill during the form editing in VB', 'et_builder')} name="log" style={{ display: 'none' }} />
          <input type="password" defaultValue={__('Note: this field is used to disable browser autofill during the form editing in VB', 'et_builder')} name="pwd" style={{ display: 'none' }} />
          <p
            className="et_pb_contact_form_field"
          >
            <label
              className="et_pb_contact_form_label"
              htmlFor={`user_login_${id}`}
              style={{ display: 'none' }}
            >
              {__('Username', 'et_builder')}
            </label>
            {elements.render({
              attrName:       'field',
              tagName:        'input',
              skipChildren:   true,
              htmlAttributes: {
                id:          `user_login_${id}`,
                placeholder: __('Username', 'et_builder'),
                type:        'text',
                onChange:    (e: React.ChangeEvent<HTMLInputElement>) => {
                  setLogin(e.target.value);
                },
                value: login,
                name:  'log',
              },
            })}
          </p>
          <p
            className="et_pb_contact_form_field"
          >
            <label
              className="et_pb_contact_form_label"
              htmlFor={`user_pass_${id}`}
              style={{ display: 'none' }}
            >
              {__('Password', 'et_builder')}
            </label>
            {elements.render({
              attrName:       'field',
              tagName:        'input',
              skipChildren:   true,
              htmlAttributes: {
                id:          `user_pass_${id}`,
                placeholder: __('Password', 'et_builder'),
                type:        'password',
                onChange:    (e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                },
                value: password,
                name:  'pwd',
              },
            })}
          </p>
          <p className="et_pb_forgot_password">
            <a href={forgotPasswordUrl}>
              {__('Forgot your password?', 'et_builder')}
            </a>
          </p>
          <p>
            {elements.render({
              attrName:     'button',
              elementProps: {
                name:       'et_builder_submit_button',
                hasWrapper: false,
                type:       'button',
              },
            })}
          </p>
          {redirectInput}
        </form>
      </div>
    );
  };

  return (
    <ModuleContainer
      attrs={attrs}
      defaultPrintedStyleAttrs={defaultPrintedStyleAttrs}
      domRef={loginRef}
      elements={elements}
      id={id}
      isFirst={isFirst}
      isLast={isLast}
      scriptDataComponent={ModuleScriptData}
      stylesComponent={ModuleStyles}
      name={name}
      classnamesFunction={moduleClassnames}
      isLooped={isLooped}
      loopIndex={loopIndex}
    >
      {elements.styleComponents({
        attrName: 'module',
      })}
      <div className={classNames({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        et_pb_newsletter_description: true,
      })}
      >
        {elements.render({
          attrName: 'title',
        })}
        {elements.render({
          attrName: 'content',
        })}
      </div>
      {renderLoginForm()}

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
  LoginEdit,
};
