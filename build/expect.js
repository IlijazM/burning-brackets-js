"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = void 0;
/**
 * Stores all expect conditions including the currently using variable value and the variables
 * name.
 */
var expectConditions = {
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
var expect = function (variables) {
    if (typeof variables !== 'object') {
        throw new Error('Expected a variable as an object.');
    }
    var keys = Object.keys(variables);
    if (keys.length <= 0) {
        throw new Error('Expected a variable. Got none');
    }
    expectConditions.inputVariable = variables[keys[0]];
    expectConditions.varName = keys[0];
    return expectConditions;
};
exports.expect = expect;
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
        throw new Error("Failed adding a condition. The conditions name must not be " + condition.name + ".");
    }
    expectConditions[condition.name] = function (compareVariable) {
        if (!condition.condition(expectConditions.inputVariable, compareVariable) === true) {
            throw new Error("Expected " + expectConditions.varName + " " + condition.failureMessage);
        }
    };
    expectConditions.not[condition.name] = function (compareVariable) {
        if (condition.condition(expectConditions.inputVariable, compareVariable) === true) {
            throw new Error("Expected " + expectConditions.varName + " not " + condition.failureMessage);
        }
    };
}
addExpectCondition({
    name: 'toBeNumber',
    condition: function (inputVariable, compareVariable) {
        return typeof inputVariable === 'number';
    },
    failureMessage: 'to be a number.',
});
addExpectCondition({
    name: 'toBeString',
    condition: function (inputVariable, compareVariable) {
        return typeof inputVariable === 'string';
    },
    failureMessage: 'to be a string.',
});
addExpectCondition({
    name: 'toBeBoolean',
    condition: function (inputVariable, compareVariable) {
        return typeof inputVariable === 'boolean';
    },
    failureMessage: 'to be a boolean.',
});
