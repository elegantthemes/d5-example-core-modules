import {
  escapeFontIcon,
  isFaIcon,
  processFontIcon,
} from '@divi/icon-library';
import { type DeclarationFunctionProps } from '@divi/module';
import { StyleDeclarations } from '@divi/style-library';
import { type Module } from '@divi/types';


/**
 * Style declaration for toggle close icon.
 *
 * @since ??
 *
 * @param {DeclarationFunctionProps<Module.Element.Decoration.Icon.AttributeValue>} param0 Style declaration params.
 *
 * @returns {string}
 */
export const toggleCloseIconStyleDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<Module.Element.Decoration.Icon.AttributeValue>): string => {
  const declarations = new StyleDeclarations({
    returnType: 'string',
    important:  {
      'font-family': true,
      'font-weight': true,
      content:       true,
    },
  });

  const {
    color,
    weight,
  } = attrValue;

  if (color) {
    declarations.add('color', color);
  }

  const fontIcon = processFontIcon(attrValue);

  if (fontIcon) {
    const fontFamily = isFaIcon(attrValue) ? 'FontAwesome' : 'ETmodules';
    declarations.add('content', `'${escapeFontIcon(fontIcon)}'`);
    declarations.add('font-family', `"${fontFamily}"`);
    declarations.add('font-weight', weight);
  }

  return declarations.value as string;
};
