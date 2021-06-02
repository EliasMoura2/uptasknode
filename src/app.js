const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res, next )=> {
  res.status(200).json({msg: 'Hello world!'});
});

app.use('*', (req, res, next) => {
  res.status(404).json({msg: 'Page not found'});
});

module.exports = app;
