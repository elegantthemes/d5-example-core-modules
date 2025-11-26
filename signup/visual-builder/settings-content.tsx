/* eslint-disable @typescript-eslint/naming-convention */
import React, { type ReactElement, useContext, useEffect } from 'react';
import { isEmpty, isUndefined, set } from 'lodash';

import { usePrevious } from '@wordpress/compose';

import { moduleContext } from '@divi/context-library';
import { dispatch, useSelect } from '@divi/data';
import {
  ModuleGroups,
} from '@divi/module';
import {
  getAttrValue,
  useAttrValue,
} from '@divi/module-utils';
import {
  type Module,
  type SignupAttrs,
} from '@divi/types';

/**
 * Content panel component for the Email Optin module settings modal.
 *
 * @since ??
 *
 * @param {Module.Settings.Panel.Props} param0 Content panel props.
 *
 * @returns {ReactElement}
 */
export const SettingsContent = ({
  groupConfiguration,
}: Module.Settings.Panel.Props<SignupAttrs>): ReactElement => {
  const { moduleId } = useContext(moduleContext);

  const {
    singleNameFieldAttr,
    enableCustomFieldsAttr,
    emailServiceAttr,
  } = useSelect(selectStore => ({
    singleNameFieldAttr:    selectStore('divi/edit-post').getModuleAttr<SignupAttrs['field']['advanced']['nameField']>(moduleId, 'field.advanced.nameField'),
    enableCustomFieldsAttr: selectStore('divi/edit-post').getModuleAttr<SignupAttrs['customFields']['advanced']['enable']>(moduleId, 'customFields.advanced.enable'),
    emailServiceAttr:       selectStore('divi/edit-post').getModuleAttr<SignupAttrs['module']['advanced']['emailService']>(moduleId, 'module.advanced.emailService'),
  }));
  const singleNameField = useAttrValue({
    attr:         singleNameFieldAttr,
    defaultValue: 'off',
  });

  const enableCustomFields = useAttrValue({
    attr:         enableCustomFieldsAttr,
    defaultValue: 'off',
  });

  const selectedProvider = useAttrValue({
    attr: emailServiceAttr,
  })?.provider ?? 'mailchimp';

  const selectedAccount = useAttrValue({
    attr: emailServiceAttr,
  })?.account ?? '0|none';

  const module                    = useSelect(selectData => selectData('divi/edit-post').getModule(moduleId));
  const childrenIds: string[]     = module?.getIn(['children'])?.asMutable({ deep: true }) ?? [];
  const selectedAccountName       = selectedAccount.split('|')[0] ?? '0';
  const selectedAccountList       = selectedAccount.split('|')[1] ?? 'none';
  const emailService              = useSelect(selectData => selectData('divi/email-marketing').getService(selectedProvider));
  const emailServiceAccount       = useSelect(selectData => selectData('divi/email-marketing').getAccount(selectedProvider, selectedAccountName));
  const accountCustomFields       = useSelect(selectData => selectData('divi/email-marketing').getCustomFields(selectedProvider, selectedAccountName, selectedAccountList));
  const nameFields                = emailService?.getIn(['nameFields']);
  const isCustomFieldsEnable      = !! emailService?.getIn(['customFields', 'enable']);
  const isCustomFieldsPredefined  = !! emailService?.getIn(['customFields', 'isPredefined']);
  const useCustomFieldsVisible    = isCustomFieldsEnable && (!! emailServiceAccount || ! isEmpty(childrenIds));
  const customFieldsNoticeVisible = useCustomFieldsVisible && 'on' === enableCustomFields && isCustomFieldsPredefined && isEmpty(accountCustomFields);

  const successActionCallback = (
    params: Module.Settings.Field.CallbackParams<SignupAttrs>,
  ) => {
    const successAction = getAttrValue({
      attr:            params?.attrs?.success?.advanced?.action,
      baseBreakpoint:  params?.baseBreakpoint,
      breakpoint:      params?.breakpoint,
      breakpointNames: params?.breakpointNames,
      state:           params?.state,
    }) ?? 'message';

    return 'message' === successAction;
  };

  const notSuccessActionCallback = (
    params: Module.Settings.Field.CallbackParams<SignupAttrs>,
  ) => {
    const successAction = getAttrValue({
      attr:            params?.attrs?.success?.advanced?.action,
      baseBreakpoint:  params?.baseBreakpoint,
      breakpoint:      params?.breakpoint,
      breakpointNames: params?.breakpointNames,
      state:           params?.state,
    }) ?? 'message';

    return 'message' !== successAction;
  };

  let customFieldsList = 'on' === enableCustomFields && useCustomFieldsVisible;

  if (isCustomFieldsPredefined) {
    customFieldsList = 'on' === enableCustomFields && useCustomFieldsVisible && ! isEmpty(accountCustomFields);
  }

  // TODO fix(D5, Modal cancel): If we change the provider and cancel it, it will redo all deleted custom field.
  // Check this video: https://github.com/elegantthemes/Divi/assets/1901860/ffe6470b-a1bc-4806-8068-b4ef61d0c4b6
  // Remove all custom fields on change of the provider.
  const prevProvider = usePrevious(selectedProvider);
  useEffect(() => {
    if (! isUndefined(prevProvider) && prevProvider !== selectedProvider) {
      childrenIds.forEach(childModuleId => {
        dispatch('divi/edit-post').removeModule(childModuleId);
      });
    }
  }, [selectedProvider, prevProvider]);

  // Insert props value to `contentFields` group.
  if (groupConfiguration?.contentFields?.component?.props) {
    set(groupConfiguration, ['contentFields', 'component', 'props', 'fields', 'customFieldsAdvancedFields', 'render'], customFieldsList); // Usably, We use `visible` prop to hide the field, but in this case we need to use `render`.
    set(groupConfiguration, ['contentFields', 'component', 'props', 'fields', 'fieldAdvancedNamefieldonly', 'visible'], nameFields?.name);
    set(groupConfiguration, ['contentFields', 'component', 'props', 'fields', 'fieldAdvancedNamefield', 'visible'], nameFields?.useSingleNameField);
    set(groupConfiguration, ['contentFields', 'component', 'props', 'fields', 'fieldAdvancedFirstnamefield', 'visible'], nameFields?.showFirstNameField && 'off' === singleNameField);
    set(groupConfiguration, ['contentFields', 'component', 'props', 'fields', 'fieldAdvancedLastnamefield', 'visible'], nameFields?.showLastNameField && 'off' === singleNameField);

    set(groupConfiguration, ['contentFields', 'component', 'props', 'fields', 'customFieldsAdvancedEnable', 'visible'], useCustomFieldsVisible); // Use Custom Fields.
    set(groupConfiguration, ['contentFields', 'component', 'props', 'fields', 'customFieldsAdvancedNotice', 'visible'], customFieldsNoticeVisible); // Custom Fields Notice.
  }

  // Insert props value to `contentSuccessAction` group.
  if (groupConfiguration?.contentSuccessAction?.component?.props) {
    set(groupConfiguration, ['contentSuccessAction', 'component', 'props', 'fields', 'successAdvancedMessage', 'visible'], successActionCallback);
    set(groupConfiguration, ['contentSuccessAction', 'component', 'props', 'fields', 'successAdvancedRedirectquery', 'visible'], notSuccessActionCallback);
    set(groupConfiguration, ['contentSuccessAction', 'component', 'props', 'fields', 'successAdvancedRedirecturl', 'visible'], notSuccessActionCallback);
  }

  return (
    <ModuleGroups
      groups={groupConfiguration}
    />
  );
};
