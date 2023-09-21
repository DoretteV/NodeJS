route = require("./routes");

//Default function that will bootstrap the routes and link it with controllers
module.exports = (app, router) => {
  //Initialize Routes
  route.appRoute(router);
};
