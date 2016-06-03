var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection('mongodb://saifee:bailamose@ds025772.mlab.com:25772/shorturl');

autoIncrement.initialize(connection);

var pollSchema = new mongoose.Schema({
  question: String,
  author: String,
  options: [String],
  votes: [Number]
});

pollSchema.plugin(autoIncrement.plugin, 'Poll');

mongoose.model("Poll", pollSchema);