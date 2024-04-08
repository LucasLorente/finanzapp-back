import { Router } from "express";
import IncomeCategoriesController from "../controllers/income-categories.controller";

const router = Router();

router.get("/", IncomeCategoriesController.getAll);

export default router;
