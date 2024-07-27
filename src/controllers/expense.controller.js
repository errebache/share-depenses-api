const mongoose = require('mongoose');
const ErrorHandler = require('../utils/ErrorHandler'); 
const {
  getExpenses,
  addNewExpense,
  updateExpense,
  deleteExpense,
  totalAmount,
  searchExpense,
  getExpense,
} = require("../queries/expense.queries");

exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await getExpenses();
    res.json(expenses);
  } catch (error) {
    next(new ErrorHandler(500, 'INTERNAL_SERVER_ERROR'));
  }
};

exports.expenseDetail = async (req, res, next) => {
  try {
    const expense = await getExpense(req.params.expenseId);
    if (!expense) {
      throw new ErrorHandler(404, 'EXPENSE_NOT_FOUND');
    }
    res.json(expense);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(new ErrorHandler(400, 'INVALID_ID_FORMAT'));
    } else {
      next(error);
    };
  }
};

exports.addExpense = async (req, res, next) => {
  try {
    console.log("Request body:", req.body);

    const { paidBy, amount, list, description, splitAmong, category, image } = req.body;

    if (!paidBy || !amount || !list || !description) {
      console.error("Validation error: Missing required fields");
      return next(new ErrorHandler(400, 'All fields are required'));
    }

    if (!Array.isArray(splitAmong) || splitAmong.some(sa => !sa.userId || !sa.amount)) {
      console.error("Validation error: Invalid splitAmong format");
      return next(new ErrorHandler(400, 'Invalid splitAmong format'));
    }

    const newExpense = await addNewExpense(req.body);
    res.status(201).json(newExpense);
  } catch (error) {
    console.error("Error adding expense:", error);
    next(new ErrorHandler(500, 'INTERNAL_SERVER_ERROR'));
  }
};

exports.editExpense = async (req, res, next) => {
  try {
    const updatedExpense = await updateExpense(req.params.expenseId, req.body);
    if (!updatedExpense) {
      throw new ErrorHandler(404, 'EXPENSE_NOT_FOUND');
    }
    res.json(updatedExpense);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(new ErrorHandler(400, 'INVALID_ID_FORMAT'));
    } else {
      next(error);
    }
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const deleted = await deleteExpense(req.params.expenseId);
    if (!deleted) {
      throw new ErrorHandler(404, 'EXPENSE_NOT_FOUND');
    }
    res.status(204).end();
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(new ErrorHandler(400, 'INVALID_ID_FORMAT'));
    } else {
      next(error);
    }
  }
};

exports.getTotalAmount = async (req, res, next) => {
  try {
    const total = await totalAmount();
    res.json({ totalAmount: total });
  } catch (error) {
    next(new ErrorHandler(500, 'INTERNAL_SERVER_ERROR'));
  }
};

exports.searchExpense = async (req, res, next) => {
  try {
    const search = req.query.str;
    const expenses = await searchExpense(search);
    res.json(expenses);
  } catch (error) {
    next(new ErrorHandler(500, 'INTERNAL_SERVER_ERROR'));
  }
};
