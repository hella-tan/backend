//server.js

var express = require('express');
var app = express();
var server = app.listen(8080, function () {
	console.log("server listening on 8080");
});
var io = require('socket.io').listen(server);
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/comment');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
var Comment = require('./app/models/comment');

var handleClient = function(socket) {
	console.log("hello");
};

io.on('connection', function(socket) {
	console.log("user connected");
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
	socket.on('post comment', function(req) {
		io.emit('post comment', req);
		var newComment = new Comment({
			comment: req.objMsg,
			username: req.objUser,
			reputation: 3,
			longitude: 123,
			latitude: 321,
			date: '12-2-1232',
			time: '23:34'
		}).save(function(err) {
			if(err)
				console.log(err);
			else
				console.log("comment posted");
		});
	});
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendfile(__dirname + '/public/' + 'index.html');
});