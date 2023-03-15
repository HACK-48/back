const conn = require("../repositories/repository_mongo");
const { uuid } = require("uuidv4");

exports.GetAll = async () => {
  try {
    return await conn.db.connMongo.Team.find({});
  } catch (err) {
    console.log("err orm-team.GetAll = ", err);
    return { err: { code: 500, message: err } };
  }
};

exports.GetById = async (Id) => {
  try {
    return await conn.db.connMongo.Team.findOne({ teamId: Id });
  } catch (err) {
    console.log("err orm-team.GetById = ", err);
    return { err: { code: 500, message: err } };
  }
};

exports.Create = async (name, description, leaderId, sector) => {
  try {
    const datacenter = await new conn.db.connMongo.Team({
      teamId: uuid(),
      name: name,
      description: description,
      leaderId: leaderId,
      sector: sector
    });
    datacenter.save();
    return true;
  } catch (err) {
    console.log("err orm-team.Create = ", err);
    return { err: { code: 500, message: err } };
  }
};

exports.DeleteById = async (Id) => {
  try {
    await conn.db.connMongo.Team.deleteById({ teamId: Id });
    return true;
  } catch (err) {
    console.log("err orm-team.DeleteById = ", err);
    return { err: { code: 500, message: err } };
  }
};

exports.UpdateById = async (Id, name, description) => {
  try {
    await conn.db.connMongo.Team.findOneAndUpdate(
      {
        teamId: Id,
      },
      {
        name: name,
        description: description,
      }
    );
    return true;
  } catch (err) {
    console.log("err orm-team.UpdateById = ", err);
    return { err: { code: 500, message: err } };
  }
};

exports.AddUserById = async (Id, userId) => {
  try {
    let team = await conn.db.connMongo.Team.findOne({ teamId: Id });

    if (team === null) {
      return { err: { code: 400, message: "Team not found" } };
    }

    if (team.membersId.find((_) => _ == userId) !== undefined) {
      return { err: { code: 400, message: "User already exist in this team" } };
    }

    team.membersId.push(userId);

    await conn.db.connMongo.Team.findOneAndUpdate(
      {
        teamId: Id,
      },
      {
        membersId: team.membersId,
      }
    );
    return true;
  } catch (err) {
    console.log("err orm-team.AddUserById = ", err);
    return { err: { code: 500, message: err } };
  }
};
