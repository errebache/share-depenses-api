const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invitedSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["sent", "accepted", "rejected"], 
      default: "sent",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const InvitedModel = mongoose.model("InvitedUser", invitedSchema);

module.exports = InvitedModel;
