import {
  type ModuleClassnamesParams,
} from '@divi/module';
import { type PricingTableAttrs } from '@divi/types';


/**
 * Module classnames function for pricing table module.
 *
 * @since ??
 *
 * @param {ModuleClassnamesParams<PricingTableAttrs>} param0 Function parameters.
 */
export const moduleClassnames = ({
  classnamesInstance,
  attrs,
}: ModuleClassnamesParams<PricingTableAttrs>): void => {
  // Module components.
  const featured = attrs?.module?.advanced?.featured?.desktop?.value;

  classnamesInstance.add('et_pb_featured_table', 'on' === featured);
};
