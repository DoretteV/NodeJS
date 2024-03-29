"use strict";

const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts"),
  //listing 13.5 
  MongoDB = require("mongodb").MongoClient, //require the mongodb module
  dbURL = "mongodb://localhost:27017",
  dbName = "recipe_db";
//set up a connection to the mongo db
MongoDB.connect(
  dbURL,
  (error, client) => {    //callback function
    if (error) throw error;   //exit
    //get the recipe_db database from your connection to the mongodb server
    let db = client.db(dbName);
    //find all the records in the contacts collection
    db.collection("contacts")
      .find()
      .toArray((error, data) => {
        if (error) throw error;
        console.log(data);    //print the results to the console
      });
//listing 13.6
    db.collection("contacts").insert( //insert a new contact into the database
      {
        name: "Freddie Mercury",
        email: "fred@queen.com"
      },
      (error, db) => {    
        if (error) throw error;
        console.log(db);  //log the resulting errors or saved item
      }
    );
  }
);

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