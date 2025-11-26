import {
  type OptionGroupPresetPrimaryAttrNameResolverFilterParams,
} from '@divi/module-utils';


export const optionGroupPresetPrimaryAttrNameResolverSignup = (
  primaryAttrName: string,
  filterParams: OptionGroupPresetPrimaryAttrNameResolverFilterParams,
) => {
  // Set primaryAttrName for advancedAttributes composite group.
  // - module.decoration.attributes
  // - button.innerContent (rel attributes)
  if ('advancedAttributes' === filterParams.groupId) {
    return 'module';
  }

  return primaryAttrName;
};
