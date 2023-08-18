"use strict";
//listing 9.6
//moving route callback functions to the home controller and add them to that module's exports object
//assign exports.sendreqparam to the callback function
exports.sendReqParam = (req, res) => {  //create a function to handle route-specific requests
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
};
