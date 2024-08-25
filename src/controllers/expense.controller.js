const mongoose = require("mongoose");
const {
  getExpenses,
  addNewExpense,
  updateExpense,
  deleteExpense,
  totalAmount,
  searchExpense,
  getExpense,
} = require("../queries/expense.queries");
const handleImageUpload = require("../utils/handleImageUpload");

exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await getExpenses();
    res.json(expenses);
  } catch (error) {
    next(new Error("Internal Server Error"));
  }
};

exports.expenseDetail = async (req, res, next) => {
  try {
    const expense = await getExpense(req.params.expenseId);
    if (!expense) {
      return res
        .status(404)
        .json({ message: `Expense not found with ID ${req.params.expenseId}` });
    }
    res.json(expense);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return res.status(400).json({ message: "Invalid ID format" });
    } else {
      next(new Error("Internal Server Error"));
    }
  }
};


exports.addExpense = async (req, res, next) => {
  req.collectionName = "expenses";
  try {
    const { paidBy, amount, list, description, createdAt, category } = req.body;
    let imagePath = null;

    // Handle image if provided
    if (req.file) {
      imagePath = req.file.path; // The path where the image is stored
    }

    // Trim and parse the createdAt date
    let formattedCreatedAt = createdAt ? createdAt.trim() : null;
    if (formattedCreatedAt) {
      formattedCreatedAt = new Date(formattedCreatedAt);
      if (isNaN(formattedCreatedAt.getTime())) {
        return res.status(400).json({ message: 'Invalid date format for createdAt.' });
      }
    }

    if (Array.isArray(req.body.splitAmong)) {
      parsedSplitAmong = JSON.parse(req.body.splitAmong.find(sa => sa.trim() !== ''));
    } else {
      parsedSplitAmong = JSON.parse(req.body.splitAmong);
    }

    if (!Array.isArray(parsedSplitAmong) || parsedSplitAmong.length === 0) {
      return res.status(400).json({
        message: 'The "splitAmong" field is required and should be a non-empty array.',
      });
    }


    // Create the new expense with validated information
    const newExpense = await addNewExpense({
      paidBy,
      amount,
      list,
      description,
      createdAt: formattedCreatedAt,
      splitAmong: parsedSplitAmong,
      category,
      image: imagePath, // Add the image path
    });

    res.status(201).json(newExpense);
  } catch (error) {
    console.error("Error creating expense:", error);
    next(new Error("Internal Server Error"));
  }
};


exports.editExpense = async (req, res, next) => {
  try {
    req.collectionName = "expenses";

    const { splitAmong } = req.body;

    if (!Array.isArray(splitAmong) || splitAmong.length === 0) {
      return res.status(400).json({
        message:
          'The "splitAmong" field is required and should be a non-empty array.',
      });
    }

    if (splitAmong.some((sa) => !sa.userId || !sa.amount)) {
      return res.status(400).json({
        message:
          'Each entry in "splitAmong" must have both "userId" and "amount".',
      });
    }

    const updatedExpense = await updateExpense(req.params.expenseId, req.body);
    if (!updatedExpense) {
      return res
        .status(404)
        .json({ message: `Expense not found with ID ${req.params.expenseId}` });
    }
    res.json(updatedExpense);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return res.status(400).json({ message: "Invalid ID format" });
    } else {
      next(new Error("Internal Server Error"));
    }
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const deleted = await deleteExpense(req.params.expenseId);

    if (!deleted) {
      return res
        .status(404)
        .json({ message: `No expense found with ID ${req.params.expenseId}` });
    }

    res.status(200).json({
      message: `Expense with ID ${req.params.expenseId} has been deleted.`,
    });
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    next(new Error("Internal Server Error"));
  }
};

exports.getTotalAmount = async (req, res, next) => {
  try {
    const total = await totalAmount();
    res.json({ totalAmount: total });
  } catch (error) {
    next(new Error("Internal Server Error"));
  }
};

exports.searchExpense = async (req, res, next) => {
  try {
    const search = req.query;
    console.log(search);
    const expenses = await searchExpense(search);
    res.json(expenses);
  } catch (error) {
    next(new Error("Internal Server Error"));
  }
};
