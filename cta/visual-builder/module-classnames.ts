import {
  elementClassnames,
  type ModuleClassnamesParams,
  textOptionsClassnames,
} from '@divi/module';
import { type CtaAttrs } from '@divi/types';


/**
 * Module classnames function for call to action module.
 *
 * @since ??
 *
 * @param {ModuleClassnamesParams<CtaAttrs>} param0 Function parameters.
 */
export const moduleClassnames = ({
  classnamesInstance,
  attrs,
  breakpoint,
  state,
}: ModuleClassnamesParams<CtaAttrs>): void => {
  // Text Options.
  classnamesInstance.add(textOptionsClassnames(attrs?.module?.advanced?.text, { orientation: false }));

  // Add element classnames.
  classnamesInstance.add(
    elementClassnames({
      attrs: attrs?.module?.decoration ?? {},
      breakpoint,
      state,
    }),
  );
};
