import {
  escapeFontIcon,
  processFontIcon,
} from '@divi/icon-library';
import { type DeclarationFunctionProps } from '@divi/module';
import { StyleDeclarations } from '@divi/style-library';
import { type Icon } from '@divi/types';


/**
 * Style declaration for blurb's icon.
 *
 * @since ??
 *
 * @param {DeclarationFunctionProps<Icon.Font.AttributeValue>} param0 Style declaration parameters.
 *
 * @returns {string}
 */
export const iconStyleDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<{icon?: Icon.Font.AttributeValue}>): string => {
  const declarations = new StyleDeclarations({
    returnType: 'string',
    important:  {
      'font-family': true,
    },
  });


  if (attrValue?.icon?.type) {
    const fontFamily = 'fa' === attrValue?.icon?.type ? 'FontAwesome' : 'ETmodules';
    declarations.add('font-family', `'${fontFamily}'`);
  }

  if (attrValue?.icon?.weight) {
    declarations.add('font-weight', attrValue?.icon?.weight);
  }

  if (attrValue?.icon?.unicode) {
    declarations.add('content', `'${escapeFontIcon(processFontIcon(attrValue?.icon))}'`);
  }

  return declarations.value as string;
};
