"use strict";
//listing 9.7
const port = 3000,
  express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"); //require home controller file into your application 

app.use(
  express.urlencoded({
    extended: false
  })
);            //tell express.js application to parse URL-encoded data
app.use(express.json());

app.use((req, res, next) => {     //define a middleware function
  console.log(`request made to: ${req.url}`); //log the requests path to console
  next();   //call the next function
});

app.post("/", (req, res) => {   //create a new post route
  console.log(req.body);        //log the request body
  console.log(req.query);
  res.send("POST Successful!");
});
//when a request is made to this path the function assigned to sendreqparam in the home controller is run
app.get("/items/:vegetable", homeController.sendReqParam);  //handle GET requests to "/items/:vegetable."

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});