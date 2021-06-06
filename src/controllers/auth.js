const repository = require('./../repositories/projects');

const getRegister = async (req, res, next )=> {
  let data = {
    titlePage: 'Register'
  }
  res.render('createAccount', data);
};

module.exports = {
  getRegister
}