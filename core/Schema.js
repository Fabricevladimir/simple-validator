"use strict";

var Constants = require("./constants");
var Validators = require("../lib");
var validateLength = require("./utils").validateLength;
var validateString = require("./utils").validateString;
var validateSchema = require("./utils").validateSchema;
var validateProperty = require("./utils").validateProperty;

var schema = new WeakMap();

function Schema(customValidator) {
  schema.set(this, { rules: {} });

  if (customValidator !== undefined) {
    this.addValidator(customValidator);
  }
}

Schema.prototype.label = function (value) {
  validateString(value);
  schema.get(this).label = value;
  return this;
};

Schema.prototype.addValidator = function (customValidator) {
  // Multiple validators passed in
  if (customValidator instanceof Array) {
    customValidator.forEach(function (value) {
      setValidator(value, schema.get(this));
    }, this);
  } else {
    setValidator(customValidator, schema.get(this));
  }
  return this;
};

Schema.prototype.min = function (length, message) {
  validateLength(length);

  this.addValidator({
    input: length,
    validator: Validators.hasMinimum,
    message: message || Constants.Minimum.replace("LENGTH", "" + length),
  });
  return this;
};

Schema.prototype.max = function (length, message) {
  validateLength(length);

  this.addValidator({
    input: length,
    validator: Validators.hasMaximum,
    message: message || Constants.Maximum.replace("LENGTH", "" + length),
  });
  return this;
};

Schema.prototype.isRequired = function (message) {
  this.addValidator({
    validator: Validators.isRequired,
    message: message || Constants.Required,
  });
  return this;
};

Schema.prototype.hasSymbol = function (message) {
  this.addValidator({
    message: message || Constants.Symbol,
    validator: Validators.hasSymbol,
  });
  return this;
};

Schema.prototype.hasPattern = function (regExpPattern, message) {
  this.addValidator({
    input: regExpPattern,
    message: message || Constants.Pattern,
    validator: Validators.hasPattern,
  });
  return this;
};

Schema.prototype.hasDigit = function (message) {
  this.addValidator({
    message: message || Constants.Digit,
    validator: Validators.hasDigit,
  });
  return this;
};

Schema.prototype.hasLowercase = function (message) {
  this.addValidator({
    message: message || Constants.Lowercase,
    validator: Validators.hasLowercase,
  });
  return this;
};

Schema.prototype.hasUppercase = function (message) {
  this.addValidator({
    message: message || Constants.Uppercase,
    validator: Validators.hasUppercase,
  });
  return this;
};

Schema.prototype.hasMatchingProperty = function (name, message) {
  schema.get(this).matchingProperty = name;

  this.addValidator({
    message: message || Constants.Matching.replace("PROPERTY", name),
    validator: Validators.matching,
  });
  return this;
};

Schema.prototype.getMatchingProperty = function () {
  return schema.get(this).matchingProperty;
};

Schema.prototype.___setInputForMatchingProperty___ = function (value) {
  schema.get(this).rules.matching.input = value;
};

Schema.prototype.validate = function (value, options) {
  return validateProperty(value, validateSchema(schema.get(this)), options);
};

function setValidator(value, currentSchema) {
  if (!value.validator) throw new Error(Constants.NoValidator);

  currentSchema.rules[value.validator.name] = {
    input: value.input,
    message: value.message || Constants.CustomValidator,
    validator: value.validator,
  };
}

module.exports = Schema;
