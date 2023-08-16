"use strict";

const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  app = http.createServer();

const getJSONString = obj => {
  return JSON.stringify(obj, null, 2);
};

app.on("request", (req, res) => {   //listen for request
  var body = [];    //creating an array to hold chunck contents

  req.on("data", bodyData => {  //adding received data to the body array
    body.push(bodyData);
  });

  req.on("end", () => {     //run code when data transmission ends
    body = Buffer.concat(body).toString();      //converting the body array to a string of text
    console.log(`Request Body Contents: ${body}`);  //log the requests contents to your console
  });

  console.log(`Method: ${getJSONString(req.method)}`);
  console.log(`URL: ${getJSONString(req.url)}`);
  console.log(`Headers: ${getJSONString(req.headers)}`);
  res.writeHead(httpStatus.OK, {
    "Content-Type": "text/html"
  });

  let responseMessage = "<h1>This will show on the screen.</h1>";
  res.end(responseMessage);
});

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
