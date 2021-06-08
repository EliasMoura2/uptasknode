const express = require('express');
const morgan = require('morgan');
const path = require('path');
const flash = require('connect-flash');

// import routes appdefinir
const routes = require('./routes');
// helpers con algunas funciones
const helpers = require('./utils/helpers');
// crear una app de express
const app = express();
// Habilitar pug como view engine
app.set('view engine', 'pug');
// añadir la carpeta de vistas
app.set('views', path.join(__dirname, '/views'));
// archivos estaticos
app.use('/public', express.static(path.join(__dirname, 'public')))
// pasar vardum a la aplicaicon
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  next();
});
// morgan logger
app.use(morgan('dev'));
// habiliar para leer datos de un formulario
app.use(express.urlencoded({extended: false }));
// habilitar para leer json 
app.use(express.json());

// definir las rutas
app.use('/', routes);

app.use('*', (req, res, next) => {
  res.status(404).json({msg: 'Page not found'});
});

module.exports = app;
