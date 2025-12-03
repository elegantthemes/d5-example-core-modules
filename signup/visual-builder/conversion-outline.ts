/* eslint-disable @typescript-eslint/naming-convention */
import {
  convertEmailServiceAccount,
  convertSuccessRedirectQuery,
} from '@divi/conversion';
import {
  convertSpacing,
} from '@divi/module';
import {
  type ModuleConversionOutline,
} from '@divi/types';

// The mappings for various properties used in a module conversion process.
export const conversionOutline: ModuleConversionOutline = {
  advanced: {
    fonts: {
      header:         'title.decoration.font',
      body:           'content.decoration.bodyFont.body',
      result_message: 'resultMessage.decoration.font',
      form_field:     'field.decoration.font',
      body_link:      'content.decoration.bodyFont.link',
      body_ul:        'content.decoration.bodyFont.ul',
      body_ol:        'content.decoration.bodyFont.ol',
      body_quote:     'content.decoration.bodyFont.quote',
    },
    button: {
      button: 'button',
    },
    form_field: {
      form_field: 'field',
    },
    borders: {
      default:      'module.decoration.border',
      fields:       'field.decoration.border',
      fields_focus: 'field.advanced.focus.border',
    },
    box_shadow: {
      default: 'module.decoration.boxShadow',
      fields:  'field.decoration.boxShadow',
      button:  'button.decoration.boxShadow',
    },
    display_conditions: 'module.decoration.conditions',
    filters:            {
      default: 'module.decoration.filters',
    },
    text_shadow: {
      default: 'module.advanced.text.textShadow',
    },
    module:          'module.advanced.htmlAttributes',
    link_options:    'module.advanced.link',
    text:            'module.advanced.text',
    animation:       'module.decoration.animation',
    background:      'module.decoration.background',
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
    admin_label:     'module.meta.adminLabel',
  },

  css: {
    before:                 'css.*.before',
    main_element:           'css.*.mainElement',
    after:                  'css.*.after',
    free_form:              'css.*.freeForm',
    newsletter_title:       'css.*.newsletterTitle',
    newsletter_description: 'css.*.newsletterDescription',
    newsletter_form:        'css.*.newsletterForm',
    newsletter_fields:      'css.*.newsletterFields',
    newsletter_button:      'css.*.newsletterButton',
  },

  module: {
    recaptcha_account_name:    'module.advanced.spamProtection.*.account', // Content -> Spam Protection -> Account Name
    recaptcha_min_score:       'module.advanced.spamProtection.*.minScore', // Content -> Spam Protection -> Minimum Spam Score
    use_spam_service:          'module.advanced.spamProtection.*.enabled', // Content -> Spam Protection -> Enable Spam Protection
    captcha:                   'module.advanced.spamProtection.*.useBasicCaptcha', // Content -> Spam Protection -> Use Basic Captcha
    spam_provider:             'module.advanced.spamProtection.*.provider', // Content -> Spam Protection -> Spam Protection Provider
    header_level:              'title.decoration.font.font.*.headingLevel',
    title:                     'title.innerContent.*',
    button_text:               'button.innerContent.*.text',
    description:               'content.innerContent.*',
    footer_content:            'footerContent.innerContent.*',
    success_action:            'success.advanced.action.*',
    success_message:           'success.advanced.message.*',
    success_redirect_query:    'success.advanced.redirectQuery.*',
    success_redirect_url:      'success.advanced.redirectUrl.*',
    use_custom_fields:         'customFields.advanced.enable.*',
    use_custom_fields_notice:  'customFields.advanced.notice.*',
    layout:                    'module.advanced.layout.*',
    first_name_field:          'field.advanced.firstNameField.*',
    first_name_fullwidth:      'field.advanced.firstNameFullwidth.*',
    name_field:                'field.advanced.nameField.*',
    name_field_only:           'field.advanced.nameFieldOnly.*',
    name_fullwidth:            'field.advanced.nameFullwidth.*',
    ip_address:                'field.advanced.ipAddress.*',
    last_name_field:           'field.advanced.lastNameField.*',
    last_name_fullwidth:       'field.advanced.lastNameFullwidth.*',
    email_fullwidth:           'field.advanced.emailFullwidth.*',
    use_focus_border_color:    'field.advanced.focusUseBorder.*',
    form_field_custom_margin:  'field.decoration.spacing.*.margin',
    form_field_custom_padding: 'field.decoration.spacing.*.padding',

    // Email Service Provider.
    provider: 'module.advanced.emailService.*.provider',

    // Email Service Accounts.

    // Active Campaign.
    activecampaign_account_name: 'module.advanced.emailService.*.account',
    activecampaign_list:         'module.advanced.emailService.*.account',

    // AWeber.
    aweber_account_name: 'module.advanced.emailService.*.account',
    aweber_list:         'module.advanced.emailService.*.account',

    // Campaign Monitor.
    campaign_monitor_account_name: 'module.advanced.emailService.*.account',
    campaign_monitor_list:         'module.advanced.emailService.*.account',

    // Constant Contact.
    constant_contact_account_name: 'module.advanced.emailService.*.account',
    constant_contact_list:         'module.advanced.emailService.*.account',

    // ConvertKit.
    convertkit_account_name: 'module.advanced.emailService.*.account',
    convertkit_list:         'module.advanced.emailService.*.account',

    // Emma.
    emma_account_name: 'module.advanced.emailService.*.account',
    emma_list:         'module.advanced.emailService.*.account',

    // Feedblitz.
    feedblitz_account_name: 'module.advanced.emailService.*.account',
    feedblitz_list:         'module.advanced.emailService.*.account',

    // Fluent CRM.
    fluentcrm_account_name: 'module.advanced.emailService.*.account',
    fluentcrm_list:         'module.advanced.emailService.*.account',

    // Get Response.
    getresponse_account_name: 'module.advanced.emailService.*.account',
    getresponse_list:         'module.advanced.emailService.*.account',

    // Hubspot.
    hubspot_account_name: 'module.advanced.emailService.*.account',
    hubspot_list:         'module.advanced.emailService.*.account',

    // iContact.
    icontact_account_name: 'module.advanced.emailService.*.account',
    icontact_list:         'module.advanced.emailService.*.account',

    // Infusion Soft.
    infusionsoft_account_name: 'module.advanced.emailService.*.account',
    infusionsoft_list:         'module.advanced.emailService.*.account',

    // Madmimi.
    madmimi_account_name: 'module.advanced.emailService.*.account',
    madmimi_list:         'module.advanced.emailService.*.account',

    // Mailchimp.
    mailchimp_account_name: 'module.advanced.emailService.*.account',
    mailchimp_list:         'module.advanced.emailService.*.account',

    // Mailer Lite.
    mailerlite_account_name: 'module.advanced.emailService.*.account',
    mailerlite_list:         'module.advanced.emailService.*.account',

    // Mailpoet.
    mailpoet_account_name: 'module.advanced.emailService.*.account',
    mailpoet_list:         'module.advanced.emailService.*.account',

    // Mailster.
    mailster_account_name: 'module.advanced.emailService.*.account',
    mailster_list:         'module.advanced.emailService.*.account',

    // OntraPort.
    ontraport_account_name: 'module.advanced.emailService.*.account',
    ontraport_list:         'module.advanced.emailService.*.account',

    // SalesForce.
    salesforce_account_name: 'module.advanced.emailService.*.account',
    salesforce_list:         'module.advanced.emailService.*.account',

    // Send In Blue.
    sendinblue_account_name: 'module.advanced.emailService.*.account',
    sendinblue_list:         'module.advanced.emailService.*.account',
  },
  valueExpansionFunctionMap: {
    form_field_custom_margin:  convertSpacing,
    form_field_custom_padding: convertSpacing,
    success_redirect_query:    convertSuccessRedirectQuery,

    // Email Service Accounts.

    // Active Campaign.
    activecampaign_account_name: convertEmailServiceAccount,
    activecampaign_list:         convertEmailServiceAccount,

    // AWeber.
    aweber_account_name: convertEmailServiceAccount,
    aweber_list:         convertEmailServiceAccount,

    // Campaign Monitor.
    campaign_monitor_account_name: convertEmailServiceAccount,
    campaign_monitor_list:         convertEmailServiceAccount,

    // Constant Contact.
    constant_contact_account_name: convertEmailServiceAccount,
    constant_contact_list:         convertEmailServiceAccount,

    // ConvertKit.
    convertkit_account_name: convertEmailServiceAccount,
    convertkit_list:         convertEmailServiceAccount,

    // Emma.
    emma_account_name: convertEmailServiceAccount,
    emma_list:         convertEmailServiceAccount,

    // Feedblitz.
    feedblitz_account_name: convertEmailServiceAccount,
    feedblitz_list:         convertEmailServiceAccount,

    // Fluent CRM.
    fluentcrm_account_name: convertEmailServiceAccount,
    fluentcrm_list:         convertEmailServiceAccount,

    // Get Response.
    getresponse_account_name: convertEmailServiceAccount,
    getresponse_list:         convertEmailServiceAccount,

    // Hubspot.
    hubspot_account_name: convertEmailServiceAccount,
    hubspot_list:         convertEmailServiceAccount,

    // iContact.
    icontact_account_name: convertEmailServiceAccount,
    icontact_list:         convertEmailServiceAccount,

    // Infusion Soft.
    infusionsoft_account_name: convertEmailServiceAccount,
    infusionsoft_list:         convertEmailServiceAccount,

    // Madmimi.
    madmimi_account_name: convertEmailServiceAccount,
    madmimi_list:         convertEmailServiceAccount,

    // Mailchimp.
    mailchimp_account_name: convertEmailServiceAccount,
    mailchimp_list:         convertEmailServiceAccount,

    // Mailer Lite.
    mailerlite_account_name: convertEmailServiceAccount,
    mailerlite_list:         convertEmailServiceAccount,

    // Mailpoet.
    mailpoet_account_name: convertEmailServiceAccount,
    mailpoet_list:         convertEmailServiceAccount,

    // Mailster.
    mailster_account_name: convertEmailServiceAccount,
    mailster_list:         convertEmailServiceAccount,

    // OntraPort.
    ontraport_account_name: convertEmailServiceAccount,
    ontraport_list:         convertEmailServiceAccount,

    // SalesForce.
    salesforce_account_name: convertEmailServiceAccount,
    salesforce_list:         convertEmailServiceAccount,

    // Send In Blue.
    sendinblue_account_name: convertEmailServiceAccount,
    sendinblue_list:         convertEmailServiceAccount,
  },
};
