"use strict";

const routeResponseMap = {  //define mapping of routes with responses
  "/info": "<h1>Info Page</h1>",    //localhost:300/info
  "/contact": "<h1>Contact Us</h1>",
  "/about": "<h1>Learn More About Us.</h1>",
  "/hello": "<h1>Say hello by emailing us here</h1>",
  "/error": "<h1>Sorry the page you are looking for is not here.</h1>",
};

const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  app = http.createServer((req, res) => {   //listen for requests
    res.writeHead(200, {
      "Content-Type": "text/html",
    }); //prepare for a response
    if (routeResponseMap[req.url]) {    //i entered a route like /info or /contact or /about or....
      res.end(routeResponseMap[req.url]);
    } else {    //i did not enter a route inside the above selection, i just entered localhost:3000
      res.end("<h1>Welcome!</h1>"); //respond with default HTML
    }
  });
app.listen(port);
console.log(`The server has started and is listening on port number:${port}`);
