import prisma from "../../config/database";


export class SenderRepository {
  async getOrCreateSender(senderData: any, userId:any): Promise<any> {

    const result = await prisma.$queryRawUnsafe(`
      SELECT id FROM senders WHERE document = '${senderData.document}' AND address = '${senderData.address}' AND id_city = ${senderData.id_city} LIMIT 1;
      `)  as { id: number }[];;

    if (result.length > 0) {
      return { id: result[0].id };
    }

     await prisma.$executeRawUnsafe(`
      INSERT INTO senders (name, document, celphone, address, id_city, id_status, created_at, updated_at, id_user_create)
      VALUES ('${senderData.name}', '${senderData.document}','${senderData.celphone}', '${senderData.address}', ${senderData.id_city}, 1, NOW(), NOW(), ${userId});
    `);

      const newSenderIdResult = await prisma.$queryRawUnsafe(`
      SELECT id FROM senders WHERE document LIKE '${senderData.document}' LIMIT 1;
    `)  as { id: number }[];;
    return { id: newSenderIdResult[0].id };
  }
}