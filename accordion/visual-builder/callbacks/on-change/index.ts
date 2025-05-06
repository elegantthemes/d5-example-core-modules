import {
  dispatch,
  select,
} from '@divi/data';


/**
 * On change callback.
 *
 * This function is called when the user changes the order of the accordion items by dragging and dropping them.
 * This function first updates the open state of the accordion items based on the new order,
 * and then updates the content state with the new order of the accordion items.
 *
 *
 * @since ??
 *
 * @param {string} moduleId The id of the accordion.
 * @param {string[]} childModulesIds The IDs of the child accordion items.
 *
 * @returns {void}
 */
export const onChange = (moduleId: string, childModulesIds: string[]): void => {
  const childModulesIdsNewOrder      = childModulesIds;
  const childModulesIdsPreviousOrder = select('divi/edit-post').getModule(moduleId)?.children;

  // Find the index of the previous first element from the old order array in the new order array
  const firstElementNewIndex = childModulesIdsNewOrder.indexOf(childModulesIdsPreviousOrder[0]);

  // if the first element has been moved, update the open state of the accordion items
  if (firstElementNewIndex !== 0) {
    // remove the open state from the accordion item that was previously the first item
    dispatch('divi/edit-post').removeModuleAttribute(childModulesIdsPreviousOrder[0], 'module.advanced.open');

    // add the open state to the new first item
    const openState  = select('divi/edit-post').getModuleAttr(childModulesIdsNewOrder[0], 'module.advanced.open');
    const breakpoint = select('divi/app-ui').getBreakpoint();
    const state      = select('divi/app-ui').getAttributeState();

    dispatch('divi/edit-post').editModuleAttribute({
      id:       childModulesIdsNewOrder[0],
      attrName: 'module.advanced.open',
      value:    openState.setIn([breakpoint, state], 'on'),
    });
  }

  // finally, update the parent accordion module state
  dispatch('divi/edit-post').editChildren(moduleId, childModulesIds);
};
