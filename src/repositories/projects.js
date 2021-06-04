const { Projects } = require('./../models');

const findAllProjects = async () => await Projects.findAll({});
const addProject = async (project) => await Projects.create(project);
const findProjectUrl = async (url) => await Projects.findOne({where:{url}});
const findProjectById = async (id) => await Projects.findOne({where: {id}});
const updateProject = async (id, name) => await Projects.update({name}, {where: {id}});
const deleteProject = async (url) => await Projects.destroy({where: {url}});

module.exports = {
  findAllProjects,
  addProject,
  findProjectUrl,
  findProjectById,
  updateProject,
  deleteProject
}