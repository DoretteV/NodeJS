"use strict";

const mongoose = require("mongoose"),
  subscriberSchema = mongoose.Schema({  //create a new schema with mongoose.Schema
    name: String,       //add schema properties
    email: String,
    zipCode: Number
  });
//export the subscriber model as the only module export
module.exports = mongoose.model("Subscriber", subscriberSchema);