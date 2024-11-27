import {
  type ModuleClassnamesParams,
} from '@divi/module';
import { getAttrByMode } from '@divi/module-utils';
import { type ButtonAttrs } from '@divi/types';


/**
 * Module classnames function for button module.
 *
 * @since ??
 *
 * @param {ModuleClassnamesParams<ButtonAttrs>} param0 Function parameters.
 */
export const wrapperClassnames = ({
  attrs,
  classnamesInstance,
  id,
}: ModuleClassnamesParams<ButtonAttrs>): void => {
  // Module wrapper's specific classnames.
  const linkValue = attrs?.button?.innerContent?.desktop?.value?.linkUrl;
  const textValue = getAttrByMode(attrs?.button?.innerContent)?.text || linkValue;


  classnamesInstance.add('et_pb_module');
  classnamesInstance.add('et_pb_empty_button', ! textValue && ! linkValue);
  classnamesInstance.add('et_pb_button_module_wrapper');
  classnamesInstance.add(`et_pb_button_${id}_wrapper`);
};
