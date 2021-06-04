const { Tasks } = require('./../models');

const findAllTasks = async () => await Tasks.findAll({});

const addTask = async (task) => await Tasks.create(task);

module.exports = {
  findAllTasks,
  addTask
}