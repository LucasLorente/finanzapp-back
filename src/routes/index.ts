import express from "express";
import ExpensesRoutes from "./expenses.routes";
import CategoryRoutes from "./category.routes";

const router = express.Router();

router.use("/expenses", ExpensesRoutes);
router.use("/category", CategoryRoutes);

export default router;
