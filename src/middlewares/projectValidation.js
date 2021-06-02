const {check, validationResult} = require('express-validator');

const postValidationRules = () => {
  return [
    check('name')
      .notEmpty().withMessage("name can't be empty")
      .isLength({
        max: 4,
      }).withMessage("The project name cant't have more 20 characters")
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