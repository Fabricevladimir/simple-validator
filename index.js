module.exports = {
    Schema: require("./core/Schema"),
    Validators: require("./lib"),
    validateForm: require("./core/utils").validateForm,
    PasswordSchema: require("./core/PasswordSchema"),
  };