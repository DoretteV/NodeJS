"use strict";
//listing 15.1
const Subscriber = require("../models/subscriber"); //require the subscriber module
//export getAllSubscribers to pass data from the database to the next middleware function
exports.getAllSubscribers = (req, res) => {
  //promise instead of a callback
  Subscriber.find({})
    .exec() //return a promise from the find query
    .then(subscribers => {  //send saved data to the next then code block
      res.render("subscribers", {
        subscribers: subscribers
      }); //serve the results from the database
    })
    .catch(error => { //catch errors that are rejected in the promise
      console.log(error.message);
      return [];
    })
    .then(() => { //end the promise chain with a log message
      console.log("promise complete");
    });
};
//listing 15.6
exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
};
//listing 15.8
exports.saveSubscriber = (req, res) => {
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode
  });
  newSubscriber
    .save() //save a new subscriber with a promise return
    .then(result => {
      res.render("thanks");
    })
    .catch(error => {
      if (error) res.send(error);
    });
};
