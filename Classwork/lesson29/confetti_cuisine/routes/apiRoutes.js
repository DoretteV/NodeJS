"use strict";
//listing 29.5
//require the express.js router and courseController
const router = require("express").Router(),
  coursesController = require("../controllers/coursesController");
//create a route for the courses data endpoint
router.get(
  "/courses",
  coursesController.index,
  coursesController.filterUserCourses,
  coursesController.respondJSON
);
//create a route to join a course by ID
router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);
//handle all API errors
router.use(coursesController.errorJSON);

module.exports = router;
