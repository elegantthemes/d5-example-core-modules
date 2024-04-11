import { merge } from 'lodash';

import {
  elementClassnames,
  type ModuleClassnamesParams,
  textOptionsClassnames,
} from '@divi/module';
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
  breakpoint,
}: ModuleClassnamesParams<BlurbAttrs>): void => {
  // Text Options.
  classnamesInstance.add(textOptionsClassnames(attrs?.module?.advanced?.text));

  // Module specific classnames.
  const imageIconPlacement          = attrs.imageIcon?.advanced?.placement?.desktop?.value;
  const imageIconPlacementClassName = `et_pb_blurb_position_${imageIconPlacement}`;
  classnamesInstance.add(imageIconPlacementClassName);

  // Add element classnames.
  classnamesInstance.add(
    elementClassnames({
      attrs: {
        ...attrs?.module?.decoration,
        border: merge({}, attrs?.imageIcon?.decoration?.border ?? {}, attrs?.module?.decoration?.border ?? {}),
      },
      state,
      breakpoint,
    }),
  );
};
