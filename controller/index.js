"use strict";

const express = require("express"),
  router = express.Router(),
  magic = require("../util/magic"),
  users = require("../domain/services/service-user"),
  auth = require('../domain/services/service-auth'),
  m = require('../util/middlewares/auth.middleware'),
  teams = require('../domain/services/service-team'),
  projectManagementEvent = require('../domain/services/service-project-management-event'),
  teamProjectManagementEvent = require('../domain/services/service-team-project-management-event');
  

magic.LogInfo("[[ AUTH ]]");
magic.LogSuccess("[POST] = /login");
magic.LogSuccess("[POST] = /register");

magic.LogInfo("[[ USERS ]]");
magic.LogInfo("[GET] = /users/");
magic.LogInfo("[GET] = /users/:id");
magic.LogSuccess("[POST] = /users/");
magic.LogWarning("[PATCH] = /users/:id");
magic.LogDanger("[DELETE] = /users/:id");

magic.LogInfo("[[ TEAMS ]]");
magic.LogInfo("[GET] = /teams/:id");
magic.LogSuccess("[POST] = /teams/");
magic.LogWarning("[PATCH] = /teams/edit");
magic.LogWarning("[PATCH] = /teams/add");
magic.LogDanger("[DELETE] = /teams/:id");

magic.LogInfo("[[ ProjectManagementEvent ]]");
magic.LogInfo("[GET] = /projectManagement/");
magic.LogInfo("[GET] = /projectManagement/malus");
magic.LogInfo("[GET] = /projectManagement/bonus");
magic.LogSuccess("[POST] = /projectManagement/");

magic.LogInfo("[[ TeamProjectManagementEvent ]]");
magic.LogInfo("[GET] = /teamProjectManagement/");
magic.LogInfo("[GET] = /teamProjectManagement/:teamId");
magic.LogSuccess("[POST] = /teamProjectManagement/");
magic.LogWarning("[PATCH] = /teamProjectManagement/send/:teamId");

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

router.get("/projectManagement/", m.checkTokenMiddleware, projectManagementEvent.GetAll);
router.get("/projectManagement/malus", m.checkTokenMiddleware, projectManagementEvent.GetAllMalus);
router.get("/projectManagement/bonus", m.checkTokenMiddleware, projectManagementEvent.GetAllBonus);
router.post("/projectManagement/", m.checkTokenMiddleware, projectManagementEvent.Create);

router.get("/teamProjectManagement/",  m.checkTokenMiddleware, teamProjectManagementEvent.GetAll);
router.get("/teamProjectManagement/:teamId",  m.checkTokenMiddleware, teamProjectManagementEvent.GetAllByTeamId);
router.post("/teamProjectManagement/",  m.checkTokenMiddleware, teamProjectManagementEvent.Create);
router.patch("/teamProjectManagement/send/:teamId",  m.checkTokenMiddleware, teamProjectManagementEvent.Send);

module.exports = router;
