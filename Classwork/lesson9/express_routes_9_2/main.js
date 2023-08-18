"use strict";
//listing 9.4
const port = 3000,
  express = require("express"),
  app = express();

app.use(
  express.urlencoded({
    extended: false
  })
);  //tell your express.js application to parse URL-encoded data
app.use(express.json());

app.use((req, res, next) => {   
  console.log(`request made to: ${req.url}`);
  next();
});   //listing 9.4 up to here

//listing9.5
app.post("/", (req, res) => {   //create a new post route for the home page
  console.log(req.body);        //log the requests body
  console.log(req.query);
  res.send("POST Successful!");
});

app.get("/items/:vegetable", (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});