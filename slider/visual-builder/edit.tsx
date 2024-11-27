import React, {
  type ReactElement,
  useEffect,
  useRef,
} from 'react';
import {
  isObject,
  isUndefined,
} from 'lodash';

import { useDeepEffect } from '@divi/hooks';
import {
  ChildModulesContainer,
  ModuleContainer,
} from '@divi/module';
import {
  getAttrByMode,
} from '@divi/module-utils';

import { useCurrentlyEditedSlideIndex } from './hooks';
import { moduleClassnames } from './module-classnames';
import { ModuleScriptData } from './module-script-data';
import { ModuleStyles } from './module-styles';
import { type SliderEditProps } from './types';

/**
 * Text component of visual builder.
 *
 * @since ??
 *
 * @param {SliderEditProps} props React component props.
 *
 * @returns {ReactElement}
 */
const SliderEdit = ({
  attrs,
  elements,
  defaultPrintedStyleAttrs,
  id,
  name,
  childrenIds,
}: SliderEditProps): ReactElement => {
  const slider                    = useRef();
  const reInitTimeout             = useRef<NodeJS.Timeout>();
  const currentlyEditedSlideIndex = useCurrentlyEditedSlideIndex(childrenIds);
  const showArrows                = getAttrByMode(attrs?.arrows?.advanced?.show);
  const showPagination            = getAttrByMode(attrs?.pagination?.advanced?.show);

  // All re-initialization attributes
  // @todo: In D4, there are to attributes called `image_placement` and `show_image`.
  // But not found in settings. So it's not implemented.
  // Icon attrs: In D4, we use icon value from data attribute. In D5,
  // we will use it directly from CSS. So, maybe we don't need to re-initialization.
  const reInitAttrs = [
    showArrows,
    showPagination,
    attrs?.button?.decoration?.button?.desktop?.value?.enable,
    attrs?.button?.decoration?.border?.desktop?.value?.styles?.all?.width,
    attrs?.button?.decoration?.border?.desktop?.value?.styles?.bottom?.width,
    attrs?.button?.decoration?.border?.desktop?.value?.styles?.left?.width,
    attrs?.button?.decoration?.border?.desktop?.value?.styles?.right?.width,
    attrs?.button?.decoration?.border?.desktop?.value?.styles?.top?.width,
    attrs?.button?.decoration?.font?.font?.desktop?.value?.size,
    attrs?.button?.decoration?.font?.font?.tablet?.value?.size,
    attrs?.button?.decoration?.font?.font?.phone?.value?.size,
    attrs?.arrows?.advanced?.color?.desktop?.value,
    attrs?.dotNav?.decoration?.background?.desktop?.value?.color,
    attrs?.content?.decoration?.bodyFont?.body?.font?.desktop?.value?.size,
    attrs?.content?.decoration?.bodyFont?.body?.font?.phone?.value?.size,
    attrs?.content?.decoration?.bodyFont?.body?.font?.tablet?.value?.size,
    attrs?.title?.decoration?.font?.font?.desktop?.value?.size,
    attrs?.title?.decoration?.font?.font?.tablet?.value?.size,
    attrs?.title?.decoration?.font?.font?.phone?.value?.size,
    attrs?.module?.decoration?.spacing?.desktop?.value?.padding,
    attrs?.module?.decoration?.spacing?.tablet?.value?.padding,
    attrs?.module?.decoration?.spacing?.phone?.value?.padding,
    attrs?.module?.decoration?.sizing,
    attrs?.content?.decoration?.sizing,
    attrs?.module?.advanced?.auto,
    attrs?.module?.advanced?.autoIgnoreHover,
    attrs?.module?.advanced?.autoSpeed,
    attrs?.children?.module?.decoration?.background?.desktop?.value?.image?.parallax,
    attrs?.children?.module?.decoration?.background?.phone?.value?.image?.parallax,
    attrs?.children?.module?.decoration?.background?.tablet?.value?.image?.parallax,
    attrs?.children?.slideOverlay?.decoration?.background?.desktop?.value?.color,
    attrs?.children?.contentOverlay?.decoration?.background?.desktop?.value?.color,
    attrs?.children?.contentOverlay?.decoration?.border?.desktop?.value?.radius,
    childrenIds,
  ];

  const initSlider = () => {
    if (! slider.current || isUndefined(window.et_pb_slider_init)) {
      return;
    }

    const $slider = jQuery(slider.current);
    window.et_pb_slider_init($slider);
    setTimeout(() => window.et_fix_slider_height($slider), 600);
  };

  const reInitSlider = () => {
    const $slider = jQuery(slider.current);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const api = $slider.data('et_pb_simple_slider');


    if (isObject(api)) {
      // TODO (D5, FE Script) : it will be solved at https://github.com/elegantthemes/Divi/issues/31401
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: the method is available
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      api.et_slider_destroy();
    }
    initSlider();
  };

  useDeepEffect(() => {
    clearTimeout(reInitTimeout?.current);
    reInitTimeout.current = setTimeout(() => {
      reInitSlider();
    }, 500);

    return () => {
      clearTimeout(reInitTimeout?.current);
    };
  }, reInitAttrs);

  useEffect(() => {
    if (- 1 !== currentlyEditedSlideIndex) {
      const $slider = jQuery(slider.current);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const api = $slider.data('et_pb_simple_slider');


      if (isObject(api)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: the method is available
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        api.et_slider_move_to(currentlyEditedSlideIndex);
      }
    }
  }, [currentlyEditedSlideIndex]);

  return (
    <ModuleContainer
      attrs={attrs}
      elements={elements}
      defaultPrintedStyleAttrs={defaultPrintedStyleAttrs}
      childrenIds={childrenIds}
      id={id}
      name={name}
      domRef={slider}
      stylesComponent={ModuleStyles}
      scriptDataComponent={ModuleScriptData}
      classnamesFunction={moduleClassnames}
      htmlAttrs={{
        'data-address': id,
      }}
    >
      {elements.styleComponents({
        attrName:             'module',
        styleComponentsProps: {
          attrs: {
            ...attrs?.module?.decoration ?? {},
            background: attrs?.children?.module?.decoration?.background,
          },
        },
      })}
      <div className="et_pb_slides">
        <ChildModulesContainer
          ids={childrenIds}
          parentCallback={reInitSlider}
        />
      </div>
    </ModuleContainer>
  );
};

export {
  SliderEdit,
};
