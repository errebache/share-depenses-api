const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = mongoose.Schema(
  {
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
