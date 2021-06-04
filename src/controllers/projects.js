const repository = require('./../repositories/projects');

const getProjectUrl = async (req, res, next) =>{
  const { url } = req.params;
  const projects = await repository.findAllProjects();
  const project = await repository.findProjectUrl(url);
  if(!project) return next();

  let data = {
    titlePage: 'Tasks Project',
    projects,
    project
  }
  res.render('tasks', data);
};

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

module.exports = {
  getNewProject,
  getProjectUrl,
  postNewProject,
}