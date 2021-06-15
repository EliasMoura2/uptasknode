const express = require('express');
const morgan = require('morgan');
const path = require('path');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./../src/middlewares/passport');

const routes = require('./routes');
const helpers = require('./utils/helpers');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false }));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(session({
  secret: process.env.SESSION_SECRET ||'mysecret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  res.locals.messages = req.flash();
  res.locals.user = {...req.user} || null;
  next();
});

app.use('/', routes);

app.use('*', (req, res, next) => {
  res.status(404).json({msg: 'Page not found'});
});

module.exports = app;
