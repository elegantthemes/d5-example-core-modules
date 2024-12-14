import {
  elementClassnames,
  type ModuleClassnamesParams,
  textOptionsClassnames,
} from '@divi/module';
import { type ButtonAttrs } from '@divi/types';


/**
 * Module classnames function for button module.
 *
 * @since ??
 *
 * @param {ModuleClassnamesParams<ButtonAttrs>} param0 Function parameters.
 */
export const moduleClassnames = ({
  classnamesInstance,
  attrs,
  breakpoint,
  state,
}: ModuleClassnamesParams<ButtonAttrs>): void => {
  // Text Options.
  classnamesInstance.add(textOptionsClassnames(attrs?.module?.advanced?.text, { orientation: false }));

  // Add element classnames.
  classnamesInstance.add(
    elementClassnames({
      // TODO check to confirm how this works in D4 and ButtonAttrs. Confirm to PO on how to handle this.
      attrs: attrs?.module?.decoration ?? {},
      breakpoint,
      state,
    }),
  );
};
