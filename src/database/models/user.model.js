const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordToken: { type: String },
    passwordTokenExpiration: { type: Date },
    fullName: { type: String, required: false },
    profilePhoto: { type: String, required: false},
    emailVerified: { type: Boolean},
    emailToken: {type: String}
  },
  { timestamps: true }
);

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hash(password, 12);
}

userSchema.methods.comparePassword = (password) => {
  return bcrypt.compare(password, this.password);
}

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
