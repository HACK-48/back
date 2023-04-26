const conn = require('../repositories/repository_mongo');
const { uuid } = require('uuidv4');


exports.GetAll = async () =>{
    try{
        return await conn.db.connMongo.User.find({IsDelete: false});
    }catch(err){
        console.log(" err orm-user.GetAll = ", err);
        return await {err:{code: 500, messsage: err}}
    }
}

exports.GetById = async ( Id ) =>{
    try{
        return await conn.db.connMongo.User.findOne({ userId: Id, IsDelete: false });
    }catch(err){
        console.log(" err orm-user.GetById = ", err);
        return await {err:{code: 500, messsage: err}}
    }
}

exports.Store = async ( Name, LastName, Age, Pseudo, Mail, Password, Sector ) =>{
    try{
        const datacenter = await new conn.db.connMongo.User({
            userId: uuid(),
            name: Name,
            lastName: LastName,
            age: Age,
            pseudo: Pseudo,
            mail: Mail, 
            password: Password,
            sector: Sector
        });
        datacenter.save();
        return true
    }catch(err){
        console.log(" err orm-user.Store = ", err);
        return await {err:{code: 500, messsage: err}}
    }
}

exports.DeleteById = async ( Id ) =>{
    try{
        await conn.db.connMongo.User.deleteById({userId: Id})
        return true
    }catch(err){
        console.log(" err orm-user.Store = ", err);
        return await {err:{code: 500, messsage: err}}
    }
}

exports.UpdateById = async ( Name, LastName, Age, Id ) =>{
    try{
        await conn.db.connMongo.User.findOneAndUpdate(
            {
                userId: Id
            },{ 
                name: Name,
                lastName: LastName,
                age: Age
         })
        return true
    }catch(err){
        console.log(" err orm-user.Store = ", err);
        return await {err:{code: 500, messsage: err}}
    }
}

exports.GetByMail = async ( Mail ) =>{
    try{
        return await conn.db.connMongo.User.findOne({ mail: Mail });
    }catch(err){
        console.log(" err orm-user.GetByMail = ", err);
        return await {err:{code: 500, messsage: err}}
    }
}