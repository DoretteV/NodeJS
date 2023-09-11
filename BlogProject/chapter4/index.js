const express = require("express");
const path = require("path");
const app = new express();
const ejs = require("ejs");   //require ejs page 43

app.set("view engine","ejs")  //tell express to use EJS as our templating engine page 43

app.use(express.static("public"));

app.get("/", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "public/pages/index.html"));
  res.render('index');  //will look in a 'views'folder for the file index.ejs page44
});

app.get("/about", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "public/pages/about.html"));
  res.render('about');
});
app.get("/contact", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "public/pages/contact.html"));
  res.render('contact');
});
app.get("/post", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "public/pages/post.html"));
  res.render('post');
});

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
