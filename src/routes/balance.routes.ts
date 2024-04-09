import { Router } from "express";
import BalanceController from "../controllers/balance.controller";

const router = Router();

router.get("/", BalanceController.getTotalBalance);

export default router;
