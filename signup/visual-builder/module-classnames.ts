import {
  elementClassnames,
  type ModuleClassnamesParams,
  textOptionsClassnames,
} from '@divi/module';
import { getAttrValue } from '@divi/module-utils';
import {
  type SignupAttrs,
} from '@divi/types';


/**
 * Set CSS class names to the module.
 *
 * @since ??
 *
 * @param {ModuleClassnamesParams<SignupAttrs>} param0 Function parameters.
 */
export const moduleClassnames = ({
  attrs,
  baseBreakpoint,
  breakpoint,
  breakpointNames,
  classnamesInstance,
  state,
}: ModuleClassnamesParams<SignupAttrs>): void => {
  classnamesInstance.add('et_pb_newsletter', true);
  classnamesInstance.add('et_pb_subscribe', true);

  // Field Background.
  const background = getAttrValue({
    attr: attrs?.module?.decoration?.background,
    baseBreakpoint,
    breakpoint,
    breakpointNames,
    state,
  });

  // If background is not set then add class.
  if (! background) {
    classnamesInstance.add('et_pb_no_bg');
  }

  // Title.
  const title = getAttrValue({
    attr: attrs?.title?.innerContent,
    baseBreakpoint,
    breakpoint,
    breakpointNames,
    state,
  });

  // Add classname if there is no any title is set.
  if (! title) {
    classnamesInstance.add('et_pb_newsletter_description_no_title');
  }

  // Description Content.
  const content = getAttrValue({
    attr: attrs?.content?.innerContent,
    baseBreakpoint,
    breakpoint,
    breakpointNames,
    state,
  });

  // Add classname if there is no any description is set.
  if (! content) {
    classnamesInstance.add('et_pb_newsletter_description_no_content');
  }

  // Text Options.
  classnamesInstance.add(textOptionsClassnames(attrs?.module?.advanced?.text, {
    color:       true,
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
