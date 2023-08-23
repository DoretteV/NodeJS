"use strict";
//listing 14.3
const mongoose = require("mongoose"),   //create a new schema with mongoose.Schema
  subscriberSchema = mongoose.Schema({
    name: String,       //add schema properties
    email: String,
    zipCode: Number
  });

module.exports = mongoose.model("Subscriber", subscriberSchema);    //export the subscriber model as the only module export