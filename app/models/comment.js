// app/models/comment.js

var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
	comment: String,
	username: String,
	reputation: Number,
	longitude: Number,
	latitude: Number,
	date: String,
	time: String
});

module.exports = mongoose.model('Comment', CommentSchema);