import { Request, Response } from "express";
import prisma from "../prisma";

class ExpensesTypeController {
  getAll = async (_req: Request, res: Response) => {
    try {
      const types = await prisma.expensesType.findMany();
      res.json(types);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener Tipos de Gastos" });
    }
  };
}

export default new ExpensesTypeController();
