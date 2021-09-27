import { assert } from 'chai';
import { suite, test } from '@testdeck/mocha';
import * as chai from 'chai';
import { mock, instance } from 'ts-mockito';
import { typeOf } from '../src/typeOf';

chai.should();

@suite
class TypeOfTest {
  @test('Type of [] should be array')
  typeOfArray() {
    assert.equal(typeOf([]), 'array');
  }

  @test('Type of "" should be string')
  typeOfString() {
    assert.equal(typeOf(''), 'string');
  }

  @test('Type of undefined should be undefined')
  typeOfUndefined() {
    assert.equal(typeOf(undefined), 'undefined');
  }

  @test('Type of null should be null')
  typeOfNull() {
    assert.equal(typeOf(null), 'null');
  }

  @test('Type of 10 should be number')
  typeOfNumber() {
    assert.equal(typeOf(10), 'number');
  }

  @test('Type of a class should be class')
  typeOfClass() {
    class A {}
    assert.equal(typeOf(A), 'class');
  }

  @test('Type of a function should be function')
  typeOfFunction() {
    assert.equal(
      typeOf(() => {}),
      'function'
    );
  }
}
