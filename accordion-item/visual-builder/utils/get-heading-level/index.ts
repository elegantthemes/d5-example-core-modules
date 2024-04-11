import {
  mergeAttrs,
} from '@divi/module-utils';
import {
  type AccordionAttrs,
  type AccordionItemAttrs,
  type Module,
} from '@divi/types';


/**
 * Determine the heading level for an accordion item based on its attributes and the parent attributes.
 *
 * - If heading level is set in the module, use it.
 * - If heading level is set in the parent module, use it.
 * - If heading level is not set, use h5.
 *
 * @param {object} attrs Module attributes.
 * @param {object} parentAttrs Parent module attributes.
 *
 * @returns {string} Heading level.
 */
export const getHeadingLevel = (attrs:AccordionItemAttrs, parentAttrs:AccordionAttrs):Module.Element.Decoration.Font.AttributeValue['headingLevel'] => {
  const mergedAttrs = mergeAttrs({
    defaultAttrs: parentAttrs?.title?.decoration?.font?.font,
    attrs:        attrs.title?.decoration?.font?.font,
  });

  const headingLevel = mergedAttrs?.desktop?.value?.headingLevel;

  if (! headingLevel || ! ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(headingLevel)) {
    return 'h5';
  }

  return headingLevel;
};
