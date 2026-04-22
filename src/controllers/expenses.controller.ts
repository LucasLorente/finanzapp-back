import { Request, Response } from "express";
import prisma from "../prisma";
import ExpensesService from "../services/expenses.services";

class ExpensesController {
  private expensesService: ExpensesService;

  constructor() {
    this.expensesService = new ExpensesService();
  }

  getAll = async (_req: Request, res: Response) => {
    try {
      const expenses = await prisma.expenses.findMany({
        orderBy: {
          date: "desc",
        },
      });
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener Gastos" });
    }
  };

  create = async (req: Request, res: Response) => {
    const { description, amount, date, categoryId: category_id, typeId: type_id } = req.body;
    const expense = await prisma.expenses.create({
      data: {
        description,
        amount,
        date,
        type_id,
        category_id,
      },
    });
    res.json(expense);
  };

  getTotal = async (_req: Request, res: Response) => {
    try {
      const total = await this.expensesService.getExpensesTotal();
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

  getByCategory = async (_req: Request, res: Response) => {
    try {
      const expensesByCategory = await prisma.expensesCategory.findMany({
        include: {
          expenses: {
            select: {
              amount: true,
            },
          },
        },
      });

      const result = expensesByCategory.map((category) => ({
        name: category.name,
        total: category.expenses.reduce((sum, exp) => sum + exp.amount, 0),
      }));

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener gastos por categoría" });
    }
  };

  getByType = async (_req: Request, res: Response) => {
    try {
      const expensesByType = await prisma.expensesType.findMany({
        include: {
          expenses: {
            select: {
              amount: true,
            },
          },
        },
      });

      const result = expensesByType.map((type) => ({
        name: type.name,
        total: type.expenses.reduce((sum, exp) => sum + exp.amount, 0),
      }));

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener gastos por tipo" });
    }
  };
}

export default new ExpensesController();
