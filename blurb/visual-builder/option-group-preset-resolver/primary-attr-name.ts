import {
  type OptionGroupPresetPrimaryAttrNameResolverFilterParams,
} from '@divi/module-utils';


export const optionGroupPresetPrimaryAttrNameResolverBlurb = (
  primaryAttrName: string,
  filterParams: OptionGroupPresetPrimaryAttrNameResolverFilterParams,
) => {
  // Set primaryAttrName for designSizing composite group as it contains multiple attributes with similar suffixes.
  // - module.decoration.sizing.
  // - contentContainer.decoration.sizing.
  if ('designSizing' === filterParams.groupId) {
    return 'module';
  }

  return primaryAttrName;
};
