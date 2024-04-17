import React, {
  type ReactElement,
  useEffect,
  useRef,
} from 'react';
import {
  isEmpty,
} from 'lodash';

import {
  ModuleContainer,
} from '@divi/module';
import {
  getAttrByMode,
} from '@divi/module-utils';

import { moduleClassnames } from './module-classnames';
import { ModuleStyles } from './module-styles';
import { PricingList } from './pricing-list';
import { type PricingTableEditProps } from './types';

/**
 * Pricing Table component of visual builder.
 *
 * @since ??
 *
 * @param {PricingTableEditProps} props React component props.
 *
 * @returns {ReactElement}
 */
export const PricingTableEdit = ({
  attrs,
  id,
  name,
  elements,
  parentAttrs,
  defaultPrintedStyleAttrs,
}: PricingTableEditProps): ReactElement => {
  const per                = getAttrByMode(attrs?.currencyFrequency?.innerContent)?.per ?? '';
  const currency           = getAttrByMode(attrs?.currencyFrequency?.innerContent)?.currency ?? '';
  const content            = getAttrByMode(attrs?.content?.innerContent) ?? '';
  const parentHeadingLevel = getAttrByMode(parentAttrs?.title?.decoration?.font?.font)?.headingLevel ?? 'h2';
  let headingLevel         = getAttrByMode(attrs?.title?.decoration?.font?.font)?.headingLevel;
  headingLevel             = isEmpty(headingLevel) ? parentHeadingLevel : headingLevel;
  const mountedRef         = useRef(false);
  const pricingTableRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const $pricingTable = jQuery<HTMLElement>(pricingTableRef.current);

    if (! mountedRef.current) {
      setTimeout(() => {
        if ('function' === typeof window.et_fix_pricing_currency_position) {
          window.et_fix_pricing_currency_position($pricingTable);
        }
      }, 100);

      mountedRef.current = true;
    } else {
      // Only update Pricing Table DOM if currency has changed.
      setTimeout(() => {
        if ('function' === typeof window.et_fix_pricing_currency_position) {
          window.et_fix_pricing_currency_position($pricingTable);
        }
      }, 100);
    }
  }, [currency]);

  return (
    <ModuleContainer
      domRef={pricingTableRef}
      attrs={attrs}
      parentAttrs={parentAttrs}
      elements={elements}
      defaultPrintedStyleAttrs={defaultPrintedStyleAttrs}
      id={id}
      name={name}
      stylesComponent={ModuleStyles}
      hasModuleClassName={false}
      classnamesFunction={moduleClassnames}
    >
      {elements.styleComponents({
        attrName: 'module',
      })}
      <div className="et_pb_pricing_heading">
        {elements.render({
          attrName: 'title',
          tagName:  headingLevel,
        })}
        {elements.render({
          attrName: 'subtitle',
        })}
      </div>
      <div className="et_pb_pricing_content_top">
        <span className="et_pb_et_price">
          {elements.render({
            attrName:              'currencyFrequency',
            attrSubName:           'currency',
            inlineTextEditorProps: {
              className: 'et_pb_dollar_sign',
              tagName:   'span',
            },
          })}
          {elements.render({
            attrName: 'price',
          })}
          {
            ! isEmpty(per) && (
              <React.Fragment>
                <span className="et_pb_frequency"><span className="et_pb_frequency_slash">/</span></span>
                {elements.render({
                  attrName:              'currencyFrequency',
                  attrSubName:           'per',
                  inlineTextEditorProps: {
                    className: 'et_pb_frequency',
                    tagName:   'span',
                  },
                })}
              </React.Fragment>
            )
          }
        </span>
      </div>
      <div className="et_pb_pricing_content">
        <PricingList content={content} />
      </div>
      {elements.render({
        attrName: 'button',
      })}
    </ModuleContainer>
  );
};
