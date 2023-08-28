"use strict";

const mongoose = require("mongoose"), //require mongoose
  { Schema } = mongoose;

var subscriberSchema = new Schema(
  {
    name: {   //add schema properties
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    zipCode: {
      type: Number,
      min: [10000, "Zip code too short"],
      max: 99999
    },
    courses: [    //associate multiple courses
      {
        type: Schema.Types.ObjectId,
        ref: "Course"
      }
    ]
  },
  {
    timestamps: true
  }
);
//getinfo is an instance method added to the subscriber schema to quickly pull any subscribers name, email & zipcode
subscriberSchema.methods.getInfo = function() { //add a getinfo instance method
  return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};
//exporting the subscriber model to make it accessible to other modules
module.exports = mongoose.model("Subscriber", subscriberSchema);
