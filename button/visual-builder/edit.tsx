import React, { Fragment, type ReactElement } from 'react';
import {
  isEmpty,
  isNull,
} from 'lodash';

import {
  DynamicData,
  useDynamicData,
} from '@divi/dynamic-data';
import { processFontIcon } from '@divi/icon-library';
import {
  ModuleContainer,
} from '@divi/module';
import {
  getAttrByMode,
} from '@divi/module-utils';

import { moduleClassnames } from './module-classnames';
import { ModuleScriptData } from './module-script-data';
import { ModuleStyles } from './module-styles';
import { type ButtonEditProps } from './types';
import { extractLinkTitle } from './utils';
import { wrapperClassnames } from './wrapper-classnames';
import './style.scss';

/**
 * Button Edit component of visual builder.
 *
 * @since ??
 *
 * @param {ButtonEditProps} props React component props.
 *
 * @returns {ReactElement}
 */
const ButtonEdit = ({
  attrs,
  id,
  name,
  elements,
}: ButtonEditProps): ReactElement => {
  // TODO consider use `<ButtonComponent />` to render the button.
  const linkValue = attrs?.button?.innerContent?.desktop?.value?.linkUrl;
  const textValue = getAttrByMode(attrs?.button?.innerContent)?.text || linkValue;

  const linkValueDynamic = useDynamicData(linkValue);

  const hasCustomButton = 'on' === attrs?.button?.decoration?.button?.desktop?.value?.enable;

  const buttonIcon    = hasCustomButton
    ? attrs?.button?.decoration?.button?.desktop?.value?.icon?.settings
    : null;
  const hasButtonIcon = hasCustomButton && ! isNull(buttonIcon);

  const iconDesktop = hasButtonIcon
    ? processFontIcon(attrs?.button?.decoration?.button?.desktop?.value?.icon?.settings)
    : null;
  const iconTablet  = hasButtonIcon
    ? processFontIcon(attrs?.button?.decoration?.button?.tablet?.value?.icon?.settings)
    : null;
  const iconPhone   = hasButtonIcon
    ? processFontIcon(attrs?.button?.decoration?.button?.phone?.value?.icon?.settings)
    : null;

  const renderedRel = attrs?.button?.innerContent?.desktop?.value?.rel;
  const linkTarget  = 'on' === attrs?.module?.advanced?.link?.desktop?.value?.target ? '_blank' : null;

  return (
    <ModuleContainer
      attrs={attrs}
      elements={elements}
      htmlAttrs={{
        href:               linkValueDynamic?.resolvedValue,
        target:             linkTarget,
        'data-icon':        iconDesktop,
        'data-icon-tablet': iconTablet,
        'data-icon-phone':  iconPhone,
        rel:                isEmpty(renderedRel) ? null : renderedRel.join(' '),
      }}
      classnamesFunction={moduleClassnames}
      id={id}
      hasModuleClassName={false}
      name={name}
      stylesComponent={ModuleStyles}
      scriptDataComponent={ModuleScriptData}
      tag="a"
      hasHoveredClassName
      wrapperClassnamesFunction={wrapperClassnames}
      wrapperHtmlAttrs={{
        'data-wrapper-id': id,
      }}
    >
      {elements.styleComponents({
        attrName: 'button',
      })}
      <DynamicData
        value={textValue}
        loaderWidth={60}
      >
        {({ resolvedValue }) => (
          <Fragment>
            {'string' === typeof resolvedValue ? extractLinkTitle(resolvedValue) : resolvedValue}
          </Fragment>
        )}
      </DynamicData>
    </ModuleContainer>
  );
};

export {
  ButtonEdit,
};
