"use strict";

const express = require("express"),
  router = express.Router(),
  magic = require("../util/magic"),
  users = require("../domain/services/service-user"),
  auth = require('../domain/services/service-auth'),
  m = require('../util/middlewares/auth.middleware');
  

magic.LogInfo("[[ USERS ]]");
magic.LogInfo("[GET] = /users/");
magic.LogInfo("[GET] = /users/:id");
magic.LogSuccess("[POST] = /users/");
magic.LogWarning("[PATCH] = /users/:id");
magic.LogDanger("[DELETE] = /users/:id");

router.get("/users/", m.checkTokenMiddleware, users.GetAll);
router.get("/users/:id", users.GetById);
router.post("/users/", users.Store);
router.delete("/users/:id", users.DeleteById);
router.patch("/users/:id", users.UpdateById);

router.post("/login", auth.Login);
router.post("/register", auth.Register);

module.exports = router;
