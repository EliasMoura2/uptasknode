const userRepository = require('./../repositories/users');
const passport = require('passport');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const sendEmail = require('./../handlers/email');

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

// genera un token si el usuario es valido
const sendToken = async (req, res) => {
  // verificar que un usuario exista
  const { email } = req.body;
  const user = await userRepository.findUserByEmail(email)
  // si no existe el usuario
  if(!user){
    req.flash('error', 'invalid Email');
    res.render('/auth/reset');
  }

  user.token = crypto.randomBytes(20).toString('hex');
  user.expiration = Date.now() + 3600000;
  
  await user.save();
  // reset url
  const resetUrl = `http://${req.headers.host}/auth/reset/${user.token}`;
  // envia un correo con el token
  await sendEmail.enviar({
    user,
    subject: 'Password reset',
    resetUrl,
    file: 'resetPassword' // view name
  })

  req.flash('correcto', 'A message was sent to your email');
  res.redirect('/auth/login');
};

const validTokenPassword = async (req, res) => {
  const user = await userRepository.findByToken(req.params.token);

  if(!user){
    req.flash('error', 'invalid token');
    res.redirect('/users/reset')
  }

  let data = {
    titlePage: 'Reset Password',
  }

  res.render('resetPassword', data)
}

const updatePassword = async (req, res) => {
  const { token } = req.params;
  const user = await userRepository.findUserValidToken(token);
  if(!user){
    req.flash('error', 'Invalid user');
    res.redirect('/reset')
  }


  //hashear el password
  user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  user.token = null;
  user.expiration = null;
  await user.save();
  req.flash('correcto', 'password changed successfully')
  res.redirect('/auth/login');
};

module.exports = {
  getFormRegister,
  postFormRegister,
  getFormLogin,
  authenticateUser,
  isUserAuthenticated,
  closeSession,
  sendToken,
  validTokenPassword,
  updatePassword
}