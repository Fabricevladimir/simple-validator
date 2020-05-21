/**
 * Validate a form.
 * @param form - The form to validate.
 * @param formSchema - The validation rules to test for each form property.
 * @param options - The validation configurations.
 */
export declare function validateForm(
    form: {
      [x: string]: string;
    },
    formSchema: {
      [x: string]: Schema;
    },
    options?: {
      abortEarly?: boolean;
      includeLabel?: boolean;
      includeRules?: boolean;
    }
  ): {
    isValid: boolean;
    errors: {
      [x: string]: string[];
    };
    rules?: {
      [x: string]: {
        [x: string]: boolean;
      };
    };
  };
  
  /**
   * Creates password schema. The default requirements are:
   * - at least 6 characters
   * - at least one digit
   *
   * @example
   * var password = new PasswordSchema(3); // strength (3) => strong password
   * password.validate("abc", { includeLabel }); // { errors:[] , isValid: true; }
   */
  export declare class PasswordSchema {
    /**
     * @param strength - The password strength, defaulted to a medium (2).
     */
    constructor(strength?: string);
  
    strength: string;
  
    /**
     * Validate a given password.
     * @param password - The password to be validated.
     * @param options - Configuration options for validation.
     */
    validate(
      password: string,
      options?: {
        abortEarly?: boolean;
        includeLabel?: boolean;
        includeRules?: boolean;
      }
    ): {
      isValid: boolean;
      errors: string[];
      rules?: {
        [x: string]: boolean;
      };
    };
  }
  
  /**
   * Creates a new Schema.
   * @example
   * var customValidator = { message: "abc", validator: () => {} };
   * var password = new Schema(customValidator).hasSymbol('My custom message');
   */
  export declare class Schema {
    /**
     * Set the maximum number of characters.
     * @param length - The maximum length.
     * @param message - Custom error message.
     */
    max(length: number, message?: string): Schema;
  
    /**
     * Set the minimum number of characters.
     * @param length - The minimum length.
     * @param message - Custom error message.
     */
    min(length: number, message?: string): Schema;
  
    /**
     * Add a label to pre-append to error messages.
     * @param value - The label to pre-append to error messages.
     */
    label(value: string): Schema;
  
    /**
     * Set property to contain at least one digit character.
     * @param message - Custom error message.
     */
    hasDigit(message?: string): Schema;
  
    /**
     * Set property to contain at least one special character.
     * @param message - Custom error message.
     */
    hasSymbol(message?: string): Schema;
  
    /**
     * Set property to contain at least one lowercase character.
     * @param message - Custom error message.
     */
    hasLowercase(message?: string): Schema;
  
    /**
     * Set property to contain at least one uppercase character.
     * @param message - Custom error message.
     */
    hasUppercase(message?: string): Schema;
  
    /**
     * Set a pattern to match.
     * @param {string | RegExp} regExpPattern - The pattern to match.
     * @param message - Custom error message.
     */
    hasPattern(regExpPattern: string | RegExp, message?: string): Schema;
  
    /**
     * Set property to be required.
     * @param message - Custom error message.
     */
    isRequired(message?: string): Schema;
  
    /**
     * Set a property to match.
     * @param {string} name - The property to match.
     * @param message - Custom error message.
     *
     * @example
     * new Schema().hasMatchingProperty("propertyName", "My custom error.");
     */
    hasMatchingProperty(name: string, message?: string): Schema;
  
    /**
     * Return the name of the property to match.
     */
    getMatchingProperty(): string;
  
    /**
     * Add custom validator(s).
     * @param customValidator - The custom validator.
     * @example
     * new Schema.addValidator(validators);
     * //validators => [{ validator: isString }, { validator: isCustom }];
     */
    addValidator(
      customValidator:
        | {
            input?: any;
            message?: string;
            validator: Function;
          }
        | {
            input?: any;
            message?: string;
            validator: Function;
          }[]
    ): Schema;
  
    /**
     * Validate a given string.
     * @param value - The value to be validated.
     * @param options - Configuration options for validation.
     */
    validate(
      value: string,
      options?: {
        abortEarly?: boolean;
        includeLabel?: boolean;
        includeRules?: boolean;
      }
    ): {
      isValid: boolean;
      errors: string[];
      rules?: {
        [x: string]: boolean;
      };
    };
  
    constructor(
      customValidator?:
        | {
            input?: any;
            message?: string;
            validator: any;
          }
        | {
            input?: any;
            message?: string;
            validator: any;
          }[]
    );
  }
  
  export namespace Validators {
    /**
     * Check if input is a valid email address.
     * @param value - The email to be validated.
     * @param errorMessage - Failed validation error message.
     */
    function isEmail(value: string, errorMessage?: string): string | boolean;
  
    /**
     * Check if input includes a digit.
     * @param value - The value to be validated.
     * @param errorMessage - Failed validation error message.
     */
    function hasDigit(value: string, errorMessage?: string): string | boolean;
  
    /**
     * Check if input includes a special character.
     * @param value - The value to be validated.
     * @param errorMessage - The error message to display.
     */
  
    function hasSymbol(value: string, errorMessage?: string): string | boolean;
  
    /**
     * Check whether value is not empty.
     * @param value - The value to validate.
     * @param errorMessage - Custom error message.
     */
    function isRequired(value: string, errorMessage?: string): string | boolean;
  
    /**
     * Check if input includes a lowercase character.
     * @param value - The value to be validated.
     * @param errorMessage - Failed validation error message.
     */
    function hasLowercase(value: string, errorMessage?: string): string | boolean;
  
    /**
     * Check if input includes an uppercase character.
     * @param value - The value to be validated.
     * @param errorMessage - Failed validation error message.
     */
  
    function hasUppercase(value: string, errorMessage?: string): string | boolean;
  
    /**
     * Check if input includes a matching property.
     * @param matchingValue - The value to match.
     * @param value - The value to be validated.
     * @param errorMessage - Failed validation error message.
     */
    function matching(
      matchingValue: string,
      value: string,
      errorMessage?: string
    ): string | boolean;
  
    /**
     * Check if input is of the specified maximum length.
     * @param length - The maximum number of characters.
     * @param value - The value to be validated.
     * @param errorMessage - Failed validation error message.
     */
    function hasMaximum(
      length: number,
      value: string,
      errorMessage?: string
    ): string | boolean;
  
    /**
     * Check if input is of the specified minimum length.
     * @param length - The minimum number of characters.
     * @param value - The value to be validated.
     * @param errorMessage - Failed validation error message.
     */
    function hasMinimum(
      length: number,
      value: string,
      errorMessage?: string
    ): string | boolean;
  
    /**
     * Check if input matches given regex pattern.
     * @param regexPattern - The regular expression to match.
     * @param value - The value to be validated.
     * @param errorMessage - Failed validation error message.
     */
    function hasPattern(
      regexPattern: string | RegExp,
      value: string,
      errorMessage?: string
    ): string | boolean;
  }