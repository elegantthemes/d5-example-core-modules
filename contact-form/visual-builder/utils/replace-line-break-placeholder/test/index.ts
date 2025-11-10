import { replaceLineBreakPlaceholder } from '..';


describe('replaceLineBreakPlaceholder', () => {
  it('should replaces the line break placeholder in a string with the actual line break characters', () => {
    expect(replaceLineBreakPlaceholder('This is a test||et_pb_line_break_holder||This is a test')).toBe('This is a test\r\nThis is a test');
  });
  it('should replaces all the line break placeholder in a string with the actual line break characters', () => {
    expect(replaceLineBreakPlaceholder('This is a test||et_pb_line_break_holder||This is a test||et_pb_line_break_holder||This is a test')).toBe('This is a test\r\nThis is a test\r\nThis is a test');
  });
});
