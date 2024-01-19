import express from "express";
import prisma from "../prisma";

const router = express.Router();

router.get('/expenses', async (req, res) => {
  try {
    await prisma.expenses.create({
      data: { 
        amount: 500,
        date: new Date(),
        created_at: new Date(),
      },
    })
    const expenses = await prisma.expenses.findMany();
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

export default router;