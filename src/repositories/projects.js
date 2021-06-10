const { Projects } = require('./../models');
const { Op } = require('sequelize');

const findAllProjects = async (userId) => await Projects.findAll({where: { userId }});
const addProject = async (project) => await Projects.create(project);
const findProjectUrl = async (url, userId) => await Projects.findOne({where:{ url: url, userId: userId }});
const findProjectById = async (id) => await Projects.findOne({where: {id, userId}});
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