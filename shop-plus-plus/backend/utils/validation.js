import { check, validationResult } from "express-validator";

const manageErrors = (cb) => (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  cb(errors.array(), req, res);
};

export const loginUserValidation = [
  check("email").isEmail().withMessage("'email' is missing or is invalid"),
  check("password").notEmpty().withMessage("'password' is empty"),
  manageErrors((error, req, res) => res.status(422).json({ error })),
];

export const signUpUserValidation = [
  check("email").isEmail().withMessage("'email' is missing or is invalid"),
  check("name").notEmpty().withMessage("'name' is empty").trim().escape(),
  check("password")
    .notEmpty()
    .withMessage("'password' is empty")
    .isLength({ min: 6 })
    .withMessage("'password' must have atleast 6 characters"),
  check('phone').notEmpty().withMessage("'phone number cannot be empty"),
  manageErrors((error, req, res) => res.status(422).json({ error })),
];

export const jwtValidation = [
  check("token").isJWT().notEmpty(),
  manageErrors((error, req, res) => res.status(422).json({ error })),
];