import jQuery from 'jquery';


/**
 * Handles the submission of a contact form, including validation of user input, processing of contact fields,
 * and sending the form data to the server for further processing.
 *
 * @since ??
 *
 * @param {string}       selector  A string for contact form selector.
 * @param {JQuery.Event} event     A jQuery event object that represents the event that triggered the form submission.
 *
 * @returns {void}
 */
export const contactFormSubmit = (selector: string, event: JQuery.Event) => {
  if ('function' === typeof event?.preventDefault) {
    event.preventDefault();
  }

  const $thisContactFormContainer = jQuery(selector);
  const $thisContactForm          = $thisContactFormContainer.find<HTMLFormElement>('form');
  const redirectUrl               = $thisContactFormContainer.data('redirect_url') as string ?? '';

  if (true === $thisContactForm.data('submitted')) {
    // Previously submitted, do not submit again.
    return;
  }

  const $thisInputs                                                                                = $thisContactForm.find<HTMLInputElement>('input[type=text], .et_pb_checkbox_handle, .et_pb_contact_field[data-type="radio"], textarea, select');
  const $captchaField                                                                              = $thisContactForm.find('.et_pb_contact_captcha');
  const $errorMessage                                                                              = $thisContactFormContainer.find('.et-pb-contact-message');
  const formUniqueId                                                                               = $thisContactFormContainer.data('form_unique_num') as number ?? 0;
  let isValid                                                                                      = true;
  let etMessage                                                                                    = '';
  let etFieldsMessage                                                                              = '';
  const inputsList:Record<string, string|number|string[]|Record<string, string|number|string[]>>[] = [];
  const hiddenFields: string[]                                                                     = [];
  const tokenDeferred                                                                              = jQuery.Deferred();

  // Recaptcha API.
  const recaptchaApi = window?.etCore?.api?.spam?.recaptcha;
  const $etWindow    = jQuery(window);

  // Email Validation
  // Use the regex defined in the HTML5 spec for input[type=email] validation
  // (see https://www.w3.org/TR/2016/REC-html51-20161101/sec-forms.html#email-state-typeemail)
  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  // Only process through recaptcha if the module has spam protection enabled and the recaptcha core api exists.
  if (recaptchaApi && $thisContactFormContainer.hasClass('et_pb_recaptcha_enabled')) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    recaptchaApi.interaction(`Divi/Module/ContactForm/${formUniqueId}`)
      .then((token:string) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        tokenDeferred.resolve(token);
      });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    tokenDeferred.resolve('');
  }

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  jQuery.when(tokenDeferred).done((token:string) => {
    etMessage = '<ul>';

    $thisInputs.removeClass('et_contact_error');

    $thisInputs.each((i, formFieldEle) => {
      let $thisEl:JQuery<HTMLElement|HTMLInputElement> = jQuery(formFieldEle);
      let $thisWrapper:JQuery<HTMLElement>;

      if (['checkbox', 'booleancheckbox'].includes($thisEl.data('field_type') as string)) {
        $thisWrapper = $thisEl.parents('.et_pb_contact_field');
        $thisWrapper.removeClass('et_contact_error');
      }

      if ('radio' === $thisEl.data('type')) {
        $thisEl      = $thisEl.find('input[type="radio"]');
        $thisWrapper = $thisEl.parents('.et_pb_contact_field');
      }

      let thisId = $thisEl.attr('id');

      let thisVal:string|number|string[]|Record<string, string|number|string[]> = $thisEl.val();

      let thisLabel    = $thisEl.siblings('label').first().text();
      let fieldType    = $thisEl.data('field_type') as string ?? 'text';
      let requiredMark = $thisEl.data('required_mark') as string ?? 'not_required';
      let originalId   = $thisEl.data('original_id') as string ?? '';
      let unchecked    = false;
      let defaultValue;

      if (! thisId) {
        thisId = originalId;
      }

      // radio field properties adjustment.
      if ('radio' === fieldType) {
        if ($thisWrapper && 0 !== $thisWrapper.find('input[type="radio"]').length) {
          fieldType         = 'radio';
          const $firstRadio = $thisWrapper.find('input[type="radio"]').first();
          requiredMark      = $firstRadio.data('required_mark') as string ?? 'not_required';
          thisVal           = '';
          if ($thisWrapper.find('input[type="radio"]:checked')) {
            thisVal = $thisWrapper.find('input[type="radio"]:checked').val();
          }
        }

        thisLabel  = $thisWrapper.find<HTMLLabelElement>('.et_pb_contact_form_label').text();
        thisId     = $thisWrapper.find<HTMLInputElement>('input[type="radio"]').first().attr('name');
        originalId = $thisWrapper.data('id') as string;

        if (0 === $thisWrapper.find('input[type="radio"]:checked').length) {
          unchecked = true;
        }
      } else if (['checkbox', 'booleancheckbox'].includes(fieldType)) {
        thisVal = '';

        if (0 !== $thisWrapper.find('input[type="checkbox"]').length) {
          fieldType             = 'checkbox';
          const $checkboxHandle = $thisWrapper.find('.et_pb_checkbox_handle');

          requiredMark = $checkboxHandle.data('required_mark') as string ?? 'not_required';

          if ($thisWrapper.find('input[type="checked"]:checked')) {
            const thisCheckboxValue: string[] = [];
            $thisWrapper.find('input[type="checkbox"]:checked').each((_, checkboxEle) => {
              // URL encode each checkbox value to handle commas and other special characters.
              thisCheckboxValue.push(encodeURIComponent(jQuery(checkboxEle).val() as string));
            });
            thisVal = thisCheckboxValue.join(',');
          }
        }

        $thisWrapper.find('.et_pb_checkbox_handle').val(thisVal);
        thisLabel = $thisWrapper.find('.et_pb_contact_form_label').text();

        // In case user did not add field name, try to use label from the checkbox value
        if (0 === thisLabel.trim().length) {
          const $checkboxes = $thisWrapper.find('.et_pb_contact_field_checkbox input[type="checkbox"]');
          if ($checkboxes.length > 0) {
            const checkboxLabels:string[] = [];

            $checkboxes.each((_, checkboxEle) => {
              checkboxLabels.push(jQuery(checkboxEle).val() as string);
            });
            thisLabel = checkboxLabels.join(', ');

            // In case user uses an empty checkbox,
            // use the field type for error message instead of default message about captcha
            if (0 === thisLabel.trim().length) {
              thisLabel = window.et_pb_custom.wrong_checkbox;
            }
          }
        }
        thisId     = $thisWrapper.find('.et_pb_checkbox_handle').attr('name'); ;
        originalId = $thisWrapper.data('id') as string;

        if (0 === $thisWrapper.find('input[type="checkbox"]:checked').length) {
          unchecked = true;
        }
      }

      // Escape double quotes in label.
      thisLabel = thisLabel.replace(/"/g, '&quot;');

      // Store the labels of the conditionally hidden fields so that they can be
      // removed later if a custom message pattern is enabled
      if (! $thisEl.is(':visible') && $thisEl.parents('[data-conditional-logic]').length && 'hidden' !== $thisEl.attr('type') && 'radio' !== $thisEl.attr('type')) {
        hiddenFields.push(originalId);
        return;
      }

      if (('hidden' === $thisEl.attr('type') || 'radio' === $thisEl.attr('type')) && ! $thisEl.parents('.et_pb_contact_field').is(':visible')) {
        hiddenFields.push(originalId);
        return;
      }

      // add current field data into array of inputs
      if (typeof thisId !== 'undefined' && thisId !== '') {
        inputsList.push({
          field_id:      thisId,
          original_id:   originalId,
          required_mark: requiredMark,
          field_type:    fieldType,
          field_label:   thisLabel,
        });
      }

      // add error message for the field if it is required and empty
      if ('required' === requiredMark && ('' === thisVal || true === unchecked) && ! $thisEl.is('[id^="et_pb_contact_et_number_"]')) {
        if (! $thisWrapper) {
          $thisEl.addClass('et_contact_error');
        } else {
          $thisWrapper.addClass('et_contact_error');
        }

        isValid = false;

        defaultValue = thisLabel;

        if ('' === defaultValue) {
          defaultValue = window.et_pb_custom.captcha;
        }

        etFieldsMessage += `<li>${defaultValue}</li>`;
      }

      // add error message if email field is not empty and fails the email validation
      if ('email' === fieldType) {
        // remove trailing/leading spaces and convert email to lowercase
        if ('string' === typeof thisVal) {
          const processedEmail = thisVal.toString().trim().toLowerCase();
          const isValidEmail   = emailRegex.test(processedEmail);

          if ('' !== processedEmail && thisLabel !== processedEmail && ! isValidEmail) {
            $thisEl.addClass('et_contact_error');
            isValid = false;

            if (! isValidEmail) {
              etMessage += `<li>${window.et_pb_custom.invalid}</li>`;
            }
          }
        }
      }
    });

    // check the captcha value if required for current form
    if ($captchaField.length && '' !== $captchaField.val()) {
      let firstDigit  = parseInt($captchaField.data('first_digit') as string);
      let secondDigit = parseInt($captchaField.data('second_digit') as string);

      if (parseInt($captchaField.val() as string) !== firstDigit + secondDigit) {
        etMessage += `<li>${window.et_pb_custom.wrong_captcha}</li>`;
        isValid    = false;

        // generate new digits for captcha
        firstDigit  = Math.floor((Math.random() * 15) + 1);
        secondDigit = Math.floor((Math.random() * 15) + 1);

        // set new digits for captcha
        $captchaField.data('first_digit', firstDigit);
        $captchaField.data('second_digit', secondDigit);

        // clear captcha input value
        $captchaField.val('');

        // regenerate captcha on page
        $thisContactForm.find('.et_pb_contact_captcha_question').empty().append(`${firstDigit} + ${secondDigit}`);
      }
    }

    // Proceed if the form is valid then.
    if (isValid) {
      // Mark this form as `submitted` to prevent repeated processing.
      $thisContactForm.data('submitted', true);

      const $href    = $thisContactForm.attr('action');
      const formData = $thisContactForm.serializeArray();

      formData.push({
        name:  `et_pb_contact_email_fields_${formUniqueId}`,
        value: JSON.stringify(inputsList),
      });

      formData.push({
        name:  'token',
        value: token,
      });

      // Add captcha questions to form data.
      if ($captchaField.length && '' !== $captchaField.val()) {
        const firstDigit  = parseInt($captchaField.data('first_digit') as string);
        const secondDigit = parseInt($captchaField.data('second_digit') as string);

        formData.push({
          name:  `et_pb_contact_captcha_first_digit_${formUniqueId}`,
          value: firstDigit.toString(),
        });

        formData.push({
          name:  `et_pb_contact_captcha_second_digit_${formUniqueId}`,
          value: secondDigit.toString(),
        });
      }

      if (hiddenFields.length > 0) {
        formData.push({
          name:  `et_pb_contact_email_hidden_fields_${formUniqueId}`,
          value: JSON.stringify(hiddenFields),
        });
      }

      $thisContactFormContainer.removeClass('et_animated').removeAttr('style').fadeTo('fast', 0.2, () => {
        $thisContactFormContainer.load(
          `${$href} #${$thisContactFormContainer.attr('id')}> *`, formData, (responseText, textStatus) => {
            if ('error' === textStatus) {
              const $message = jQuery(`#${$thisContactFormContainer.attr('id')}`, responseText);

              if ($message.length > 0) {
              // The response is an error but we have a form response message so
              // this is most likely a contact form on a 404 page or similar.
              // In this case, jQuery will not load the html since it treats
              // the request as failed so we have to do it manually.
                $thisContactFormContainer.html($message.text());
              }
            }

            if (! jQuery(responseText).find('.et_pb_contact_error_text').length) {
              if ('function' === typeof window.et_pb_maybe_log_event) {
                window.et_pb_maybe_log_event($thisContactFormContainer, 'con_goal');
              }

              // redirect if redirect URL is not empty and no errors in contact form
              if ('' !== redirectUrl) {
                window.location.href = redirectUrl;
              }
            }

            $thisContactFormContainer.fadeTo('fast', 1);
          });
      });
    }

    etMessage += '</ul>';

    // Prepare error message if there is any.
    if ('' !== etFieldsMessage) {
      if (etMessage !== '<ul></ul>') {
        etMessage = `<p class="et_normal_padding">${window.et_pb_custom.contact_error_message}</p>${etMessage}`;
      }

      etFieldsMessage = `<ul>${etFieldsMessage}</ul>`;

      etFieldsMessage = `<p>${window.et_pb_custom.fill_message}</p>${etFieldsMessage}`;

      etMessage = etFieldsMessage + etMessage;
    }

    // Set error message if there is any.
    if (etMessage !== '<ul></ul>') {
      $errorMessage.html(etMessage).show();

      // If parent of this contact form uses parallax
      if ($thisContactFormContainer.parents('.et_pb_section_parallax').length) {
        $thisContactFormContainer.parents('.et_pb_section_parallax').each((i, parallaxEle) => {
          const $parallaxElement = jQuery(parallaxEle);
          const $parallax        = $parallaxElement.children('.et_parallax_bg');
          const isTrueParallax   = (! $parallax.hasClass('et_pb_parallax_css'));

          if (isTrueParallax) {
            $etWindow.trigger('resize');
          }
        });
      }
    }
  });
};
