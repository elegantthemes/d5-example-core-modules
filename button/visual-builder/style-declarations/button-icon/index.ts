import {
  type ButtonIconStyleDeclarationParams,
  StyleDeclarations,
} from '@divi/style-library';


/**
 * Generate a style declaration for a button's icon.
 *
 * @since ??
 *
 * @param {object} params Parameters for generating the style declaration.
 * @param {object} params.attrValue The value of the attribute.
 *
 * @returns {string} The generated style declaration for the button's icon.
 */
export const buttonIconStyleDeclaration = ({
  attrValue,
}: ButtonIconStyleDeclarationParams): string => {
  const placement = attrValue?.icon?.placement;

  const declarations = new StyleDeclarations({
    returnType: 'string',
    important:  {
      'margin-left': true,
      'font-size':   true,
      'line-height': true,
    },
  });

  const marginLeft = 'left' === placement ? '-1.3em' : '.3em';

  // Checking if the icon is enabled.
  // It is important to check this because sometimes we are getting different values for the icon settings.
  // As a result, placement right value always is applied.
  if ('on' === attrValue?.enable) {
    declarations.add('margin-left', marginLeft);
  }
  declarations.add('font-size', 'inherit');
  declarations.add('line-height', 'inherit');

  return declarations.value as string;
};
