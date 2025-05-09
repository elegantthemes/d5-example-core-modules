import React, {
  type ReactElement,
} from 'react';

import {
  InnerMousetrap,
  ModuleContainer,
} from '@divi/module';

import { moduleClassnames } from './module-classnames';
import { ModuleScriptData } from './module-script-data';
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
  isLast,
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
      scriptDataComponent={ModuleScriptData}
      classnamesFunction={moduleClassnames}
      isLast={isLast}
    >
      <InnerMousetrap type="edited" />
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
