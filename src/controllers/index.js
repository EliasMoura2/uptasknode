
const homePage = (req, res, next )=> {
  res.send('Hello world!');
}

const aboutMe = (req, res, next) => {
  res.send('About me');
};

module.exports = {
  homePage,
  aboutMe
}