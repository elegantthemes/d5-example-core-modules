import { registerSettingsStore } from '@divi/settings';

import { includedCategories } from '../index';


const originalDiviSettingsData = window?.DiviSettingsData;

beforeAll(() => {
  Object.defineProperty(window, 'DiviSettingsData', {
    value: {
      ...originalDiviSettingsData,
      taxonomy: {
        postCategories: [
          {
            term_id: 86,
            name:    'foo',
          },
          {
            term_id: 89,
            name:    'bar',
          },
        ],
      },
    },
    writable: true,
  });

  registerSettingsStore();
});

afterAll(() => {
  Object.defineProperty(window, 'DiviSettingsData', {
    value: originalDiviSettingsData,
  });
});


describe('includedCategories()', () => {
  it('should return an empty array when categories is an empty string', () => {
    const categories: string = '';
    expect(includedCategories(categories)).toEqual([]);
  });

  it('should return an empty array when categories does not contain any valid category', () => {
    const categories: string = 'invalid1, invalid2, invalid3';
    expect(includedCategories(categories)).toEqual([]);
  });

  it('should return an array with "all" when categories contain "all"', () => {
    const categories = 'all';
    expect(includedCategories(categories)).toEqual(['all']);
  });

  it('should return an array with "current" when categories contain "current"', () => {
    const categories = 'current';
    expect(includedCategories(categories)).toEqual(['current']);
  });

  it('should return an array of valid category IDs when categories contain valid categories', () => {
    const categories = '86,89';
    expect(includedCategories(categories)).toEqual(['86', '89']);
  });

  it('should return an array of valid category IDs when categories contain both valid and invalid categories', () => {
    const categories = '86,87,88,89';
    expect(includedCategories(categories)).toEqual(['86', '89']);
  });
});
