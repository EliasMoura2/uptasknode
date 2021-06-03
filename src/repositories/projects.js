const { Projects } = require('./../models');

const addProject = async (project) => await Projects.create(project)

module.exports = {
  addProject
}