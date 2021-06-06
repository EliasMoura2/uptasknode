const repositoryProject = require('./../repositories/projects');
const repositoryTask = require('./../repositories/task');

const addTask = async (req, res, next) => {
  const { url } = req.params;
  const { name } = req.body;
  let state = 0;

  const project = await repositoryProject.findProjectUrl(url);
  const projectId = project.id;

  if(!name){
    let errors = [];
    const projects = await repositoryProject.findAllProjects();
    const tasks = await repositoryTask.findAllTasks(projectId)
    let data = {
      titlePage: 'Tasks Project',
      projects,
      project,
      tasks,
      errors
    }
    errors.push({"msg": "name can't be empty"});
    return res.render('tasks', data);
  }

  const result = await repositoryTask.addTask({ name, state, projectId });

  if(!result){
    return next();
  }
  res.redirect(`/projects/show/${url}`);
};

const updateStateTask = async (req, res, next) => {
  const { id } = req.params;
  let state = 0;

  const task = await repositoryTask.findTask(id);

  if(task.state === state){
    state = 1;
  }
  
  task.state = state;
  
  const result = await task.save();
  if(!result){
    return next();
  }

  res.status(200).send('Actualizado')
};

const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  const result = await repositoryTask.deleteTask(id);
  if(!result){
    return next();
  }
  res.status(200).send('Task deleted successfully');
}

module.exports = {
  addTask,
  updateStateTask,
  deleteTask
}