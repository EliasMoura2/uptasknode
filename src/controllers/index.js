const repository = require('./../repositories/projects');

const homePage = async (req, res, next )=> {
  // res.send('Hello world!');
  const projects = await repository.findAllProjects();  
  let data = {
    titlePage: 'UpTask',
    h1Title: 'Projects',
    projects: projects
  }
  res.render('index', data);
}

const aboutMe = (req, res, next) => {
  // res.send('About me');
  res.render('about');
};

module.exports = {
  homePage,
  aboutMe
}