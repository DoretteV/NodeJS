"use strict";
//listing 18.1
const mongoose = require("mongoose"),
  { Schema } = mongoose,
  userSchema = new Schema(    //create the user schema
    {
      name: {   //add first and last name properties
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
      password: {   //add a password property
        type: String,
        required: true
      },
      courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],  //add a courses property to connect users to courses
      subscribedAccount: {  //add a subscriberAccount to connect users to subscribers
        type: Schema.Types.ObjectId,
        ref: "Subscriber"
      }
    },
    {
      timestamps: true  //add a timestamps property to record createdAt and updatedAt dates.
    }
  );
//listing 18.2
userSchema.virtual("fullName").get(function() { //add a virtual attribute to get the user's full name
  return `${this.name.first} ${this.name.last}`;
});
module.exports = mongoose.model("User", userSchema);
