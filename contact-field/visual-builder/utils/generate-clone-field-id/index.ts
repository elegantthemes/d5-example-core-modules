import {
  type ContactFieldAttrs,
  type ModuleFlatObject,
} from '@divi/types';

import {
  contactFieldModuleMetaData,
} from '../../module.json-source';

/**
 * Add filter to `divi.cloneModule.attrs` hook.
 *
 * This filter allows developers to modify the cloned module's attributes.
 * In this case, it generating unique value for field ID.
 *
 * @since ??
 */
export const generateCloneFieldId = (
  attrs: ContactFieldAttrs,
  info: {
    name: string,
    parentId: string,
    sourceId: string,
    state: Record<string, ModuleFlatObject<ContactFieldAttrs>>
  },
) => {
  const { name, state, parentId, sourceId } = info;

  if (contactFieldModuleMetaData.name !== name) {
    return attrs;
  }

  // Check if entire Contact Form was cloned by comparing parent IDs.
  // When cloning entire form: sourceField.parent !== parentId (field moved to new parent form)
  // When cloning individual field: sourceField.parent === parentId (field stays in same form)
  const sourceField    = state[sourceId];
  const sourceParentId = sourceField?.parent;

  if (sourceParentId && sourceParentId !== parentId) {
    return attrs;
  }

  const fieldUniqueBase = attrs?.fieldItem?.advanced?.id?.desktop?.value;
  const siblings        = Object.keys(state).filter(key => state[key]?.parent === parentId);
  const countStart      = 2;

  const findByAttrsId = (uniqueId: string):boolean => {
    const found = siblings.some(key => state[key]?.props?.attrs?.fieldItem?.advanced?.id?.desktop?.value === uniqueId);

    return found;
  };

  let fieldUnique    = `${fieldUniqueBase}_${countStart}`;
  let checkIncrement = 0;

  // Re-generate unique value for field ID if it's already exist
  while (findByAttrsId(fieldUnique)) {
    checkIncrement++;
    fieldUnique = `${fieldUniqueBase}_${(checkIncrement + countStart)}`;
  }

  return {
    ...attrs,
    fieldItem: {
      ...attrs?.fieldItem,
      advanced: {
        ...attrs?.fieldItem?.advanced,
        id: {
          ...attrs?.fieldItem?.advanced?.id,
          desktop: {
            ...attrs?.fieldItem?.advanced?.id?.desktop,
            value: fieldUnique,
          },
        },
      },
    },
  };
};
