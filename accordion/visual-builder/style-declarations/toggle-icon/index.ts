import { select } from '@divi/data';
import { numericParseValue } from '@divi/field-library';
import { type DeclarationFunctionProps } from '@divi/module';
import { StyleDeclarations } from '@divi/style-library';
import { type Module } from '@divi/types';

import { accordionModuleDefaultPrintedStyleAttributes } from '../../module-default-printed-style-attributes.json-source';

/**
 * Style declaration for accordion's toggle icon.
 *
 * @since ??
 *
 * @param {DeclarationFunctionProps<Module.Element.Decoration.Icon.AttributeValue>} param0 Style declaration params.
 *
 * @returns {string}
 */
export const toggleIconStyleDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<Module.Element.Decoration.Icon.AttributeValue>): string => {
  const {
    useSize,
    size: maybeGlobalVariableSize, // size can be $variable({"type":"content","value":{"name":"gvid-9xi2vm8gf9","settings":{}}})$ when a Global variable is used.
  } = attrValue;

  const declarations = new StyleDeclarations({
    returnType: 'string',
    important:  false,
  });

  let size = maybeGlobalVariableSize;

  if (maybeGlobalVariableSize?.startsWith('$variable')) {
    size = select('divi/global-data').getResolvedGlobalVariableValue(maybeGlobalVariableSize);
  }

  if ('on' === useSize && size) {
    // Determine if the size is a math function.
    // https://regex101.com/r/eHZbiF/1 - Regex.
    const isMathFn = (value: string | undefined | null): boolean =>  /^(clamp|min|max|calc)\s*\(/.test((value ?? '').trim());
    if (isMathFn(size)) {
      declarations.add('right', size);
    } else {
      const iconSize        = numericParseValue(size);
      const defaultIconSize = numericParseValue(
        accordionModuleDefaultPrintedStyleAttributes?.closedToggleIcon?.decoration?.icon?.desktop?.value?.size,
      );
      const sizeDiff        = defaultIconSize.valueNumber - iconSize.valueNumber;
      declarations.add('right', `${0 !== sizeDiff ? Math.round(sizeDiff / 2) : 0}${iconSize.valueUnit}`);
    }
  }

  return declarations.value as string;
};
