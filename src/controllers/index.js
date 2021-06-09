const repository = require('./../repositories/projects');

const homePage = async (req, res, next )=> {
  console.log(res.locals.user)
  const projects = await repository.findAllProjects();  
  let data = {
    titlePage: 'UpTask',
    h1Title: 'Projects',
    projects: projects
  }
  res.render('index', data);
}

module.exports = {
  homePage
}