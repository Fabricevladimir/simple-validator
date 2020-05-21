"use strict";

module.exports = function hasUppercase(value, errorMessage) {
  return /[A-Z]/.test(value) || errorMessage || false;
};
