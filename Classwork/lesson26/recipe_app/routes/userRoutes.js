"use strict";
//listing 26.1
//require express.js router and user controller
const router = require("express").Router(),
  usersController = require("../controllers/usersController");
//add CRUD routes
router.get("/", usersController.index, usersController.indexView);
router.get("/new", usersController.new);
router.post(
  "/create",
  usersController.validate,
  usersController.create,
  usersController.redirectView
);
//add login and authentication routes
router.get("/login", usersController.login);
router.post("/login", usersController.authenticate);
router.get("/logout", usersController.logout, usersController.redirectView);
router.get("/:id/edit", usersController.edit);
router.put("/:id/update", usersController.update, usersController.redirectView);
router.get("/:id", usersController.show, usersController.showView);
router.delete("/:id/delete", usersController.delete, usersController.redirectView);

module.exports = router;  //export the module router
