const Expense = require('../database/models/expense.model');

exports.getExpenses = async () => {
  try {
    const expenses = await Expense.find()
      .populate('paidBy')
      .populate({
        path: 'splitAmong',
        populate: {
          path: 'userId',
          model: 'users' // Assurez-vous que 'User' est bien le nom correct du modèle
        }
      });
    return expenses;
  } catch (error) {
    console.error('Error getting expenses:', error);
    throw error; // Relancer l'erreur pour qu'elle soit capturée par le contrôleur
  }
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
  try {
    const newExpense = new Expense(data);
    const savedExpense = await newExpense.save();
    console.log('Expense saved:', savedExpense);
    return savedExpense;
  } catch (error) {
    console.error('Error saving expense:', error);
    throw error;
  }
};

exports.updateExpense = async (id, data) => {
  return await Expense.findByIdAndUpdate(id, data, { new: true }).catch((err) => {
    console.log(err);
  });
};

exports.deleteExpense = async (id) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(id).exec();

    if (deletedExpense) {
      console.log(`Deleted expense ${id}`);
      return deletedExpense;  // Renvoie le document supprimé
    } else {
      console.log(`No expense found with ID ${id}`);
      return null;  // Renvoie null si aucun document n'a été trouvé
    }
  } catch (err) {
    console.error(`Error deleting expense ${id}:`, err);
    throw err;  // Relance l'erreur pour être gérée en amont
  }
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

  exports.searchExpense = async (searchCriteria) => {
    try {
      const query = {};
  
      // Ajoutez des critères de recherche dynamiquement en fonction de ce qui est fourni dans searchCriteria
      if (searchCriteria.paidBy) {
        query.paidBy = searchCriteria.paidBy;
      }
  
      if (searchCriteria.amount) {
        query.amount = searchCriteria.amount;
      }
  
      if (searchCriteria.description) {
        query.description = new RegExp(searchCriteria.description, 'i');
      }
  
      if (searchCriteria.splitAmong) {
        query['splitAmong.userId'] = searchCriteria.splitAmong;
      }
  
      if (searchCriteria.category) {
        query.category = new RegExp(searchCriteria.category, 'i');
      }
  
      if (searchCriteria.createdAt) {
        query.createdAt = { $gte: new Date(searchCriteria.createdAt) };
      }

      console.log(query);
  
      const expenses = await Expense.find(query)
        .populate('paidBy')
        .populate('splitAmong.userId')
        .exec();
  
      return expenses;
    } catch (error) {
      console.error('Error searching expenses:', error);
      throw error;
    }
  };
  