import React, { type ReactElement } from 'react';

import {
  ChildModulesContainer,
  ModuleContainer,
} from '@divi/module';

import { moduleClassnames } from './module-classnames';
import { ModuleScriptData } from './module-script-data';
import { ModuleStyles } from './module-styles';
import { type AccordionEditProps } from './types';

/**
 * Accordion component of visual builder.
 *
 * @since ??
 *
 * @param {AccordionEditProps} props React component props.
 *
 * @returns {ReactElement}
 */
const AccordionEdit = ({
  attrs,
  defaultPrintedStyleAttrs,
  id,
  name,
  childrenIds,
  elements,
}: AccordionEditProps): ReactElement => (
  <ModuleContainer
    attrs={attrs}
    elements={elements}
    defaultPrintedStyleAttrs={defaultPrintedStyleAttrs}
    id={id}
    name={name}
    stylesComponent={ModuleStyles}
    scriptDataComponent={ModuleScriptData}
    classnamesFunction={moduleClassnames}
  >
    {elements.styleComponents({
      attrName: 'module',
    })}
    <ChildModulesContainer
      ids={childrenIds}
    />
  </ModuleContainer>
);

export {
  AccordionEdit,
};
