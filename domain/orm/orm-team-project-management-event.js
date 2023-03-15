var mongoose = require('mongoose');
const conn = require("../repositories/repository_mongo");


exports.GetAll = async () => {
  try {
    return await conn.db.connMongo.TeamProjectManagementEvent.find({});
  } catch (err) {
    console.log(" err orm-team-project-management-event.GetAll = ", err);
    return { err: { code: 500, messsage: err } };
  }
};

exports.Create = async (teamId, projectManagementEventId, destTopicId) => {
  try {
    const datacenter = await new conn.db.connMongo.TeamProjectManagementEvent({
      teamId: teamId,
      projectManagementEventId: projectManagementEventId,
      teamReceiverId: null,
      destTopicId: destTopicId,
    });
    datacenter.save();
    return true;
  } catch (err) {
    console.log("err orm-team-project-management-event.Create = ", err);
    return { err: { code: 500, message: err } };
  }
};

exports.Send = async (projectManagementEventId, teamReceiverId) => {
  try {
    if(new mongoose.isValidObjectId(teamReceiverId)){
        await conn.db.connMongo.TeamProjectManagementEvent.findOneAndUpdate(
            {
              projectManagementEventId: projectManagementEventId,
            },
            {
              teamReceiverId: teamReceiverId,
            }
          );
    } else {
        return { err: { code: 500, message: "invalid team receiver id" } };
    }
    return true;
  } catch (err) {
    console.log("err orm-team-project-management-event.Send = ", err);
    return { err: { code: 500, message: err } };
  }
};

exports.GetAllByTeamId = async (teamId) => {
    try {
        console.log(teamId)
        return await conn.db.connMongo.TeamProjectManagementEvent.find({teamId: teamId});
      } catch (err) {
        console.log(" err orm-team-project-management-event.GetAllByTeamId = ", err);
        return { err: { code: 500, messsage: err } };
      }
}
