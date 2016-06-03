var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Polls = mongoose.model('Poll');

exports.view = function(req,res){

	Polls.find(function(err,resp){

		if(err)
			console.log(err);
		else{

			console.log(resp);
			res.render('polls',{data:resp});
		}
	});
};