import { Request, Response } from "express";
import prisma from "../prisma";

class ExpensesController {
    getAll = async (req: Request, res: Response) => {
        try {
            const expenses = await prisma.expenses.findMany();
            res.json(expenses);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Gastos' });
          }
    };

    create = async (req: Request, res: Response) => {
      const { description, amount } = req.body
      await prisma.expenses.create({
        data:{
          description,
          amount,
          date: new Date()
        }
      })
    };
}

export default new ExpensesController();