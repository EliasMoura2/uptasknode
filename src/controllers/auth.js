const userRepository = require('./../repositories/users');

const getRegister = async (req, res, next )=> {
  let data = {
    titlePage: 'Register'
  }
  res.render('createAccount', data);
};

const postRegister = async (req, res, next) => {
  const { email, password } = req. body;
  try {
    await userRepository.addUser({email, password});
    res.redirect('/auth/login');
  } catch (error) {
    req.flash('error', error.errors.map(error => error.message));
    let data = {
      titlePage: 'Register',
      messages: req.flash()
    }
    res.render('createAccount', data);
  }
};

const getLogin = async (req, res) => {
};

module.exports = {
  getRegister,
  postRegister,
  getLogin
}