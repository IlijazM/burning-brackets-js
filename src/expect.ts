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
   *  </p>
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
   */
  failureMessage: string;
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
 * Asserts a variable with expect conditions. If the assert conditions fail, an error gets thrown,
 * explaining what assertion failed.
 *
 * @param variables the variables wrapped in a single object that gets asserted.
 */
export const expect = (variables: Record<string, any>) => {
  if (typeof variables !== 'object') {
    throw new Error('Expected a variable as an object.');
  }

  const keys = Object.keys(variables);

  if (keys.length <= 0) {
    throw new Error('Expected a variable. Got none');
  }

  expectConditions.inputVariable = variables[keys[0]];
  expectConditions.varName = keys[0];
  return expectConditions;
};

/**
 * Adds an expect condition.
 *
 * <p>
 * Also handles all other statement cases like ``not``.
 * </p>
 *
 * @param condition the expect condition to add.
 */
function addExpectCondition(condition: IExpectCondition) {
  if (condition == null) {
    throw new Error('Failed adding a condition. The condition must not be null.');
  }

  if (['inputVariable', 'varName', 'not', 'either'].includes(condition.name)) {
    throw new Error(
      `Failed adding a condition. The conditions name must not be ${condition.name}.`
    );
  }
  expectConditions[condition.name] = (compareVariable: any) => {
    if (!condition.condition(expectConditions.inputVariable, compareVariable) === true) {
      throw new Error(`Expected ${expectConditions.varName} ${condition.failureMessage}`);
    }
  };
  expectConditions.not[condition.name] = (compareVariable: any) => {
    if (condition.condition(expectConditions.inputVariable, compareVariable) === true) {
      throw new Error(`Expected ${expectConditions.varName} not ${condition.failureMessage}`);
    }
  };
}

addExpectCondition({
  name: 'toBeNumber',
  condition(inputVariable: any, compareVariable: any) {
    return typeof inputVariable === 'number';
  },
  failureMessage: 'to be a number.',
});
addExpectCondition({
  name: 'toBeString',
  condition(inputVariable: any, compareVariable: any) {
    return typeof inputVariable === 'string';
  },
  failureMessage: 'to be a string.',
});
addExpectCondition({
  name: 'toBeBoolean',
  condition(inputVariable: any, compareVariable: any) {
    return typeof inputVariable === 'boolean';
  },
  failureMessage: 'to be a boolean.',
});
