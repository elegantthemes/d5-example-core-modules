import {
  getAttrValue,
} from '@divi/module-utils';
import {
  type ContactFormAttrs,
  type Module,
} from '@divi/types';

/**
 * Determines the visibility of setting fields based on specific parameters and conditions.
 *
 * @since ??
 *
 * @param {Module.Settings.Field.CallbackParams<ContactFormAttrs>} params Function parameters.
 *
 * @returns {boolean} Whether the field should be visible or not.
 */
export const isVisibleFields = (
  {
    attrs,
    breakpoint,
    baseBreakpoint,
    breakpointNames,
    state,
    attrName,
    subName,
  }: Module.Settings.Field.CallbackParams<ContactFormAttrs>,
): boolean => {
  const attrNameWithSubName = subName ? `${attrName}.*.${subName}` : attrName;

  switch (attrNameWithSubName) {
    case 'redirect.innerContent': // Content >> Redirect >> Redirect URL.
    {
      const useRedirect = getAttrValue({
        mode: 'getAndInheritAll',
        attr: attrs?.redirect?.advanced?.useRedirect,
        breakpoint,
        baseBreakpoint,
        breakpointNames,
        state,
      });

      return 'on' === useRedirect;
    }

    default:
    {
      return true;
    }
  }
};
