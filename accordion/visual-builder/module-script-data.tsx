import {
  type ReactElement,
} from 'react';

import {
  type ModuleScriptDataProps,
} from '@divi/module';
import { type AccordionAttrs } from '@divi/types';


/**
 * Accordion module's script data component.
 *
 * @since ??
 *
 * @returns {ReactElement}
 */
export const ModuleScriptData = ({
  elements,
}: ModuleScriptDataProps<AccordionAttrs>): ReactElement => elements.scriptData({
  attrName: 'module',
});
