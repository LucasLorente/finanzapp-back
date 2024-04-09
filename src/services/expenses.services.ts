import { Request, Response } from "express";
import prisma from "../prisma";

class ExpensesService {
  async getExpensesTotal() {
    const total = await prisma.expenses.aggregate({
      _sum: {
        amount: true,
      },
    });
    return total;
  }
}

export default ExpensesService;
