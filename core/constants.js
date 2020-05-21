"use strict";

module.exports = {
  Digit: "must include at least one digit",
  Symbol: "must include at least one special character",
  Pattern: "does not match the pattern provided",
  Minimum: "must be at least LENGTH character(s) long",
  Maximum: "must not be longer than LENGTH character(s)",
  Matching: "does not match PROPERTY",
  Required: "must not be empty",
  Lowercase: "must include at least one lowercase character",
  Uppercase: "must include at least one uppercase character",
  MinOverMax: "Minimum length cannot be greater than the maximum length.",
  EmptyLabel: "Label cannot be an empty string.",
  NoValidator: "Must include validator function.",
  InvalidType: "Value must be of type TYPE.",
  NegativeLength: "Length cannot be negative.",
  CustomValidator: "must match given validator",
  StringTypeError: "Input must be a string.",
  NoMatchingProperty: "No property PROPERTY to match",
  NoValidationErrors: 0,
  InvalidSchemaOrForm: "Form and schema must be objects.",
};
