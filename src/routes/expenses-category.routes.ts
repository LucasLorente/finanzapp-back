import { Router } from "express";
import ExpensesCategoriesController from "../controllers/expenses-categories.controller";

const router = Router();

router.get("/", ExpensesCategoriesController.getAll);

export default router;
