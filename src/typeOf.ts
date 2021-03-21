/**
 * Exports the extended typeOf function.
 *
 * @packageDocumentation
 */

/**
 * Returns the type of a variable more conveniently that the default type of.
 *
 * @param variable any variable.
 *
 * @return the type of the variable.
 */
function typeOf(variable: any): string {
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

try {
  exports.typeOf = typeOf;
} catch {}
