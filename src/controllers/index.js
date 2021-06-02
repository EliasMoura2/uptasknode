
const homePage = (req, res, next )=> {
  // res.send('Hello world!');
  let data = {
    titlePage: 'UpTask',
    h1Title: 'Projects'
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