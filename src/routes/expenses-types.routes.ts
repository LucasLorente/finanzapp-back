import { Router } from "express";
import ExpensesTypeController from "../controllers/expenses-types.controller";

const router = Router();

router.get("/", ExpensesTypeController.getAll);

export default router;
