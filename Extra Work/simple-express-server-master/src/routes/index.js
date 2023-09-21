//Get Meals MENU Controller 
mealsController = require("../controllers/mealsController");

//Function will be called from bootstrap (that will get the router and link routes with controllers)
exports.appRoute = router => {
  // /menu path is for getting the meals menu
  router.get("/menu", mealsController.getMenuController);
};
