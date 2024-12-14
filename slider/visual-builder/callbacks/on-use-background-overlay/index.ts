import { select } from '@divi/data';
import {
  type Module,
  type SliderAttrs,
} from '@divi/types';


/**
 * Determine whether background overlay color field should be visible or not.
 *
 * @since ??
 *
 * @param {Module.Settings.Field.CallbackParams<SliderAttrs>} params Function parameters.
 *
 * @returns {boolean}
 */
export const onUseBackgroundOverlay = (params: Module.Settings.Field.CallbackParams<SliderAttrs>): boolean => {
  const isActivePreset = select('divi/global-data').isActivePreset();

  if (isActivePreset) {
    return true;
  }
  const { attrs } = params;

  const useOverlay = attrs?.children?.slideOverlay?.advanced?.use?.desktop?.value;

  return 'on' === useOverlay;
};
