import {
  elementClassnames,
  type ModuleClassnamesParams,
  textOptionsClassnames,
} from '@divi/module';
import {
  type ContactFormAttrs,
} from '@divi/types';


/**
 * Set CSS class names to the module.
 *
 * @since ??
 *
 * @param {ModuleClassnamesParams<ContactFormAttrs>} param0 Function parameters.
 */
export const moduleClassnames = ({
  classnamesInstance,
  attrs,
  breakpoint,
  state,
}: ModuleClassnamesParams<ContactFormAttrs>): void => {
  // Text Options.
  classnamesInstance.add(textOptionsClassnames(attrs?.module?.advanced?.text, {
    color:       true,
    orientation: true,
  }));

  classnamesInstance.add('clearfix', true);

  // Add element classnames.
  classnamesInstance.add(
    elementClassnames({
      attrs: attrs?.module?.decoration,
      breakpoint,
      state,
    }),
  );
};
