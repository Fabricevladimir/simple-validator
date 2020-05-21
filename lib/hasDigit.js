"use strict";

function hasDigit(value, errorMessage) {
  return /[0-9]/.test(value) || errorMessage || false;
}

module.exports = hasDigit;
