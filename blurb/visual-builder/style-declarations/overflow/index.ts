import { type DeclarationFunctionProps } from '@divi/module';
import { type Module } from '@divi/types';


/**
 * Sets the overflow style declaration for Blurb module when border radius used.
 *
 * @since ??
 *
 * @param {DeclarationFunctionProps<Module.Element.Decoration.Border.AttributeValue>} param0 Style declaration params.
 *
 * @returns {string}
 */
export const overflowStyleDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<Module.Element.Decoration.Border.AttributeValue>): string => {
  const { radius } = attrValue;

  return radius ? 'overflow: hidden;' : '';
};
