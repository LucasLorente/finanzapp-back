import { Router } from "express";
import IncomeController from "../controllers/income.controller";

const router = Router();

router.get("/", IncomeController.getAll);
router.get("/total", IncomeController.getTotal);
router.get("/weekly", IncomeController.getWeeklyIncomes);
router.get("/monthly", IncomeController.getMonthlyIncomes);
router.post("/", IncomeController.create);

export default router;
