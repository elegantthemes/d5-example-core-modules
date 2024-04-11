import { type BlogFieldCallbackParams } from '../../types';

/**
 * Determines whether `Grid Tile Background Color` field should be visible or not.
 *
 * @since ??
 *
 * @param {BlogFieldCallbackParams} params Function parameters.
 *
 * @returns {boolean}
 */
export const onGridBackground = (params: BlogFieldCallbackParams): boolean => {
  const { attrs } = params;

  const fullwidth = attrs?.fullwidth?.advanced?.enable?.desktop?.value;

  return 'off' === fullwidth;
};
