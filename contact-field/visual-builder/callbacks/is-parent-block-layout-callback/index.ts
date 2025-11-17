import { select } from '@divi/data';
import { getAttrValue } from '@divi/module-utils';
import { type ContactFieldAttrs, type Module } from '@divi/types';


/**
 * Determines if the parent module of the current module is using a block layout.
 *
 * @param {Module.Settings.Field.CallbackParams<ContactFieldAttrs>} params The callback function parameters.
 * @returns {boolean} `true` if the parent module's layout style is `block`, otherwise `false`.
 */
export const isParentBlockLayoutCallback = ({
  moduleId,
  baseBreakpoint,
  breakpointNames,
  responsiveMode,
  stateMode,
}: Module.Settings.Field.CallbackParams<ContactFieldAttrs>) => {
  const parentModule = select('divi/edit-post').getParentModule(moduleId);

  // If there's no parent or it's the root, default to false
  if (! parentModule || 'divi/root' === parentModule?.name) {
    return false;
  }

  const parentModuleLayoutAttr = select('divi/edit-post').getModuleAttr<Module.Element.Decoration.Layout.Attributes>(
    parentModule.id,
    'module.decoration.layout',
  );

  const layoutAttr = getAttrValue({
    attr:       parentModuleLayoutAttr,
    breakpoint: responsiveMode,
    state:      stateMode,
    breakpointNames,
    baseBreakpoint,
    mode:       'getAndInheritAll',
  });

  const parentLayoutDisplay = layoutAttr?.display ?? 'flex';

  return 'block' === parentLayoutDisplay;
};
