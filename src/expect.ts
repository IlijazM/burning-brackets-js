/**
 * Defines how an expect condition should look like.
 */
interface IExpectCondition {
  /**
   * The name of the expect condition.
   *
   * <p>
   * Will get used like the following:
   * </p>
   *
   * ```javascript
   * expect({ variable }).conditionName();
   * ```
   */
  name: string;

  /**
   * The condition.
   *
   * @param inputVariable the value of the variable inputed in the expect function directly.
   *
   * <p>
   * The input variable occures right in the expect condition.
   * </p>
   *
   * ```javascript
   * expect({ theInputVariable })
   * ```
   *
   * @param compareVariable the values of the variables inputed in the expect condition function.
   *
   * <p>
   * The input variable appears right here:
   * </p>
   *
   * ```javascript
   * expect({ variable }).toBe(theCompareVariable)
   * ```
   *
   * @return true, if the expected behaviour occurs.
   */
  condition: (inputVariable: any, ...compareVariable: any) => boolean;

  /**
   * The message that gets thrown when the expected condition doesn't occure.
   *
   * <p>
   * The following possible prefixes that could get appended before the failure message:
   * </p>
   *
   * <ul>
   * <li> Expected {varName} </li>
   * <li> Expected {varName} not </li>
   * </ul>
   *
   * <p>
   * So your failure message should get prepared for this cases like this example:
   * </p>
   *
   * <pre>
   * Expected variable to be an integer.
   * </pre>
   *
   * <p>
   * Don't include a period at the end of the sentence. This will get generated automatically for you.
   * </p>
   *
   * @param compareValue the compare variable used in the condition.
   *
   * @return the failure message.
   */
  getFailureMessage: (compareValue: any) => string;
}

/**
 * Stores all expect conditions including the currently using variable value and the variables
 * name.
 */
let expectConditions: Record<string, any> = {
  /**
   * The value of the currently used variable to assert.
   */
  inputVariable: null,

  /**
   * The name of the currently used variable to assert.
   */
  varName: null,

  /**
   * Declares the not structure.
   */
  not: {},
};

/**
 * Asserts a variable with an `expect` statement. If the assert conditions fail, an error gets thrown,
 * explaining what assertion failed.
 *
 * <p>
 * It tries to sound like a spoken assertion when e.g.:
 * </p>
 *
 * ```js
 * expect({ myVariable }).toBeNull();
 * ```
 *
 * @param variable the variables wrapped in a single object that gets asserted or the variable it self.
 *
 * <p>
 * This however will cause issues if you try to enter an object with excactly one key.
 * </p>
 */
export function expect(variable: Record<string, any> | any) {
  const keys = Object.keys(variable);

  if (typeof variable !== 'object' || keys.length > 1) {
    expectConditions.inputVariable = variable;
    expectConditions.varName = 'a variable';
  } else {
    if (keys.length <= 0) {
      throw new Error('Expected a variable. Got none');
    }

    expectConditions.inputVariable = variable[keys[0]];
    expectConditions.varName = `'${keys[0]}'`;
  }

  return expectConditions;
}

/**
 * Adds an expect condition.
 *
 * <p>
 * Also handles all other statement cases like ``not``.
 * </p>
 *
 * @requires condition to not be null
 * @requires condition to not have a name that is set in `expectConditions` already.
 *
 * @param condition the expect condition to add.
 */
function addExpectCondition(condition: IExpectCondition) {
  expectConditions[condition.name] = (compareVariable: any) => {
    if (!condition.condition(expectConditions.inputVariable, compareVariable) === true) {
      throw new Error(`Expected ${expectConditions.varName} ${condition.getFailureMessage(compareVariable)}`);
    }
  };
  expectConditions.not[condition.name] = (compareVariable: any) => {
    if (condition.condition(expectConditions.inputVariable, compareVariable) === true) {
      throw new Error(`Expected ${expectConditions.varName} not ${condition.getFailureMessage(compareVariable)}`);
    }
  };
}

addExpectCondition({
  name: 'toEqual',
  condition(inputVariable: any, compareVariable: any) {
    return inputVariable == compareVariable;
  },
  getFailureMessage: (compareVariable) => `to equal '${compareVariable}'`,
});
addExpectCondition({
  name: 'toBe',
  condition(inputVariable: any, compareVariable: any) {
    return inputVariable === compareVariable;
  },
  getFailureMessage: (compareVariable) => `to be '${compareVariable}'`,
});

