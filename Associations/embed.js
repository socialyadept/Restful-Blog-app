var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog_demo');

var userSchema = mongoose.Schema({
    name: String, 
    email: String
});

var User = mongoose.model('User', userSchema);

//creating a post schema
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model('Post', postSchema);

var newUser = new User({
    email: 'charlie@brown.edu',
    name: "Charlie Brown"
});

newUser.save(function(err, user){
    if(err){
        console.log(err);
    } else{
        console.log(user);
    }
});

var newPost = new Post({
    title: "Refelctions on apples",
    content: "they are delicious"
});

newPost.save(function(err, post){
    if(err){
        console.log(err);
    }
    else{
        console.log(post);        
    }
});





