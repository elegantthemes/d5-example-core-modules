import React, { type ReactElement } from 'react';
import { isNil } from 'lodash';

import {
  StyleContainer,
  type StylesProps,
} from '@divi/module';
import {
  type BlurbAttrs,
} from '@divi/types';

import {
  contentAlignmentStyleDeclaration,
  iconStyleDeclaration,
  iconWidthStyleDeclaration,
  imageAlignmentStyleDeclaration,
  imageWidthStyleDeclaration,
  overflowStyleDeclaration,
} from './style-declarations';


/**
 * Blurb Module's style components.
 *
 * @since ??
 */
const ModuleStyles = ({
  attrs,
  elements,
  settings,
  orderClass,
  mode,
  state,
  noStyleTag,
}: StylesProps<BlurbAttrs>): ReactElement => (
  <StyleContainer mode={mode} state={state} noStyleTag={noStyleTag}>
    {/* Module */}
    {elements.style({
      attrName:   'module',
      styleProps: {
        disabledOn: {
          disabledModuleVisibility: settings?.disabledModuleVisibility,
        },
        advancedStyles: [
          {
            componentName: 'divi/text',
            props:         {
              selector: orderClass,
              attr:     attrs?.module?.advanced?.text,
            },
          },
          {
            componentName: 'divi/css',
            props:         {
              selector:  orderClass,
              attr:      attrs.css,
              cssFields: elements?.moduleMetadata?.customCssFields,
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
              selector:            `${orderClass} .et_pb_main_blurb_image .et_pb_only_image_mode_wrap, ${orderClass} .et_pb_main_blurb_image .et-pb-icon`,
              attr:                attrs?.imageIcon?.decoration?.border,
              declarationFunction: overflowStyleDeclaration,
            },
          },
        ],
      },
    })}
    {/* Image Icon */}
    {elements.style({
      attrName:   'imageIcon',
      styleProps: {
        advancedStyles: [
          {
            componentName: 'divi/common',
            props:         {
              selector: `${orderClass} .et-pb-icon`,
              attr:     attrs?.imageIcon?.advanced?.color,
              property: 'color',
            },
          },
          {
            componentName: 'divi/common',
            props:         {
              selector:            `${orderClass} .et-pb-icon::after`,
              attr:                attrs?.imageIcon?.innerContent,
              declarationFunction: iconStyleDeclaration,
            },
          },
          {

            // In D4, only one of them should be rendered. Render icon font-size if icon is
            // used. Otherwise, render image max-width.
            componentName: 'divi/common',
            props:         {
              selector: 'on' === attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon
                ? `${orderClass} .et-pb-icon`
                : `${orderClass} .et_pb_main_blurb_image .et_pb_image_wrap`,
              attr:                attrs?.imageIcon?.advanced?.width,
              declarationFunction: 'on' === attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon
                ? iconWidthStyleDeclaration
                : imageWidthStyleDeclaration,
            },
          },
          {
            componentName: 'divi/common',
            props:         {
              selector:            `${orderClass} .et_pb_blurb_content`,
              attr:                attrs?.imageIcon?.advanced?.alignment,
              declarationFunction: contentAlignmentStyleDeclaration,
            },
          },
          (isNil(attrs?.imageIcon?.advanced?.placement?.desktop?.value) || 'top' === attrs?.imageIcon?.advanced?.placement?.desktop?.value)
            ? {
            // In D4, image alignment is used only when placement is top.
              componentName: 'divi/common',
              props:         {
                selector:            `${orderClass} .et_pb_main_blurb_image .et_pb_image_wrap`,
                attr:                attrs?.imageIcon?.advanced?.alignment,
                declarationFunction: imageAlignmentStyleDeclaration,
              },
            }
            : null,
        ],
      },
    })}

    {/* Title */}
    {elements.style({
      attrName: 'title',
    })}

    {/* Content */}
    {elements.style({
      attrName: 'content',
    })}

    {/* Content Container */}
    {elements.style({
      attrName: 'contentContainer',
    })}
  </StyleContainer>
);

export {
  ModuleStyles,
};
