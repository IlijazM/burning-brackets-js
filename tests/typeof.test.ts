import { assert } from 'chai';
import { suite, test } from '@testdeck/mocha';
import * as chai from 'chai';
import { mock, instance } from 'ts-mockito';
import typeOf from '../src/typeOf';

chai.should();

@suite
// @ts-ignore
class Hello {
  @test('Type of array should be array')
  typeOfArray() {
    assert.equal(typeOf([]), 'array');
  }
}
