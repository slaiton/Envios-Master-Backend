import prisma from "../../config/database";

export class BrandRepositoryImpl {
  async findOrCreateByName(brandName: string): Promise<number> {
    try {
      await prisma.$queryRawUnsafe(`
        INSERT IGNORE INTO brands (name, created_at, updated_at) 
        VALUES ('${brandName}', NOW(), NOW());
      `);
      
      const insertedId = await prisma.$queryRawUnsafe<{ id: number }[]>(`
        SELECT id FROM brands WHERE name LIKE '${brandName}' LIMIT 1;
      `);
      
      return insertedId[0].id;


    } catch (error) {
      console.error('Error en findOrCreateByName de BrandRepository:', error);
      throw error;
    }
  }
}