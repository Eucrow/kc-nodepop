var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var i18n = require("i18n");

// base de datos y modelos
require('./lib/connectMongoose');  //se ejecuta el código que hay en connectMongoose.js, que lo que hace es arrancar la
                                   // conexión con la base de datos
require('./models/Anuncio'); // lo cargamos para que mongoose sepa que existe el modelo
require('./models/Usuario');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// configure locales with i18n
i18n.configure({
    locales:['en', 'es'],
    directory: __dirname + '/locales',
    register: global
});
app.use(i18n.init);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/users', users);
app.use('/api/anuncios', require('./routes/api/anuncios'));
app.use('/api/usuarios', require('./routes/api/usuarios'));
app.use('/api/anuncios/tags', require('./routes/api/anuncios'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
