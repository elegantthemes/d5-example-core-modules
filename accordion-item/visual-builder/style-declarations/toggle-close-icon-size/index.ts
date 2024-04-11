import { numericParseValue } from '@divi/field-library';
import { type DeclarationFunctionProps } from '@divi/module';
import { StyleDeclarations } from '@divi/style-library';
import { type Module } from '@divi/types';

import metadata from '../../module.json';


/**
 * Style declaration for toggle close icon size.
 *
 * @since ??
 *
 * @param {DeclarationFunctionProps<Module.Element.Decoration.Icon.AttributeValue>} param0 Style declaration params.
 *
 * @returns {string}
 */
export const toggleCloseIconSizeStyleDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<Module.Element.Decoration.Icon.AttributeValue>): string => {
  const { useSize, size } = attrValue;

  const declarations = new StyleDeclarations({
    returnType: 'string',
    important:  {
      right: false,
    },
  });

  if ('on' === useSize && size) {
    const iconSize        = numericParseValue(size);
    const defaultIconSize = numericParseValue(
      metadata?.attributes?.closedToggleIcon?.defaultPrintedStyle?.decoration?.icon?.desktop?.value?.size,
    );
    const sizeDiff        = defaultIconSize.valueNumber - iconSize.valueNumber;
    declarations.add('right', `${0 !== sizeDiff ? Math.round(sizeDiff / 2) : 0}${iconSize.valueUnit}`);
  }

  return declarations.value as string;
};
