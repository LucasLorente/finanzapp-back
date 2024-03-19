import { Router } from "express";
import ExpensesController from "../controllers/expenses.controller";

const router = Router();

router.get("/", ExpensesController.getAll);
router.get("/total", ExpensesController.getTotal);
router.get("/weekly", ExpensesController.getWeeklyExpenses);
router.get("/monthly", ExpensesController.getMonthlyExpenses);
router.post("/", ExpensesController.create);

export default router;
