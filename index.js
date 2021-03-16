/**
 * Stores all expect conditions including the currently using variable value and the variables
 * name.
 */
let expectConditions = {
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
const expect = (variables) => {
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
function addExpectCondition(condition) {
    if (condition == null) {
        throw new Error('Failed adding a condition. The condition must not be null.');
    }
    if (['inputVariable', 'varName', 'not', 'either'].includes(condition.name)) {
        throw new Error(`Failed adding a condition. The conditions name must not be ${condition.name}.`);
    }
    expectConditions[condition.name] = (compareVariable) => {
        if (!condition.condition(expectConditions.inputVariable, compareVariable) === true) {
            throw new Error(`Expected ${expectConditions.varName} ${condition.getFailureMessage(compareVariable)}`);
        }
    };
    expectConditions.not[condition.name] = (compareVariable) => {
        if (condition.condition(expectConditions.inputVariable, compareVariable) === true) {
            throw new Error(`Expected ${expectConditions.varName} not ${condition.getFailureMessage(compareVariable)}`);
        }
    };
}
addExpectCondition({
    name: 'toEqual',
    condition(inputVariable, compareVariable) {
        return inputVariable == compareVariable;
    },
    getFailureMessage: (compareVariable) => `to equal '${compareVariable}'`,
});
addExpectCondition({
    name: 'toStrictlyEqual',
    condition(inputVariable, compareVariable) {
        return inputVariable === compareVariable;
    },
    getFailureMessage: (compareVariable) => `to strictly equal '${compareVariable}'`,
});
addExpectCondition({
    name: 'toBe',
    condition(inputVariable, compareVariable) {
        return inputVariable === compareVariable;
    },
    getFailureMessage: (compareVariable) => `to be '${compareVariable}'`,
});
addExpectCondition({
    name: 'toBeNumber',
    condition(inputVariable, compareVariable) {
        return typeof inputVariable === 'number';
    },
    getFailureMessage: () => 'to be a number',
});
addExpectCondition({
    name: 'toBeString',
    condition(inputVariable, compareVariable) {
        return typeof inputVariable === 'string';
    },
    getFailureMessage: () => 'to be a string',
});
addExpectCondition({
    name: 'toBeBoolean',
    condition(inputVariable, compareVariable) {
        return typeof inputVariable === 'boolean';
    },
    getFailureMessage: () => 'to be a boolean',
});
// Export
try {
    module.expect = expect;
}
catch (_a) { }
//# sourceMappingURL=expect.js.map