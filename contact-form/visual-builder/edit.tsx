import React, {
  type ChangeEvent,
  type ReactElement,
  useRef,
  useState,
} from 'react';
import {
  get,
  random,
} from 'lodash';

import {
  ChildModulesContainer,
  InnerMousetrap,
  ModuleContainer,
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
  type ContactFormEditProps,
} from './types';

/**
 * Edit component of visual builder.
 *
 * @since ??
 *
 * @param { ContactFormEditProps} props React component props.
 *
 * @returns {ReactElement}
 */
const ContactFormEdit = ({
  attrs,
  id,
  isFirst,
  isLast,
  childrenIds,
  name,
  elements,
  urls,
  defaultPrintedStyleAttrs,
  isLooped,
  loopIndex,
}: ContactFormEditProps): ReactElement => {
  const contactFormRef                  = useRef(null);
  const useSpamService                  = getAttrByMode(attrs?.module?.advanced?.spamProtection)?.enabled;
  const useBasicCaptcha                 = getAttrByMode(attrs?.module?.advanced?.spamProtection)?.useBasicCaptcha;
  const useRedirect                     = getAttrByMode(attrs?.redirect?.advanced?.useRedirect);
  const redirectUrl                     = getAttrByMode(attrs?.redirect?.innerContent);
  const uniqueId                        = getAttrByMode(attrs?.module?.advanced?.uniqueId) ?? id;
  const [firstBasicCaptchaDigit]        = useState(random(0, 15));
  const [secondBasicCaptchaDigit]       = useState(random(0, 15));
  const currentPageUrl                  = urls?.currentPageUrl ?? '';
  const [captchaValue, setCaptchaValue] = useState('');

  const getCaptchaName = () => `et_pb_contact_captcha_${id}`;

  const onChangeCaptchaValue = (event: ChangeEvent<HTMLInputElement>): void => {
    const newCaptchaValue = event.target.value;
    setCaptchaValue(newCaptchaValue);
  };

  const renderCaptcha = (): ReactElement => {
    let captcha: JSX.Element = null;

    if ('on' === useBasicCaptcha && 'off' === useSpamService) {
      captcha = (
        <div className="et_pb_contact_right et_pb_contact_field">
          <p className="clearfix">
            <span className="et_pb_contact_captcha_question" data-quickaccess-id="captcha">
              {firstBasicCaptchaDigit}
              {' '}
              +
              {' '}
              {secondBasicCaptchaDigit}
            </span>
            {' '}
            &#61;
            {' '}
            <input
              type="text"
              size={2}
              className="input et_pb_contact_captcha"
              data-first_digit={firstBasicCaptchaDigit}
              data-second_digit={secondBasicCaptchaDigit}
              value={captchaValue}
              onChange={onChangeCaptchaValue}
              name={getCaptchaName()}
              data-required_mark="required"
              autoComplete="off"
            />
          </p>
        </div>
      );
    }
    return captcha;
  };

  // Get layout display to add appropriate classes to the form element
  const layoutDisplay = get(attrs, 'module.decoration.layout.desktop.value.display', 'flex') as string;
  const formClasses   = [
    'et_pb_contact_form',
    'flex' === layoutDisplay ? 'et_flex_module' : '',
    'grid' === layoutDisplay ? 'et_grid_module' : '',
    'block' === layoutDisplay ? 'et_block_module' : '',
  ].filter(Boolean).join(' ');

  return (
    <ModuleContainer
      attrs={attrs}
      domRef={contactFormRef}
      elements={elements}
      id={id}
      isFirst={isFirst}
      isLast={isLast}
      name={name}
      defaultPrintedStyleAttrs={defaultPrintedStyleAttrs}
      stylesComponent={ModuleStyles}
      scriptDataComponent={ModuleScriptData}
      classnamesFunction={moduleClassnames}
      htmlAttrs={{
      // eslint-disable-next-line @typescript-eslint/naming-convention
        'data-form_unique_num': id,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'data-form_unique_id':  uniqueId,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'data-redirect_url':    'on' === useRedirect && '' !== redirectUrl ? redirectUrl : null,
      }}
      cssPosition="before"
      isLooped={isLooped}
      loopIndex={loopIndex}
    >
      {elements.styleComponents({
        attrName: 'module',
      })}
      {elements.render({
        attrName: 'title',
      })}
      <div className="et_pb_contact">
        <form
          className={formClasses}
          method="post"
          action={currentPageUrl}
        >
          <InnerMousetrap type="edited" />
          {/* Render contact form input fields */}
          {childrenIds && childrenIds.length > 0 && (
            <ChildModulesContainer
              ids={childrenIds}
              isLooped={isLooped}
              loopIndex={loopIndex}
            />
          )}
          <input
            type="hidden"
            value="et_contact_process"
            name={`et_pb_contactform_submit_${id}`}
            readOnly
          />
          <div className="et_contact_bottom_container">
            {renderCaptcha()}
            {elements.render({
              attrName: 'button',
            })}
          </div>
          <input
            type="hidden"
            id={`_wpnonce-et-pb-contact-form-submitted-${id}`}
            name={`_wpnonce-et-pb-contact-form-submitted-${id}`}
            readOnly
          />
          <input
            type="hidden"
            name="_wp_http_referer"
            value={currentPageUrl}
            readOnly
          />
        </form>
      </div>
    </ModuleContainer>
  );
};

export {
  ContactFormEdit,
};
