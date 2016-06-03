var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./model/User');
require('./model/Poll');
var dburl = 'mongodb://saifee:bailamose@ds025772.mlab.com:25772/shorturl';
mongoose.connect(dburl);
isLoggedIn = false;
var Home = require('./routes/home');
var Dashboard = require('./routes/dashboard');
var Poll = require('./routes/polls');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
    next();
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(allowCrossDomain);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', Home.home);
app.get('/Login',Home.login);
app.get('/Signup',Home.signup);
app.post('/Login',Home.loginAuth);
app.post('/Signup',Home.signupData);
app.get('/dashboard', Dashboard.board);
app.get('/newPoll', Dashboard.newPoll);
app.post('/newPoll', Dashboard.newPollData);
app.get('/myPolls',Dashboard.view);
app.get('/myPolls/:id',Dashboard.viewOne);
app.get('/myPolls/:id/votedon/:vote',Dashboard.update);
app.post('/myPolls',Dashboard.delete);
app.post('/add/:id',Dashboard.add);
app.get('/Polls',Poll.view);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
