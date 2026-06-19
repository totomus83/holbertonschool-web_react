import { getCurrentYear, getFooterCopy, getLatestNotification } from './utils';

describe('getCurrentYear', () => {
  it('Should return the correct current year', () => {
    expect(getCurrentYear()).toBe(new Date().getFullYear());
  });
});

describe('getFooterCopy', () => {
  it('Should return the correct string when argument is true', () => {
    expect(getFooterCopy(true)).toEqual('Holberton School');
  });

  it('Should return the correct string when argument is false', () => {
    expect(getFooterCopy(false)).toEqual('Holberton School main dashboard');
  });
});

describe('getLatestNotification', () => {
  it('Should return the correct notification string', () => {
    expect(getLatestNotification()).toEqual('<strong>Urgent requirement</strong> - complete by EOD');
  });
});
