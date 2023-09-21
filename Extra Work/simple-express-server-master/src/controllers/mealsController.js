//Import Meals Model for database data 
const mealModel = require("../models/mealModel");

//menu controller takes the request, response and next object
exports.getMenuController = (req, res, next) => {
  //Get menu meals from model (Array)
  const meals = mealModel.getMeals();
  //Pass it the meals array to render (that's how you feed data into views)
  res.render("menu", { meals });
};
