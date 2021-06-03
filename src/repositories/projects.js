const { Projects } = require('./../models');

const addProject = async (name) => await Projects.create({name} )

module.exports = {
  addProject
}