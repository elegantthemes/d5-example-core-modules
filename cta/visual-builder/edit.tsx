import React, {
  type ReactElement,
} from 'react';

import {
  ModuleContainer,
} from '@divi/module';

import { moduleClassnames } from './module-classnames';
import { ModuleScriptData } from './module-script-data';
import { ModuleStyles } from './module-styles';
import { type CtaEditProps } from './types';

/**
 * Call To Action component of visual builder.
 *
 * @since ??
 *
 * @param {CtaEditProps} props React component props.
 *
 * @returns {ReactElement}
 */
const CtaEdit = ({
  attrs,
  id,
  name,
  elements,
}: CtaEditProps): ReactElement => (
  <ModuleContainer
    attrs={attrs}
    elements={elements}
    id={id}
    name={name}
    stylesComponent={ModuleStyles}
    scriptDataComponent={ModuleScriptData}
    classnamesFunction={moduleClassnames}
  >
    {elements.styleComponents({
      attrName: 'module',
    })}
    <div className="et_pb_promo_description">
      {elements.render({
        attrName: 'title',
      })}
      {elements.render({
        attrName: 'content',
      })}
    </div>
    {elements.render({
      attrName: 'button',
    })}
  </ModuleContainer>
);

export {
  CtaEdit,
};
