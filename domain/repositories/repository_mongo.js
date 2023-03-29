const config = require('config-yml');
const mongoose = require('mongoose');
const enum_ = require('../../util/magic');
const user = require('../entities/entity-user');
const team = require('../entities/entity-team');
const projectManagementEvent = require('../entities/entity-project-management-event');
const teamProjectManagementEvent = require('../entities/entity-team-project-management-event');

let arrayConns = [], db = {};

if (config.db.mongodb && config.db.mongodb.length > 0) {
    config.db.mongodb.map((c) => {
        mongoose.connect(`mongodb://haka47:Azerty0*@3f81311a-3a79-404d-8bb0-782a883b7837.hack48-5288.mongo.a.osc-fr1.scalingo-dbs.com:32380/hack48-5288?replicaSet=hack48-5288-rs0&ssl=true`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10
        }).then(() => {
            console.log('Connected to MongoDB');
        }).catch((err) => {
            console.error('Error connecting to MongoDB', err);
        });
        db[c.nameconn] = {}
        db[c.nameconn].conn = mongoose;
        db[c.nameconn].User = user(mongoose);
        db[c.nameconn].Team = team(mongoose);
        db[c.nameconn].ProjectManagementEvent = projectManagementEvent(mongoose);
        db[c.nameconn].TeamProjectManagementEvent = teamProjectManagementEvent(mongoose);
    })
    exports.db = db;
} else {
    enum_.LogDanger("Erreur lors de la connexion à la db")
}