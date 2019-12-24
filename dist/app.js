'use strict';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const winston = require('./lib/winston');
var indexRouter = require('./lib/router');
const bodyparser = require('body-parser');
const RequestError = require('./../errors/request');
require("babel-core/register");
require("babel-polyfill");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('combined', { stream: winston.stream }));
app.use(cookieParser());
app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  new RequestError(err.status || 500, err.message);
  // winston.error();

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;