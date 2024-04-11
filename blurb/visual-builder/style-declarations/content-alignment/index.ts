import { type DeclarationFunctionProps } from '@divi/module';


/**
 * Style declaration for blurb's content alignment.
 *
 * @since ??
 *
 * @param {DeclarationFunctionProps<string>} param0 Style declaration parameters.
 *
 * @returns {string}
 */
export const contentAlignmentStyleDeclaration = ({
  attrValue,
}: DeclarationFunctionProps<string>): string => (('center' !== attrValue) ? `text-align: ${attrValue};` : '');
