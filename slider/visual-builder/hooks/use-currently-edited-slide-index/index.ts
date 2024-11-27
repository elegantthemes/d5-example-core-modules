import { useSelect } from '@divi/data';


/**
 * Get currently edited slide index.
 *
 * @returns {number} Returns an object consisted of:
 *
 * `getChildActiveSlideIndex()`: gets current active child slide index.
 *
 * `activeChildSlideIndex`: child slide index.
 *
 * `isModuleEdited`: tracks if module is edited or not`.
 */
export const useCurrentlyEditedSlideIndex = (childrenIds: string[]): number => {
  const owner = useSelect(selectStore => selectStore('divi/modal-library').getModalOwner('divi/module'));

  return childrenIds?.indexOf(owner);
};
