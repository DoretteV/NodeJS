"use strict";
//listing 14.5
const mongoose = require("mongoose"),   
  subscriberSchema = mongoose.Schema({    //create a new schema with mongoose.Schema
    name: String,       //add schema properties
    email: String,
    zipCode: Number
  });

module.exports = mongoose.model("Subscriber", subscriberSchema);    //export the subscriber model as the only module export