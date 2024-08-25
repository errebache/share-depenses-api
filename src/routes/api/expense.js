const {
  getExpenses,
  searchExpense,
  expenseDetail,
  addExpense,
  deleteExpense,
  getTotalAmount,
  editExpense,
} = require("../../controllers/expense.controller");
const upload = require("../../middleware/uploadMiddleware");

const validateRequiredFields = require("../../middleware/validateRequiredFields");
const router = require("express").Router();

// Routes pour obtenir les dépenses
router.get("/", getExpenses);
router.get("/search", searchExpense);
router.get("/totalAmount", getTotalAmount);
router.get("/:expenseId", expenseDetail);

router.post(
  "/",
  (req, res, next) => {
    req.collectionName = "expenses";
    next();
  },
  upload.single('image'),
  validateRequiredFields(["paidBy", "amount", "list", "description"]),
  addExpense
);

// Route pour modifier une dépense (edit) avec validation des champs requis
router.patch(
  "/:expenseId",
  validateRequiredFields(["paidBy", "amount", "list", "description"]),
  editExpense
);

// Route pour supprimer une dépense
router.delete("/:expenseId", deleteExpense);

module.exports = router;
