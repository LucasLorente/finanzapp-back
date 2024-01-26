import { Request, Response } from "express";
import prisma from "../prisma";

class CategoryController {
  getAll = async (req: Request, res: Response) => {
    try {
      const categories = await prisma.category.findMany();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener Categorías" });
    }
  };
}

export default new CategoryController();
