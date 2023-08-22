"use strict";

const express = require("express"),     //require express
  app = express(),      //instantiate the express application
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts");     //require the express-ejs-layout module

app.set("view engine", "ejs");  //set the application to use ejs
app.set("port", process.env.PORT || 3000);
app.use(
  express.urlencoded({  //tell the express.js app to use body-parser for processing URL-encoded and JSON parameters
    extended: false
  })
);
app.use(express.json());
app.use(layouts);   //set the application to use the layout module
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/courses", homeController.showCourses);        //add routes for the courses page, contact page and contact form submission
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

app.use(errorController.pageNotFoundError); //add error handlers as middleware functions
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {     //set the application up to listen on port 3000
  console.log(`Server running at http://localhost:${app.get("port")}`);
});