"use strict"

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = (db) => {
    var teamProjectManagementEvent = new db.Schema(
        {
            teamId: {
                type: Schema.Types.ObjectId,
                ref: 'Teams',
                required: true
            },
            projectManagementEventId: {
                type: Schema.Types.ObjectId,
                ref: 'ProjectManagementEvent',
                required: true
            },
            teamReceiverId: {
                type: Schema.Types.ObjectId,
                ref: 'Teams',
                required: false
            },
            destTopicId: {
                type: Number,
                required: true
            }
        },
        {
            timestamps: {
              createdAt: "created_at",
              updatedAt: "updated_at",
            },
          }
    );

    return db.model('TeamProjectManagementEvent', teamProjectManagementEvent);
}