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
export const onCategoriesVisible = (params: BlogFieldCallbackParams): boolean => {
  const { attrs } = params;

  const postType = attrs?.post?.advanced?.type?.desktop?.value ?? 'post';

  return 'post' === postType;
};
