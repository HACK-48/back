const conn = require('../repositories/repository_mongo');

exports.GetAll = async () => {
    try {
        return await conn.db.connMongo.ProjectManagementEvent.find({});
    } catch(err){
        console.log("err orm-projetc-management-event.GetAll = ", err);
        return {err:{code: 500, message: err}}
    }
};

exports.GetAllMalus = async () => {
    try {
        return await conn.db.connMongo.ProjectManagementEvent.find({isMalus: true});
    } catch(err){
        console.log("err orm-projetc-management-event.GetAll = ", err);
        return { err: { code: 500, message: err } }
    }
}


exports.GetAllBonus = async () => {
    try {
        return await conn.db.connMongo.ProjectManagementEvent.find({isMalus: false});
    } catch(err){
        console.log("err orm-projetc-management-event.GetAll = ", err);
        return {err:{code: 500, message: err}}
    }
}
exports.Create = async (sentence, isMalus) => {
    try {
        const datacenter = await new conn.db.connMongo.ProjectManagementEvent({
            sentence: sentence,
            isMalus: isMalus
        });
        datacenter.save();
        return true;
    } catch (err) {
        console.log("err orm-project-management-event = ", err);
        return { err: { code: 500, message: err }};
    }
};