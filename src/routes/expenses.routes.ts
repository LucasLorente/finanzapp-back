import { Router } from 'express';
import ExpensesController from '../controllers/expenses.controller';

const router = Router();

router.get("/", ExpensesController.getAll);
router.post("/", ExpensesController.create);

export default router;