const express = require('express');
const morgan = require('morgan');
const path = require('path');

const routes = require('./routes');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', routes);

app.use('*', (req, res, next) => {
  res.status(404).json({msg: 'Page not found'});
});

module.exports = app;
