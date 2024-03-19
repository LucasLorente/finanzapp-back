import { Request, Response } from "express";
import prisma from "../prisma";

class ExpensesController {
  getAll = async (_req: Request, res: Response) => {
    try {
      const expenses = await prisma.expenses.findMany();
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener Gastos" });
    }
  };

  create = async (req: Request, res: Response) => {
    const { description, amount, date, categoryId: category_id } = req.body;
    const expense = await prisma.expenses.create({
      data: {
        description,
        amount,
        date,
        type_id: 1,
        category_id,
      },
    });
    res.json(expense);
  };

  getTotal = async (_req: Request, res: Response) => {
    try {
      const total = await prisma.expenses.aggregate({
        _sum: {
          amount: true,
        },
      });
      res.json(total);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener Gastos" });
    }
  };

  getWeeklyExpenses = async (_req: Request, res: Response) => {
    try {
      const currentDate = new Date();
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Iniciar desde el primer día de la semana actual (domingo)
      const endOfWeek = new Date(currentDate);
      endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay())); // Terminar en el último día de la semana actual (sábado)

      const weeklyExpenses = await prisma.expenses.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          date: {
            gte: startOfWeek,
            lte: endOfWeek,
          },
        },
      });

      res.json(weeklyExpenses);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener Gastos" });
    }
  };

  getMonthlyExpenses = async (_req: Request, res: Response) => {
    try {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que se suma 1

      const monthlyExpenses = await prisma.expenses.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          date: {
            gte: new Date(currentYear, currentMonth - 1, 1), // Primer día del mes actual
            lt: new Date(currentYear, currentMonth, 1), // Primer día del siguiente mes
          },
        },
      });

      res.json(monthlyExpenses);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener Gastos" });
    }
  };
}

export default new ExpensesController();
