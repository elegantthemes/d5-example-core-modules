import { type DeclarationFunctionProps } from '@divi/module';
import { StyleDeclarations } from '@divi/style-library';
import { type Module } from '@divi/types';

/**
 * Style declaration for toggle open overlay sizing.
 *
 * @since ??
 *
 * @param {DeclarationFunctionProps<Module.Element.Decoration.Icon.AttributeValue>} param0 Style declaration params.
 *
 * @returns {string}
 */
export const toggleOpenOverlaySizingStyleDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<Module.Element.Decoration.Icon.AttributeValue>): string => {
  const { useSize, size } = attrValue;

  const declarations = new StyleDeclarations({
    returnType: 'string',
    important:  false,
  });

  if ('on' === useSize && size) {
    declarations.add('width', size);
    declarations.add('height', size);
  }

  return declarations.value as string;
};
