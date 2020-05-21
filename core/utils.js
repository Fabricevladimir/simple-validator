"use strict";

var Constants = require("./constants");

function validateLength(value) {
  validateType(value, isNumber);

  // Negative value
  if (value < 0) {
    throw new RangeError(Constants.NegativeLength);
  }
}

function validateString(value) {
  validateType(value, isString);

  if (isEmptyString(value)) {
    throw new Error(Constants.EmptyLabel);
  }
}

function validateType(value, callback) {
  if (!callback(value)) {
    throw new TypeError(generateTypeError(callback.name.replace("is", "")));
  }
}

function generateTypeError(type) {
  return Constants.InvalidType.replace("TYPE", type);
}

function defaultParam(arg, value) {
  return typeof arg !== "undefined" ? arg : value;
}

function isEmptyString(value) {
  return value.trim() === "";
}

function isEmptyObject(value) {
  return isObject(value) && Object.keys(value).length === 0;
}

function isString(value) {
  return typeof value === "string" || value instanceof String;
}

function isNumber(value) {
  return typeof value === "number" && Number.isInteger(value);
}

function isObject(value) {
  return typeof value === "object" && value !== null;
}

function validateSchema(schema) {
  if (schema.rules.matching) {
    schema =
      schema.rules.isRequired !== undefined
        ? {
            label: schema.label,
            rules: {
              matching: schema.rules.matching,
              isRequired: schema.rules.isRequired,
            },
          }
        : {
            label: schema.label,
            rules: { matching: schema.rules.matching },
          };
    return schema;
  }

  // Setup max and min
  var minimum = schema.rules.minimum ? schema.rules.minimum.input : -1;
  var maximum = schema.rules.maximum ? schema.rules.maximum.input : -1;

  // Min greater than max when BOTH are set
  if (minimum > maximum && maximum !== -1) {
    throw new RangeError(Constants.MinOverMax);
  }
  return schema;
}

function validateProperty(value, schema, options) {
  if (!isString(value)) throw new TypeError(Constants.StringTypeError);

  // Setup configurations and validate
  options = defaultParam(options, {
    abortEarly: false,
    includeRules: false,
    includeLabel: false,
  });

  // Not required and value is not provided
  if (schema.rules.isRequired === undefined && isEmptyString(value)) {
    return !options.includeRules
      ? {
          isValid: true,
          errors: [],
        }
      : {
          isValid: true,
          errors: [],
          rules: {
            isRequired: false,
          },
        };
  }

  var result = testRules(value, schema, options);
  return !options.includeRules
    ? {
        isValid: result.errors.length === Constants.NoValidationErrors,
        errors: result.errors,
      }
    : {
        rules: result.rules,
        errors: result.errors,
        isValid: result.errors.length === Constants.NoValidationErrors,
      };
}

function testRules(value, schema, options) {
  var result;
  var rules = {};
  var errors = [];
  var ruleNames = Object.keys(schema.rules);
  var currentRule;
  var currentRuleName;

  for (var index = 0; index < ruleNames.length; index += 1) {
    currentRuleName = ruleNames[index];
    currentRule = schema.rules[currentRuleName];

    // Get the result from validator function
    result =
      currentRule.input === undefined
        ? currentRule.validator(value, currentRule.message)
        : currentRule.validator(currentRule.input, value, currentRule.message);

    // Validator returns string if there is an error
    rules[currentRuleName] = true;
    if (typeof result === "string") {
      rules[currentRuleName] = false;
      errors.push(getErrorMessage(schema.label, result, options.includeLabel));

      // Stop validation if abort early is set
      if (options.abortEarly) break;
    }
  }
  return { errors: errors, rules: rules };
}

function getErrorMessage(label, errorMessage, includeLabel) {
  return includeLabel && label ? label + " " + errorMessage : errorMessage;
}

function validateForm(form, formSchema, options) {
  if (!isObject(form) || !isObject(formSchema))
    throw new TypeError(Constants.InvalidType);

  var result;
  var schema;
  var formRules = {};
  var formErrors = {};
  options = defaultParam(options, {
    abortEarly: false,
    includeRules: false,
    includeLabel: false,
  });

  Object.keys(form).forEach(function (property) {
    schema = formSchema[property];
    if (schema.getMatchingProperty()) {
      setMatchingPropertyInput(schema, form);
    }

    result = schema.validate(form[property], options);
    formRules[property] = result.rules;
    if (!result.isValid) {
      formErrors[property] = result.errors;
    }
  });

  return !options.includeRules
    ? {
        errors: formErrors,
        isValid: isEmptyObject(formErrors),
      }
    : {
        rules: formRules,
        errors: formErrors,
        isValid: isEmptyObject(formErrors),
      };
}

function setMatchingPropertyInput(schema, form) {
  var propertyToMatch = schema.getMatchingProperty();
  var matchingValue = form[propertyToMatch];
  if (matchingValue === undefined) {
    throw new Error(
      Constants.NoMatchingProperty.replace("PROPERTY", propertyToMatch)
    );
  }
  schema.___setInputForMatchingProperty___(matchingValue);
}

module.exports = {
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  defaultParam: defaultParam,
  validateType: validateType,
  validateForm: validateForm,
  isEmptyString: isEmptyString,
  isEmptyObject: isEmptyObject,
  validateLength: validateLength,
  validateString: validateString,
  validateSchema: validateSchema,
  validateProperty: validateProperty,
  generateTypeError: generateTypeError,
};
