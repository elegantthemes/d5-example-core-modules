import {
  type OptionGroupPresetPrimaryAttrNameResolverFilterParams,
} from '@divi/module-utils';


export const optionGroupPresetPrimaryAttrNameResolverAccordionItem = (
  primaryAttrName: string,
  filterParams: OptionGroupPresetPrimaryAttrNameResolverFilterParams,
) => {
  // Set primaryAttrName for designTitleText composite group as it contains multiple attributes with similar suffixes.
  // - title.decoration.font.
  // - openToggle.decoration.font.
  if ('designTitleText' === filterParams.groupId) {
    return 'title';
  }

  return primaryAttrName;
};
