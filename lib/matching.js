"use strict";

module.exports = function matching(matchingValue, value, errorMessage) {
  return (
    new RegExp("^" + escape(matchingValue) + "$").test(value) ||
    errorMessage ||
    false
  );
};

/**
 * Escape characters that may interfere with the regular expression.
 * @param {string} value - The value to escape.
 */
function escape(value) {
  return value.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
}
