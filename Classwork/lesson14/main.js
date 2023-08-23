"use strict";

const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),   //require mongoose
  Subscriber = require("./models/subscriber");//imports the subscriber schema
//listing 14.1
mongoose.connect(
  "mongodb://localhost:27017/recipe_db",    //set up the connection to your database
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);
const db = mongoose.connection;   //assign the database to the db variable

//listing 14.2
db.once("open", () => {   //log a message when the application connects to the database
  console.log("Successfully connected to MongoDB using Mongoose!");
});
//listing 14.6
var myQuery = Subscriber.findOne({    //finding a person where the email contains wexler
  name: "Jon Wexler"
}).where("email", /wexler/);

myQuery.exec((error, data) => {
  if (data) console.log(data.name);
});     //run a query with a callback function to handle errors and data

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});