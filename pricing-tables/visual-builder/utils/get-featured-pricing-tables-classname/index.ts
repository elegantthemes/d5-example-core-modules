import {
  forEach,
  get,
} from 'lodash';

import { select } from '@divi/data';

/**
   * Get featured pricing tables classname based on given childrenIds and its featured status.
   *
   * @since ??
   *
   * @param {string[]} childrenIds Children ids.
   *
   * @returns {string|null} Classname based upon featured status of children.
   */
export const getFeaturedPricingTablesClassname = (childrenIds: string[]): string | null => {
  if (0 === childrenIds?.length) {
    return '';
  }

  const featuredPricingTables: string[] = [];

  // If child pricing table module has featured on then add it into featuredPricingTables array.
  forEach(select('divi/edit-post').getModulesByIds(childrenIds), (pricingTable): void => {
    const featured = get(pricingTable, ['props', 'attrs', 'module', 'advanced', 'featured', 'desktop', 'value']) as string ?? 'off';
    featuredPricingTables.push(featured);
  });

  const totalFeaturedPricingTables = featuredPricingTables?.length > 4 ? 4 : featuredPricingTables?.length;
  for (let i = 0; i < totalFeaturedPricingTables; i++) {
    if ('on' === featuredPricingTables[i]) {
      switch (i) {
        case 0:
          return '';
        case 1:
          return 'et_pb_second_featured';
        case 2:
          return 'et_pb_third_featured';
        case 3:
          return 'et_pb_fourth_featured';
        default:
          return 'et_pb_no_featured_in_first_row';
      }
    }
  }

  return 'et_pb_no_featured_in_first_row';
};
