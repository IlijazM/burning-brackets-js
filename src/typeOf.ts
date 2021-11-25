/**
 * `typeOf` is an extension for the already existing `typeof` but with more
 * distinctions between types. See the differences here:
 *
 * ```javascript
 * typeof null; // 'object'.
 * typeOf(null); // 'null'
 * ```
 *
 * ```javascript
 * class MyClass {}
 *
 * typeof MyClass; // 'function'
 * typeOf(MyClass); // 'class'
 * ```
 *
 * ```javascript
 * typeof []; // 'object'
 * typeOf([]); // 'array'
 * ```
 *
 *
 * @packageDocumentation
 */

/**
 * Returns the type of a variable more conveniently that the default `typeof` function.
 *
 * <p>
 * All changes in an overview are:
 * </p>
 *
 * ```js
 * typeOf(null) == "null";
 * typeOf(MyClass) == "class";
 * typeOf([]) == "array";
 * ```
 *
 * @param variable any variable.
 *
 * @return the type of the variable.
 */
export function typeOf(variable: any): string {
  // `typeof null` returns object by default which is inconvenient.
  // It should return 'null' instead.
  if (variable === null) {
    return 'null';
  }

  // `typeof aClass` returns function by default which is inconvenient.
  // It should return 'class' instead.
  // The type will get determent if the function stars with 'class'.
  if (typeof variable === 'function' && variable.toString().startsWith('class')) {
    return 'class';
  }

  // `typeof []` returns object by default which is inconvenient. It should return 'array' instead.
  if (variable instanceof Array) {
    return 'array';
  }

  return typeof variable;
}

// Export it globally
try {
  window['typeOf'] = typeOf;
} catch {}
