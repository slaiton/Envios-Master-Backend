import prisma from "../../config/database";

export class ReceiverRepository {
  async getOrCreateReceiver(receiverData: any, userId:any): Promise<any> {
    // Buscar si existe el receiver con los mismos datos
     const result = await prisma.$queryRawUnsafe<{ id: number }[]>(`
      SELECT id FROM receivers WHERE document = '${receiverData.document}' AND address = '${receiverData.address}' AND id_city = ${receiverData.id_city} LIMIT 1;
    `);

    // Si ya existe, retornar el ID
    if (result.length > 0) {
      return { id: result[0].id };
    }

    // Si no existe, insertar el receiver
    const insertResult = await prisma.$executeRawUnsafe(`
      INSERT INTO receivers (name, document, celphone, address, id_city, id_status, created_at, updated_at, id_user_create)
      VALUES ('${receiverData.name}', '${receiverData.document}', '${receiverData.celphone}', '${receiverData.address}', ${receiverData.id_city}, 1, NOW(), NOW(),  ${userId});
    `);

     const orderIdResult = await prisma.$queryRawUnsafe<{ id: number }[]>(`
      SELECT id FROM receivers WHERE document LIKE '${receiverData.document}' LIMIT 1;
    `);
    return { id: orderIdResult[0].id };
  }
}