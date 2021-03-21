const expect_ = require('../build/expect').expect;

describe('Test expect.js', () => {
  test('Expect a value to equal something', () => {
    expect(() => {
      expect_('').toEqual('');
    }).not.toThrowError();

    expect(() => {
      expect_('').not.toEqual('');
    }).toThrowError();

    expect(() => {
      expect_('').toEqual(10);
    }).toThrowError();

    expect(() => {
      expect_('').not.toEqual(10);
    }).not.toThrowError();
  });

  test('Expect a number to equal a parsed string', () => {
    expect(() => {
      expect_('10').toEqual(10);
    }).not.toThrowError();
  });

  test('Expect a value as an object to fulfil a condition', () => {
    const value = 10;

    expect(() => {
      expect_({ value }).toEqual(value);
    }).not.toThrowError();
  });

  test('Expect a value to be something', () => {
    expect(() => {
      expect_('').toBe('');
    }).not.toThrowError();

    expect(() => {
      expect_('').not.toBe('');
    }).toThrowError();

    expect(() => {
      expect_('').toBe(10);
    }).toThrowError();

    expect(() => {
      expect_('').not.toBe(10);
    }).not.toThrowError();
  });

  test('Expect a number not to be a parsed string', () => {
    expect(() => {
      expect_('10').not.toBe(10);
    }).not.toThrowError();
  });

  test('Expect to throw an error when inputting an empty object', () => {
    expect(() => {
      expect_({});
    }).toThrowError();
  });

  test('Expect a number to be a number', () => {
    expect(() => {
      expect_(10).toBeNumber();
    }).not.toThrowError();

    expect(() => {
      expect_(10).not.toBeNumber();
    }).toThrowError();

    expect(() => {
      expect_('10').toBeNumber();
    }).toThrowError();

    expect(() => {
      expect_('10').not.toBeNumber();
    }).not.toThrowError();
  });

  test('Expect a string to be a string', () => {
    expect(() => {
      expect_('').toBeString();
    }).not.toThrowError();

    expect(() => {
      expect_('').not.toBeString();
    }).not.toThrowError();

    expect(() => {
      expect_(0).toBeString();
    }).toThrowError();

    expect(() => {
      expect_(0).not.toBeString();
    }).not.toThrowError();
  });
});
