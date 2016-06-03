var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Polls = mongoose.model('Poll');
var Users = mongoose.model('User');

exports.board = function(req,res){

	if(isLoggedIn == true)
		res.render('dashboard');
	else
		res.redirect('login');

};

exports.newPoll = function(req,res){

	if(isLoggedIn == true)
		res.render('newPoll');
	else
		res.redirect('login');

};

exports.newPollData = function(req,res){

	if(isLoggedIn == true){
	// console.log(req.cookies.name);
		var nPoll = new Polls();
		nPoll.question = req.body['question'];
		nPoll.author = req.cookies.name;
		for (var key in req.body) {
  		
  			if (req.body.hasOwnProperty(key)) {
    			item = req.body[key];
    			nPoll.options.push(item);
  			}
		}
		nPoll.options.splice(0,1);
		nPoll.options.forEach(function() {
    		nPoll.votes.push(1);
  		});

  		nPoll.save(function(err,respo){

  			if(err)
  				console.log(err);
  			else{
  				// console.log(respo);
  				res.redirect('myPolls')
  			}
  		});
  	}
  	else
		res.redirect('login');
};

exports.view = function(req,res){

	if(isLoggedIn == true){

		Polls.find({author:req.cookies.name},function(err,ans){

			if(err)
				console.log(err);
			else{
				// console.log(ans[0]._id);
				res.render('myPolls',{data:ans});
			}

		});
	}
	else
		res.redirect('Login');

};

exports.viewOne = function(req,res){

	if(isLoggedIn == true){
		// console.log(req.params.id);
		Polls.findOne({_id:req.params.id},function(err,respo){

			// console.log(respo.question);
			if(err)
				console.log(err);
			else{
				res.render('onePoll',{data:respo});
			}

		});
	}
	else
		res.redirect('Login');
};

exports.delete = function(req,res){

	if(isLoggedIn == true){
		var k = "";
		for(var key in req.body){
			k = key;
		}
		Polls.findOne({question:k},function(err,poll){

			poll.remove(function(err,resp){

				if(err)
					console.log(err);
				else{
					console.log(resp);
					res.redirect('myPolls');
				}

			});

		});

	}
	else
		res.redirect('Login');
};

exports.update = function(req,res){

	var i = req.params.id;
	var v = req.params.vote;
	// console.log(req.params.id);
	// console.log(req.params.vote);
	if(isLoggedIn == true){

		Polls.findOne({_id:req.params.id},function(err,resp){

			if(err)
				console.log(err);
			else{
				// console.log(resp.question);
				resp.votes[v] = resp.votes[v] + 1;
				resp.markModified('votes');
				resp.save(function(err,changes){

					if(err)
						console.log(err);
					else{
						// console.log(changes.votes[0]);
						res.redirect('/myPolls/' + i);
					}
				});
			}
		});
	}
	else
		res.redirect('Login')
};

exports.add = function(req,res){

	// console.log(req.body);
	if(isLoggedIn == true){

		Polls.findOne({_id:req.params.id},function(err,resp){

			if(err)
				console.log(err);
			else{

				resp.options.push(req.body.option);
				resp.votes.push(1);
				resp.markModified('options');
				resp.markModified('votes');
				resp.save(function(err,out){

					if(err)
						console.log(err);
					else{
						// console.log(out);
						res.redirect('/myPolls/' + req.params.id);
					}
				});
			}

		});
	}
	else
		res.redirect('Login');

};