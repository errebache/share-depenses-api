const Expense = require('../database/models/expense.model');

exports.getExpenses = async () => {
  await Expense.find().populate("paidBy").populate("splitAmong");
};

exports.getExpense = async (expenseId) => {
    return await Expense.findById(expenseId).populate("paidBy").populate("splitAmong");
};

exports.addNewExpense = async (data) => {
  const newExpense = new Expense(data);
  return await newExpense.save();
};

exports.updateExpense = async (id, data) => {
  return await Expense.findByIdAndUpdate(id, data, { new: true }).catch((err) => {
    console.log(err);
  });
};

exports.deleteExpense = async (id) => {
  return await Expense.findByIdAndDelete(id).exec()
    .then(() => {
      console.log(`Deleted expense ${id}`);
    })
    .catch((err) => console.log(err));
};

exports.totalAmount = async () => {
    try {
      const expenses = await Expense.find();
      console.log("Number of expenses:", expenses.length);
  
      let sum = 0;
      expenses.forEach((expense) => {
        sum += expense.amount;
      });
  
      console.log("Total amount:", sum);
      return sum;
    } catch (error) {
      console.error("Error in totalAmount function:", error);
      throw error;
    }
  };

exports.searchExpense = (search) => {
    return Expense.find({ description: new RegExp(search, 'i')}).exec();
  }