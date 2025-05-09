import {
  elementClassnames,
  type ModuleClassnamesParams,
} from '@divi/module';
import { type AccordionItemAttrs } from '@divi/types';


/**
 * Module classnames function for accordion item module.
 *
 * @since ??
 *
 * @param {ModuleClassnamesParams<AccordionItemAttrs>} param0 Function parameters.
 */
export const moduleClassnames = ({
  classnamesInstance,
  attrs,
  state,
  breakpoint,
  isLast,
}: ModuleClassnamesParams<AccordionItemAttrs>): void => {
  const isToggleOpen = 'on' === attrs?.module?.advanced?.open?.desktop?.value;

  classnamesInstance.add('et_pb_toggle');
  classnamesInstance.add('et_pb_toggle_open', isToggleOpen);
  classnamesInstance.add('et_pb_toggle_close', ! isToggleOpen);
  classnamesInstance.add('et-last-child', true === isLast);

  // Add element classnames.
  classnamesInstance.add(
    elementClassnames({
      attrs: attrs?.module?.decoration,
      state,
      breakpoint,
    }),
  );
};
