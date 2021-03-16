const expect_ = require('../build/expect').expect;

describe('Test expect.js', () => {
  test('Expect a number to be a number', () => {
    const number = 10;

    expect(() => {
      expect_({ number }).toBeNumber();
    }).not.toThrowError();
  });

  test('Expect a string not to be a number', () => {
    const string = '';

    expect(() => {
      expect_({ string }).not.toBeNumber();
    }).not.toThrowError();
  });
});
