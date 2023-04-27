const magic = require('../../util/magic');
const enum_ = require('../../util/enum');
const ormTeamProjectManagementEvent = require('../orm/orm-team-project-management-event');

exports.GetAll = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let status = 'Success', errorCode ='', message='', data='', statusCode=0, resp={};

    try {
        respOrm = await ormTeamProjectManagementEvent.GetAll();
        if(respOrm.err){
            status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        }else{
            message = 'Success Response', data = respOrm, statusCode = data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT;
        }
        resp = await magic.ResponseService(status,errorCode,message,data);
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        resp = await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,'');
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(resp);
    }
}

exports.GetAllByTeamId = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let status = 'Success', errorCode ='', message='', data='', statusCode=0, resp={};

    try {
        let teamId = req.params.teamId;
        respOrm = await ormTeamProjectManagementEvent.GetAllByTeamId(teamId);
        if(respOrm.err){
            status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        }else{
            message = 'Success Response', data = respOrm, statusCode = data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT;
        }
        resp = await magic.ResponseService(status,errorCode,message,data);
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        resp = await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,'');
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(resp);
    }
}

exports.Create = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let status = 'Success', errorCode ='', message='', data='', statusCode=0, resp={};

    try {
        const teamId = req.body.TeamId;
        const projectManagementEventId = req.body.ProjectManagementEventId;
        const destTopicId = req.body.DestTopicId;

        if(teamId && projectManagementEventId && destTopicId) {
            respOrm = await ormTeamProjectManagementEvent.Create(teamId, projectManagementEventId, destTopicId);
            if(respOrm.err){
                status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = 'Team project management event created', statusCode = enum_.CODE_CREATED;
            }
        }else{
            status = 'Failure', errorCode = enum_.ERROR_REQUIRED_FIELD, message = 'All fields are required', statusCode = enum_.CODE_BAD_REQUEST;
        }
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,'err',''));
    }
}

exports.Send = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let status = 'Success', errorCode ='', message='', data='', statusCode=0, resp={};
    try {
        const teamReceiverId = req.params.teamId;

        if(teamReceiverId) {
            const projectManagementEventId = req.body.ProjectManagementEventId;

            if(projectManagementEventId) {
                respOrm = await ormTeamProjectManagementEvent.Send(projectManagementEventId, teamReceiverId);
                if(respOrm.err){
                    status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
                }else{
                    message = 'Event sent', statusCode = enum_.CODE_CREATED;
                }
            }else{
                status = 'Failure', errorCode = enum_.ERROR_REQUIRED_FIELD, message = 'All fields are required', statusCode = enum_.CODE_BAD_REQUEST;
            }
        }else{
            status = 'Failure', errorCode = enum_.FAIL_CONVERTED_UUID_TO_STRING, message = 'Error trying convert uuid to string', statusCode = enum_.CODE_BAD_REQUEST;
        }
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}