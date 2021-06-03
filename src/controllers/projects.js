const repository = require('./../repositories/projects');

const getNewProject = (req, res) => {
  let data = {
    titlePage: 'New Project'
  }
  res.render('newproject', data)
};

const postNewProject = async (req, res) =>{
  // validar que tengamos algo en el input
  const { name, url } = req.body;
  let errors = [];
  console.log(name)

  if(!name){
    errors.push({"msg": "name can't be empty"});
  }

  let data = {
    titlePage: 'New Project',    
  }
  if(errors.length > 0){
    data.errors = errors;
    res.render('newproject', data)
  } else {
    // Insert DB
    const res = await repository.addProject(name);
    data.project = res.dataValues;
    res.render('newproject', data);
  }
}

module.exports = {
  getNewProject,
  postNewProject
}