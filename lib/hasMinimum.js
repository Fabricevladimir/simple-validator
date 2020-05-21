"use strict";

module.exports = function hasMinimum(length, value, errorMessage) {
  return (
    new RegExp("^.{" + length + ",}$").test(value) || errorMessage || false
  );
};
