const { check } = require('express-validator');
const fieldErrorsValidation = require('./fieldErrorsValidations');
const { isDate } = require('../helpers/isDate');

const eventValidations = [
  check('title')
    .notEmpty()
    .withMessage('Mandatory field')
    .isLength({ min: 2, max: 30 })
    .withMessage('Must have min 2 & max 30 characters'),

  check('description')
    .notEmpty()
    .withMessage('Mandatory field')
    .isLength({ min: 10 })
    .withMessage('Must have min 10 characters'),

  check('start').notEmpty().withMessage('Mandatory field').custom(isDate),

  check('end').notEmpty().withMessage('Mandatory field').custom(isDate),
  fieldErrorsValidation,
];

module.exports = eventValidations;
