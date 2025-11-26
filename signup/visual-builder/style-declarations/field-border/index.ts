import { type DeclarationFunctionProps } from '@divi/module';
import { StyleDeclarations } from '@divi/style-library';
import { type Module } from '@divi/types';


/**
 * Style declaration for SignUp Module If it has border radius set.
 *
 * @since ??
 *
 * @returns {string}
 */
export const fieldBorderStyleDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<Module.Element.Decoration.Border.AttributeValue>): string => {
  const { radius } = attrValue;

  const declarations = new StyleDeclarations({
    returnType: 'string',
    important:  false,
  });

  if (radius) {
    declarations.add('overflow', 'hidden');
  }

  return declarations.value as string;
};
