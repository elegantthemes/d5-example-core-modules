import {
  type OptionGroupPresetPrimaryAttrNameResolverFilterParams,
} from '@divi/module-utils';


export const optionGroupPresetPrimaryAttrNameResolverSignupCustomField = (
  primaryAttrName: string,
  filterParams: OptionGroupPresetPrimaryAttrNameResolverFilterParams,
) => {
  // Set primaryAttrName for designBorder composite group as it contains multiple attributes with similar suffixes.
  // - module.decoration.border.
  // - field.decoration.border.
  if ('designBorder' === filterParams.groupId) {
    return 'module';
  }

  return primaryAttrName;
};
