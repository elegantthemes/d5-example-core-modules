import {
  type ButtonIconStyleDeclarationParams,
  StyleDeclarations,
} from '@divi/style-library';


/**
 * Generate a style declaration for a button's spacing.
 *
 * @since ??
 *
 * @param {object} params Parameters for generating the style declaration.
 * @param {object} params.attrValue The value of the attribute.
 *
 * @returns {string} The generated style declaration for the button's spacing.
 */
export const buttonSpacingDeclaration = ({
  attrValue,
}: ButtonIconStyleDeclarationParams): string => {
  const iconShowOnHover =  'on' === attrValue?.icon?.onHover;

  const declarations = new StyleDeclarations({
    returnType: 'string',
    important:  false,
  });

  if (iconShowOnHover) {
    declarations.add('padding-left', '1em');
    declarations.add('padding-right', '1em');
  }

  return declarations.value as string;
};
