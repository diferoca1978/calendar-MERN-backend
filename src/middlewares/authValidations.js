const { check } = require('express-validator');
const fieldErrorsValidation = require('./fieldErrorsValidations');

const singUpValidations = [
  check('name')
    .notEmpty()
    .withMessage('Mandatory field')
    .isLength({ min: 2, max: 30 })
    .withMessage('Must have min 2 & max 30 characters'),

  check('email')
    .notEmpty()
    .withMessage('Mandatory field')
    .isEmail()
    .withMessage('Insert a valid email'),

  check('password')
    .notEmpty()
    .withMessage('Mandatory field')
    .isLength({ min: 3 })
    .withMessage('Must have min 3 characters'),
  fieldErrorsValidation,
];

const singInValidations = [
  check('email')
    .notEmpty()
    .withMessage('Mandatory field')
    .isEmail()
    .withMessage('Insert a valid email'),

  check('password')
    .notEmpty()
    .withMessage('Mandatory field')
    .isLength({ min: 3 })
    .withMessage('Must have min 3 characters'),
  fieldErrorsValidation,
];

module.exports = {
  singUpValidations,
  singInValidations,
};
