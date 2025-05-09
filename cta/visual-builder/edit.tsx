import React, {
  type ReactElement,
  useRef,
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
  isFirst,
  isLast,
  name,
  elements,
}: CtaEditProps): ReactElement => {
  const ctaRef = useRef(null);

  return (
    <ModuleContainer
      attrs={attrs}
      domRef={ctaRef}
      elements={elements}
      id={id}
      isFirst={isFirst}
      isLast={isLast}
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
};

export {
  CtaEdit,
};
