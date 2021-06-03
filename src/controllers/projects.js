const repository = require('./../repositories/projects');

const getNewProject = (req, res) => {
  let data = {
    titlePage: 'New Project'
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
      const project = await repository.addProject({ name, url });
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