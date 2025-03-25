import prisma from "../../config/database";


export class OrderDetailRepositoryImpl {
    async createOrderDetails(orderId: number, details: any[]): Promise<void> {
      const values = details
        .map((d: any) => `(
          ${orderId}, 
          '${d.product}', 
          ${d.weight}, 
          ${d.height}, 
          ${d.length}, 
          ${d.width}, 
          ${d.quantity}
        )`)
        .join(",");
      
      await prisma.$executeRawUnsafe(`
        INSERT INTO detail_order 
          (id_order, product, weight, height, length, width, quantity)
        VALUES ${values};
      `);
    }
  }