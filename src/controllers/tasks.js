const repositoryProject = require('./../repositories/projects');
const repositoryTask = require('./../repositories/task');

const addTask = async (req, res, next) => {
  const { url } = req.params;
  const { name } = req.body;
  let state = 0;
  const project = await repositoryProject.findProjectUrl(url);
  const projectId = project.id;

  const result = await repositoryTask.addTask({ name, state, projectId });
  console.log(result)
  if(!result){
    return next();
  }
  res.redirect(`/projects/show/${url}`);
};

module.exports = {
  addTask,
}