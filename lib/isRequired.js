"use strict";

module.exports = function isRequired(value, errorMessage) {
  return value.trim() !== "" || errorMessage || false;
};
