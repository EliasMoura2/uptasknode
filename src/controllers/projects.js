const repositoryProject = require('./../repositories/projects');
const repositoryTask = require('./../repositories/task');

const getNewProject = async (req, res) => {
  const projects = await repositoryProject.findAllProjects();
  let data = {
    titlePage: 'New Project',
    projects
  }
  res.render('newproject', data);
};

const postNewProject = async (req, res) =>{
  try {
    // validar que tengamos algo en el input
    const projects = await repositoryProject.findAllProjects();
    const { name } = req.body;
    let errors = [];
    
    if(!name){
      errors.push({"msg": "name can't be emptyasda"});
    }
    
    let data = {
      titlePage: 'New Project',
      projects  
    }
    if(errors.length > 0){
      data.errors = errors;
      res.render('newproject', data)
    } else {
      // Insert DB
      const project = await repositoryProject.addProject({ name });
      res.redirect('/');
    }
  } catch (error) {
    console.log(error.message);
  }
}

const getProjectUrl = async (req, res, next) =>{
  const { url } = req.params;
  const projectPromise = repositoryProject.findProjectUrl(url);
  const projectsPromise = repositoryProject.findAllProjects();

  const [project, projects] = await Promise.all([projectPromise, projectsPromise]);

  const tasks = await repositoryTask.findAllTasks(project.id);
  
  if(!project) return next();

  let data = {
    titlePage: 'Tasks Project',
    projects,
    project,
    tasks
  }
  res.render('tasks', data);
};

const getUpdateProject = async (req, res) => {
  const { id } = req.params;
  const projectsPromise = repositoryProject.findAllProjects();
  const projectPromise = repositoryProject.findProjectById(id);
  const [project, projects] = await Promise.all([projectPromise, projectsPromise]);
  let data = {
    titlePage: 'Edit Project',
    projects,
    project
  };
  res.render('newproject', data)
};

const putUpdateProject = async (req, res) => {
  try {
    // validar que tengamos algo en el input
    const projects = await repositoryProject.findAllProjects();
    const { name } = req.body;
    const { id } = req.params;

    console.log(name, req.params.name)
    let errors = [];
    
    if(!name){
      errors.push({"msg": "name can't be emptyasda"});
    }
    
    let data = {
      titlePage: 'New Project',
      projects  
    }
    if(errors.length > 0){
      data.errors = errors;
      res.render('newproject', data)
    } else {
      // Insert DB
      await repositoryProject.updateProject(id, name);
      res.redirect('/');
    }
  } catch (error) {
    console.log(error.message);
  }
}

const deleteProject = async (req, res, next) => {
    // const { urlProject } = req.query;
    const { url } = req.params;
    const result = await repositoryProject.deleteProject(url);
    if(!result){
      return next();
    }
    res.status(200).send('Project deleted successfully');
}

const updateStateTask = async (req, res, next) => {
  const { url, id } = req.params;
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

module.exports = {
  getNewProject,
  getProjectUrl,
  postNewProject,
  getUpdateProject,
  putUpdateProject,
  deleteProject,
  updateStateTask
}