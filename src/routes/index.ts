import express from "express";
import ExpensesRoutes from "./expenses.routes";
import IncomeRoutes from "./income.routes";
import ExpensesCategoryRoutes from "./expenses-category.routes";
import IncomeCategoryRoutes from "./income-category.routes";

const router = express.Router();

router.use("/expenses", ExpensesRoutes);
router.use("/incomes", IncomeRoutes);
router.use("/income-category", IncomeCategoryRoutes);
router.use("/expenses-category", ExpensesCategoryRoutes);

export default router;
