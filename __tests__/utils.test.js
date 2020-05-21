var Utils = require("../core/utils");
var Schema = require("../core/Schema");

describe("Utils", () => {
  test("validateLength should throw RangeError when value is negative", () => {
    expect(() => Utils.validateLength(-1)).toThrow(RangeError);
  });

  test("validateLength should throw TypeError when value is not a number", () => {
    expect(() => Utils.validateLength("a")).toThrow(TypeError);
  });

  test("validateString should throw new Error when value is empty", () => {
    expect(() => Utils.validateString("", "a")).toThrow();
  });

  test("validateType should throw TypeError when value is not of the correct type", () => {
    expect(() => Utils.validateType(1, Utils.isString)).toThrow(TypeError);
  });

  test("generateTypeError should return custom error message with given type", () => {
    expect(Utils.generateTypeError("AAA")).toMatch(/AAA/);
  });

  test("isString should return wether value is of type String", () => {
    expect(Utils.isString("a")).toBe(true);
    expect(Utils.isString(123)).toBe(false);
  });

  test("isEmptyString should return whether value is an empty string", () => {
    expect(Utils.isEmptyString("  ")).toBe(true);
    expect(Utils.isEmptyString("a")).toBe(false);
  });

  test("isEmptyObject should return whether value is an empty object", () => {
    expect(Utils.isEmptyObject({})).toBe(true);
    expect(Utils.isEmptyObject({ a: 1 })).toBe(false);
  });

  test("defaultParam should set the default parameter if argument is undefined", () => {
    let arg;
    const defaultParam = "abc";
    arg = Utils.defaultParam(arg, defaultParam);
    expect(arg).toBe(defaultParam);
  });

  test("defaultParam should not set the default parameter if argument provided", () => {
    let arg = "def";
    const defaultParam = "abc";
    arg = Utils.defaultParam(arg, defaultParam);
    expect(arg).toBe("def");
  });

  describe("ValidateForm", () => {
    test("should throw TypeError if either the form or the schema is not an object", () => {
      expect(() => Utils.validateForm("a", {})).toThrow(TypeError);
      expect(() => Utils.validateForm({}, "a")).toThrow(TypeError);
    });

    test("should throw Error when no matching property found", () => {
      const form = { a: "1", b: "2" };
      const schema = { a: new Schema().hasSymbol().hasMatchingProperty("d") };

      expect(() => Utils.validateForm(form, schema)).toThrow();
    });

    test("should return the list of rules when includeRules flag is set", () => {
      const form = { a: "1", b: "2" };
      const schema = {
        a: new Schema().hasSymbol(),
        b: new Schema().hasSymbol(),
      };

      expect(Utils.validateForm(form, schema).rules).toBeUndefined();

      expect(
        Utils.validateForm(form, schema, { includeRules: true }).rules
      ).not.toBeUndefined();
    });

    test("should return validation result", () => {
      const form = { a: "1.", b: "", c: "1." };
      const schema = {
        a: new Schema().hasSymbol(),
        b: new Schema().hasSymbol(),
        c: new Schema().hasMatchingProperty("a"),
      };

      const { isValid, errors } = Utils.validateForm(form, schema);

      expect(errors).toEqual({});
      expect(isValid).toBe(true);
    });
  });

  describe("validateProperty", () => {
    test("should throw TypeError when input is not of type String", () => {
      expect(() => Utils.validateProperty(1, {})).toThrow(TypeError);
    });

    test("should return no errors when input is not required and empty", () => {
      const result = new Schema().min(3).validate("");
      expect(result.errors).toEqual([]);
      expect(result.isValid).toBe(true);
    });

    test("should return only not required rule when input is not required and empty", () => {
      const result = new Schema().min(3).validate("", { includeRules: true });
      expect(Object.keys(result.rules).length).toBe(1);
    });

    test("should return no errors when value is valid", () => {
      const result = new Schema().hasSymbol().validate(".");

      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    describe("(configurations)", () => {
      test("should return list of rules when includeRules flag is set", () => {
        expect(
          new Schema().min(1).validate("abc", { includeRules: true }).rules
        ).not.toBeUndefined();
      });

      test("should abort validation after the first failed rule when abortEarly flag is set", () => {
        expect(
          new Schema().min(3).hasSymbol().validate("a", { abortEarly: true })
            .errors.length
        ).toBe(1);
      });

      test("should include property label in error message when includeLabel flag is set", () => {
        const label = "AAA";
        expect(
          new Schema().label(label).min(3).validate("a", { includeLabel: true })
            .errors[0]
        ).toMatch(label);
      });
    });
  });

  describe("Validate Schema", () => {
    const defaultSchema = {
      rules: { minimum: { input: 2 }, maximum: { input: 4 } },
    };

    test("should throw RangeError when minimum is greater than the maximum length", () => {
      const schema = { ...defaultSchema };
      schema.rules.minimum.input = 10;
      expect(() => Utils.validateSchema({ ...defaultSchema })).toThrow(
        RangeError
      );
    });

    test("should return only matching and isRequired rules when matching rule is set", () => {
      const required = { ...defaultSchema };
      required.rules.isRequired = { input: 3 };
      required.rules.matching = { input: 3 };

      expect(Object.keys(Utils.validateSchema(required).rules).length).toBe(2);

      delete required.rules.isRequired;
      expect(Object.keys(Utils.validateSchema(required).rules).length).toBe(1);
    });
  });
});
