import { Request, Response } from "express";
import prisma from "../prisma";

class IncomeCategoriesController {
  getAll = async (req: Request, res: Response) => {
    try {
      const categories = await prisma.incomeCategory.findMany();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener Categorías" });
    }
  };
}

export default new IncomeCategoriesController();
