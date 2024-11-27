import { select } from '@divi/data';
import {
  type Module,
  type SliderAttrs,
} from '@divi/types';

/**
 * Determine whether text overlay color field should be visible or not.
 *
 * @since ??
 *
 * @param {Module.Settings.Field.CallbackParams<SliderAttrs>} params Function parameters.
 *
 * @returns {boolean}
 */
export const onUseTextOverlay = (params: Module.Settings.Field.CallbackParams<SliderAttrs>): boolean => {
  const isActivePreset = select('divi/global-data').isActivePreset();

  if (isActivePreset) {
    return true;
  }

  const { attrs } = params;

  const useOverlay = attrs?.children?.contentOverlay?.advanced?.use?.desktop?.value;

  return 'on' === useOverlay;
};