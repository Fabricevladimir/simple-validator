"use strict";

module.exports = function hasPattern(regexPattern, value, errorMessage) {
  return regexPattern instanceof RegExp
    ? regexPattern.test(value) || errorMessage || false
    : RegExp(regexPattern).test(value) || errorMessage || false;
};
