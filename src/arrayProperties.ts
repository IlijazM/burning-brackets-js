/**
 * # Array properties
 *
 * Array properties enhance the experience of getting basic array operations done.
 *
 * ## First
 *
 * `array.first` simply returns the first element of the given array.
 *
 * ```javascript
 * ['foo', 'bar', 'baz'].first; // 'foo'
 * ```
 *
 * ## Last
 *
 * `array.last` returns the last element of an array. This is especially useful
 * since the default way of getting the last element of an array is by simple
 * getting the element at the position of the array length minus one.
 *
 * Usage:
 *
 * ```javascript
 * // Bad way:
 * let myArray = ['foo', 'bar', 'baz'];
 * myArray[myArray.length - 1]; // 'baz'
 *
 * // Good way:
 * ['foo', 'bar', 'baz'].last; // 'baz'
 * ```
 *
 * ## Random
 *
 * `array.random` returns a random element of the given array. This is
 * especially useful since the default way of getting a random element from an
 * array is ridiculously nested.
 *
 * Usage:
 *
 * ```javascript
 * // Bad way:
 * let myArray = ['foo', 'bar', 'baz'];
 * myArray[Math.floor(Math.random() * myArray.length)]; // 'bar'
 *
 * // Good way:
 * ['foo', 'bar', 'baz'].random; // 'bar'
 * ```
 *
 * ## Get safe
 *
 * `array.getSafe(i)` returns the element in an array with the given index or null,
 * if the given index is out of bounce. This has the benefit, that it doesn't
 * throw any exception when entering an invalid index.
 *
 * Usage:
 *
 * ```javascript
 * ['foo', 'bar', 'baz'].getSafe(3); // null
 * ```
 *
 * ## To set
 *
 * `array.toSet()` removes all duplicates from the array.
 *
 * Usage:
 *
 * ```javascript
 * ['foo', 'bar', 'foo'].toSet(); // ['foo', 'bar']
 * ```
 *
 * ## Shuffle
 *
 * `array.shuffled` returns the array but shuffled randomly.
 *
 * Usage:
 *
 * ```javascript
 * ['foo', 'bar', 'baz'].shuffled; // ['bar', 'foo', 'baz']
 * ```
 *
 * @packageDocumentation
 */

/**
 * Returns the first element of an array.
 *
 * Usage:
 *
 * ```javascript
 * ['foo', 'bar', 'baz'].first; // 'foo'
 * ```
 */
Object.defineProperty(Array.prototype, 'first', {
  get: function () {
    return this[0];
  },
});

/**
 * Returns the last element of an array.
 *
 * Usage:
 *
 * ```javascript
 * // Bad way:
 * let myArray = ['foo', 'bar', 'baz'];
 * myArray[myArray.length - 1]; // 'baz'
 *
 * // Good way:
 * ['foo', 'bar', 'baz'].last; // 'baz'
 * ```
 */
Object.defineProperty(Array.prototype, 'last', {
  get: function () {
    return this[this.length - 1];
  },
});

/**
 * Returns a random element of an array.
 *
 * Usage:
 *
 * ```javascript
 * // Bad way:
 * let myArray = ['foo', 'bar', 'baz'];
 * myArray[Math.floor(Math.random() * myArray.length)]; // 'bar'
 *
 * // Good way:
 * ['foo', 'bar', 'baz'].random; // 'bar'
 * ```
 */
Object.defineProperty(Array.prototype, 'random', {
  get: function () {
    return this[Math.floor(Math.random() * this.length)];
  },
});

/**
 * Returns the n-th element of an array safe. That means if the index is greater
 * or less than the array's size, it will simply return null instead of throwing
 * an error.
 *
 * Usage:
 *
 * ```javascript
 * ['foo', 'bar', 'baz'].getSafe(3); // null
 * ```
 *
 * @param index the index of the element.
 * @returns null or the element of the array at the position `index`.
 */
Array.prototype.getSafe = function (index: number) {
  if (index < 0 || index >= this.length) {
    return null;
  }
  return this[index];
};

/**
 * Removes all duplicates from an array.
 *
 * Usage:
 *
 * ```javascript
 * ['foo', 'bar', 'foo'].toSet(); // ['foo', 'bar']
 * ```
 */
Array.prototype.toSet = function () {
  return [...new Set(this)];
};

/**
 * Shuffles the array randomly.
 *
 * Usage:
 *
 * ```javascript
 * ['foo', 'bar', 'baz'].shuffled; // ['bar', 'foo', 'baz']
 * ```
 */
Object.defineProperty(Array.prototype, 'shuffled', {
  get: function () {
    const array = [...this];

    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  },
});

interface Array<T> {
  first: T;
  last: T;
  random: T;
  toSet: () => Array<T>;
  shuffled: Array<T>;
  getSafe: (index: number) => T | null;
}
