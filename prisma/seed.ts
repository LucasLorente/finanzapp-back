import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.expensesCategory.createMany({
    data: [
      {
        name: "Hogar",
      },
      {
        name: "Servicios",
      },
      {
        name: "Salud",
      },
      {
        name: "Transporte",
      },
      {
        name: "Entretenimiento",
      },
      {
        name: "Educación",
      },
      {
        name: "Ropa",
      },
      {
        name: "Viajes",
      },
    ],
  });
  await prisma.expensesType.createMany({
    data: [
      {
        name: "Fijos",
      },
      {
        name: "Variables Necesarios",
      },
      {
        name: "Superfluos",
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
