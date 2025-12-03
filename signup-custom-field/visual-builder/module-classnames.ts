import {
  elementClassnames,
  type ModuleClassnamesParams,
  textOptionsClassnames,
} from '@divi/module';
import { getAttrValue } from '@divi/module-utils';
import {
  type SignupCustomFieldAttrs,
} from '@divi/types';


/**
 * Set CSS class names to the module.
 *
 * @since ??
 *
 * @param {ModuleClassnamesParams<SignupCustomFieldAttrs>} param0 Function parameters.
 */
export const moduleClassnames = ({
  attrs,
  baseBreakpoint,
  breakpoint,
  breakpointNames,
  classnamesInstance,
  state,
}: ModuleClassnamesParams<SignupCustomFieldAttrs>): void => {
  const fullwidth   = getAttrValue({
    attr: attrs?.fieldItem?.advanced?.fullwidth,
    baseBreakpoint,
    breakpoint,
    breakpointNames,
    state,
  });
  const hidden      = getAttrValue({
    attr: attrs?.fieldItem?.advanced?.hidden,
    baseBreakpoint,
    breakpoint,
    breakpointNames,
    state,
  });
  const isFullwidth = 'on' === fullwidth;

  classnamesInstance.add('et_pb_contact_field');
  classnamesInstance.add('et_pb_newsletter_field');

  classnamesInstance.add('et_pb_contact_field--hidden', 'on' === hidden);

  // Add If field is not fullwidth.
  if (! isFullwidth) {
    classnamesInstance.add('et_pb_contact_field_half');
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
