var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection('mongodb://saifee:bailamose@ds025772.mlab.com:25772/shorturl');

autoIncrement.initialize(connection);

var userSchema = new mongoose.Schema({
    user : String,
    email : String,
    passwd : String
});

userSchema.plugin(autoIncrement.plugin, 'User');

mongoose.model("User", userSchema);