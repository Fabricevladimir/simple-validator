var Validators = require("../lib");

describe("Core library of validators", () => {
  var ERROR = "ERROR";
  var tests = [
    {
      name: Validators.isEmail.name,
      valid: "abc@def.com",
      invalid: "a",
      validator: (value, message) => Validators.isEmail(value, message),
    },
    {
      name: Validators.hasDigit.name,
      valid: "a1",
      invalid: "a",
      validator: (value, message) => Validators.hasDigit(value, message),
    },
    {
      name: Validators.hasSymbol.name,
      valid: "a.",
      invalid: "a",
      validator: (value, message) => Validators.hasSymbol(value, message),
    },
    {
      name: Validators.hasMinimum.name,
      valid: "ab",
      invalid: "a",
      validator: (value, message) => Validators.hasMinimum(2, value, message),
    },
    {
      name: Validators.hasMaximum.name,
      valid: "ab",
      invalid: "abc",
      validator: (value, message) => Validators.hasMaximum(2, value, message),
    },
    {
      name: Validators.matching.name,
      valid: "abc$$",
      invalid: "a",
      validator: (value, message) =>
        Validators.matching("abc$$", value, message),
    },
    {
      name: Validators.hasPattern.name + "(with RegExp input)",
      valid: "abc",
      invalid: "def",
      validator: (value, message) =>
        Validators.hasPattern(/abc/, value, message),
    },
    {
      name: Validators.hasPattern.name + "(with string input)",
      valid: "abc",
      invalid: "def",
      validator: (value, message) =>
        Validators.hasPattern("abc", value, message),
    },
    {
      name: Validators.isRequired.name,
      valid: "ab",
      invalid: "",
      validator: (value, message) => Validators.isRequired(value, message),
    },
    {
      name: Validators.hasLowercase.name,
      valid: "ab",
      invalid: "AB",
      validator: (value, message) => Validators.hasLowercase(value, message),
    },
    {
      name: Validators.hasUppercase.name,
      valid: "Ab",
      invalid: "ab",
      validator: (value, message) => Validators.hasUppercase(value, message),
    },
  ];

  tests.forEach(({ name, validator, invalid, valid }) => {
    test(
      name + " should return true when valid otherwise false/message",
      () => {
        // Valid value
        expect(validator(valid, ERROR)).toBe(true);

        // Invalid value
        expect(validator(invalid)).toBe(false);

        // Invalid value and provided error
        expect(validator(invalid, ERROR)).toBe(ERROR);
      }
    );
  });
});
