const userRepository = require('./../repositories/users');

const getResetPassword = (req, res) => {
  let data = {
    titlePage: 'Reset Password',
  }
  res.render('reset', data);
};

module.exports = {
  getResetPassword
}