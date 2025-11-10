import {
  iconSpacingDeclaration,
} from '../index';
import testCases from './test-cases.json';


describe.each(testCases)('iconSpacingDeclaration()', ({ title, cases }) => {
  describe(title, () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore -- Fixtures is static JSON file.
    it.each(cases)('Test case index $#', ({ args, expected }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore -- Fixtures is static JSON file.
      expect(iconSpacingDeclaration(args)).toEqual(expected);
    });
  });
});
