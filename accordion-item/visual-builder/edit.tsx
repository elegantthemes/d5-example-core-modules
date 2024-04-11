import React, {
  type ReactElement,
} from 'react';

import {
  ModuleContainer,
} from '@divi/module';

import { moduleClassnames } from './module-classnames';
import { ModuleStyles } from './module-styles';
import { type AccordionItemEditProps } from './types';
import { getHeadingLevel } from './utils';

/**
 * Toggle component of visual builder.
 *
 * @since ??
 *
 * @param {AccordionItemEditProps} props React component props.
 *
 * @returns {ReactElement}
 */
const AccordionItemEdit = ({
  attrs,
  defaultPrintedStyleAttrs,
  id,
  name,
  parentAttrs,
  elements,
}: AccordionItemEditProps): ReactElement => {
  const headingLevel = getHeadingLevel(attrs, parentAttrs);

  return (
    <ModuleContainer
      attrs={attrs}
      elements={elements}
      defaultPrintedStyleAttrs={defaultPrintedStyleAttrs}
      parentAttrs={parentAttrs}
      id={id}
      name={name}
      stylesComponent={ModuleStyles}
      classnamesFunction={moduleClassnames}
    >
      {elements.styleComponents({
        attrName: 'module',
      })}
      {elements.render({
        attrName: 'title',
        tagName:  headingLevel,
      })}
      {/* @todo: toggle overlay for icon quick access. */}
      {elements.render({
        attrName: 'content',
      })}
    </ModuleContainer>
  );
};

export {
  AccordionItemEdit,
};
