import { escapeFontIcon, processFontIcon } from '@divi/icon-library';
import { type DeclarationFunctionProps } from '@divi/module';
import {
  StyleDeclarations,
} from '@divi/style-library';
import {
  type Module,
} from '@divi/types';


/**
 * Style declaration for button's icon.
 *
 * @since ??
 *
 * @param {DeclarationFunctionProps<string>} param0 Style declaration params.
 *
 * @returns {string}
 */
export const iconSpacingDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<
  Module.Element.Decoration.Button.AttributeValue & Module.Element.Decoration.Font.Attributes
>): string => {
  const iconSettings = attrValue?.icon?.settings;

  const declarations = new StyleDeclarations({
    returnType: 'string',
    important:  {
      'font-family': true,
      'font-size':   true,
    },
  });

  if (iconSettings?.type) {
    const fontFamily = 'fa' === iconSettings?.type ? 'FontAwesome' : 'ETmodules';
    declarations.add('font-family', `'${fontFamily}'`);
  }

  if (iconSettings?.weight) {
    declarations.add('font-weight', iconSettings.weight);
  }

  if (iconSettings?.unicode) {
    declarations.add('content', `'${escapeFontIcon(processFontIcon(iconSettings))}'`);
  }

  return declarations.value as string;
};
