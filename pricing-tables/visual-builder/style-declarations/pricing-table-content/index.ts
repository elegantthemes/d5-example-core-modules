import { type DeclarationFunctionProps } from '@divi/module';
import { StyleDeclarations } from '@divi/style-library';
import { type Module } from '@divi/types';


/**
 * Style declaration for Pricing Tables Module If it has body font text alignment set.
 *
 * @since ??
 *
 * @returns {string}
 */
export const pricingTableBodyContentStyleDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<Module.Element.Decoration.Font.AttributeValue>): string => {
  const { textAlign } = attrValue;

  const declarations = new StyleDeclarations({
    returnType: 'string',
    important:  false,
  });

  if ('center' === textAlign) {
    declarations.add('padding-left', '0px');
  }

  return declarations.value as string;
};
