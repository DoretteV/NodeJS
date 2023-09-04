"use strict";
//identify the api routes
const router = require("express").Router(),
//require courses controller
  coursesController = require("../controllers/coursesController");

router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);
router.get(
  "/courses", //display all the courses
  coursesController.index,
  coursesController.filterUserCourses,
  coursesController.respondJSON //add the API route to the express.js router
);
//add API error-handling middleware
router.use(coursesController.errorJSON);  

module.exports = router;
