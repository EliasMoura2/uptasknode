const userRepository = require('./../repositories/users');
const passport = require('passport');

const getFormRegister = async (req, res, next )=> {
  let data = {
    titlePage: 'Register'
  }
  res.render('createAccount', data);
};

const postFormRegister = async (req, res, next) => {
  const { email, password } = req. body;
  try {
    await userRepository.addUser({email, password});
    res.redirect('/auth/login');
  } catch (error) {
    req.flash('error', error.errors.map(error => error.message));
    let data = {
      titlePage: 'Register',
      messages: req.flash(),
      email,
    }
    res.render('createAccount', data);
  }
};

const getFormLogin = async (req, res, next )=> {
  const { error } = res.locals.messages;

  let data = {
    titlePage: 'Login',
    error
  }
  res.render('login', data);
};

const authenticateUser = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true,
  badRequestMessage: 'Both fields are required'
});

module.exports = {
  getFormRegister,
  postFormRegister,
  getFormLogin,
  authenticateUser,
}