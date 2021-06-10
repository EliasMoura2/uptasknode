const repository = require('./../repositories/projects');

const homePage = async (req, res, next )=> {
  const userId = res.locals.user.id;
  const projects = await repository.findAllProjects(userId);  
  let data = {
    titlePage: 'UpTask',
    h1Title: 'Projects',
    projects
  }
  res.render('index', data);
}

module.exports = {
  homePage
}