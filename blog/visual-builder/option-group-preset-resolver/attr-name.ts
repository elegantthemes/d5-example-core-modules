import {
  getAttrNamesByGroup,
  isAttrNameSuffixMatched,
  type OptionGroupPresetResolverAttrNameFilterParams,
  type OptionGroupPresetResolverAttrNameFilterResult,
} from '@divi/module-utils';

/**
 * Resolve the group preset attribute name for the Blog module.
 *
 * @param {OptionGroupPresetResolverAttrNameFilterResult} attrNameToResolve The attribute name to be resolved.
 * @param {OptionGroupPresetResolverAttrNameFilterParams} params The filter parameters.
 *
 * @returns {OptionGroupPresetResolverAttrNameFilterResult} The resolved attribute name.
 */
export const optionGroupPresetResolverAttrNameBlog = (
  attrNameToResolve: OptionGroupPresetResolverAttrNameFilterResult,
  params: OptionGroupPresetResolverAttrNameFilterParams,
): OptionGroupPresetResolverAttrNameFilterResult => {
  // Bydefault, attrNameToResolve is a null value.
  // If it is not null, it means that the attribute name is already resolved.
  // In this case, we return the resolved attribute name.
  if (null !== attrNameToResolve) {
    return attrNameToResolve;
  }

  if (params.moduleName !== params.dataModuleName) {
    if ('divi/blog' === params.moduleName) {
      if (params.attrName.endsWith('.decoration.border')) {
        const attrNamesToPairs = getAttrNamesByGroup(params.dataModuleName, params.dataGroupId);
        const attrNameMatch    = attrNamesToPairs.find(attrName => isAttrNameSuffixMatched(attrName, params.attrName));

        return {
          attrName:    attrNameMatch,
          attrSubName: params.attrSubName,
        };
      }
    }
  }

  return attrNameToResolve;
};
