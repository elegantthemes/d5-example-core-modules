import {
  type OptionGroupPresetResolverAttrNameFilterParams,
  type OptionGroupPresetResolverAttrNameFilterResult,
} from '@divi/module-utils';

/**
 * Resolve the group preset attribute name for the Slider module.
 *
 * @param {OptionGroupPresetResolverAttrNameFilterResult} attrNameToResolve The attribute name to be resolved.
 * @param {OptionGroupPresetResolverAttrNameFilterParams} params The filter parameters.
 *
 * @returns {OptionGroupPresetResolverAttrNameFilterResult} The resolved attribute name.
 */
export const optionGroupPresetResolverAttrNameSlider = (
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
    if ('divi/slider' === params.dataModuleName && 'divi/fullwidth-slider' !== params.moduleName) {
      if ('module.decoration.background' === params.attrName) {
        return {
          attrName:    'children.module.decoration.background',
          attrSubName: params.attrSubName,
        };
      }
    }

    if ('divi/slider' === params.moduleName && 'divi/fullwidth-slider' !== params.dataModuleName) {
      if ('children.module.decoration.background' === params.attrName) {
        return {
          attrName:    'module.decoration.background',
          attrSubName: params.attrSubName,
        };
      }
    }
  }


  return attrNameToResolve;
};