addExpectCondition({
  name: 'toBeNumber',
  condition(inputVariable: any, compareVariable: any) {
    return typeof inputVariable === 'number';
  },
  getFailureMessage: () => 'to be a number',
});
addExpectCondition({
  name: 'toBeInteger',
  condition(inputVariable: any, compareVariable: any) {
    return Number.isInteger(inputVariable);
  },
  getFailureMessage: () => 'to be an integer',
});
addExpectCondition({
  name: 'toBeFinite',
  condition(inputVariable: any, compareVariable: any) {
    return Number.isFinite(inputVariable);
  },
  getFailureMessage: () => 'to be finite',
});
addExpectCondition({
  name: 'toBeNaN',
  condition(inputVariable: any, compareVariable: any) {
    return Number.isNaN(inputVariable);
  },
  getFailureMessage: () => 'to be finite',
});
addExpectCondition({
  name: 'toBePositive',
  condition(inputVariable: any, compareVariable: any) {
    return inputVariable >= 0;
  },
  getFailureMessage: () => 'to be positive',
});
addExpectCondition({
  name: 'toBeNegative',
  condition(inputVariable: any, compareVariable: any) {
    return inputVariable <= 0;
  },
  getFailureMessage: () => 'to be positive',
});
addExpectCondition({
  name: 'toBeEven',
  condition(inputVariable: any, compareVariable: any) {
    return inputVariable % 2 == 0;
  },
  getFailureMessage: () => 'to be even',
});
addExpectCondition({
  name: 'toBeOdd',
  condition(inputVariable: any, compareVariable: any) {
    return inputVariable % 2 == 1;
  },
  getFailureMessage: () => 'to be odd',
});
addExpectCondition({
  name: 'toBeDivisibleWith',
  condition(inputVariable: any, compareVariable: any) {
    return inputVariable % compareVariable == 0;
  },
  getFailureMessage: (compareVariable) => `to be divisible with ${compareVariable}`,
});
addExpectCondition({
  name: 'toBeString',
  condition(inputVariable: any, compareVariable: any) {
    return typeof inputVariable === 'string';
  },
  getFailureMessage: () => 'to be a string',
});
addExpectCondition({
  name: 'toStartWith',
  condition(inputVariable: string, compareVariable: string) {
    return inputVariable.startsWith(compareVariable);
  },
  getFailureMessage: (compareVariable) => `to start with '${compareVariable}'`,
});
addExpectCondition({
  name: 'toEndWith',
  condition(inputVariable: string, compareVariable: string) {
    return inputVariable.endsWith(compareVariable);
  },
  getFailureMessage: (compareVariable) => `to end with '${compareVariable}'`,
});
addExpectCondition({
  name: 'toIncludes',
  condition(inputVariable: string, compareVariable: string) {
    return inputVariable.includes(compareVariable);
  },
  getFailureMessage: (compareVariable) => `to includes '${compareVariable}'`,
});
addExpectCondition({
  name: 'toMatch',
  condition(inputVariable: string, compareVariable: RegExp) {
    return compareVariable.test(inputVariable);
  },
  getFailureMessage: (compareVariable) => `to match '${compareVariable}'`,
});
addExpectCondition({
  name: 'toBeBoolean',
  condition(inputVariable: any, compareVariable: any) {
    return typeof inputVariable === 'boolean';
  },
  getFailureMessage: () => 'to be a boolean',
});
addExpectCondition({
  name: 'toBeTrue',
  condition(inputVariable: any, compareVariable: any) {
    return inputVariable === true;
  },
  getFailureMessage: () => 'to be true',
});
addExpectCondition({
  name: 'toBeFalse',
  condition(inputVariable: any, compareVariable: any) {
    return inputVariable === false;
  },
  getFailureMessage: () => 'to be false',
});
addExpectCondition({
  name: 'toBeTruthy',
  condition(inputVariable: any, compareVariable: any) {
    return !!inputVariable;
  },
  getFailureMessage: () => 'to be truthy',
});
addExpectCondition({
  name: 'toBeNull',
  condition(inputVariable: any, compareVariable: any) {
    return inputVariable === null;
  },
  getFailureMessage: () => 'to be null',
});
addExpectCondition({
  name: 'toBeUndefined',
  condition(inputVariable: any, compareVariable: any) {
    return inputVariable === undefined;
  },
  getFailureMessage: () => 'to be undefined',
});
addExpectCondition({
  name: 'toBeNullish',
  condition(inputVariable: any, compareVariable: any) {
    return inputVariable == null;
  },
  getFailureMessage: () => 'to be nullish',
});

addExpectCondition({
  name: 'toBeTheLength',
  condition(inputVariable: any, compareVariable: number) {
    return inputVariable.length == compareVariable;
  },
  getFailureMessage: (compareVariable: number) => `to be the length of ${compareVariable}`,
});

// Export it globally
try {
  window['expect'] = expect;
} catch {}
