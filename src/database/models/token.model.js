const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  token: { type: String, required: true },
},
{ timestamps: true }
);


const TokenModel = mongoose.model("token", TokenSchema);

module.exports = TokenModel;


