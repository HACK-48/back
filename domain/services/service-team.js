const ormTeams = require("../orm/orm-team");
const magic = require("../../util/magic");
const { isUuid } = require("uuidv4");
const enum_ = require("../../util/enum");

exports.GetAll = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let status = "Success",
    errorCode = "",
    message = "",
    data = "",
    statusCode = 0,
    resp = {};
  try {
    respOrm = await ormTeams.GetAll();

    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Success Response"),
        (data = respOrm),
        (statusCode = data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }

    resp = await magic.ResponseService(status, errorCode, message, data);
    return res.status(statusCode).send(resp);
  } catch (err) {
    console.log("err = ", err);
    resp = await magic.ResponseService("Failure", enum_.CRASH_LOGIC, err, "");
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(resp);
  }
};

exports.GetById = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let status = "Success",
    errorCode = "",
    message = "",
    data = "",
    statusCode = 0,
    resp = {};
  try {
    const id = req.params.id;
    if (isUuid(id)) {
      respOrm = await ormTeams.GetById();
      if (respOrm && respOrm.err) {
        (status = "Failure"),
          (errorCode = respOrm.err.code),
          (message = respOrm.err.messsage),
          (statusCode = enum_.CODE_BAD_REQUEST);
      }
    } else {
      if (respOrm.err) {
        (status = "Failure"),
          (errorCode = respOrm.err.code),
          (message = respOrm.err.messsage),
          (statusCode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = "Success Response"),
          (data = respOrm),
          (statusCode =
            data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
      }
    }

    resp = await magic.ResponseService(status, errorCode, message, data);
    return res.status(statusCode).send(resp);
  } catch (err) {
    console.log("err = ", err);
    resp = await magic.ResponseService("Failure", enum_.CRASH_LOGIC, err, "");
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(resp);
  }
};

exports.Create = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let status = "Success",
    errorCode = "",
    message = "",
    data = "",
    statusCode = 0,
    resp = {};

  try {
    const name = req.body.name;
    const description = req.body.description;
    const leaderId = req.body.leaderId;

    if (name && description && leaderId) {
      respOrm = await ormTeams.Create(name, description, leaderId);
      if (respOrm.err) {
        (status = "Failure"),
          (errorCode = respOrm.err.code),
          (message = respOrm.err.messsage),
          (statusCode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = "Team created"), (statusCode = enum_.CODE_CREATED);
      }
    } else {
      (status = "Failure"),
        (errorCode = enum_.ERROR_REQUIRED_FIELD),
        (message = "All fields are required"),
        (statusCode = enum_.CODE_BAD_REQUEST);
    }
    resp = await magic.ResponseService(status, errorCode, message, data);
    return res.status(statusCode).send(resp);
  } catch (err) {
    console.log("err = ", err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService("Failure", enum_.CRASH_LOGIC, "err", "")
      );
  }
};

exports.UpdateById = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let status = "Success",
    errorCode = "",
    message = "",
    data = "",
    statusCode = 0,
    resp = {};
  try {
    const teamId = req.body.teamId;
    const name = req.body.name;
    const description = req.body.description;

    if (teamId && name && description) {
      respOrm = await ormTeams.UpdateById(teamId, name, description);
      if (respOrm.err) {
        (status = "Failure"),
          (errorCode = respOrm.err.code),
          (message = respOrm.err.messsage),
          (statusCode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = "Team information updated"), (statusCode = enum_.CODE_CREATED);
      }
    } else {
      (status = "Failure"),
        (errorCode = enum_.ERROR_REQUIRED_FIELD),
        (message = "All fields are required"),
        (statusCode = enum_.CODE_BAD_REQUEST);
    }

    resp = await magic.ResponseService(status, errorCode, message, data);
    return res.status(statusCode).send(resp);
  } catch (err) {
    console.log("err = ", err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await magic.ResponseService("Failure", enum_.CRASH_LOGIC, err, ""));
  }
};

exports.DeleteById = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let status = "Success",
    errorCode = "",
    message = "",
    data = "",
    statusCode = 0,
    resp = {};
  try {
    const id = req.params.id;
    if (isUuid(id)) {
      respOrm = await ormTeams.DeleteById(id);
      if (respOrm.err) {
        (status = "Failure"),
          (errorCode = respOrm.err.code),
          (message = respOrm.err.messsage),
          (statusCode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = "Team deleted"), (statusCode = enum_.CODE_OK);
      }
    } else {
      (status = "Failure"),
        (errorCode = enum_.FAIL_CONVERTED_UUID_TO_STRING),
        (message = "Error trying convert uuid to string"),
        (statusCode = enum_.CODE_BAD_REQUEST);
    }
    resp = await magic.ResponseService(status, errorCode, message, data);
    return res.status(statusCode).send(resp);
  } catch (err) {
    console.log("err = ", err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await magic.ResponseService("Failure", enum_.CRASH_LOGIC, err, ""));
  }
};

exports.AddUserById = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let status = "Success",
    errorCode = "",
    message = "",
    data = "",
    statusCode = 0,
    resp = {};
  try {
    const userId = req.body.userId;
    const teamId = req.body.teamId;

    if (userId && teamId) {
      respOrm = await ormTeams.AddUserById(teamId, userId);
      if (respOrm.err) {
        (status = "Failure"),
          (errorCode = respOrm.err.code),
          (message = respOrm.err.messsage),
          (statusCode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = "Team members updated"), (statusCode = enum_.CODE_CREATED);
      }
    } else {
      (status = "Failure"),
        (errorCode = enum_.ERROR_REQUIRED_FIELD),
        (message = "All fields are required"),
        (statusCode = enum_.CODE_BAD_REQUEST);
    }

    resp = await magic.ResponseService(status, errorCode, message, data);
    return res.status(statusCode).send(resp);
  } catch (err) {
    console.log("err = ", err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await magic.ResponseService("Failure", enum_.CRASH_LOGIC, err, ""));
  }
};
