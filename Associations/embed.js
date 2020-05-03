var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog_demo', {useNewUrlParser: true, useUnifiedTopology: true});


//creating a post schema
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var userSchema = mongoose.Schema({
    name: String, 
    email: String,
    post: [postSchema]
});

var Post = mongoose.model('Post', postSchema);

// var newPost = new Post({
//     title: "Refelctions on apples",
//     content: "they are delicious"
// });

// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(post);        
//     }
// });



// var User = mongoose.model('User', userSchema);

// var newUser = new User({
//     email: 'charlie@brown.edu',
//     name: "Charlie Brown"
// });

// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(user);
//     }
// });

// newUser.post.push(newPost);

Post.deleteOne({title: "Refelctions on apples"}, function(err){
    if(err) throw err;
    else{
        console.log("successfully deleted");
        
    }
});

Post.find({}, function(err, post){
    if(err) throw err;
    else{
        console.log(post);
        
    }
});








