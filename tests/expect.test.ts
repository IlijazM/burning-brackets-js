const _expect = require('../build/expect').expect;

describe('Test expect.js', () => {
  test('Expect a number to be a number', () => {
    const number = 10;

    expect(() => {
      _expect({ number }).toBeNumber();
    }).not.toThrowError();
  });

  test('Expect a string not to be a number', () => {
    const string = '';

    expect(() => {
      _expect({ string }).not.toBeNumber();
    }).not.toThrowError();
  });
});
