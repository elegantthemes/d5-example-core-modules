import {
  type ReactElement,
} from 'react';

import {
  type ModuleScriptDataProps,
} from '@divi/module';
import { type AccordionItemAttrs } from '@divi/types';


/**
 * Accordion item module's script data component.
 *
 * @since ??
 *
 * @returns {ReactElement}
 */
export const ModuleScriptData = ({
  elements,
}: ModuleScriptDataProps<AccordionItemAttrs>): ReactElement => elements.scriptData({
  attrName: 'module',
});
