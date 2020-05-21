"use strict";

module.exports = function hasLowercase(value, errorMessage) {
  return /[a-z]/.test(value) || errorMessage || false;
};
