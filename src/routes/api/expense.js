const { getExpenses, searchExpense, expenseDetail, addExpense, deleteExpense, getTotalAmount, editExpense,  } = require('../../controllers/expense.controller');


const router = require('express').Router();

router.get('/', getExpenses);
router.get('/search', searchExpense);
router.get('/totalAmount', getTotalAmount);
router.get('/:expenseId', expenseDetail);
router.patch('/:expenseId', editExpense); 
router.post('/', addExpense);
router.delete('/delete/:expanseId', deleteExpense);

module.exports = router;
