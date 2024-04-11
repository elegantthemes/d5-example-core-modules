import { type BlogFieldCallbackParams } from '../../types';

/**
 * Determines whether `Included Categories` field should be visible or not.
 *
 * @since ??
 *
 * @param {BlogFieldCallbackParams} params Function parameters.
 *
 * @returns {boolean}
 */
export const onOverlayEnabled = (params: BlogFieldCallbackParams): boolean => {
  const { attrs } = params;

  const overlayEnable = attrs?.overlay?.advanced?.enable?.desktop?.value;

  return 'on' === overlayEnable;
};
