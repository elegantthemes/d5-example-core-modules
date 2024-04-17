import React, { type ReactElement } from 'react';
import {
  compact,
  includes,
  trim,
} from 'lodash';

import { type Props } from './types';


/**
 * Pricing List component to process content of pricing table.
 *
 * @since ??
 *
 * @param {object} props React component props.
 * @param {string} props.content Content of pricing table.
 *
 * @returns {ReactElement} List of pricing list items.
 */
export const PricingList = ({ content = '' }: Props): ReactElement => {
  const contentProcessed = content.toString().replace(/<p>/g, '\n').replace(/<\/p>/g, '\n').replace(/<br>/g, '\n')
    .replace(/<br\s*\/>/g, '\n');
  const listItems        = compact(contentProcessed.split('\n'));

  return (
    <ul className="et_pb_pricing">
      {
        listItems.map((listItem, index): ReactElement => {
          const listItemTrimmed = trim(listItem);
          if ('' === listItemTrimmed) {
            return null;
          }
          const plusMinus   = listItemTrimmed.substr(0, 1);
          const listContent = includes(['-', '+'], plusMinus) ? listItemTrimmed.substr(1) : listItemTrimmed;
          const itemKey     = `${index}`;

          if ('-' === listItemTrimmed.substr(0, 1)) {
            return (
              <li key={itemKey} className="et_pb_not_available">
                <span>{listContent}</span>
              </li>
            );
          }

          return (
            <li key={itemKey}>
              <span>{listContent}</span>
            </li>
          );
        })
      }
    </ul>
  );
};
