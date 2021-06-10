const { User } = require('./../models');
const { Op } = require('sequelize');

const addUser = async (user) => await User.create(user);

const findUserByEmail = async(email) => await User.findOne({where: {email}});

const findByToken = async (token) => await User.findOne({where:{token}});

const findUserValidToken = async (token) => await User.findOne({
  where:{ 
    token,
    expiration: {
      [Op.gte]: Date.now()
    }
  },
})
module.exports = {
  addUser,
  findUserByEmail,
  findByToken,
  findUserValidToken
}