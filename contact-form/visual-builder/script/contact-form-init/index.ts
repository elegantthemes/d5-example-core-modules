import jQuery from 'jquery';

import { contactFormSubmit } from '../contact-form-submit';
import { type ContactFormData } from '../types';


/**
 * Initializes the contact form.
 *
 * @since ??
 *
 * @param {ContactFormData[]} [customData] Array of objects that contain data for each contact form.
 */
export const contactFormInit = (customData?: ContactFormData[]) => {
  const data = customData || window.diviModuleContactFormData;

  // `data` could be not an array. Exit early to prevent browser errors.
  if (! Array.isArray(data)) {
    return;
  }

  data.forEach(({ selector }) => {
    const $contactFormContainer = jQuery(selector);
    const $contactForm          = $contactFormContainer.find<HTMLFormElement>('form');

    // Contact Form Checkbox Event Change Logic.
    const $checkboxFields = $contactForm.find<HTMLInputElement>('input[type=checkbox]');
    $checkboxFields.each((i, checkboxEle) => {
      const $checkbox = jQuery(checkboxEle);
      $checkbox.on('change', event => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
        const $checkbox_field = $checkbox.siblings('input[type=text]').first();
        const isChecked       = $checkbox.prop('checked') as boolean ?? event.target.checked;
        $checkbox_field.val(isChecked ? $checkbox_field.data('checked') as string : $checkbox_field.data('unchecked') as string);
      });
    });

    // Handle Contact Form Submit Event.
    $contactForm.on('submit', event => {
      contactFormSubmit(selector, event);
    });
  });
};
