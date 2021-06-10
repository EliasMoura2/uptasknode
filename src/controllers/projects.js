const repositoryProject = require('./../repositories/projects');
const repositoryTask = require('./../repositories/task');

const getNewProject = async (req, res) => {
  const userId = res.locals.user.id;
  const projects = await repositoryProject.findAllProjects(userId);
  let data = {
    titlePage: 'New Project',
    projects
  }
  console.log(projects)
  res.render('newproject', data);
};

const postNewProject = async (req, res) =>{
  try {
    // validar que tengamos algo en el input
    const userId = res.locals.user.id;
    console.log(userId)
    const projects = await repositoryProject.findAllProjects(userId);
    console.log(projects)
    const { name } = req.body;
    let errors = [];
    
    if(!name){
      errors.push({"msg": "name can't be empty"});
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
      const userId = res.locals.user.id;
      await repositoryProject.addProject({ name, userId });
      res.redirect('/');
    }
  } catch (error) {
    console.log(error.message);
  }
}

const getProjectUrl = async (req, res, next) =>{
  const { url } = req.params;
  const userId = res.locals.user.id;
  const projectPromise = repositoryProject.findProjectUrl(url, userId);
  const projectsPromise = repositoryProject.findAllProjects(userId);

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
  const userId = res.locals.user.id;
  const projectsPromise = repositoryProject.findAllProjects(userId);
  const projectPromise = repositoryProject.findProjectById(id, userId);
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
    const userId = res.locals.user.id;
    const projects = await repositoryProject.findAllProjects(userId);
    const { name } = req.body;
    const { id } = req.params;

    console.log(name, req.params.name)
    let errors = [];
    
    if(!name){
      errors.push({"msg": "name can't be empty"});
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

module.exports = {
  getNewProject,
  getProjectUrl,
  postNewProject,
  getUpdateProject,
  putUpdateProject,
  deleteProject,
}