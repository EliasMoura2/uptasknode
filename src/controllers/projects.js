
const getNewProject = (req, res) => {
  let data = {
    titlePage: 'New Project'
  }
  res.render('newproject', data)
};

const postNewProject = (req, res) =>{
  // validar que tengamos algo en el input
  const { name } = req.body;
  let errors = [];

  if(!name){
    errors.push({"msg": "name can't be empty"});
  }

  if(errors.length > 0){
    let data = {
      titlePage: 'New Project2',
      errors      
    }
    console.log(errors)
    res.render('newproject', data)
  }
}

module.exports = {
  getNewProject,
  postNewProject
}