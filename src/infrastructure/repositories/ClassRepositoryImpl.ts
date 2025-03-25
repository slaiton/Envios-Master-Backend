import prisma from "../../config/database";

export class ClassRepositoryImpl {
  async findOrCreateByName(className: string, idBrand: number): Promise<number> {
    try {

      await prisma.$queryRawUnsafe(`
        INSERT IGNORE INTO class (name, id_brand, created_at, updated_at) 
        VALUES ('${className}', ${idBrand}, NOW(), NOW());
      `) as Array<{ id: number }>;

      const insertedId = await prisma.$queryRawUnsafe(`
        SELECT id FROM class WHERE name LIKE '${className}' AND id_brand = ${idBrand} ORDER BY id DESC LIMIT 1;
      `) as { id: number }[];
      
      return insertedId[0].id;

    } catch (error) {
      console.error('Error en findOrCreateByName de ClassRepository:', error);
      throw error;
    }
  }
}