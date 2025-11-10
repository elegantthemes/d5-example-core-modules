import {
  type ContactFormAttrs,
  type ModuleFlatObject,
} from '@divi/types';

import {
  contactFormModuleMetaData,
} from '../../module.json-source';

/**
 * Set unique ID for Contact Form modules.
 *
 * This filter callback handles automatic unique ID generation for Contact Form modules when they are
 * added or cloned in the Visual Builder. The unique ID is essential for third-party plugin compatibility
 * and consistent DOM element identification.
 *
 * ARCHITECTURAL RATIONALE:
 * This approach keeps the unique ID logic contained within the Contact Form module rather than adding
 * complexity to Divi's core module system. Since uniqueId is only used by Contact Form modules, it's
 * more efficient and maintainable to handle this feature-specific logic here rather than in the shared
 * module creation/duplication code that affects all modules.
 *
 * BENEFITS OF THIS APPROACH:
 * 1. **Module-Specific Logic Isolation**: Only Contact Form modules are affected, keeping core clean
 * 2. **Performance**: No overhead for other modules that don't need unique IDs
 * 3. **Maintainability**: Logic is co-located with the feature that uses it
 * 4. **Proper WordPress Filter Pattern**: Leverages established D5 extension mechanisms
 * 5. **Clean Separation**: Attribute initialization separate from rendering logic.
 *
 * IMPLEMENTATION DETAILS:
 * - Uses module's existing ID rather than generating new UUID (guaranteed unique, consistent with D4)
 * - Triggered by WordPress filters: 'divi.addModule.attrs' and 'divi.cloneModule.attrs'
 * - Sets uniqueId in module.advanced.uniqueId (persisted to database)
 * - Frontend rendering reads this stored value via edit.tsx and ContactFormModule.php
 * - Automatic and hidden from users (no UI input, completely managed by system).
 *
 * @since ??
 *
 * @param {ContactFormAttrs} attrs Module attributes.
 * @param {object} info Module info containing name and id.
 * @param {string} info.name Module name.
 * @param {string} info.parentId Parent module ID.
 * @param {Record<string, ModuleFlatObject<ContactFormAttrs>>} info.state Module state.
 * @param {string} info.id Module ID.
 * @returns {ContactFormAttrs} Updated attributes with uniqueId set to module ID.
 */
export const generateUniqueId = (
  attrs: ContactFormAttrs,
  info: {
    name: string,
    parentId: string,
    state: Record<string, ModuleFlatObject<ContactFormAttrs>>,
    id: string,
  },
): ContactFormAttrs => {
  const { name, id } = info;

  // Only apply to contact form modules
  if (contactFormModuleMetaData.name !== name) {
    return attrs;
  }

  // Set the unique ID to the module's ID
  return {
    ...attrs,
    module: {
      ...attrs?.module,
      advanced: {
        ...attrs?.module?.advanced,
        uniqueId: {
          desktop: {
            value: id,
          },
        },
      },
    },
  };
};
