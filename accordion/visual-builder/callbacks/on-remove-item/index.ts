import {
  dispatch,
  select,
} from '@divi/data';
import { getModuleOrderClassName } from '@divi/module-utils';


/**
 * Removes an accordion item.
 *
 * This function is called when the user clicks the remove button in the accordion settings content area.
 * This function first updates the children (accordion items) open state, and then removes the accordion item.
 * If the removed item is the first item in the list, the open state of the next accordion item is updated to open.
 *
 * @since ??
 *
 * @param {string} id The id of the accordion item to remove.
 *
 * @returns {void}
 */
export const onRemoveItem = (id: string): void => {
  const parentModule = select('divi/edit-post').getParentModule(id);
  const moduleIds    = parentModule?.getIn(['children'], [])?.asMutable();

  // if the current accordion item is the first item in the list
  // update the open state of the next accordion item to open since it will become the new first item
  if (moduleIds.length > 0 && moduleIds[0] === id) {
    const openState  = select('divi/edit-post').getModuleAttr(moduleIds[1], 'module.advanced.open');
    const breakpoint = select('divi/app-ui').getBreakpoint();
    const state      = select('divi/app-ui').getAttributeState();

    dispatch('divi/edit-post').editModuleAttribute({
      id:       moduleIds[1],
      attrName: 'module.advanced.open',
      value:    openState.setIn([breakpoint, state], 'on'),
    });
  } else if (jQuery(`.${getModuleOrderClassName(id)}`).hasClass('et_pb_toggle_open')) {
    // if the current accordion item is open, and has been opened manually,
    // then the attrs will not reflect this, so we check with jQuery
    // if the current accordion item is open, then we need to update the open state of the first accordion item
    // we do this by triggering a click even so that the animations can run.

    jQuery(`.${getModuleOrderClassName(moduleIds[0])} .et_pb_toggle_title`).trigger('click');
  }

  dispatch('divi/edit-post').removeModule(id);
};
