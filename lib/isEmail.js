"use strict";

module.exports = function isEmail(value, errorMessage) {
  return (
    /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(value) ||
    errorMessage ||
    false
  );
};
