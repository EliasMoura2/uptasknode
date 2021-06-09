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

const isUserAuthenticated = (req, res, next) => {
  // si esta autenticado pasa
  if(req.isAuthenticated()){
    return next();
  }
  // si no esta autenticado redirige al formualio de login
  return res.redirect('/auth/login');
};

const closeSession = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
};

module.exports = {
  getFormRegister,
  postFormRegister,
  getFormLogin,
  authenticateUser,
  isUserAuthenticated,
  closeSession
}