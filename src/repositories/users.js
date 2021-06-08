const { User } = require('./../models');

const addUser = async (user) => await User.create(user);

module.exports = {
  addUser
}