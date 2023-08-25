"use strict";
//listing 18.9
const User = require("../models/user"); //requre the user model

module.exports = {
  index: (req, res, next) => {
    User.find() //run query in index action only
      .then(users => {  //render the index page with an array of users
        res.locals.users = users; //store the user data on the response and call the next middleware function
        next();
      })
      .catch(error => { //log error messages and redirect to the home page
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("users/index");  //render view in separate action
  }
};
