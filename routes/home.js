var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Users = mongoose.model('User');
var cookies = require('cookies');
// var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
// var session = require('express-session')
app.use(cookieParser());

/* GET home page. */
exports.home = function(req,res){

	isLoggedIn = false;
	res.render('home');

};

exports.login = function(req,res){

	res.render('login');

};

exports.signup = function(req,res){

	res.render('signup');

};

exports.loginAuth = function(req,res){

	console.log(isLoggedIn);
	Users.findOne({user:req.body.name, passwd:req.body.password}, function (err, response) {
    	if(response){
      		// console.log(response.user);
      		isLoggedIn = true;
      		res.cookie('name', response.user, { maxAge: 900000000});
      		res.redirect('dashboard');
    	}
    	else{
      		// req.flash('info','Your username or password is incorrect');
      		res.send('Your username or password is incorrect');
    	}
  	});
};

exports.signupData = function(req,res){


	console.log(req.body.user);
	Users.findOne({user:req.body.user},function(err,resp){

		if(resp){

			res.send('Username already exists');

		}
		else{
			var newUser = new Users();
			newUser.user = req.body.user;
			newUser.email = req.body.email;
			newUser.passwd = req.body.passwd;
			newUser.save(function(err,resp){

				if(err)
					console.log(err);
				else{
					isLoggedIn = true;
					res.redirect('dashboard');
				}	
			});
		}
	});
};
