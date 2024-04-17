import { type DeclarationFunctionProps } from '@divi/module';
import { StyleDeclarations } from '@divi/style-library';
import { type Module } from '@divi/types';


/**
 * Style declaration for Pricing Tables Module If it has spacing set.
 *
 * @since ??
 *
 * @returns {string}
 */
export const pricingTableSpacingStyleDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<Module.Element.Decoration.Spacing.AttributeValue>): string => {
  const { padding } = attrValue;

  const declarations = new StyleDeclarations({
    returnType: 'string',
    important:  false,
  });

  if (padding) {
    declarations.add('padding-bottom', padding?.bottom);
  }

  return declarations.value as string;
};
