import jQuery from 'jquery';

import { signupSubmitForm } from '../submit-form';
import { type SignupData } from '../types';


/**
 * Initializes the signup form by attaching event listeners to the input field and submit button.
 *
 * @since ??
 *
 * @param {SignupData[]} [customData] Array of objects that contain data for each signup form.
 */
export const signupInit = (customData?: SignupData[]) => {
  const data = customData || window.diviModuleSignupData;

  // `data` could be not an array. Exit early to prevent browser errors.
  if (! Array.isArray(data)) {
    return;
  }

  data.forEach(({ selector }) => {
    const $input  = jQuery(selector).find<HTMLInputElement>('.et_pb_newsletter_field .input');
    const $button = jQuery(selector).find<HTMLAnchorElement>('.et_pb_newsletter_button');

    $input.on('keypress', event => {
      if ('Enter' === event?.key || 13 === (event?.which || event?.keyCode)) {
        signupSubmitForm($button, event);
      }
    });

    $button.on('click', event => {
      signupSubmitForm($button, event);
    });
  });
};
