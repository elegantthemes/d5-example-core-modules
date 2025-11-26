import jQuery from 'jquery';


/**
 * Handles the submission of a signup form, including validation of user input, processing of custom fields,
 * and sending the form data to the server for further processing.
 *
 * @since ??
 *
 * @param {JQuery} $submit  A jQuery object representing the submit button of the form.
 * @param {JQuery.Event} event A jQuery event object that represents the event that triggered the form submission.
 *
 * @returns {void}
 */
export const signupSubmitForm = ($submit: JQuery, event: JQuery.Event) => {
  // Email Validation
  // Use the regex defined in the HTML5 spec for input[type=email] validation
  // (see https://www.w3.org/TR/2016/REC-html51-20161101/sec-forms.html#email-state-typeemail)
  // eslint-disable-next-line no-useless-escape
  const emailRegex   = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const recaptchaApi = window?.etCore?.api?.spam?.recaptcha;

  const $etWindow = jQuery(window);

  if ($submit.closest('.et_pb_login_form').length && 'function' === typeof window.et_pb_maybe_log_event) {
    window.et_pb_maybe_log_event($submit.closest('.et_pb_newsletter'), 'con_goal');
    return;
  }

  if ('function' === typeof event?.preventDefault) {
    event.preventDefault();
  }

  const $newsletterContainer = $submit.closest('.et_pb_newsletter');
  const $fieldsContainer     = $newsletterContainer.find('.et_pb_newsletter_fields');
  const $errorMessage        = $newsletterContainer.find('.et_pb_newsletter_error').hide();

  const $name     = $newsletterContainer.find<HTMLInputElement>('input[name="et_pb_signup_firstname"]');
  const $lastName = $newsletterContainer.find<HTMLInputElement>('input[name="et_pb_signup_lastname"]');
  const $email    = $newsletterContainer.find<HTMLInputElement>('input[name="et_pb_signup_email"]');
  const listId    = $newsletterContainer.find<HTMLInputElement>('input[name="et_pb_signup_list_id"]').val() as string;
  const provider  = $newsletterContainer.find<HTMLInputElement>('input[name="et_pb_signup_provider"]').val() as string;
  const account   = $newsletterContainer.find<HTMLInputElement>('input[name="et_pb_signup_account_name"]').val() as string;
  const ipAddress = $newsletterContainer.find<HTMLInputElement>('input[name="et_pb_signup_ip_address"]').val() as string;
  const checksum  = $newsletterContainer.find<HTMLInputElement>('input[name="et_pb_signup_checksum"]').val() as string;

  const $successMessage = $newsletterContainer.find('.et_pb_newsletter_success');
  let redirectUrl       = $newsletterContainer.data('redirect_url') as string;
  const redirectQuery   = $newsletterContainer.data('redirect_query') as string;

  const customFields:Record<string, string|number|string[]|Record<string, string|number|string[]>> = {};

  const hiddenFields: string[] = [];

  let etMessage       = '<ul>';
  let etFieldsMessage = '';

  const $customFields = $fieldsContainer
    .find('input[type=text], .et_pb_checkbox_handle, .et_pb_contact_field[data-type="radio"], textarea, select')
    .filter('.et_pb_signup_custom_field, .et_pb_signup_custom_field *');


  $name.removeClass('et_pb_signup_error');
  $lastName.removeClass('et_pb_signup_error');
  $email.removeClass('et_pb_signup_error');
  $customFields.removeClass('et_contact_error');
  $errorMessage.html('');

  // Validate user input
  let isValid = true;

  const $form = $submit.closest('.et_pb_newsletter_form form') as JQuery<HTMLFormElement>;

  if ($form.length > 0 && 'function' === typeof $form[0].reportValidity) {
    // Checks HTML5 validation constraints
    isValid = $form[0].reportValidity();
  }

  if ($name.length > 0 && ! $name.val()) {
    $name.addClass('et_pb_signup_error');
    isValid = false;
  }

  if ($lastName.length > 0 && ! $lastName.val()) {
    $lastName.addClass('et_pb_signup_error');
    isValid = false;
  }

  if (! emailRegex.test($email.val().toString())) {
    $email.addClass('et_pb_signup_error');
    isValid = false;
  }

  if (! isValid) {
    return;
  }

  $customFields.each((i, customFieldEle) => {
    let $thisEl = jQuery(customFieldEle);
    let $thisWrapper:JQuery<HTMLElement>;

    if (['checkbox', 'booleancheckbox'].includes($thisEl.data('field_type') as string)) {
      $thisWrapper = $thisEl.parents('.et_pb_contact_field');
      $thisWrapper.removeClass('et_contact_error');
    }

    if ('radio' === $thisEl.data('type')) {
      $thisEl      = $thisEl.find('input[type="radio"]');
      $thisWrapper = $thisEl.parents('.et_pb_contact_field');
    }

    let thisId = $thisEl.data('id') as string;

    let thisVal:string|number|string[]|Record<string, string|number|string[]> = $thisEl.val();

    let thisLabel    = $thisEl.siblings('label').first().text();
    const fieldType  = $thisEl.data('field_type') as string ?? 'text';
    let requiredMark = $thisEl.data('required_mark') as string ?? 'not_required';
    const originalId = $thisEl.data('original_id') as string ?? '';
    let unchecked    = false;
    let defaultValue;

    if (! thisId) {
      thisId = originalId;
    }

    // radio field properties adjustment
    if ('radio' === fieldType) {
      if ($thisWrapper && 0 !== $thisWrapper.find('input[type="radio"]').length) {
        const $firstRadio = $thisWrapper.find('input[type="radio"]').first();

        requiredMark = $firstRadio.data('required_mark') as string ?? 'not_required';

        thisVal = '';

        if ($thisWrapper.find('input[type="radio"]:checked')) {
          thisVal = $thisWrapper.find('input[type="radio"]:checked').val();
        }
      }

      thisLabel = $thisWrapper.find<HTMLLabelElement>('.et_pb_contact_form_label').text();
      thisId    = $thisEl.data('original_id') as string;

      if (! jQuery.isEmptyObject(thisVal)) {
        customFields[thisId] = thisVal;
      }

      if (0 === $thisWrapper.find('input[type="radio"]:checked').length) {
        unchecked = true;
      }

      if (thisVal) {
        customFields[thisId] = thisVal;
      }
    } else if (['checkbox', 'booleancheckbox'].includes(fieldType)) {
      thisVal = {};

      if (0 !== $thisWrapper.find('input[type="checkbox"]').length) {
        const $checkboxHandle = $thisWrapper.find('.et_pb_checkbox_handle');

        requiredMark = $checkboxHandle.data('required_mark') as string ?? 'not_required';

        if ($thisWrapper.find('input[type="checked"]:checked')) {
          $thisWrapper.find('input[type="checkbox"]:checked').each((_, checkboxEle) => {
            if ('booleancheckbox' === fieldType) {
              thisVal = jQuery(checkboxEle).val();
            } else {
              const fieldId = jQuery(checkboxEle).data('id') as string;

              if (fieldId) {
                if ('object' === typeof thisVal && ! Array.isArray(thisVal)) {
                  thisVal[fieldId] = jQuery(checkboxEle).val() as string;
                }
              }
            }
          });
        }
      }

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
      thisId = $thisWrapper.attr('data-id');

      if (! jQuery.isEmptyObject(thisVal)) {
        customFields[thisId] = thisVal;
      }

      if (0 === $thisWrapper.find('input[type="checkbox"]:checked').length) {
        unchecked = true;
      }
    } else if ('ontraport' === provider && 'select' === fieldType) {
      // Need to pass option ID as a value for dropdown menu in Ontraport
      const $selectedOption = $thisEl.find(':selected');

      customFields[thisId] = $selectedOption.length > 0 ? $selectedOption.data('id') as string : thisVal;
    } else {
      customFields[thisId] = thisVal;
    }

    // Need to send option id to be processed in the custom field processing
    if ('mailchimp' === provider && ['select', 'radio'].indexOf(fieldType) > - 1) {
      const $selectedOption = 'select' === fieldType ? $thisEl.find(':selected') : $thisWrapper.find('input[type="radio"]:checked');
      const optionId        = $selectedOption.length > 0 ? $selectedOption.data('id') as string : null;

      if (null !== optionId) {
        customFields[thisId] = {
          [optionId]: $selectedOption.val(),
        };
      }
    }

    // Escape double quotes in label
    thisLabel = thisLabel.replace(/"/g, '&quot;');

    // Store the labels of the conditionally hidden fields so that they can be
    // removed later if a custom message pattern is enabled
    if (! $thisEl.is(':visible') && 'hidden' !== $thisEl.attr('type') && 'radio' !== $thisEl.attr('type')) {
      hiddenFields.push(originalId);
      return;
    }

    if (('hidden' === $thisEl.attr('type') || 'radio' === $thisEl.attr('type')) && ! $thisEl.parents('.et_pb_contact_field').is(':visible')) {
      hiddenFields.push(thisId);
      return;
    }

    // add error message for the field if it is required and empty
    if ('required' === requiredMark && ('' === thisVal || true === unchecked)) {
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

  etMessage += '</ul>';

  if ('' !== etFieldsMessage) {
    if (etMessage !== '<ul></ul>') {
      etMessage = `<p class="et_normal_padding">${window.et_pb_custom.contact_error_message}</p>${etMessage}`;
    }

    etFieldsMessage = `<ul>${etFieldsMessage}</ul>`;

    etFieldsMessage = `<p>${window.et_pb_custom.fill_message}</p>${etFieldsMessage}`;

    etMessage = etFieldsMessage + etMessage;
  }

  if (etMessage !== '<ul></ul>') {
    $errorMessage.html(etMessage).show();

    // If parent of this contact form uses parallax
    if ($newsletterContainer.parents('.et_pb_section_parallax').length) {
      $newsletterContainer.parents('.et_pb_section_parallax').each((i, parallaxEle) => {
        const $parallaxElement = jQuery(parallaxEle);
        const $parallax        = $parallaxElement.children('.et_parallax_bg');
        const isTrueParallax   = (! $parallax.hasClass('et_pb_parallax_css'));

        if (isTrueParallax) {
          $etWindow.trigger('resize');
        }
      });
    }

    return;
  }

  const getRedirectQuery = () => {
    const query:Record<string, string|number|string[]> = {};

    if (! redirectQuery) {
      return '';
    }

    if ($name.length > 0 && redirectQuery.indexOf('name') > - 1) {
      query.first_name = $name.val();
    }

    if ($lastName.length > 0 && redirectQuery.indexOf('last_name') > - 1) {
      query.last_name = $lastName.val();
    }

    if (redirectQuery.indexOf('email') > - 1) {
      query.email = $email.val();
    }

    if (redirectQuery.indexOf('ip_address') > - 1) {
      query.ip_address = $newsletterContainer.data('ip_address') as string;
    }

    if (redirectQuery.indexOf('css_id') > - 1) {
      query.form_id = $newsletterContainer.attr('id');
    }

    return decodeURIComponent(jQuery.param(query));
  };

  const tokenDeferred = jQuery.Deferred();

  // Only process through recaptcha if the module has spam protection enabled and the recaptcha core api exists.
  if (recaptchaApi && $newsletterContainer.hasClass('et_pb_recaptcha_enabled')) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    recaptchaApi.interaction(`Divi/Module/EmailOptin/List/${listId}`)
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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    jQuery.ajax({
      type:     'POST',
      url:      window.et_pb_custom.ajaxurl,
      dataType: 'json',
      data:     {
        action:            'et_pb_submit_subscribe_form',
        et_frontend_nonce: window.et_pb_custom.et_frontend_nonce,
        et_list_id:        listId,
        et_firstname:      $name.val(),
        et_lastname:       $lastName.val(),
        et_email:          $email.val(),
        et_provider:       provider,
        et_account:        account,
        et_ip_address:     ipAddress,
        et_custom_fields:  customFields,
        et_hidden_fields:  hiddenFields,
        token,
        et_checksum:       checksum,
      },
      beforeSend() {
        $newsletterContainer
          .find('.et_pb_newsletter_button')
          .addClass('et_pb_button_text_loading')
          .find('.et_subscribe_loader')
          .show();
      },
      complete() {
        $newsletterContainer
          .find('.et_pb_newsletter_button')
          .removeClass('et_pb_button_text_loading')
          .find('.et_subscribe_loader')
          .hide();
      },
      success(data:{ success?:boolean; error?:string }) {
        if (! data) {
          $errorMessage.html(window.et_pb_custom.subscription_failed).show();
          return;
        }

        if (data.error) {
          $errorMessage.show().append('<h2>').text(data.error);
        }

        if (data.success) {
          if (redirectUrl) {
            const query = getRedirectQuery();

            if (query.length) {
              if (redirectUrl.indexOf('?') > - 1) {
                redirectUrl += '&';
              } else {
                redirectUrl += '?';
              }
            }

            // If analytics/event logging function exists, call it.
            if ('function' === typeof window.et_pb_maybe_log_event) {
              window.et_pb_maybe_log_event($newsletterContainer, 'con_goal', () => {
                // Redirect only after logging completes successfully
                window.location.assign(redirectUrl + query);
              });
            } else {
              // Fallback: if logging isn’t available, still perform the redirect.
              // Ensures redirect works even if tracking is disabled or not present.
              window.location.assign(redirectUrl + query);
            }
          } else {
            if ('function' === typeof window.et_pb_maybe_log_event) {
              window.et_pb_maybe_log_event($newsletterContainer, 'con_goal');
            }
            $newsletterContainer.find('.et_pb_newsletter_fields').hide();
            $successMessage.show();
          }
        }
      },
    });
  });
};
