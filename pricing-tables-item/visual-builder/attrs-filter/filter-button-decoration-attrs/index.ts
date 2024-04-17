import { isUndefined } from 'lodash';

import {
  type AttrState,
  type Breakpoint,
  type Module,
} from '@divi/types';

/**
 * Filters the button.decoration attributes.
 *
 * @since ??
 *
 * @param {object} decorationAttrs  The decoration attributes to be filtered.
 * @param {object} parentButtonAttr  The parent button attributes.
 *
 * @returns {object} The filtered decoration attributes.
 */
export const filterButtonDecorationAttrs = (
  decorationAttrs:Module.Element.Decoration.Attributes,
  parentButtonAttr: Module.Element.Decoration.Button.AttributeValue,
):Module.Element.Decoration.Attributes => {
  const buttonAttrs = {
    ...decorationAttrs?.button,
  };

  const buttonAttr = decorationAttrs?.button ?? {};
  Object.keys(buttonAttr).forEach((attrBreakpoint:Breakpoint) => {
    Object.keys(buttonAttr[attrBreakpoint]).forEach((attrState:AttrState) => {
      if (! Object.prototype.hasOwnProperty.call(buttonAttrs, attrBreakpoint)) {
        buttonAttrs[attrBreakpoint] = {};
      }

      if (! Object.prototype.hasOwnProperty.call(buttonAttrs[attrBreakpoint], attrState)) {
        buttonAttrs[attrBreakpoint][attrState] = {};
      }

      // Attribute icon.enable is desktop only.
      const enabled      = decorationAttrs?.button?.desktop?.value?.icon?.enable;
      const iconSettings = decorationAttrs?.button?.[attrBreakpoint][attrState]?.icon?.settings;

      // If icon.enable is on for child pricing table and
      // icon.settings is undefined which means icon is not set for child pricing table
      // Then only merge the parent button icon attrs into child.
      if ('on' === enabled && isUndefined(iconSettings)) {
        buttonAttrs[attrBreakpoint][attrState] = {
          ...buttonAttrs?.[attrBreakpoint]?.[attrState],
          icon: {
            ...buttonAttrs?.[attrBreakpoint]?.[attrState]?.icon,
            settings: parentButtonAttr?.icon?.settings,
          },
        };
      }
    });
  });

  return {
    ...decorationAttrs,
    button: buttonAttrs,
  };
};
