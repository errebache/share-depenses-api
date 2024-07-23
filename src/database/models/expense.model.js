const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new mongoose.Schema({
  paidBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
  amount: { type: Number, required: true },
  list: {
    type: Schema.Types.ObjectId,
    ref: "List",
    required: true,
  },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  splitAmong: [{
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    amount: { type: Number, required: true }
  }],
  category: { type: String },
  image: { type: String }, // Assuming the image is stored as a URL
});

const ExpenseModel = mongoose.model("expenses", ExpenseSchema);

module.exports = ExpenseModel;
