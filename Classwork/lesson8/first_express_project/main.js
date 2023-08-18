"use strict";
//listing 8.1 
const port = 3000,    
//add the express module to your application
  express = require("express"),
  //assign the express application to the app constant
  app = express();
//set up a get route for the home page
app.get("/", (req, res) => {
    res.send("Hello, Universe!"); //issue a response from the server to the client with res.send (callback)
  })
  .listen(port, () => {   //set up the application to listen at port 3000
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
  });

//express.js offers a way to define GET route and its callback function without building out an extra module
//If a request is made to the home page, express.js catches it and allows you to respond