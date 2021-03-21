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
        expectConditions.inputVariable = variables;
        expectConditions.varName = 'a variable';
    }
    else {
        const keys = Object.keys(variables);
        if (keys.length <= 0) {
            throw new Error('Expected a variable. Got none');
        }
        expectConditions.inputVariable = variables[keys[0]];
        expectConditions.varName = `'${keys[0]}'`;
    }
    return expectConditions;
};
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
function addExpectCondition(condition) {
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
    name: 'toBeInteger',
    condition(inputVariable, compareVariable) {
        return Number.isInteger(inputVariable);
    },
    getFailureMessage: () => 'to be an integer',
});
addExpectCondition({
    name: 'toBeFinite',
    condition(inputVariable, compareVariable) {
        return Number.isFinite(inputVariable);
    },
    getFailureMessage: () => 'to be finite',
});
addExpectCondition({
    name: 'toBeNaN',
    condition(inputVariable, compareVariable) {
        return Number.isNaN(inputVariable);
    },
    getFailureMessage: () => 'to be finite',
});
addExpectCondition({
    name: 'toBePositive',
    condition(inputVariable, compareVariable) {
        return inputVariable >= 0;
    },
    getFailureMessage: () => 'to be positive',
});
addExpectCondition({
    name: 'toBeEven',
    condition(inputVariable, compareVariable) {
        return inputVariable % 2 == 0;
    },
    getFailureMessage: () => 'to be even',
});
addExpectCondition({
    name: 'toBeOdd',
    condition(inputVariable, compareVariable) {
        return inputVariable % 2 == 1;
    },
    getFailureMessage: () => 'to be odd',
});
addExpectCondition({
    name: 'toBeDivisibleWith',
    condition(inputVariable, compareVariable) {
        return inputVariable % compareVariable == 0;
    },
    getFailureMessage: (compareVariable) => `to be divisible with ${compareVariable}`,
});
addExpectCondition({
    name: 'toBeString',
    condition(inputVariable, compareVariable) {
        return typeof inputVariable === 'string';
    },
    getFailureMessage: () => 'to be a string',
});
addExpectCondition({
    name: 'toStartWith',
    condition(inputVariable, compareVariable) {
        return inputVariable.startsWith(compareVariable);
    },
    getFailureMessage: (compareVariable) => `to start with '${compareVariable}'`,
});
addExpectCondition({
    name: 'toEndWith',
    condition(inputVariable, compareVariable) {
        return inputVariable.endsWith(compareVariable);
    },
    getFailureMessage: (compareVariable) => `to end with '${compareVariable}'`,
});
addExpectCondition({
    name: 'toIncludes',
    condition(inputVariable, compareVariable) {
        return inputVariable.includes(compareVariable);
    },
    getFailureMessage: (compareVariable) => `to includes '${compareVariable}'`,
});
addExpectCondition({
    name: 'toMatch',
    condition(inputVariable, compareVariable) {
        return compareVariable.test(inputVariable);
    },
    getFailureMessage: (compareVariable) => `to match '${compareVariable}'`,
});
addExpectCondition({
    name: 'toBeBoolean',
    condition(inputVariable, compareVariable) {
        return typeof inputVariable === 'boolean';
    },
    getFailureMessage: () => 'to be a boolean',
});
addExpectCondition({
    name: 'toBeTrue',
    condition(inputVariable, compareVariable) {
        return inputVariable === true;
    },
    getFailureMessage: () => 'to be true',
});
addExpectCondition({
    name: 'toBeFalse',
    condition(inputVariable, compareVariable) {
        return inputVariable === false;
    },
    getFailureMessage: () => 'to be false',
});
addExpectCondition({
    name: 'toBeTruthy',
    condition(inputVariable, compareVariable) {
        return !!inputVariable;
    },
    getFailureMessage: () => 'to be truthy',
});
addExpectCondition({
    name: 'toBeNull',
    condition(inputVariable, compareVariable) {
        return inputVariable === null;
    },
    getFailureMessage: () => 'to be null',
});
addExpectCondition({
    name: 'toBeUndefined',
    condition(inputVariable, compareVariable) {
        return inputVariable === undefined;
    },
    getFailureMessage: () => 'to be undefined',
});
addExpectCondition({
    name: 'toBeNullish',
    condition(inputVariable, compareVariable) {
        return inputVariable == null;
    },
    getFailureMessage: () => 'to be nullish',
});
addExpectCondition({
    name: 'toBeTheLength',
    condition(inputVariable, compareVariable) {
        return inputVariable.length == compareVariable;
    },
    getFailureMessage: (compareVariable) => `to be the length of ${compareVariable}`,
});
// Export
try {
    exports.expect = expect;
}
catch (_a) { }
//# sourceMappingURL=expect.js.map