import {
  type ButtonAlignmentDeclarationParams,
  StyleDeclarations,
} from '@divi/style-library';


/**
 * Button alignment.
 *
 * @since ??
 *
 * @param {object} params Parameters for generating Button alignment.
 * @param {object} params.attrValue The value of the attribute.
 *
 * @returns {string} The generated button alignment styles.
 */
export const buttonAlignmentDeclaration = ({
  attrValue,
}: ButtonAlignmentDeclarationParams): string => {
  const alignment = attrValue;

  const declarations = new StyleDeclarations({
    returnType: 'string',
    important:  false,
  });


  if (alignment) {
    switch (alignment) {
      case 'left':
        declarations.add('text-align', 'left');
        break;
      case 'center':
        declarations.add('text-align', 'center');
        break;
      case 'right':
        declarations.add('text-align', 'right');
        break;
      default:
        break;
    }
  }

  return declarations.value as string;
};
