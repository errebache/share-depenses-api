const Expense = require('../database/models/expense.model');

exports.getExpenses = async () => {
  await Expense.find().populate("paidBy").populate("splitAmong");
};

exports.getExpense = async (expenseId) => {
  try {
    const expense = await Expense.findById(expenseId)
      .populate('paidBy') // Supposons que cela renvoie des détails sur la personne qui a payé.
      .populate({ 
        path: 'splitAmong', // Peuple les informations dans splitAmong
        populate: { 
          path: 'userId', // Peuple les informations d'utilisateur pour chaque entrée dans splitAmong
          model: 'users' // Assurez-vous que 'User' correspond au nom du modèle que vous souhaitez peupler.
        } 
      });
    return expense;
  } catch (error) {
    console.error('Error getting expense:', error);
    throw error; // ou retourner une réponse d'erreur spécifique
  }
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