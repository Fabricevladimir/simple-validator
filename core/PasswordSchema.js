"use strict";

var Schema = require("./Schema");
var defaultParam = require("./utils").defaultParam;

var PasswordStrength = {
  weak: 1,
  medium: 2,
  strong: 3,
};

function PasswordSchema(strength) {
  this.strength = defaultParam(strength, PasswordStrength.medium);
}

PasswordSchema.prototype.validate = function (value, options) {
  switch (this.strength) {
    case PasswordStrength.weak:
      return new Schema().min(4).label("Password").validate(value, options);
    case PasswordStrength.medium:
      return new Schema()
        .min(6)
        .label("Password")
        .hasDigit()
        .validate(value, options);
    case PasswordStrength.strong:
      return new Schema()
        .min(8)
        .label("Password")
        .hasDigit()
        .hasSymbol()
        .hasLowercase()
        .validate(value, options);
    default:
      throw new Error("Invalid argument");
  }
};

module.exports = PasswordSchema;
