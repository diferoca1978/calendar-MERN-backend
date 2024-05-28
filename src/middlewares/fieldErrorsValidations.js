const { response } = require('express');
const { validationResult } = require('express-validator');

const fieldErrorsValidation = (req, res = response, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: validationErrors.mapped(),
    });
  }
  next();
};

module.exports = fieldErrorsValidation;
