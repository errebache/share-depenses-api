const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new mongoose.Schema({
  groupId: { type: Schema.Types.ObjectId, ref: "groups", required: true },
  paidBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  splitAmong: [{ type: Schema.Types.ObjectId, ref: "users" }],
});


const ExpenseModel = mongoose.model("expenses", ExpenseSchema);

module.exports = ExpenseModel;