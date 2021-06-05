const { Projects, Tasks } = require('./../models');

const findAllTasks = async (projectId) => {
  let result = await Tasks.findAll({
    where: {
      projectId
    },
    include: { 
      model: Projects,
      as: 'project',
      attributes: ['id', 'name', 'url']
    }
  });
  return result;
};

const addTask = async (task) => await Tasks.create(task);

module.exports = {
  findAllTasks,
  addTask
}