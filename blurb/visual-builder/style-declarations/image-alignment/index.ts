import { type DeclarationFunctionProps } from '@divi/module';


/**
 * Style declaration for blurb's image alignment.
 *
 * @since ??
 *
 * @param {DeclarationFunctionProps<string>} param0 Style declaration parameters.
 *
 * @returns {string}
 */
export const imageAlignmentStyleDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<string>): string => {
  switch (attrValue) {
    case 'left':
      return 'margin: auto auto auto 0;';
    case 'right':
      return 'margin: auto 0 auto auto;';
    default:
      return 'margin: auto;';
  }
};
