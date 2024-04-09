import { Request, Response } from "express";
import ExpensesController from "./expenses.controller";
import IncomeController from "./income.controller";
import ExpensesService from "../services/expenses.services";

class BalanceController {
  private expensesService: ExpensesService;

  constructor() {
    this.expensesService = new ExpensesService();
  }

  getTotalBalance = async (req: Request, res: Response) => {
    try {
      const totalExpenses = await this.expensesService.getExpensesTotal();
      const totalIncomes = await IncomeController.getTotal(req, res);
      //   res.json(totalIncomes - totalExpenses);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener Categorías" });
    }
  };
}

export default new BalanceController();
