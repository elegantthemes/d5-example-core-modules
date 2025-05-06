import { select } from '@divi/data';
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
    let iconWidth = attrValue.icon;

    if (iconWidth?.startsWith('$variable')) {
      iconWidth = select('divi/global-data').getResolvedGlobalVariableValue(iconWidth);
    }

    declarations.add('font-size', iconWidth);
  }

  return declarations.value as string;
};
