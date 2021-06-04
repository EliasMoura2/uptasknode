const repository = require('./../repositories/projects');


const getNewProject = async (req, res) => {
  const projects = await repository.findAllProjects();
  let data = {
    titlePage: 'New Project',
    projects
  }
  res.render('newproject', data);
};

const postNewProject = async (req, res) =>{
  try {
    // validar que tengamos algo en el input
    const projects = await repository.findAllProjects();
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
      const project = await repository.addProject({ name });
      res.redirect('/');
    }
  } catch (error) {
    console.log(error.message);
  }
}

const getProjectUrl = async (req, res, next) =>{
  const { url } = req.params;
  const projectPromise = repository.findProjectUrl(url);
  const projectsPromise = repository.findAllProjects();

  const [project, projects] = await Promise.all([projectPromise, projectsPromise]);
  
  if(!project) return next();

  let data = {
    titlePage: 'Tasks Project',
    projects,
    project
  }
  res.render('tasks', data);
};

const getUpdateProject = async (req, res) => {
  const projectsPromise = repository.findAllProjects();
  const projectPromise = repository.findProjectById();
  let data = {
    titlePage: 'Edit Project',
    projects,
    project
  };
  const [project, projects] = await Promise.all([projectPromise, projectsPromise]);
  res.render('newproject', data)
};

const putUpdateProject = async (req, res) => {

}

module.exports = {
  getNewProject,
  getProjectUrl,
  postNewProject,
  getUpdateProject,
  putUpdateProject
}