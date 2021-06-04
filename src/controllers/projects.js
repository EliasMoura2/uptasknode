const repository = require('./../repositories/projects');

const getNewProject = async (req, res) => {
  const projects = await repository.findAllProjects();
  let data = {
    titlePage: 'New Project',
    projects
  }
  res.render('newproject', data)
};

const postNewProject = async (req, res) =>{
  try {
    // validar que tengamos algo en el input
    const { name } = req.body;
    let errors = [];

    if(!name){
      errors.push({"msg": "name can't be emptyasda"});
    }

    let data = {
      titlePage: 'New Project',    
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
  postNewProject
}