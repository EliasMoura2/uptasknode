'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here
      User.hasMany(models.Projects);
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};