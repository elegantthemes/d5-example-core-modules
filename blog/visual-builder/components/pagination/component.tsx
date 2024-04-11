import React, {
  type MouseEvent,
  type ReactElement,
} from 'react';

import { __ } from '@wordpress/i18n';

import { getAttrByMode } from '@divi/module-utils';

import { type PaginationProps } from './types';

/**
 * Pagination component for the Blog module.
 *
 * @since ??
 *
 * @param {PaginationProps} props Pagination component props.
 *
 * @returns {ReactElement}
 */
const Pagination = ({ metadata, paged, enable, onChangePage }: PaginationProps): ReactElement => {
  const hasPrevPage   = paged < metadata.maxNumPages;
  const hasNextPage   = paged > 1 && paged <= metadata.maxNumPages;
  const hasWpPagenavi = metadata.wpPagenavi !== null;

  if ('on' !== getAttrByMode(enable)) {
    return null;
  }

  const handleNextPage = (event?: MouseEvent) => {
    event?.preventDefault();
    onChangePage(paged + 1);
  };

  const handlePreviousPage = (event?: MouseEvent) => {
    event?.preventDefault();
    onChangePage(paged - 1);
  };

  /**
   * Navigates WP-PageNavi plugin pagination.
   *
   * @param {HTMLDivElement} event OnClick Event.
   *
   * @returns {void}
   */
  const handleWpPagenaviPagination = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    const target = event.target as Element;

    const paginationLinks = target.querySelectorAll('.wp-pagenavi a');

    if (! paginationLinks) {
      return;
    }

    const isTargetNextLink = target.classList.contains('nextpostslink');
    const isTargetPrevLink = target.classList.contains('previouspostslink');

    if (isTargetNextLink) {
      handleNextPage();
    }

    if (isTargetPrevLink) {
      handlePreviousPage();
    }

    if (! isTargetNextLink && ! isTargetPrevLink) {
      onChangePage(parseInt(target.textContent, 10));
    }
  };

  return (
    <React.Fragment>
      {
        ! hasWpPagenavi && (
          <div className="pagination clearfix">
            {
              hasPrevPage && (
                <div className="alignleft">
                  <a
                    href="#prev"
                    aria-label={__('Previous Page', 'et_builder')}
                    onClick={handlePreviousPage}
                  >
                    {__('« Older Entries', 'et_builder')}
                  </a>
                </div>
              )
            }
            {
              hasNextPage && (
                <div className="alignright">
                  <a
                    href="#next"
                    aria-label={__('Next Page', 'et_builder')}
                    onClick={handleNextPage}
                  >
                    {__('Next Entries »', 'et_builder')}
                  </a>
                </div>
              )
            }
          </div>
        )
      }
      {
        hasWpPagenavi && (
          // eslint-disable-next-line max-len
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
          <div
            role="navigation"
            aria-label="Pagination Navigation"
            onClick={handleWpPagenaviPagination}
            // eslint-disable-next-line @typescript-eslint/naming-convention, react/no-danger
            dangerouslySetInnerHTML={{ __html: metadata?.wpPagenavi }}
          />
        )
      }
    </React.Fragment>
  );
};

export {
  Pagination,
};
