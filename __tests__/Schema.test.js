var Schema = require("../core/Schema");

describe("Schema", () => {
  test("should throw TypeError when minimum or maximum length is not a number", () => {
    expect(() => new Schema().min("a")).toThrow(TypeError);
    expect(() => new Schema().max("a")).toThrow(TypeError);
  });

  test("should throw RangeError when minimum or maximum length is negative", () => {
    expect(() => new Schema().min(-1)).toThrow(RangeError);
    expect(() => new Schema().max(-1)).toThrow(RangeError);
  });

  test("should get matching property and set its input value to match", () => {
    const matchingProperty = "abc";
    expect(
      new Schema().hasMatchingProperty(matchingProperty).getMatchingProperty()
    ).toBe(matchingProperty);
  });

  test("should set all properties without throwing", () => {
    expect(() =>
      new Schema()
        .min(4)
        .max(8)
        .hasDigit()
        .hasLowercase()
        .hasUppercase()
        .hasSymbol()
        .isRequired()
        .hasPattern(/abc/)
        .addValidator({ validator: jest.fn() })
        .validate("")
    ).not.toThrow();
  });

  describe("Add validator", () => {
    const defaultValue = "abc";
    const defaultInput = 1;
    const defaultMessage = "ERROR";
    const defaultValidator = {
      input: defaultInput,
      message: defaultMessage,
      validator: jest.fn((x, y, z) => z),
    };

    function setup(validator = defaultValidator, value = defaultValue) {
      return new Schema(validator).validate(value, { includeRules: true });
    }

    test("should throw error if no validator function is provided", () => {
      expect(() => setup({})).toThrow(/validator/);
    });

    test("should set custom validator", () => {
      const { rules } = setup();
      expect(Object.keys(rules).length).toBe(1);
    });

    test("should set multiple validators", () => {
      const validators = [
        {
          validator: function a(x, y, z) {
            return z;
          },
        },
        {
          validator: function b(x, y, z) {
            return z;
          },
        },
        {
          validator: function c(x, y, z) {
            return z;
          },
        },
      ];

      const { rules } = setup(validators);
      expect(Object.keys(rules).length).toBe(validators.length);
    });

    test("should call custom validator with the given input, value and error message on validate", () => {
      const { validator, input, message } = defaultValidator;
      expect(validator).toHaveBeenCalledWith(input, defaultValue, message);
    });
  });
});
