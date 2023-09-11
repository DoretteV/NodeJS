const express = require("express");
const path = require("path");
const app = new express();
const ejs = require("ejs");   //require ejs page 43
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost.js');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true});

app.set("view engine","ejs")  //tell express to use EJS as our templating engine page 43

app.use(express.static("public"));
//enables the app to handle POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',async (req,res)=>{
  const blogposts = await BlogPost.find({})
  res.render('index',{
  blogposts
  });
});

app.get("/about", (req, res) => {
  res.render('about');
});
app.get("/contact", (req, res) => {
  res.render('contact');
});

app.get('/posts/new',(req,res)=>{
  res.render('create')
  });  //open the create view

app.post('/posts/store', async (req, res) => {  // im receiving form data from the html form via a post request
  //do the create of a new blog entry
  await BlogPost.create(req.body, (error, blogpost) => {
  res.redirect('/');
  })
});

app.get('/post/:id',async (req,res)=>{
  const blogpost = await BlogPost.findById(req.params.id)
  .then(blogspot => {
    res.redirect('/')
  }) //when done redirect to homepage
  .catch(error => {
    console.log(error)
  })
});

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
