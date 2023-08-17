"use strict";

const httpStatus = require("http-status-codes"),
  htmlContentType = {
    "Content-Type": "text/html"
  },
  routes = {            //define a routes object to store routes mapped to post and get requests.
    GET: {
      "/info": (req, res) => {
        res.writeHead(httpStatus.OK, {
          "Content-Type": "text/plain"
        });
        res.end("Welcome to the Info Page!");
      }
    },
    POST: {}
  };

exports.handle = (req, res) => {            //create a function called handle to process route callback functions.
  try {
    if (routes[req.method][req.url]) {
      routes[req.method][req.url](req, res);
    } else {
      res.writeHead(httpStatus.NOT_FOUND, htmlContentType);
      res.end("<h1>No such file exists</h1>");
    }
  } catch (ex) {
    console.log("error: " + ex);
  }
};
//build get and post functions to register routes from main.js
exports.get = (url, action) => {    //make available to other scripts outside this scripts
  routes["GET"][url] = action;
};

exports.post = (url, action) => {   //make available to other scripts outside this scripts
  routes["POST"][url] = action;
};