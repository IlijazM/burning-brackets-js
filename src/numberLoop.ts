/**
 * Mutates the Number prototype interface with the `Number.prototype.for`, which
 * is an easy way of creating an for loop from the number 0 to n.
 *
 * Example:
 *
 * ```javascript
 * (3).for((i) => console.log(i));
 *
 * // 0
 * // 1
 * // 2
 * ```
 *
 * An alternative way to write the same expression is:
 *
 * ```javascript
 * 3..for((i) => console.log(i));
 * ```
 *
 * `Number.prototype.for` takes in a second parameter `steps`. With this you can set the step size:
 *
 * ```javascript
 * 6..for((i) => console.log(i), 2);
 *
 * // 0
 * // 2
 * // 4
 * ```
 *
 * Pass in a negative number as steps in order to iterate through negative numbers:
 *
 * ```javascript
 * 3..for((i) => console.log(i), -1);
 *
 * // 0
 * // -1
 * // -2
 * ```
 *
 * @packageDocumentation
 */

type CallbackFunction = (index: number) => void;

/**
 * Will iterate from 0 to the target number and call the callback function with
 * the index for each iteration.
 *
 * <p>
 * Call this function from the Number prototype function `Number.prototype.for`
 * like so:
 * </p>
 *
 * ```js
 * (10).for((i) => console.log(i));
 * ```
 *
 * <p>
 * Or alternatively:
 * </p>
 *
 * ```js
 * 10..for((i) => console.log(i));
 * ```
 *
 * @param fun the callback function that contains an index as the only
 * parameter.
 * @param steps step size for each iteration.
 * @this { number } the target number to iterate to.
 */
function numberFor(fun: CallbackFunction, steps: number = 1) {
  // No steps should mean no loop.
  if (steps === 0) {
    return;
  }

  // We need to differentiate between two cases: When the steps are positive, or
  // when steps are negative. When the steps are negative and the target is e.g.
  // 10 we should loop like this: [0, -1, -2, ..., -10].
  if (steps > 0) {
    for (let i = 0; i < Math.abs(this); i += steps) {
      fun(i);
    }
  } else {
    for (let i = 0; i > -Math.abs(this); i += steps) {
      fun(i);
    }
  }
}

/**
 * Extends the Number prototype with the for function.
 */
interface Number {
  for: (fun: CallbackFunction, steps: number) => void;
}

// Implements the for function.
Number.prototype.for = numberFor;
