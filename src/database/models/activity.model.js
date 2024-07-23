const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  type: {
    type: String,
    required: true, 
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: "List", 
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  expense: {
    type: Schema.Types.ObjectId,
    ref: "Expense", 
    required: false, 
  },
  data: {
    type: Schema.Types.Mixed, 
    required: false,
  },
}, { timestamps: true }); 

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
