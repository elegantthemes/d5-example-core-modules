import React, { type ReactElement } from 'react';

import { processFontIcon } from '@divi/icon-library';
import { getAttrByMode } from '@divi/module-utils';

import { type PostThumbnailProps } from './types';

/**
 * Post thumbnail component for the Blog module.
 *
 * @since ??
 *
 * @param {PostThumbnailProps} props Post thumbnail component props.
 *
 * @returns {ReactElement}
 */
const PostThumbnail = ({ post, enable, showOverlay, overlayIcon }: PostThumbnailProps): ReactElement => {
  const isThumbnail = 'on' === getAttrByMode(enable);

  const iconValue = processFontIcon(overlayIcon);

  return (
    <React.Fragment>
      {
        post.thumbnail?.src && isThumbnail && (
          <a href={post.permalink} className="entry-featured-image-url">
            <img src={post?.thumbnail?.src} alt={post.thumbnail.alt} />
            {
              'on' === showOverlay && (
                <span className="et_overlay et_pb_inline_icon" data-icon={iconValue} />
              )
            }
          </a>
        )
      }
    </React.Fragment>
  );
};

export {
  PostThumbnail,
};
