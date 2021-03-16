const typeOf = require('../build/typeOf').typeOf;

describe('Tests typeOf.js', function () {
  test('Typeof null', function () {
    expect(typeOf(null)).toEqual('null');
  });

  test('Typeof class', function () {
    class MyClass {}
    expect(typeOf(MyClass)).toEqual('class');
  });

  test('Typeof array', function () {
    expect(typeOf([])).toEqual('array');
  });

  test('Typeof object', function () {
    expect(typeOf({})).toEqual('object');
  });

  test('Typeof number', function () {
    expect(typeOf(0)).toEqual('number');
  });
});
