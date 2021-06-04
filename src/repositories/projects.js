const { Projects } = require('./../models');

const addProject = async (project) => await Projects.create(project);

const findAllProjects = async () => await Projects.findAll({});
const findProjectUrl = async (url) => {
  let result = await Projects.findOne({where:{url}})
  return result;
};

module.exports = {
  findAllProjects,
  findProjectUrl,
  addProject,
}