"use strict";

const express = require("express"),
  router = express.Router(),
  magic = require("../util/magic"),
  users = require("../domain/services/service-user"),
  auth = require('../domain/services/service-auth'),
  m = require('../util/middlewares/auth.middleware'),
  teams = require('../domain/services/service-team');
  

magic.LogInfo("[[ USERS ]]");
magic.LogInfo("[GET] = /users/");
magic.LogInfo("[GET] = /users/:id");
magic.LogSuccess("[POST] = /users/");
magic.LogWarning("[PATCH] = /users/:id");
magic.LogDanger("[DELETE] = /users/:id");

magic.LogInfo("[[ TEAMS ]]");

router.get("/users/", m.checkTokenMiddleware, users.GetAll);
router.get("/users/:id", users.GetById);
router.post("/users/", users.Store);
router.delete("/users/:id", users.DeleteById);
router.patch("/users/:id", users.UpdateById);

router.post("/login", auth.Login);
router.post("/register", auth.Register);

router.get("/teams/", teams.GetAll);
router.post("/teams/", m.checkTokenMiddleware, teams.Create);
router.get("/teams/:id", teams.GetById);
router.delete("/teams/:id", m.checkTokenMiddleware, teams.DeleteById);
router.patch("/teams/edit", m.checkTokenMiddleware, teams.UpdateById);
router.patch("/teams/add", m.checkTokenMiddleware, teams.AddUserById);
// router.delete("/teams/delete/user/:id", m.checkTokenMiddleware, teams.DeleteUserById);

module.exports = router;
