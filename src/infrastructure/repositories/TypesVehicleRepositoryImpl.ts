import prisma from "../../config/database";

export class TypesVehicleRepositoryImpl {
  async findOrCreateByName(typeName: string): Promise<number> {
    try {
      await prisma.$queryRawUnsafe(`
        INSERT IGNORE INTO types_vehicle (name, created_at, updated_at) 
        VALUES ('${typeName}', NOW(), NOW());
      `);
      
      const insertedId = await prisma.$queryRawUnsafe<{ id: number }[]>(`
        SELECT id FROM types_vehicle WHERE name LIKE '${typeName}' LIMIT 1;
      `);
      
      return insertedId[0].id;


    } catch (error) {
      console.error('Error en findOrCreateByName de TypesVehicleRepository:', error);
      throw error;
    }
  }
}