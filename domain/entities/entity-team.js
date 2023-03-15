"use strict";

module.exports = (db) => {
  let teamSchema = new db.Schema(
    {
      teamId: String,
      leaderId: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      membersId: Array,
      description: String,
      sector: {
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

  return db.model('Teams', teamSchema);
};
