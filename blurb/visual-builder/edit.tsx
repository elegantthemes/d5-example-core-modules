import React, {
  type ReactElement, useRef,
} from 'react';
import classNames from 'classnames';
import { isEmpty } from 'lodash';

import { useDynamicData } from '@divi/dynamic-data';
import {
  boxShadowHasOverlayClassnames,
  InnerMousetrap,
  ModuleContainer,
} from '@divi/module';
import {
  getAttrByMode,
} from '@divi/module-utils';

import { moduleClassnames } from './module-classnames';
import { ModuleScriptData } from './module-script-data';
import { ModuleStyles } from './module-styles';
import { type BlurbEditProps } from './types';
import './style.scss';

/**
 * Renders `Blurb` edit component for visual builder.
 *
 * @since ??
 *
 * @param {BlurbEditProps} props React component props.
 *
 * @returns {ReactElement}
 */
const BlurbEdit = ({
  attrs,
  id,
  isFirst,
  isLast,
  name,
  elements,
}: BlurbEditProps): ReactElement => {
  const blurbRef = useRef(null);

  // Attrs by mode
  const titleAttr                              = getAttrByMode(attrs?.title?.innerContent);
  const imageAttr                              = getAttrByMode(attrs?.imageIcon?.innerContent);
  const { resolvedValue: imageSrc, isLoading } = useDynamicData(imageAttr?.src);

  /**
   * Gets title's link values.
   */
  const { resolvedValue: titleLink } = useDynamicData(titleAttr?.url);
  const titleLinkTarget              = 'on' === titleAttr?.target ? '_blank' : null;
  const isUsingIcon                  = 'on' === attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon ?? false;

  /**
   * Gets image attribute values and constructs the image output.
   */
  const imageAlt      = imageAttr?.alt;
  const imageTemplate = ! isUsingIcon && ! isLoading && imageSrc
    ? (
      <span className={classNames('et_pb_image_wrap', 'et_pb_only_image_mode_wrap', boxShadowHasOverlayClassnames(attrs?.imageIcon?.decoration?.boxShadow))}>
        {elements.styleComponents({
          attrName:             'imageIcon',
          styleComponentsProps: {
            id: `${id}-overlay`,
          },
        })}
        <img
          src={imageSrc}
          alt={imageAlt}
          className={classNames({
            [`et_pb_animation_${attrs?.imageIcon?.innerContent?.desktop?.value?.animation}`]:       true,
            [`et_pb_animation_${attrs?.imageIcon?.innerContent?.tablet?.value?.animation}_tablet`]: ! isEmpty(attrs?.imageIcon?.innerContent?.tablet?.value?.animation),
            [`et_pb_animation_${attrs?.imageIcon?.innerContent?.phone?.value?.animation}_phone`]:   ! isEmpty(attrs?.imageIcon?.innerContent?.phone?.value?.animation),
          })}
        />
      </span>
    )
    : '';

  const image = imageTemplate
    ? (
      <div className="et_pb_main_blurb_image">
        {titleLink
          ? (
            <a href={titleLink} target={titleLinkTarget}>
              {imageTemplate}
            </a>
          )
          : (
            imageTemplate
          )}
      </div>
    )
    : null;

  /**
   * Gets icon attribute values and constructs the icon output.
   *
   * @todo `et-animated--vb` should be added conditionally, Needs revisit after animation system implementation.
   * More info: https://github.com/elegantthemes/submodule-builder/pull/8796#pullrequestreview-840649206.
   */
  const iconTemplate = isUsingIcon
    ? (
      <span className="et_pb_image_wrap">
        <span className={classNames({
          'et-pb-icon':                                                                           true,
          'et-waypoint':                                                                          true,
          'et-animated':                                                                          true,
          'et-animated--vb':                                                                      true,
          [`et_pb_animation_${attrs?.imageIcon?.innerContent?.desktop?.value?.animation}`]:       ! isEmpty(attrs?.imageIcon?.innerContent?.desktop?.value?.animation),
          [`et_pb_animation_${attrs?.imageIcon?.innerContent?.tablet?.value?.animation}_tablet`]: ! isEmpty(attrs?.imageIcon?.innerContent?.tablet?.value?.animation),
          [`et_pb_animation_${attrs?.imageIcon?.innerContent?.phone?.value?.animation}_phone`]:   ! isEmpty(attrs?.imageIcon?.innerContent?.phone?.value?.animation),
        })}
        />
      </span>
    )
    : '';

  const icon = iconTemplate
    ? (
      <div className="et_pb_main_blurb_image">
        {titleLink
          ? (
            <a href={titleLink} target={titleLinkTarget}>
              {iconTemplate}
            </a>
          )
          : (
            iconTemplate
          )}
      </div>
    )
    : null;

  return (
    <ModuleContainer
      attrs={attrs}
      domRef={blurbRef}
      elements={elements}
      id={id}
      isFirst={isFirst}
      isLast={isLast}
      stylesComponent={ModuleStyles}
      scriptDataComponent={ModuleScriptData}
      classnamesFunction={moduleClassnames}
      name={name}
    >
      {elements.styleComponents({
        attrName: 'module',
      })}
      {elements.render({
        attrName: 'contentContainer',
        children: (
          <React.Fragment>
            <InnerMousetrap type="edited" />
            {isUsingIcon ? icon : image}
            <div className="et_pb_blurb_container">
              {elements.render({
                attrName: 'title',
              })}
              {elements.render({
                attrName: 'content',
              })}
            </div>
          </React.Fragment>
        ),
      })}
    </ModuleContainer>
  );
};

export {
  BlurbEdit,
};
