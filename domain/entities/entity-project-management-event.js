"use strict"

module.exports = (db) => {
    var projectManagementEventSchema = new db.Schema(
        {
            sentence: {
                type: String,
                required: true
            },
            isMalus: {
                type: Boolean,
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

    return db.model('ProjectManagementEvent', projectManagementEventSchema)
}