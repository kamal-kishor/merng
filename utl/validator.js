import validator from "validator";

const validateRegisterInput = (username, password, confirmPassword, email) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "UserNmame not be empty";
  }

  if (email.trim() === "") {
    errors.email = "email not be empty";
  } else {
    if (!validator.isEmail(email)) {
      errors.email = "Email must be a valid address";
    }
  }

  if (password.trim() === "") {
    errors.password = "Password must not be Empty";
  } else if (password !== confirmPassword)
    [(errors.confirmPassword = "Password are not Matched")];

  return { errors, valid: Object.keys(errors).length < 1 };
};

const validateLoginInput = (email, password) => {
  const errors = {};

  if (email === "") {
    errors.email = "email not be empty";
  } else {
    if (!validator.isEmail(email)) {
      errors.email = "Email must be a valid address";
    }
  }

  if (password.trim() === "") {
    errors.password = "Password must not be Empty";
  }
  return { errors, valid: Object.keys(errors).length < 1 };
};

export { validateRegisterInput, validateLoginInput };
