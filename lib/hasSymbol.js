"use strict";

function hasSymbol(value, errorMessage) {
  var pattern = /[!@#$%^&*(),.?":{}|<>]/;
  return pattern.test(value) || errorMessage || false;
}

module.exports = hasSymbol;
