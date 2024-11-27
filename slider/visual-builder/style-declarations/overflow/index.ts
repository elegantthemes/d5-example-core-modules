import { type DeclarationFunctionProps } from '@divi/module';
import { StyleDeclarations } from '@divi/style-library';
import { type Module } from '@divi/types';

/**
 * Style declaration for Slider Module element If it has border radius set.
 *
 * @since ??
 *
 * @returns {string}
 */
export const overflowStyleDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<Module.Element.Decoration.Border.AttributeValue>): string => {
  const { radius } = attrValue ?? {};

  if (! radius || 0 === Object.keys(radius).length) {
    return '';
  }

  let allCornersZero = true;

  // Check whether all corners are zero.
  // If any corner is not zero, update the variable and break the loop.
  Object.entries(radius).forEach(([corner, value]) => {
    if ('sync' === corner) {
      return;
    }

    const cornerValue = Number.parseFloat(value);
    if (0.0 !== cornerValue) {
      allCornersZero = false;
    }
  });

  const declarations = new StyleDeclarations({
    returnType: 'string',
    important:  false,
  });

  // If all corners are zero, return empty string.
  if (allCornersZero) {
    return '';
  }

  // Add overflow hidden when any corner's border radius is not zero.
  declarations.add('overflow', 'hidden');

  return declarations.value as string;
};
