import type SeamlessImmutable from 'seamless-immutable';

import {
  dispatch,
  select,
} from '@divi/data';
import { type ModuleFlatObject } from '@divi/types';


/**
 * Adds an accordion item.
 *
 * This function is called when the user clicks the add button in the accordion settings content area.
 * This function first adds the accordion item, and then updates the open state of the accordion items.
 * If there is only one accordion item, the open state is updated to "on" since it will be the first item in the list.
 * This is because the first item in the list should be open by default.
 *
 * @since ??
 *
 * @param {string} id The id of the accordion to add the item to.
 * @param {SeamlessImmutable.ImmutableObject<ModuleFlatObject>[]} childModules The child modules of the accordion.
 * @param {string} childModuleName The name of the child module to add.
 *
 * @returns {void}
 */
export const onAddItem = (
  id: string,
  childModules: SeamlessImmutable.ImmutableObject<ModuleFlatObject>[],
  childModuleName: string,
): void => {
  // first add the the accordion item
  const placeholderContent = select('divi/module-library').getModule(childModuleName)?.placeholderContent ?? {};

  dispatch('divi/edit-post').addModule(
    id, childModuleName, { attrs: placeholderContent }, 'inside',
  );

  const parentModule = select('divi/edit-post').getModule(id);
  const moduleIds    = parentModule?.getIn(['children'], [])?.asMutable();

  // if there is only one accordion item, update the open state to "on"
  // since it will be the first item in the list
  if (1 === moduleIds.length) {
    const openState  = select('divi/edit-post').getModuleAttr(moduleIds[0], 'module.advanced.open');
    const breakpoint = select('divi/app-ui').getBreakpoint();
    const state      = select('divi/app-ui').getAttributeState();

    dispatch('divi/edit-post').editModuleAttribute({
      id:       moduleIds[0],
      attrName: 'module.advanced.open',
      value:    openState.setIn([breakpoint, state], 'on'),
    });
  }
};
