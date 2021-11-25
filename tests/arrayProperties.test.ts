import { suite, test } from '@testdeck/mocha';
import { expect } from 'chai';
import '../src/arrayProperties';

@suite
class ArrayPropertiesTest {
  @test('array.first should return the first element of an array')
  first() {
    expect([10, 20, 30].first).to.equal(10);
    expect(['foo', 'bar', 'baz'].first).to.equal('foo');
  }

  @test('array.first on an empty array should return undefined')
  firstOnEmptyArray() {
    expect([].first).to.be.undefined;
  }
  @test('array.last should return the last element of an array')
  last() {
    expect([10, 20, 30].last).to.equal(30);
    expect(['foo', 'bar', 'baz'].last).to.equal('baz');
  }

  @test('array.last on an empty array should return undefined')
  lastOnEmptyArray() {
    expect([].last).to.be.undefined;
  }

  @test('array.random should return an element of the given array')
  random() {
    const array = ['foo', 'bar', 'baz'];
    for (let i = 0; i < 20; i++) {
      const element = array.random;
      expect(array).to.include(element);
    }
  }

  @test('array.random on an empty array should return undefined')
  randomOnEmptyArray() {
    expect([].random).to.be.undefined;
  }
}
