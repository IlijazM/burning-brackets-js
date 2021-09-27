import { suite, test } from '@testdeck/mocha';
import { expect } from '../src/expect';
import chai from 'chai';

@suite
class ExpectTest {
  @test
  toEqual() {
    const number = 10;

    expect(number).toEqual(number);
    expect(number).toEqual(number.toString());

    this.throws(() => expect(number).not.toEqual(number));
    this.throws(() => expect(number).not.toEqual(number.toString()));
  }

  @test
  toBe() {
    const number = 10;

    expect(number).toBe(number);
    expect(number).not.toBe(number.toString());

    this.throws(() => expect(number).not.toBe(number));
    this.throws(() => expect(number).toBe(number.toString()));
  }

  @test
  toBeNumber() {
    const integer = 10;
    const double = 10.1;
    const string = '10';

    expect(integer).toBeNumber();
    expect(double).toBeNumber();
    expect(string).not.toBeNumber();
    expect(Infinity).toBeNumber();
    expect(-Infinity).toBeNumber();

    // This is controversial since NaN stands for not a number but typeof(NaN) is a number.
    expect(NaN).toBeNumber();

    this.throws(() => expect(integer).not.toBeNumber());
    this.throws(() => expect(double).not.toBeNumber());
    this.throws(() => expect(string).toBeNumber());
    this.throws(() => expect(Infinity).not.toBeNumber());
    this.throws(() => expect(-Infinity).not.toBeNumber());
    this.throws(() => expect(NaN).not.toBeNumber());
  }

  @test
  toBeInteger() {
    const integer = 10;
    const double = 10.1;
    const string = '10';

    expect(integer).toBeInteger();
    expect(double).not.toBeInteger();
    expect(string).not.toBeInteger();
    expect(Infinity).not.toBeInteger();
    expect(-Infinity).not.toBeInteger();
    expect(NaN).not.toBeInteger();

    this.throws(() => expect(integer).not.toBeInteger());
    this.throws(() => expect(double).toBeInteger());
    this.throws(() => expect(string).toBeInteger());
    this.throws(() => expect(Infinity).toBeInteger());
    this.throws(() => expect(-Infinity).toBeInteger());
    this.throws(() => expect(NaN).toBeInteger());
  }

  @test
  toBeFinite() {
    const finiteNumber = 10;
    const string = '10';

    expect(finiteNumber).toBeFinite();
    expect(string).not.toBeFinite();
    expect(Infinity).not.toBeFinite();
    expect(-Infinity).not.toBeFinite();
    expect(NaN).not.toBeFinite();

    this.throws(() => expect(finiteNumber).not.toBeFinite());
    this.throws(() => expect(string).toBeFinite());
    this.throws(() => expect(Infinity).toBeFinite());
    this.throws(() => expect(-Infinity).toBeFinite());
    this.throws(() => expect(NaN).toBeFinite());
  }

  @test
  toBeNaN() {
    const finiteNumber = 10;
    const string = '10';

    expect(finiteNumber).not.toBeNaN();
    expect(string).not.toBeNaN();
    expect(Infinity).not.toBeNaN();
    expect(-Infinity).not.toBeNaN();
    expect(NaN).toBeNaN();

    this.throws(() => expect(finiteNumber).toBeNaN());
    this.throws(() => expect(string).toBeNaN());
    this.throws(() => expect(Infinity).toBeNaN());
    this.throws(() => expect(-Infinity).toBeNaN());
    this.throws(() => expect(NaN).not.toBeNaN());
  }

  @test
  toBePositive() {
    const positiveNumber = 10;
    const negativeNumber = -10;

    expect(positiveNumber).toBePositive();
    expect(negativeNumber).not.toBePositive();
    expect(Infinity).toBePositive();
    expect(-Infinity).not.toBePositive();

    this.throws(() => expect(positiveNumber).not.toBePositive());
    this.throws(() => expect(negativeNumber).toBePositive());
    this.throws(() => expect(Infinity).not.toBePositive());
    this.throws(() => expect(-Infinity).toBePositive());
  }

  @test
  toBeNegative() {
    const positiveNumber = 10;
    const negativeNumber = -10;

    expect(positiveNumber).not.toBeNegative();
    expect(negativeNumber).toBeNegative();
    expect(Infinity).not.toBeNegative();
    expect(-Infinity).toBeNegative();

    this.throws(() => expect(positiveNumber).toBeNegative());
    this.throws(() => expect(negativeNumber).not.toBeNegative());
    this.throws(() => expect(Infinity).toBeNegative());
    this.throws(() => expect(-Infinity).not.toBeNegative());
  }

  @test
  toBeEven() {
    const eventNumber = 2;
    const oddNumber = 3;

    expect(eventNumber).toBeEven();
    expect(oddNumber).not.toBeEven();

    this.throws(() => expect(eventNumber).not.toBeEven());
    this.throws(() => expect(oddNumber).toBeEven());
  }

  @test
  toBeOdd() {
    const eventNumber = 2;
    const oddNumber = 3;

    expect(eventNumber).not.toBeOdd();
    expect(oddNumber).toBeOdd();

    this.throws(() => expect(eventNumber).toBeOdd());
    this.throws(() => expect(oddNumber).not.toBeOdd());
  }

  @test
  invalidInput() {
    this.throws(() => expect(undefined));
    this.throws(() => expect({}));
    this.throws(() => expect({ a: 10 }).toBeEqual(12));
  }

  private throws(fun) {
    chai.expect(fun).to.throw();
  }
}
