import { useContext } from 'react';

import { moduleContext } from '@divi/context-library';
import { select, useSelect } from '@divi/data';
import { type ContactFieldAttrs, type FieldLibrary, type ModuleFlatObject } from '@divi/types';

/**
 * UseFields Hook.
 *
 * It will return all sibling fields for the current field for the Conditional logic module options.
 *
 * @since ??
 *
 * @returns {object} Fields.
 */
export const useFields = (): FieldLibrary.Conditions.Props['fields'] => {
  const { moduleId } = useContext(moduleContext);

  const module       = useSelect(selectStore => selectStore('divi/edit-post').getModule(moduleId) as unknown as ModuleFlatObject<ContactFieldAttrs>, [moduleId]);
  const parentModule = useSelect(selectStore => selectStore('divi/edit-post').getModule(module?.parent) as unknown as ModuleFlatObject<ContactFieldAttrs>, [module?.parent]);

  const children = parentModule?.children?.filter(item => item !== moduleId)?.map(item => select('divi/edit-post').getModule(item)  as unknown as ModuleFlatObject<ContactFieldAttrs>);

  const fields: FieldLibrary.Conditions.Props['fields'] = {};

  children?.forEach(item => {
    const fieldType       = item?.props?.attrs?.fieldItem?.advanced?.type?.desktop?.value ?? '';
    const checkboxOptions = item?.props?.attrs?.fieldItem?.advanced?.checkboxOptions?.desktop?.value ?? [];
    const radioOptions    = item?.props?.attrs?.fieldItem?.advanced?.radioOptions?.desktop?.value ?? [];
    const selectOptions   = item?.props?.attrs?.fieldItem?.advanced?.selectOptions?.desktop?.value ?? [];

    const value: string[] = [];

    if ('checkbox' === fieldType) {
      checkboxOptions?.forEach(option => {
        value.push(option.value);
      });
    } else if ('radio' === fieldType) {
      radioOptions?.forEach(option => {
        value.push(option.value);
      });
    } else if ('select' === fieldType) {
      selectOptions?.forEach(option => {
        value.push(option.value);
      });
    }
    fields[item?.props?.attrs?.fieldItem?.advanced?.id?.desktop?.value] = {
      label:  item?.props?.attrs?.fieldItem?.innerContent?.desktop?.value,
      values: value,
    };
  });


  return fields;
};
