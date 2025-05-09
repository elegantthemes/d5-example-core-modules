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
export const onAutomaticAnimation = (params: Module.Settings.Field.CallbackParams<SliderAttrs>): boolean => {
  const { attrs } = params;

  const auto = attrs?.module?.advanced?.auto?.desktop?.value;

  return 'on' === auto;
};
