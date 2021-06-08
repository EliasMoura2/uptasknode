const userRepository = require('./../repositories/users');

const getRegister = async (req, res, next )=> {
  let data = {
    titlePage: 'Register'
  }
  res.render('createAccount', data);
};

const postRegister = async (req, res, next) => {
  const { email, password } = req. body;
  const user = await userRepository.addUser({email, password});
  if(!user){
    return next();
  }
  res.redirect('/auth/login');
};

const getLogin = async (req, res) => {

};

module.exports = {
  getRegister,
  postRegister,
  getLogin
}