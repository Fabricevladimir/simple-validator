"use strict";

module.exports = function hasMaximum(length, value, errorMessage) {
  return (
    new RegExp("^.{0," + length + "}$").test(value) || errorMessage || false
  );
};
