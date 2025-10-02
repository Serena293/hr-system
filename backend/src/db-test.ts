import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log("DB connected ", result);
  } catch (err) {
    console.error("DB connection failed ❌", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
