import express from "express";
import ExpensesRoutes from "./expenses.routes";
import IncomeRoutes from "./income.routes";
import ExpensesCategoryRoutes from "./expenses-category.routes";
import ExpensesTypeRoutes from "./expenses-types.routes";
import BalanceRoutes from "./balance.routes";

const router = express.Router();

router.use("/expenses", ExpensesRoutes);
router.use("/incomes", IncomeRoutes);
router.use("/expenses-category", ExpensesCategoryRoutes);
router.use("/expenses-type", ExpensesTypeRoutes);
router.use("/balance", BalanceRoutes);

export default router;
