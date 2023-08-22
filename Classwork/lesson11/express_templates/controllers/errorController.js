"use strict";

const httpStatus = require("http-status-codes");
//listing 11.2
//add middleware to handle errors
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack);   //log the error stack
  next(error);      //pass the error to the next middleware function
};
//listing 11.3
exports.respondNoResourceFound = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.send(`${errorCode} | The page does not exist!`);
  };

exports.respondInternalError = (error, req, res, next) => {     //catch all errors and respond with a 500 status code
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};
//middleware is being shared by adding exports. to it
//stack is a way of keeping track which method is running/being executed
//stack overflow is used when there is a lot of methods used