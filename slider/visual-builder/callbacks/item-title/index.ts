import { __ } from '@wordpress/i18n';

import { type SlideAttrs } from '@divi/types';


export const itemTitleCallback = (attrs: SlideAttrs) => {
  const heading    = attrs?.title?.innerContent?.desktop?.value;
  const adminTitle = attrs?.module?.meta?.adminLabel?.desktop?.value;
  let title        = __('New Slide', 'et_builder');

  if (adminTitle) {
    title = adminTitle;
  } else if (heading) {
    title = heading;
  }

  return title;
};
