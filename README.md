# JS Validation

A minimal JavaScript string validation library.

# Table of Contents

- [Getting Started](#Getting-Started)
  - [Usage](#Usage)
    - [Creating a Schema](#Creating-a-Schema)
    - [Validating the property](#Validating-the-Property)
    - [The Result](#The-result)
- [API](#API)
  - [Schema](#Schema)
  - [PasswordSchema](#PasswordSchema)
  - [ValidateForm](#validateForm)
  - [Validators](#Validators)
- [Type Declarations](#Type-Declarations)
  - [ValidationOptions](#ValidationOptions)
  - [CustomValidator](#CustomValidator)
  - [FormValidationResult](#FormValidationResult)
  - [PropertyValidationResult](#PropertyValidationResult)
  - [ValidatorCallback](#ValidatorCallback)
- [Acknowledgements](#Acknowledgements)

## Getting started

Installation using npm:

```bash
$ npm i --save @fabricefrancois/simple-validator
```

### Usage
String validation is carried out in two steps:
1. Create a [schema](#Schema).
2. Validate the string.

#### Creating a Schema
To validate a property or a group of related properties, a blueprint (schema) containing the string validation rules to be tested against has to be configured. A new schema can be created or the pre-built [PasswordSchema](#PasswordSchema) may be used if the value being validated is a password. A new schema is configured as follows:

```javascript
// CommonJs
const Schema = require("@fabricefrancois/simple-validator").Schema;

// Using ES6
import { Schema, PasswordSchema } from "@fabricefrancois/simple-validator";

// Schema for a single property
const usernameSchema = new Schema()
  .min(6)
  .hasDigit()
  .hasUppercase("My custom error message")
  .label("Username");

// Schema for multiple properties. Note the use of the custom schema 'PasswordSchema'
const formSchema = {
  username: new Schema().min(6),
  password: new PasswordSchema()
};
```

#### Validating the Property
A string is validated using the rules set on its corresponding schema. 

```javascript
const usernameSchema = new Schema().min(6);
const result = usernameSchema.validate("abc123");
```

Related properties and strings can either be validated individually or be grouped together as a form and validated at once.

```javascript
import { Schema, PasswordSchema, validateForm } from "@fabricefrancois/simple-validator";

const formSchema = {
  username: new Schema().min(6),
  password: new PasswordSchema()
};

// Individual validation
const result = formSchema.username.validate("abc123");

// Form validation
const form = {
  username: "abc123",
  password: "password"
}

const result = validateForm(form, formSchema)
```

When validating a form or single string, additional configurations can also be passed in to the validation function in the form of an [options](#ValidationOptions) object.

```javascript
const options = { includeLabel: true };

// Single value
const result = new Schema().min(6).validate("abc123", options);

// Form validation
const result = validateForm(form, formSchema, options)
```

#### The Result
When validating a single property, the validation function returns a [PropertyValidationResult](#PropertyValidationResult) object with the result of the validation rules set in the schema.

```javascript
const usernameSchema = new Schema.min(6).hasDigit("Custom error");

// Invalid string
let result = usernameSchema.validate("abc");

/*
result: {
  isValid: false,
  errors: [
    "must be at least 6 character(s) long",
    "Custom error"
  ]
}
*/

// Valid string
result = usernameSchema.validate("abc123");

// result: { isValid: true, errors: [] }
```

On the other hand, a [FormValidationResult](#FormValidationResult) object is returned when validating a form. It contains the validation results of all the individual properties.

```javascript
const formSchema = {
  username: new Schema().min(6),
  password: new Schema().hasUppercase()
};

// Invalid form
let form = {
  username: "abc1",
  password: "Password"
}

const result = validateForm(form, formSchema);

/*
result: {
  isValid: false,
  errors: {
    username: ["must be at least 6 character(s) long"]
  }
}
*/

// Valid form
let form = {
  username: "abc123",
  password: "Password"
}

const result = validateForm(form, formSchema);

// result: { isValid: true, errors: {} }
```

## API Documentation
### **Schema**
Creates a new Schema with set validation rules.

**Public Methods**:

### constructor(customValidator) ⇒ <code>[this](#Schema)</code>

Create new Schema.

| Param           | Type                                                                                          | Description          |
| --------------- | --------------------------------------------------------------------------------------------- | -------------------- |
| customValidator | <code>[CustomValidator](#CustomValidator) &#124; [CustomValidator](#CustomValidator)[]</code> | The custom validator |

<br>

### max(length, message) ⇒ <code>[this](#Schema)</code>

Set the maximum number of characters.

| Param      | Type                | Description                      |
| ---------- | ------------------- | -------------------------------- |
| length     | <code>number</code> | The maximum number of characters |
| \[message] | <code>string</code> | Custom error message             |

<br>

### min(length, message) ⇒ <code>[this](#Schema)</code>

Set the minimum number of characters.

| Param      | Type                | Description                      |
| ---------- | ------------------- | -------------------------------- |
| length     | <code>number</code> | The maximum number of characters |
| \[message] | <code>string</code> | Custom error message             |

<br>

### label(value) ⇒ <code>[this](#Schema)</code>

Add a label to pre-append to error messages.

| Param | Type                | Description                               |
| ----- | ------------------- | ----------------------------------------- |
| value | <code>number</code> | The label to pre-append to error messages |

<br>

### hasDigit(message) ⇒ <code>[this](#Schema)</code>

Set property to contain at least one digit character.

| Param      | Type                | Description          |
| ---------- | ------------------- | -------------------- |
| \[message] | <code>string</code> | Custom error message |

<br>

### hasSymbol(message) ⇒ <code>[this](#Schema)</code>

Set property to contain at least one special character.

| Param      | Type                | Description          |
| ---------- | ------------------- | -------------------- |
| \[message] | <code>string</code> | Custom error message |

<br>

### hasLowercase(message) ⇒ <code>[this](#Schema)</code>

Set property to contain at least one lowercase character.

| Param      | Type                | Description          |
| ---------- | ------------------- | -------------------- |
| \[message] | <code>string</code> | Custom error message |

<br>

### hasUppercase(message) ⇒ <code>[this](#Schema)</code>

Set property to contain at least one uppercase character.

| Param      | Type                | Description          |
| ---------- | ------------------- | -------------------- |
| \[message] | <code>string</code> | Custom error message |

<br>

### isRequired(message) ⇒ <code>[this](#Schema)</code>

Set property to be required.

| Param      | Type                | Description          |
| ---------- | ------------------- | -------------------- |
| \[message] | <code>string</code> | Custom error message |

<br>

### hasPattern(regExpPattern, message) ⇒ <code>[this](#Schema)</code>

Set a pattern to match.

| Param         | Type                              | Description          |
| ------------- | --------------------------------- | -------------------- |
| regExpPattern | <code>string &#124; RegExp</code> | The pattern to match |
| \[message]    | <code>string</code>               | Custom error message |

<br>

### hasMatchingProperty(name, message) ⇒ <code>[this](#Schema)</code>

Set property a form property to match.

| Param      | Type                | Description           |
| ---------- | ------------------- | --------------------- |
| name       | <code>string</code> | The property to match |
| \[message] | <code>string</code> | Custom error message  |

**Example:**

```javaScript
const form = { password: "Abc", confirmPassword: "def" };
const formSchema = {
  password: new Schema().hasUppercase(),
  confirmPassword: new Schema().hasMatchingProperty("password")
};
```

<br>

### getMatchingProperty() ⇒ <code>string</code>

Return the name of the property to match.

<br>

### addValidator(customValidator) ⇒ <code>[this](#Schema)</code>

Add custom validator(s).

| Param           | Type                                                                                           | Description          |
| --------------- | ---------------------------------------------------------------------------------------------- | -------------------- |
| customValidator | <code>[CustomValidator](#CustomValidator) &#124; [CustomValidator](#CustomValidator)\[]</code> | The custom validator |

<br>

### validate(value, options) ⇒ <code>[PropertyValidationResult](#PropertyValidationResult)</code>

Validate a given string.

| Param      | Type                                                 | Description                   |
| ---------- | ---------------------------------------------------- | ----------------------------- |
| value      | <code>string</code>                                  | The value to be validated     |
| \[options] | <code>[ValidationOptions](#ValidationOptions)</code> | The validation configurations |

<br>

### **PasswordSchema**

Create a Schema custom made for passwords.

**Public Properties:**

### strength

The level of password security. The higher the value (1-3), the more secure the
password, the more requirements are added to the password schema.

**Type:** <code>number</code>

<br>

**Public Methods:**

### constructor(strength) ⇒ <code>[PasswordSchema](#PasswordSchema)</code>

Create a Password Schema.

| Param       | Type                             | Description           |
| ----------- | -------------------------------- | --------------------- |
| \[strength] | <code>1 &#124; 2 &#124; 3</code> | The password security |

<br>

### validate(password, options) ⇒ <code>[PropertyValidationResult](#PropertyValidationResult)</code>

Validate a given password.

| Param      | Type                                                 | Description                   |
| ---------- | ---------------------------------------------------- | ----------------------------- |
| value      | <code>string</code>                                  | The password to be validated  |
| \[options] | <code>[ValidationOptions](#ValidationOptions)</code> | The validation configurations |

**Note:** A label of `Password` is automatically included in the schema. <br>

<br>

### **ValidateForm**

### validateForm(form, formSchema, options) ⇒ <code>[FormValidationResult](#FormValidationResult)</code>

Validate a form.

**Type:** <code>Function</code>

| Name       | Type                                                 | Description                     |
| ---------- | ---------------------------------------------------- | ------------------------------- |
| form       | <code>object</code>                                  | The form to be validated        |
| formSchema | <code>object</code>                                  | The schemas for the entire form |
| \[options] | <code>[ValidationOptions](#ValidationOptions)</code> | The validation configurations   |

**Example:**

```javaScript
const form = { password: 'abcd', username: 'def' };
const options = { includeLabel: true }
const formSchema = {
  password: new PasswordSchema(1),
  username: new Schema().hasDigit().label('Username');
};

const result = validateForm(form, formSchema, options);
/*
result: {
  isValid: false,
  errors: {
    username: ['Username must include at least one digit']
  }
}
*/
```

<br>

### **Validators**

Validator functions exported by the library:

| Name           | Description                                       |
| -------------- | ------------------------------------------------- |
| _isEmail_      | Check if input is a valid email address           |
| _hasDigit_     | Check if input includes a digit                   |
| _hasSymbol_    | Check if input includes a special character       |
| _hasMaximum_   | Check if input is of the specified maximum length |
| _hasMinimum_   | Check if input is of the specified minimum length |
| _hasPattern_   | Check if input matches given regex pattern        |
| _hasLowercase_ | Check if input includes an lowercase character    |
| _hasUppercase_ | Check if input includes an uppercase character    |

**Example:**

```javaScript
import { Validators } from "@fabrice/simple-validator";
// or
import isEmail from "@fabrice/simple-validator/lib";

const result = Validators.isEmail('abc@de'); // result: false
```

<br>

## Type Definitions

### CustomValidator

**Type:** <code>Object</code>

**Properties:**

| Name       | Type                                                 | Description                                       |
| ---------- | ---------------------------------------------------- | ------------------------------------------------- |
| \[input]   | <code>\*</code>                                      | Value with which the validator function is called |
| \[message] | <code>string</code>                                  | Custom error message                              |
| validator  | <code>[ValidatorCallback](#ValidatorCallback)</code> | Validator function to be called                   |

<br>

### ValidationOptions

**Type:** <code>Object</code>

**Properties:**

| Name            | Type                 | Description                                       |
| --------------- | -------------------- | ------------------------------------------------- |
| \[abortEarly]   | <code>boolean</code> | Value with which the validator function is called |
| \[includeLabel] | <code>boolean</code> | Custom error message                              |
| \[includeRules] | <code>boolean</code> | Validator function to be called                   |

<br>

### FormValidationResult

**Type:** <code>Object</code>

**Properties:**

| Name     | Type                 | Description                                                       |
| -------- | -------------------- | ----------------------------------------------------------------- |
| \[rules] | <code>object</code>  | The validation rules (present when `includeRules` is set to true) |
| errors   | <code>object</code>  | The errors present in the form                                    |
| isValid  | <code>boolean</code> | Property detailing whether the form was validated successfully    |

**Example:**

```javaScript
{
  rules: { password: { minLength: false } },
  errors: { password: { ["Must include a lowercase character"] },
  isValid: false
}
```

<br>

### PropertyValidationResult

**Type:** <code>Object</code>

**Properties:**

| Name     | Type                 | Description                                                       |
| -------- | -------------------- | ----------------------------------------------------------------- |
| \[rules] | <code>object</code>  | The validation rules (present when `includeRules` is set to true) |
| errors   | <code>array</code>   | The errors present in the property                                |
| isValid  | <code>boolean</code> | Property detailing whether the value was validated successfully   |

**Example:**

```javaScript
{
  rules: { minLength: false },
  errors: ["Must include a lowercase character"],
  isValid: false
}
```

### ValidatorCallback

validator(input, value, message) ⇒ <code>true &#124; false | message</code>

**Type:** <code>Function</code>

| Param      | Type                | Description                              |
| ---------- | ------------------- | ---------------------------------------- |
| \[input]   | <code>\*</code>     | Custom input to setup validator function |
| value      | <code>string</code> | The value to validate                    |
| \[message] | <code>string</code> | Custom error message                     |

**Returns:**

- `true` when value is successfully validate
- `false` when validation is unsuccessful
- `message` when validation is unsuccessful and a custom error message was
  provided

**Example**:

```javaScript
function minimumValidator(input, value, message) {
  const pattern = new RegExp("^.{0," + length + "}$");
  return pattern.test(value) || errorMessage || false;
}
```

<br>

## Contributing
Feel free to submit issues and requests!

1. **Fork** the project repository on Github
2. **Clone** the repository to your local machine
3. **Commit** changes to a new branch
4. **Push** your changes to your Github fork
5. Submit a **pull request** so your changes can be reviewed

## Acknowledgements
Special thanks to [Will Lambert](https://github.com/will-nemo) and [Sabien Jarmin](https://github.com/ambid17) for their help and support. This project is also supported by [oneleif](https://github.com/oneleif), an open source development team trying to develop great software.

[![](https://img.shields.io/badge/oneleif-Twitter-blue.svg)](https://twitter.com/oneleifdev)

[![](https://img.shields.io/badge/oneleif-YouTube-red.svg)](https://www.youtube.com/channel/UC3HN0jID38K0Vb_WChvgQmA)
