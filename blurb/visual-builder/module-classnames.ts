import {
  elementClassnames,
  type ModuleClassnamesParams,
  textOptionsClassnames,
} from '@divi/module';
import { getAttrValue } from '@divi/module-utils';
import { type BlurbAttrs } from '@divi/types';

/**
 * Module classnames function for blurb module.
 *
 * @since ??
 *
 * @param {ModuleClassnamesParams<BlurbAttrs>} param0 Function parameters.
 */
export const moduleClassnames = ({
  classnamesInstance,
  attrs,
  state,
  baseBreakpoint,
  breakpoint,
  breakpointNames,
}: ModuleClassnamesParams<BlurbAttrs>): void => {
  // Text Options.
  classnamesInstance.add(textOptionsClassnames(attrs?.module?.advanced?.text));

  // Module specific classnames.
  const imageIconPlacement          = getAttrValue({
    attr: attrs.imageIcon?.advanced?.placement,
    mode: 'getAndInheritAll',
    baseBreakpoint,
    breakpoint,
    breakpointNames,
    state,
  });
  const imageIconPlacementClassName = `et_pb_blurb_position_${imageIconPlacement}`;
  classnamesInstance.add(imageIconPlacementClassName);

  // Add element classnames.
  classnamesInstance.add(
    elementClassnames({
      attrs: attrs?.module?.decoration ?? {},
      breakpoint,
      state,
    }),
  );
};
