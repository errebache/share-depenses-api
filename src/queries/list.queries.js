const ListModel = require("../database/models/list.model");
const GroupModel = require("../database/models/group.model");
const ExpenseModel = require("../database/models/expense.model");

exports.getLists = async () => {
  const lists = await ListModel.find()
    .populate("createdBy")
    .populate("expenses")
    .populate({
      path: "group",
      populate: {
        path: "members",
        model: "users",
      },
    });
  return lists;
};

exports.getListDetail = async (listId) => {
  try {
    const list = await ListModel.findById(listId)
      .populate("createdBy");
      
    if (!list) {
      return null;
    }

    const expenses = await ExpenseModel.find({ list: listId });

    const groups = await GroupModel.find({ _id: list.group });

    const listWithDetails = {
      ...list.toObject(),
      expenses: expenses,
      groups: groups
    };

    return listWithDetails;
  } catch (error) {
    console.error('Error fetching list by ID:', error);
    throw error;
  }
};


exports.addNewList = async (data) => {
  const newList = new ListModel(data);
  return await newList.save();
};

exports.updateList = async (id, data) => {
  return await ListModel.findByIdAndUpdate(id, data, { new: true }).catch(
    (err) => {
      console.log(err);
    }
  );
};

exports.deleteList = async (id) => {
  try {
    const deletedList = await ListModel.findByIdAndDelete(id).exec();
    if (!deletedList) {
      throw new Error(`List with ID ${id} not found`);
    }
    console.log(`Deleted list ${id}`);
    return { success: true, message: `List with ID ${id} deleted successfully` };
  } catch (error) {
    console.error(`Error deleting list with ID ${id}:`, error);
    throw error;
  }
};


exports.getListById = async (userId) => {
  try {
    const groups = await GroupModel.find({ members: userId });
    const groupIds = groups.map((group) => group._id);

    const lists = await ListModel.find({ group: { $in: groupIds } });
    const listIds = lists.map((list) => list._id);

    const expenses = await ExpenseModel.find({ list: { $in: listIds } });

    // Créer un objet contenant toutes les dépenses par liste
    const expensesByList = expenses.reduce((acc, expense) => {
      const listId = expense.list.toString();
      acc[listId] = acc[listId] || [];
      acc[listId].push(expense);
      return acc;
    }, {});

    // Ajouter les dépenses à chaque liste
    const listsWithExpenses = lists.map((list) => {
      const listObject = list.toObject();
      listObject.expenses = expensesByList[list._id.toString()] || [];
      return listObject;
    });

    return listsWithExpenses;
  } catch (error) {
    console.error('Error fetching list by ID:', error);
    throw error;
  }
};

