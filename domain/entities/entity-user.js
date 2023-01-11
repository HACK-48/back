"use strict";

module.exports = (db) => {
  var userSchema = new db.Schema(
    {
      userId: String,
      pseudo: {
        type: String,
        required: true
      },
      mail: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      age: Number,
      hash : String, 
      salt : String 
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    }
  );

  // Method to set salt and hash the password for a user
  userSchema.methods.setPassword = function (password) {
    // Creating a unique salt for a particular user
    this.salt = crypto.randomBytes(16).toString("hex");

    // Hashing user's salt and password with 1000 iterations,

    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
      .toString(`hex`);
  };

  // Method to check the entered password is correct or not
  userSchema.methods.validPassword = function (password) {
    var hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
      .toString(`hex`);
    return this.hash === hash;
  };

  return db.model('Users', userSchema);
};