import {
  dispatch,
  select,
} from '@divi/data';


/**
 * Duplicates an accordion item.
 *
 * This function is called when the user clicks the duplicate button in the accordion settings content area.
 * The function first clones the accordion item and then updates the children (accordion items) open state.
 * If the cloned item is the first item in the list,
 * the open state of the clone/copy accordion item is updated to "closed".
 * This is because only the first item in the list should be open by default.
 *
 * @since ??
 *
 * @param {string} id The id of the accordion item to duplicate.
 *
 * @returns {void}
 */
export const onDuplicateItem = (id: string): void => {
  // first clone the accordion item
  dispatch('divi/edit-post').cloneModule({
    id,
    moduleCount: select('divi/module').getModuleCount(),
  });

  // next update the children, if the cloned item is the first item in the list
  // update the open state of the clone/copy accordion item to "closed" since it is not the first item in the list
  const parentModule = select('divi/edit-post').getParentModule(id);
  const moduleIds    = parentModule?.getIn(['children'], [])?.asMutable();

  if (moduleIds.length > 0 && moduleIds[0] === id) {
    // remove the open state from the cloned item
    dispatch('divi/edit-post').removeModuleAttribute(moduleIds[1], 'module.advanced.open');
  }
};
