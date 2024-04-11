import { type DeclarationFunctionProps } from '@divi/module';
import { StyleDeclarations } from '@divi/style-library';


/**
 * Style declaration for blurb's image/icon width.
 *
 * @since ??
 *
 * @param {DeclarationFunctionProps<{icon?: string; image?: string}>} param0 Style declaration parameters.
 *
 * @returns {string}
 */
export const iconWidthStyleDeclaration = (
  { attrValue }: DeclarationFunctionProps<{icon?: string; image?: string}>): string => {
  const declarations = new StyleDeclarations({
    returnType: 'string',
    important:  false,
  });

  if (attrValue?.icon) {
    declarations.add('font-size', attrValue?.icon);
  }

  return declarations.value as string;
};
