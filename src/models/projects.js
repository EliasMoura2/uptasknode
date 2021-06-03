'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    static associate(models) {
      // define association here
    }
  };
  Projects.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    timestamps: true,
    deletedAt: true,
    modelName: 'Projects',
  });
  return Projects;
};