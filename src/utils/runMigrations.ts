import fs from "fs";
import path from "path";
import prisma from "../config/database";

const migrationsPath = path.join(__dirname, "../migrations");

async function runMigrations() {
  try {
    const files = fs.readdirSync(migrationsPath).sort();
    for (const file of files) {
      const filePath = path.join(migrationsPath, file);
      const sql = fs.readFileSync(filePath, "utf8");
      await prisma.$executeRawUnsafe(sql); 
      console.log(`✅ Migración ejecutada: ${file}`);
    }
  } catch (error) {
    console.error("Error ejecutando migraciones:", error);
  } finally {
    await prisma.$disconnect();
  }
}

runMigrations();