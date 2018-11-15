import Validator from "validatorjs";

class UserInputValidation {
  static loginInputValidation(req, res, next) {
    const { email, password } = req.body;
    const validation = new Validator(
      {
        email,
        password
      },
      {
        email: "required|string|email",
        password: "required"
      },
      {
        "required.email": "This :attribute is a required field.",
        "email.email": "Please enter a valid :attribute address.",
        "string.email": "Sorry, the :attribute has to be a string value.",
        "required.password": "This :attribute is a required field."
      }
    );
    if (validation.passes()) {
      return next();
    }
    return res.status(400).json({
      errors: validation.errors.all()
    });
  }
}

export default UserInputValidation;
