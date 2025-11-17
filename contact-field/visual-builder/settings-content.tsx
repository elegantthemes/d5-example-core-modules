/* eslint-disable @typescript-eslint/naming-convention */
import React, { type ReactElement, useContext } from 'react';
import { set } from 'lodash';

import { moduleContext } from '@divi/context-library';
import {
  select,
  useDispatch,
  useSelect,
} from '@divi/data';
import {
  ModuleGroups,
} from '@divi/module';
import { getAttrValue, useAttrValue } from '@divi/module-utils';
import {
  type ContactFieldAttrs,
  type Module,
} from '@divi/types';

import { useFields } from './hooks';

/**
 * Design panel component for the contact field module settings modal.
 *
 * @since ??
 *
 * @param {Module.Settings.Panel.Props} param0 Design panel props.
 *
 * @returns {ReactElement}
 */
export const SettingsContent = ({
  groupConfiguration,
}: Module.Settings.Panel.Props<ContactFieldAttrs>): ReactElement => {
  const fields = useFields();

  const { moduleId } = useContext(moduleContext);
  const {
    fieldItemAttr,
  } = useSelect(selectStore => ({
    fieldItemAttr: selectStore('divi/edit-post').getModuleAttr<ContactFieldAttrs['fieldItem']['innerContent']>(
      moduleId, 'fieldItem.innerContent',
    ),
  }));

  const { editModuleAttribute } = useDispatch('divi/edit-post');

  /**
   * Sanitizes field ID by replacing spaces with underscores and updates the module attribute.
   *
   * @param {string} currentFieldId The current field ID value to sanitize.
   */
  const sanitizeFieldId = (currentFieldId: string): void => {
    // Check if field ID contains spaces and sanitize if needed
    if (currentFieldId && /\s/.test(currentFieldId)) {
      const sanitizedValue = currentFieldId.replace(/\s+/g, '_');
      const fieldIdAttr    = select('divi/edit-post').getModuleAttr(moduleId, 'fieldItem.advanced.id');

      if (fieldIdAttr && fieldIdAttr.setIn && 'function' === typeof fieldIdAttr.setIn) {
        editModuleAttribute({
          id:       moduleId,
          attrName: 'fieldItem.advanced.id',
          value:    fieldIdAttr.setIn(['desktop', 'value'], sanitizedValue),
        });
      }
    }
  };

  const onBlurFieldIdCallback = (event: React.FocusEvent<HTMLInputElement>) => {
    // Replace spaces with underscores to match Divi 4 behavior.
    const currentValue = event.target.value;
    sanitizeFieldId(currentValue);
  };

  const fieldTitle: string = useAttrValue({
    attr:         fieldItemAttr,
    defaultValue: null,
  });

  const conditionalLogicEnableCallback = (
    params: Module.Settings.Field.CallbackParams<ContactFieldAttrs>,
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
    params: Module.Settings.Field.CallbackParams<ContactFieldAttrs>,
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
    params: Module.Settings.Field.CallbackParams<ContactFieldAttrs>,
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
    params: Module.Settings.Field.CallbackParams<ContactFieldAttrs>,
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
    params: Module.Settings.Field.CallbackParams<ContactFieldAttrs>,
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

  // Insert props value to `contentText` group for Field ID event handlers.
  if (groupConfiguration?.contentText?.component?.props) {
    set(groupConfiguration, ['contentText', 'component', 'props', 'fields', 'fieldItemAdvancedId', 'component', 'props', 'onBlur'], onBlurFieldIdCallback);
  }

  return (
    <ModuleGroups
      groups={groupConfiguration}
    />
  );
};
