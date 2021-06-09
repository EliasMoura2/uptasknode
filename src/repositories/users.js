const { User } = require('./../models');

const addUser = async (user) => await User.create(user);

const findUserByEmail = async(email) => await User.findOne({where: {email}});

module.exports = {
  addUser,
  findUserByEmail
}