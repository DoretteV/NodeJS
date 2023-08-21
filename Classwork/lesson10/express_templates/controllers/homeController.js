"use strict";

exports.sendReqParam = (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
};

exports.respondWithName = (req, res) => {       //adding a function respondWithName
  res.render("index");      //respond with a custom EJS view
};