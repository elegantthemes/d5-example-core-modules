import { type DeclarationFunctionProps } from '@divi/module';
import { StyleDeclarations } from '@divi/style-library';

/**
 * Style declaration for Pricing Tables Module If it has drop shadow set.
 *
 * @since ??
 *
 * @returns {string}
 */
export const pricingTableDropShadowStyleDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<string>): string => {
  const declarations = new StyleDeclarations({
    returnType: 'string',
    important:  false,
  });

  if ('off' === attrValue) {
    declarations.add('-moz-box-shadow', 'none');
    declarations.add('-webkit-box-shadow', 'none');
    declarations.add('box-shadow', 'none');
  }

  return declarations.value as string;
};
