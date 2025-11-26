import {
  type ModuleFlatObject,
  type SignupCustomFieldAttrs,
} from '@divi/types';

import {
  signupCustomFieldModuleMetaData,
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
  attrs: SignupCustomFieldAttrs,
  info: {
    name: string,
    parentId: string,
    state: Record<string, ModuleFlatObject<SignupCustomFieldAttrs>>,
  },
) => {
  const { name, state, parentId } = info;

  if (signupCustomFieldModuleMetaData.name !== name) {
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
