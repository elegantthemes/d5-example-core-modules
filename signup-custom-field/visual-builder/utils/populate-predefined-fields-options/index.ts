import {
  type FieldLibrary,
} from '@divi/types';


/**
 * Converts predefined field options into a format suitable for FieldLibrary.SortableList.Value.
 *
 * @since ??
 *
 * @param {string|object} predefinedFieldsOptions An array of strings or an object with string keys and values.
 * @returns {Array} An array of objects conforming to FieldLibrary.SortableList.Value.
 */
export const populatePredefinedFieldsOptions = (
  predefinedFieldsOptions: string[] | Record<string, string>,
):FieldLibrary.SortableList.Value => {
  if (Array.isArray(predefinedFieldsOptions)) {
    return predefinedFieldsOptions.map(value => ({
      value,
    }));
  }

  return Object.keys(predefinedFieldsOptions).map(dragID => ({
    dragID,
    value: predefinedFieldsOptions[dragID],
  }));
};
