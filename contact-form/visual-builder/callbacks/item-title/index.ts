import { __ } from '@wordpress/i18n';

import { type ContactFieldAttrs } from '@divi/types';


export const itemTitleCallback = (attrs: ContactFieldAttrs) => {
  const title      = attrs?.fieldItem?.innerContent?.desktop?.value;
  const adminTitle = attrs?.module?.meta?.adminLabel?.desktop?.value;
  let displayTitle = __('New Contact Field', 'et_builder');

  if (title) {
    displayTitle = title;
  } else if (adminTitle) {
    displayTitle = adminTitle;
  }

  return displayTitle;
};
