import React, { type ReactElement, useContext } from 'react';
import { forEach, includes, set } from 'lodash';

import { moduleContext } from '@divi/context-library';
import { dispatch, select, useSelect } from '@divi/data';
import {
  ModuleGroups,
} from '@divi/module';
import { getAttrValue, useAttrValue } from '@divi/module-utils';
import {
  type ContactFieldAttrs,
  type FieldLibrary,
  type Module,
  type SignupAttrs,
  type SignupCustomFieldAttrs,
} from '@divi/types';

import { useFields } from './hooks';
import {
  populatePredefinedFieldsOptions,
} from './utils';

/**
 * Design panel component for the signup custom field module settings modal.
 *
 * @since ??
 *
 * @param {Module.Settings.Panel.Props} param0 Design panel props.
 *
 * @returns {ReactElement}
 */
export const SettingsContent = ({
  groupConfiguration,
}: Module.Settings.Panel.Props<ContactFieldAttrs, SignupAttrs>): ReactElement => {
  const fields = useFields();

  const {
    moduleId,
  } = useContext(moduleContext);

  const {
    fieldTitleAttr,
    emailServiceAttr,
  } = useSelect(selectStore => {
    const parentModuleId = selectStore('divi/edit-post').getParentModuleId(moduleId);

    return {
      fieldTitleAttr:   selectStore('divi/edit-post').getModuleAttr<SignupCustomFieldAttrs['fieldItem']['innerContent']>(moduleId, 'fieldItem.innerContent'),
      emailServiceAttr: selectStore('divi/edit-post').getModuleAttr<SignupAttrs['module']['advanced']['emailService']>(parentModuleId, 'module.advanced.emailService'),
    };
  });

  const fieldTitle: string  = useAttrValue({
    attr: fieldTitleAttr,
  }) ?? null;
  const selectedProvider    = useAttrValue({
    attr: emailServiceAttr,
  })?.provider ?? 'mailchimp';
  const selectedAccount     = useAttrValue({
    attr: emailServiceAttr,
  })?.account ?? '0|none';
  const selectedAccountName = selectedAccount.split('|')[0] ?? '0';
  const selectedAccountList = selectedAccount.split('|')[1] ?? 'none';
  const emailService        = useSelect(selectData => selectData('divi/email-marketing').getService(selectedProvider));
  const predefinedFields    = useSelect(selectData => selectData('divi/email-marketing').getCustomFields(selectedProvider, selectedAccountName, selectedAccountList));
  const isPredefined        = emailService?.getIn(['customFields', 'isPredefined']);

  const predefinedFieldsOptions: FieldLibrary.Select.Options = {
    none: {
      label: 'Choose a field...',
    },
  };

  forEach(predefinedFields?.asMutable({ deep: true }), (field, key) => {
    predefinedFieldsOptions[key] = {
      label: field?.name,
    };
  });

  const onChangePredefinedSelect = ({ inputValue }: FieldLibrary.Select.OnChangeCallbackParams) => {
    if ('none' !== inputValue) {
      const attrInnerContent            = select('divi/edit-post').getModuleAttr(moduleId, 'fieldItem.innerContent');
      const attrAdvancedType            = select('divi/edit-post').getModuleAttr(moduleId, 'fieldItem.advanced.type');
      const attrAdvancedId              = select('divi/edit-post').getModuleAttr(moduleId, 'fieldItem.advanced.id');
      const attrAdvancedHidden          = select('divi/edit-post').getModuleAttr(moduleId, 'fieldItem.advanced.hidden');
      const attrAdvancedCheckboxOptions = select('divi/edit-post').getModuleAttr(moduleId, 'fieldItem.advanced.checkboxOptions');
      const attrAdvancedRadioOptions    = select('divi/edit-post').getModuleAttr(moduleId, 'fieldItem.advanced.radioOptions');
      const attrAdvancedSelectOptions   = select('divi/edit-post').getModuleAttr(moduleId, 'fieldItem.advanced.selectOptions');

      // Get predefined field.
      const predefinedField = predefinedFields?.[inputValue];

      // Check if predefined field exists. If not, throw an error.
      if (! predefinedField) {
        throw new Error('Predefined field not found');
      }

      const predefinedOptionsRaw = predefinedField?.options?.asMutable({ deep: true }) ?? [];

      const inputType = predefinedField?.type ?? 'input';

      // Set input type.
      dispatch('divi/edit-post').editModuleAttribute({
        id:       moduleId,
        attrName: 'fieldItem.advanced.type',
        value:    attrAdvancedType.setIn(['desktop', 'value'], inputType),
      });

      // Set input id.
      dispatch('divi/edit-post').editModuleAttribute({
        id:       moduleId,
        attrName: 'fieldItem.advanced.id',
        value:    attrAdvancedId.setIn(['desktop', 'value'], predefinedField.field_id?.toString() ?? ''),
      });

      // Set input hidden flag.
      dispatch('divi/edit-post').editModuleAttribute({
        id:       moduleId,
        attrName: 'fieldItem.advanced.hidden',
        value:    attrAdvancedHidden.setIn(['desktop', 'value'], predefinedField?.hidden ? 'on' : 'off'),
      });

      // Set predefined options for name field.
      dispatch('divi/edit-post').editModuleAttribute({
        id:       moduleId,
        attrName: 'fieldItem.innerContent',
        value:    attrInnerContent.setIn(['desktop', 'value'], predefinedField?.name ?? ''),
      });

      switch (inputType) {
        case 'checkbox': {
          dispatch('divi/edit-post').editModuleAttribute({
            id:       moduleId,
            attrName: 'fieldItem.advanced.checkboxOptions',
            value:    attrAdvancedCheckboxOptions.setIn(['desktop', 'value'], populatePredefinedFieldsOptions(predefinedOptionsRaw)),
          });
          break;
        }

        case 'radio': {
          dispatch('divi/edit-post').editModuleAttribute({
            id:       moduleId,
            attrName: 'fieldItem.advanced.radioOptions',
            value:    attrAdvancedRadioOptions.setIn(['desktop', 'value'], populatePredefinedFieldsOptions(predefinedOptionsRaw)),
          });

          break;
        }

        case 'select': {
          dispatch('divi/edit-post').editModuleAttribute({
            id:       moduleId,
            attrName: 'fieldItem.advanced.selectOptions',
            value:    attrAdvancedSelectOptions.setIn(['desktop', 'value'], populatePredefinedFieldsOptions(predefinedOptionsRaw)),
          });
          break;
        }

        default:
          // Do nothing.
          break;
      }
    }
  };

  const conditionalLogicEnableCallback = (
    params: Module.Settings.Field.CallbackParams<SignupCustomFieldAttrs>,
  ) => {
    const conditionalLogicEnable = getAttrValue({
      attr:            params?.attrs?.conditionalLogic?.advanced?.enable,
      baseBreakpoint:  params?.baseBreakpoint,
      breakpoint:      params?.breakpoint,
      breakpointNames: params?.breakpointNames,
      state:           params?.state,
    }) ?? 'off';

    return 'on' === conditionalLogicEnable;
  };

  const fieldTypeInputCallback = (
    params: Module.Settings.Field.CallbackParams<SignupCustomFieldAttrs>,
  ) => {
    const fieldType = getAttrValue({
      attr:            params?.attrs?.fieldItem?.advanced?.type,
      baseBreakpoint:  params?.baseBreakpoint,
      breakpoint:      params?.breakpoint,
      breakpointNames: params?.breakpointNames,
      state:           params?.state,
    }) ?? 'input';

    return 'input' === fieldType;
  };

  const fieldTypeCheckboxCallback = (
    params: Module.Settings.Field.CallbackParams<SignupCustomFieldAttrs>,
  ) => {
    const fieldType = getAttrValue({
      attr:            params?.attrs?.fieldItem?.advanced?.type,
      baseBreakpoint:  params?.baseBreakpoint,
      breakpoint:      params?.breakpoint,
      breakpointNames: params?.breakpointNames,
      state:           params?.state,
    }) ?? 'input';

    return 'checkbox' === fieldType;
  };

  const fieldTypeRadioCallback = (
    params: Module.Settings.Field.CallbackParams<SignupCustomFieldAttrs>,
  ) => {
    const fieldType = getAttrValue({
      attr:            params?.attrs?.fieldItem?.advanced?.type,
      baseBreakpoint:  params?.baseBreakpoint,
      breakpoint:      params?.breakpoint,
      breakpointNames: params?.breakpointNames,
      state:           params?.state,
    }) ?? 'input';

    return 'radio' === fieldType;
  };

  const fieldTypeSelectCallback = (
    params: Module.Settings.Field.CallbackParams<SignupCustomFieldAttrs>,
  ) => {
    const fieldType = getAttrValue({
      attr:            params?.attrs?.fieldItem?.advanced?.type,
      baseBreakpoint:  params?.baseBreakpoint,
      breakpoint:      params?.breakpoint,
      breakpointNames: params?.breakpointNames,
      state:           params?.state,
    }) ?? 'input';

    return 'select' === fieldType;
  };

  const isTitleReadOnly = isPredefined && ! includes(['getresponse', 'sendinblue', 'constant_contact', 'fluentcrm'], selectedProvider);

  // Insert props value to `designFieldField` group.
  if (groupConfiguration?.contentMainContent?.component?.props) {
    set(groupConfiguration, ['contentMainContent', 'component', 'props', 'fields', 'fieldItemAdvancedPredefinedfield', 'component', 'props', 'options'], predefinedFieldsOptions);
    set(groupConfiguration, ['contentMainContent', 'component', 'props', 'fields', 'fieldItemAdvancedPredefinedfield', 'component', 'props', 'value'], 'none');
    set(groupConfiguration, ['contentMainContent', 'component', 'props', 'fields', 'fieldItemAdvancedPredefinedfield', 'component', 'props', 'onChange'], onChangePredefinedSelect);
    set(groupConfiguration, ['contentMainContent', 'component', 'props', 'fields', 'fieldItemAdvancedPredefinedfield', 'render'], isPredefined); // Usably, We use `visible` prop to hide the field, but in this case we need to use `render`.
    set(groupConfiguration, ['contentMainContent', 'component', 'props', 'fields', 'fieldItemAdvancedId', 'component', 'props', 'readonly'], isPredefined);
    set(groupConfiguration, ['contentMainContent', 'component', 'props', 'fields', 'fieldItemInnercontent', 'component', 'props', 'readonly'], isTitleReadOnly);
  }

  // Insert props value to `designFieldField` group.
  if (groupConfiguration?.contentConditionalLogic?.component?.props) {
    set(groupConfiguration, ['contentConditionalLogic', 'component', 'props', 'fields', 'conditionalLogicInnercontent', 'component', 'props', 'fields'], fields);
    set(groupConfiguration, ['contentConditionalLogic', 'component', 'props', 'fields', 'conditionalLogicInnercontent', 'visible'], conditionalLogicEnableCallback);
    set(groupConfiguration, ['contentConditionalLogic', 'component', 'props', 'fields', 'conditionalLogicAdvancedRelation', 'visible'], conditionalLogicEnableCallback);
  }

  // Insert props value to `contentFieldOptions` group.
  if (groupConfiguration?.contentFieldOptions?.component?.props) {
    set(groupConfiguration, ['contentFieldOptions', 'component', 'props', 'fields', 'fieldItemAdvancedAllowedsymbols', 'visible'], fieldTypeInputCallback);
    set(groupConfiguration, ['contentFieldOptions', 'component', 'props', 'fields', 'fieldItemAdvancedMaxlength', 'visible'], fieldTypeInputCallback);
    set(groupConfiguration, ['contentFieldOptions', 'component', 'props', 'fields', 'fieldItemAdvancedMinlength', 'visible'], fieldTypeInputCallback);
    set(groupConfiguration, ['contentFieldOptions', 'component', 'props', 'fields', 'fieldItemAdvancedCheckboxoptions', 'visible'], fieldTypeCheckboxCallback);
    set(groupConfiguration, ['contentFieldOptions', 'component', 'props', 'fields', 'fieldItemAdvancedCheckboxoptions', 'component', 'props', 'firstValue'], fieldTitle);
    set(groupConfiguration, ['contentFieldOptions', 'component', 'props', 'fields', 'fieldItemAdvancedRadiooptions', 'visible'], fieldTypeRadioCallback);
    set(groupConfiguration, ['contentFieldOptions', 'component', 'props', 'fields', 'fieldItemAdvancedSelectoptions', 'visible'], fieldTypeSelectCallback);
  }

  return (
    <ModuleGroups
      groups={groupConfiguration}
    />
  );
};
