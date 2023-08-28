"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose"),
  Subscriber = require("./subscriber");

var userSchema = new Schema(
  {
    name: { //add first and last name attributes
      first: {
        type: String,
        trim: true
      },
      last: {
        type: String,
        trim: true
      }
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    zipCode: {
      type: Number,
      min: [1000, "Zip code too short"],
      max: 99999
    },
    password: {   //require a password
      type: String,
      required: true
    },
    //associate users with subscribers
    subscribedAccount: { type: Schema.Types.ObjectId, ref: "Subscriber" },
    //associate users with multiple courses
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }]
  },
  {
    timestamps: true  //add timestamp property
  }
);
//add the fullname virtual attribute
userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
});
//add a pre(save) hook to link a subscriber
userSchema.pre("save", function(next) {
  let user = this;
  if (user.subscribedAccount === undefined) { //check for a linked subscriberAccount
    Subscriber.findOne({
      email: user.email
    })  //search the subscriber model for documents that contain that users email.
      .then(subscriber => {
        user.subscribedAccount = subscriber;
        next(); //call the next middleware function
      })
      .catch(error => {
        console.log(`Error in connecting subscriber: ${error.message}`);
        next(error);
      });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
