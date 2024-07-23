const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = mongoose.Schema(
  {
    name: String,
    description: String,
    members: [{ type: Schema.Types.ObjectId,ref: "users"}],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const GroupModel = mongoose.model("groups", groupSchema);

module.exports = GroupModel;
