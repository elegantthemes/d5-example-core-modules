import React, { type ReactElement } from 'react';

import { __ } from '@wordpress/i18n';

import { getAttrByMode } from '@divi/module-utils';

import { type ReadMoreProps } from './types';

/**
 * Read more component for the Blog module.
 *
 * @since ??
 *
 * @param {ReadMoreProps} props Read more component props.
 *
 * @returns {ReactElement}
 */
const ReadMore = ({ post, enable }: ReadMoreProps): ReactElement => (
  <React.Fragment>
    {
        'on' === getAttrByMode(enable) && (
          <a href={post.permalink} className="more-link">{__('read more', 'et_builder')}</a>
        )
      }
  </React.Fragment>
);

export {
  ReadMore,
};
