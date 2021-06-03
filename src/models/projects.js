'use strict';
const { Model } = require('sequelize');
const slug = require('slug');
const shortId = require('shortid');

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
    hooks:{
      beforeCreate(project){
        const url = slug(project.name).toLowerCase();
        project.url = `${url}-${shortId.generate()}`;
      }
    }
  });
  return Projects;
};