import {
  elementClassnames,
  type ModuleClassnamesParams,
  textOptionsClassnames,
} from '@divi/module';
import { getAttrValue } from '@divi/module-utils';
import {
  type ContactFieldAttrs,
  type ContactFormAttrs,
} from '@divi/types';


/**
 * Set CSS class names to the module.
 *
 * @since ??
 *
 * @param {ModuleClassnamesParams<ContactFieldAttrs>} param0 Function parameters.
 */
export const moduleClassnames = ({
  attrs,
  baseBreakpoint,
  breakpoint,
  breakpointNames,
  classnamesInstance,
  state,
}: ModuleClassnamesParams<ContactFieldAttrs, ContactFormAttrs>): void => {
  // Field Background.
  const background = getAttrValue({
    attr: attrs?.module?.decoration?.background,
    baseBreakpoint,
    breakpoint,
    breakpointNames,
    state,
  });

  // If background is set then add class.
  if (background) {
    classnamesInstance.add('has-background');
  }

  // Text Options.
  classnamesInstance.add(textOptionsClassnames(attrs?.module?.advanced?.text, {
    orientation: true,
  }));

  // Add element classnames.
  classnamesInstance.add(
    elementClassnames({
      attrs: attrs?.module?.decoration,
      breakpoint,
      state,
    }),
  );
};
