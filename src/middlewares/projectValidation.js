const {body, validationResult} = require('express-validator');

const postValidationRules = () => {
  return [
    body('name')
      .notEmpty().withMessage("name can't be empty")
      .trim().withMessage("name can't be blanks")
      .escape()
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({errors: errors.array()});
};

module.exports = {postValidationRules, validate};