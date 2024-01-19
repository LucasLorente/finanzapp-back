import express from 'express';
import expensesRoutes from './expenses.routes';

const router = express.Router();

router.use('/expenses', expensesRoutes);

export default router;