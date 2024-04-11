import {
  elementClassnames,
  type ModuleClassnamesParams,
} from '@divi/module';
import { type AccordionAttrs } from '@divi/types';

/**
 * Module classnames function for Accordion module.
 *
 * @since ??
 *
 * @param {ModuleClassnamesParams<AccordionAttrs>} param0 Function parameters.
 */
export const moduleClassnames = ({
  classnamesInstance,
  attrs,
  state,
  breakpoint,
}: ModuleClassnamesParams<AccordionAttrs>): void => {
  // Add element classnames.
  classnamesInstance.add(
    elementClassnames({
      attrs: attrs?.module?.decoration,
      state,
      breakpoint,
    }),
  );
};
