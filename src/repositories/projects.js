const { Projects } = require('./../models');

const addProject = async (project) => await Projects.create(project);
const findAllProjects = async () => await Projects.findAll({});
const findProjectUrl = async (url) => await Projects.findOne({where:{url}});
const findProjectById = async (id) => await Projects.findOne({where: {id}});

module.exports = {
  findAllProjects,
  findProjectUrl,
  findProjectById,
  addProject,
}