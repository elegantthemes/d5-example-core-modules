import {
  type OptionGroupPresetPrimaryAttrNameResolverFilterParams,
} from '@divi/module-utils';


export const optionGroupPresetPrimaryAttrNameResolverPricingTables = (
  primaryAttrName: string,
  filterParams: OptionGroupPresetPrimaryAttrNameResolverFilterParams,
) => {
  // Set primaryAttrName for designTitleText composite group as it contains multiple attributes with similar suffixes.
  // - title.decoration.font.
  // - featuredTitle.decoration.font.
  if ('designTitleText' === filterParams.groupId) {
    return 'title';
  }

  // Set primaryAttrName for designSubtitleText composite group as it contains
  // multiple attributes with similar suffixes:
  // - subtitle.decoration.font.
  // - featuredSubtitle.decoration.font.
  if ('designSubtitleText' === filterParams.groupId) {
    return 'subtitle';
  }

  // Set primaryAttrName for designPriceText composite group as it contains
  // multiple attributes with similar suffixes:
  // - price.decoration.font.
  // - featuredPrice.decoration.font.
  if ('designPriceText' === filterParams.groupId) {
    return 'price';
  }

  // Set primaryAttrName for designCurrencyFrequencyText composite group as it contains
  // multiple attributes with similar suffixes:
  // - currencyFrequency.decoration.font.
  // - featuredCurrencyFrequency.decoration.font.
  if ('designCurrencyFrequencyText' === filterParams.groupId) {
    return 'currencyFrequency';
  }

  // Set primaryAttrName for designExcludedItemText composite group as it contains
  // multiple attributes with similar suffixes:
  // - excluded.decoration.font.
  // - featuredExcluded.decoration.font.
  if ('designExcludedItemText' === filterParams.groupId) {
    return 'excluded';
  }

  return primaryAttrName;
};
