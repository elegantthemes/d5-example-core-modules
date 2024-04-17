import { isArray } from 'lodash';

import {
  elementClassnames,
  type ModuleClassnamesParams,
} from '@divi/module';
import { getAttrByMode } from '@divi/module-utils';
import { type PricingTablesAttrs } from '@divi/types';

/**
 * Module classnames function for pricing tables module.
 *
 * @since ??
 *
 * @param {ModuleClassnamesParams<PricingTablesAttrs>} param0 Function parameters.
 */
export const moduleClassnames = ({
  childrenIds,
  classnamesInstance,
  attrs,
  breakpoint,
  state,
}: ModuleClassnamesParams<PricingTablesAttrs>): void => {
  // Module components.
  const showBullet = getAttrByMode(attrs?.content?.advanced?.showBullet);
  const index      = isArray(childrenIds) ? childrenIds?.length : '0';

  classnamesInstance.add('et_pb_pricing');
  classnamesInstance.add('clearfix');
  classnamesInstance.add('et_pb_pricing_no_bullet', 'off' === showBullet);
  classnamesInstance.add(`et_pb_pricing_${index}`);

  // Add element classnames.
  classnamesInstance.add(
    elementClassnames({
      attrs: attrs?.module?.decoration ?? {},
      breakpoint,
      state,
    }),
  );
};
