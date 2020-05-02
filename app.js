var express = require('express'),
app         = express(),
mongoose    = require('mongoose'),
bodyParser  = require('body-parser'),
methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/restful_blog_app', {useNewUrlParser: true, useUnifiedTopology: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

var Blog = new mongoose.model('Blog', blogSchema);

Blog.create({
  title: "Test Blog",
  image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80',
  body: "Hello this is a default post!"
}, function(err, Blog){
  if (err){
    console.log("opps unexpected error occured while creating the blog");
  } else {
    console.log("blog created successfully");
  }
});

Blog.find({}, function(err, blog){
  if(err)
  {
    console.log(err);
  } else{
    console.log(blog);
  }
})

app.get('/', function(req, res){
  res.render('blogs')
});

app.get('/blogs', function(req, res){
  Blog.find({}, function(err, blog){
    if (err) {
      console.log("An error  occured in database " + err);
    } else{
      res.render('index', {blogs: blog});
    }
  })
});

app.get('/blogs/new', function(req, res){
  res.render('new');
});

app.post('/blogs', function(req, res){

  Blog.create(req.body, function(err, blog){
    if(err){
      console.log(err + " this is the error log");
    } else {
      res.redirect('/blogs')
    }
  });
});

app.get('/blogs/:id', function(req, res){
  Blog.findById(req.params.id, function(err, blog){
    if (err){
      res.redirect('/blogs');
    } else{
      res.render('show', {singleBlog
        : blog});
    }
  });
});

app.get('/blogs/:id/edit', function(req, res){
  Blog.findById(req.params.id, function(err, blog){
    if(err){
      console.log(err);
    } else{
      res.render('edit', {blog: blog});
    }
  });
});

app.put('/blogs/:id', function(req, res){
  Blog.findByIdAndUpdate(req.params.id, req.body, function(err, updatedBlog){
    if(err){
      res.redirect('/blogs');
    } else{
      console.log(req.body);
      res.redirect('/blogs/' + req.params.id)
    }
  });
});

app.delete('/blogs/:id', function(req, res){
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
    } else{
      res.redirect('/blogs');
    }
  });
});

app.listen('8888', function(){
  console.log("\nServer started Successfully");
});
