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

const findTask = async (id) => await Tasks.findOne({where: {id}});

const addTask = async (task) => await Tasks.create(task);

// const updateStateTask = async(id, properties) => await Tasks.update();

const deleteTask = async (id) => await Tasks.destroy({where: {id}});

module.exports = {
  findAllTasks,
  findTask,
  addTask,
  deleteTask
}