import { isArray } from 'lodash';

import {
  elementClassnames,
  type ModuleClassnamesParams,
} from '@divi/module';
import {
  getAttrValue,
} from '@divi/module-utils';
import { type SliderAttrs } from '@divi/types';

/**
 * Module classnames function for slider module.
 *
 * @since ??
 *
 * @param {ModuleClassnamesParams<SliderAttrs>} param0 Function parameters.
 */
export const moduleClassnames = ({
  attrs,
  classnamesInstance,
  childrenIds,
  breakpoint,
  state,
}: ModuleClassnamesParams<SliderAttrs>): void => {
  // Module components.
  const showArrows = getAttrValue({
    attr: attrs?.arrows?.advanced?.show,
    mode: 'getAndInheritAll',
    breakpoint,
    state,
  });

  const showPagination = getAttrValue({
    attr: attrs?.pagination?.advanced?.show,
    mode: 'getAndInheritAll',
    breakpoint,
    state,
  });

  const auto                 = attrs?.module?.advanced?.auto?.desktop?.value;
  const autoSpeed            = attrs?.module?.advanced?.autoSpeed?.desktop?.value;
  const autoIgnoreHover      = attrs?.module?.advanced?.autoIgnoreHover?.desktop?.value;
  const showImageVideoMobile = attrs?.image?.advanced?.showOnMobile?.desktop?.value;

  classnamesInstance.add('et_pb_slider_fullwidth_off');
  classnamesInstance.add('et_pb_slider_empty', isArray(childrenIds) && 0 === childrenIds.length);
  classnamesInstance.add('et_pb_slider_no_arrows', 'on' !== showArrows);
  classnamesInstance.add('et_pb_slider_no_pagination', 'on' !== showPagination);
  classnamesInstance.add('et_slider_auto', 'on' === auto);
  classnamesInstance.add('et_slider_auto_ignore_hover', 'on' === autoIgnoreHover);
  classnamesInstance.add('et_pb_slider_show_image', 'on' === showImageVideoMobile);
  classnamesInstance.add(`et_slider_speed_${autoSpeed}`, 'on' === auto);

  // Add element classnames.
  classnamesInstance.add(
    elementClassnames({
      attrs: {
        ...attrs?.module?.decoration ?? {},
        background: attrs?.children?.module?.decoration?.background,
      },
      breakpoint,
      state,
    }),
  );
};
