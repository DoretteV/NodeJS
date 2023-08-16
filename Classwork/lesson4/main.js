"use strict";

const port = 3000,
//Require the http and http status-codes modules.
  http = require("http"),
  httpStatus = require("http-status-codes"),    //http is a module
  //create the server with request and response parameter.
  app = http.createServer((request, response) => {
    console.log("Received an incoming request!");
    response.writeHead(httpStatus.OK, {
      "Content-Type": "text/html",
      //writing a response to the client.
    });

    let responseMessage = "<h1>Hello, Universe!</h1>";
    response.write(responseMessage);
    response.end();
    console.log(`Sent a response : ${responseMessage}`);
  });

//telling the application server to listen on port 3000.
app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
