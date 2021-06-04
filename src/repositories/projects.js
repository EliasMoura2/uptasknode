const { Projects } = require('./../models');

const addProject = async (project) => await Projects.create(project);

const findAllProjects = async () => await Projects.findAll({});

module.exports = {
  addProject,
  findAllProjects
}