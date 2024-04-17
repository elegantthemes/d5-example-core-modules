import React, {
  type ReactElement,
} from 'react';

import {
  ChildModulesContainer,
  ModuleContainer,
} from '@divi/module';

import { moduleClassnames } from './module-classnames';
import { ModuleScriptData } from './module-script-data';
import { ModuleStyles } from './module-styles';
import { type PricingTablesEditProps } from './types';
import {
  getFeaturedPricingTablesClassname,
} from './utils';

/**
 * Pricing Tables component of visual builder.
 *
 * @since ??
 *
 * @param {PricingTablesEditProps} props React component props.
 *
 * @returns {ReactElement}
 */
export const PricingTablesEdit = ({
  attrs,
  id,
  name,
  childrenIds,
  elements,
  defaultPrintedStyleAttrs,
}: PricingTablesEditProps): ReactElement => {
  // Get classname based upon children's featured pricing table status.
  const featuredPricingTablesClassname = getFeaturedPricingTablesClassname(childrenIds);
  return (
    <ModuleContainer
      attrs={attrs}
      elements={elements}
      defaultPrintedStyleAttrs={defaultPrintedStyleAttrs}
      classnamesFunction={moduleClassnames}
      className={featuredPricingTablesClassname}
      childrenIds={childrenIds}
      id={id}
      name={name}
      stylesComponent={ModuleStyles}
      scriptDataComponent={ModuleScriptData}
      cssPosition="before"
    >
      {elements.styleComponents({
        attrName: 'module',
      })}
      <div className="et_pb_pricing_table_wrap">
        <ChildModulesContainer ids={childrenIds} />
      </div>
    </ModuleContainer>
  );
};
