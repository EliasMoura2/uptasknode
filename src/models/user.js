'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // define association here
      Users.hasMany(models.Projects,{
        as: 'user',
        foreignKey: 'userId',
      });
    }
  };

  Users.init({
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "E-mail can't be empty"
        },
        isEmail:{
          msg: 'invalid e-mail'
        },
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password can't be empty"
        }
      }
    },
    token: {
      type: DataTypes.STRING
    },
    expiration: {
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate(user){
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
      }
    }
  });

  Users.prototype.verifyPassword = function (password){
    return bcrypt.compareSync(password, this.password)
  };
  return Users;
};