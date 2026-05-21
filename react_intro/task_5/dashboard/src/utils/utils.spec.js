import { getCurrentYear, getFooterCopy, getLatestNotification } from '../utils/utils';

describe('utils functions', () => {

  test('getCurrentYear returns current year', () => {
    const year = new Date().getFullYear();
    expect(getCurrentYear()).toBe(year);
  });

  test('getFooterCopy returns correct string when true', () => {
    expect(getFooterCopy(true)).toBe('Holberton School');
  });

  test('getFooterCopy returns correct string when false', () => {
    expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
  });

  test('getLatestNotification returns correct string', () => {
    expect(getLatestNotification()).toBe(
      '<strong>Urgent requirement</strong> - complete by EOD'
    );
  });

});