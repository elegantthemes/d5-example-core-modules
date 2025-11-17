/* eslint-disable @typescript-eslint/naming-convention */

import {
  type ModuleConversionOutline,
} from '@divi/types';

import { convertSpamProviderAccount } from './utils/convert-spam-provider-account';
import { replaceLineBreakPlaceholder } from './utils/replace-line-break-placeholder';

// wp.data.select('divi/settings').getSetting('shortcodeModuleDefinitions').et_pb_contact_form.fields

// The mappings for various properties used in a module conversion process.
export const conversionOutline: ModuleConversionOutline = {
  advanced: {
    admin_label: 'module.meta.adminLabel',
    animation:   'module.decoration.animation',
    background:  'module.decoration.background',
    borders:     {
      default: 'module.decoration.border',
    },
    display_conditions: 'module.decoration.conditions',
    fonts:              {
      title:      'title.decoration.font',
      captcha:    'captcha.decoration.font',
      form_field: 'field.decoration.font',
    },
    box_shadow: {
      default: 'module.decoration.boxShadow',
      button:  'button.decoration.boxShadow',
    },
    button: {
      button: 'button',
    },
    form_field: {
      form_field: 'field',
    },
    filters: {
      default: 'module.decoration.filters',
    },
    text_shadow: {
      default: 'module.advanced.text.textShadow',
    },
    module:          'module.advanced.htmlAttributes',
    link_options:    'module.advanced.link',
    text:            'module.advanced.text',
    disabled_on:     'module.decoration.disabledOn',
    overflow:        'module.decoration.overflow',
    position_fields: 'module.decoration.position',
    scroll:          'module.decoration.scroll',
    height:          'module.decoration.sizing',
    max_width:       'module.decoration.sizing',
    margin_padding:  'module.decoration.spacing',
    sticky:          'module.decoration.sticky',
    transform:       'module.decoration.transform',
    transition:      'module.decoration.transition',
    z_index:         'module.decoration.zIndex',
  },

  css: {
    before:         'css.*.before',
    main_element:   'css.*.mainElement',
    after:          'css.*.after',
    free_form:      'css.*.freeForm',
    contact_title:  'css.*.contactTitle',
    contact_button: 'css.*.contactButton',
    contact_fields: 'css.*.contactFields',
    text_field:     'css.*.textField',
    captcha_field:  'css.*.captchaField',
    captcha_label:  'css.*.captchaLabel',
  },

  module: {
    _unique_id:                'module.advanced.uniqueId.*',
    success_message:           'module.advanced.successMessage.*',
    title:                     'title.innerContent.*',
    title_level:               'title.decoration.font.font.*.headingLevel',
    submit_button_text:        'button.innerContent.*.text',
    form_field_custom_margin:  'field.decoration.spacing.*.margin',
    form_field_custom_padding: 'field.decoration.spacing.*.padding',
    use_focus_border_color:    'field.advanced.focusUseBorder.*',
    custom_message:            'email.innerContent.*',
    email:                     'email.advanced.receiver.*',
    use_redirect:              'redirect.advanced.useRedirect.*',
    redirect_url:              'redirect.innerContent.*',
    recaptcha_account_name:    'module.advanced.spamProtection.*.account', // Content -> Spam Protection -> Account Name
    recaptcha_list:            'module.advanced.spamProtection.*.account', // Content -> Spam Protection -> reCAPTCHA Account List
    recaptcha_min_score:       'module.advanced.spamProtection.*.minScore', // Content -> Spam Protection -> Minimum Spam Score
    use_spam_service:          'module.advanced.spamProtection.*.enabled', // Content -> Spam Protection -> Enable Spam Protection
    captcha:                   'module.advanced.spamProtection.*.useBasicCaptcha', // Content -> Spam Protection -> Use Basic Captcha
    spam_provider:             'module.advanced.spamProtection.*.provider', // Content -> Spam Protection -> Spam Protection Provider
  },
  valueExpansionFunctionMap: {
    custom_message: replaceLineBreakPlaceholder,
    recaptcha_list: convertSpamProviderAccount,
  },
};
