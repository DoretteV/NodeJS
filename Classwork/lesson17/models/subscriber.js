"use strict";
//listing 17.2
const mongoose = require("mongoose"); //define a subscriberSchema
const subscriberSchema = new mongoose.Schema({
  name: { //require the name property
    type: String,
    required: true
  },
  email: {  //require the email property and add the lowercase property
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  zipCode: {  //set up the zipCode property with a custom error message
    type: Number,
    min: [10000, "Zip code too short"],
    max: 99999
  },
  //stores the course object id in this array
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
  //if you remove the [] it will only allow one course per user
  //with [] one to many without [] its one to one relationship
});
//listing 17.3 add an instance method to get the full name of a subscriber
subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};
//add an instance method to find subscribers with the same zipcode
subscriberSchema.methods.findLocalSubscribers = function() {
  return this.model("Subscriber")
    .find({ zipCode: this.zipCode })
    .exec();  //access the subscriber model to use the find method
};
//this line allows you to require the subscriber model directly by importing this module in another file
module.exports = mongoose.model("Subscriber", subscriberSchema);
