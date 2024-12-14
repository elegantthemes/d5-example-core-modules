import { type DeclarationFunctionProps } from '@divi/module';
import { type Module } from '@divi/types';


/**
 * Style declaration for aligning button text.
 *
 * @since ??
 *
 * @param {DeclarationFunctionProps<Module.Element.Decoration.Button.AttributeValue>} param0 Style declaration params.
 *
 * @returns {string}
 */
export const buttonAlignmentStyleDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<Module.Element.Decoration.Button.AttributeValue>): string => {
  const { alignment } = attrValue;

  return alignment ? `text-align: ${alignment};` : '';
};
