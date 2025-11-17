import {
  elementClassnames,
  type ModuleClassnamesParams,
  textOptionsClassnames,
} from '@divi/module';
import { getAttrValue } from '@divi/module-utils';
import { type LoginAttrs } from '@divi/types';


/**
 * Module classnames function for Login module.
 *
 * @since ??
 *
 * @param {ModuleClassnamesParams<LoginAttrs>} param0 Function parameters.
 */
export const moduleClassnames = ({
  attrs,
  baseBreakpoint,
  breakpoint,
  breakpointNames,
  classnamesInstance,
  state,
}: ModuleClassnamesParams<LoginAttrs>): void => {
  // Module class name.
  classnamesInstance.add('et_pb_newsletter');

  // Text Options.
  classnamesInstance.add(textOptionsClassnames(attrs?.module?.advanced?.text));

  const backgroundColor = attrs?.module?.decoration?.background?.desktop?.value?.color;

  const title   = getAttrValue({
    attr: attrs?.title?.innerContent,
    baseBreakpoint,
    breakpoint,
    breakpointNames,
    mode: 'getAndInheritAll',
    state,
  });
  const content = getAttrValue({
    attr: attrs?.content?.innerContent,
    baseBreakpoint,
    breakpoint,
    breakpointNames,
    mode: 'getAndInheritAll',
    state,
  });

  classnamesInstance.add('et_pb_newsletter_description_no_title', ! title);
  classnamesInstance.add('et_pb_newsletter_description_no_content', ! content);
  classnamesInstance.add('et_pb_no_bg', ! backgroundColor);

  // Add element classnames.
  classnamesInstance.add(
    elementClassnames({
      attrs: attrs?.module?.decoration ?? {},
      breakpoint,
      state,
    }),
  );
};
