const ormProjectManagementEvent = require('../orm/orm-project-management-event');
magic = require("../../util/magic");
const enum_ = require('../../util/enum');

exports.GetAll = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let status = 'Success', errorCode ='', message='', data='', statusCode=0, resp={};

    try {
        respOrm = await ormProjectManagementEvent.GetAll();
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

exports.GetAllMalus = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let status = 'Success', errorCode ='', message='', data='', statusCode=0, resp={};

    try {
        respOrm = await ormProjectManagementEvent.GetAllMalus();
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

exports.GetAllBonus = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let status = 'Success', errorCode ='', message='', data='', statusCode=0, resp={};

    try {
        respOrm = await ormProjectManagementEvent.GetAllBonus();
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
        const sentence = req.body.Sentence;
        const isMalus = req.body.IsMalus ?? true;

        if(sentence) {
            respOrm = await ormProjectManagementEvent.Create(sentence, isMalus);
            if(respOrm.err){
                status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = 'Project management event created', statusCode = enum_.CODE_CREATED;
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