"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

var courseSchema = new Schema(
  {
    title: {    //require title and description
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    maxStudents: {    //default maxstudents and cost to 0, and disallow negative numbers
      type: Number,
      default: 0,
      min: [0, "Course cannot have a negative number of students"]
    },
    cost: {
      type: Number,
      default: 0,
      min: [0, "Course cannot have a negative cost"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Course", courseSchema);
