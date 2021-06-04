'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {

    static associate(models) {
      Tasks.belongsTo(models.Projects, {
        as: 'Projects',
        foreignKey: 'projectId',
      });
    }
  };
  Tasks.init({
    name: DataTypes.STRING(100),
    state: DataTypes.INTEGER(1)
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};