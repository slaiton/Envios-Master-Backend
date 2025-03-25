import prisma from "../../config/database";
import { Order } from '../../core/interfaces/OrderRepository';

export class OrderRepositoryImpl {


  constructor() {
  }

  async createOrder(data: any, userId: any, senderId: number, receiverId: number, consecutive: string): Promise<any> {
    return await prisma.$transaction(async (prisma: { $queryRawUnsafe: (arg0: string) => { id: number; }[] | PromiseLike<{ id: number; }[]>; }) => {

      const formattedDate = new Date(data.commitment_date).toISOString().split('T')[0];
      await prisma.$queryRawUnsafe(`
        INSERT INTO orders (consecutive, id_origin, id_destination, id_status, id_sender, id_receiver, id_client, commitment_date, created_at, updated_at, id_user_create)
        VALUES ('${consecutive}', ${data.id_origin}, ${data.id_destination}, 1, ${senderId}, ${receiverId}, ${data.id_client}, '${formattedDate}', NOW(), NOW(), ${userId});
      `);

      
      const orderIdResult = await prisma.$queryRawUnsafe(`
        SELECT id FROM orders WHERE consecutive LIKE '${consecutive}' LIMIT 1;
    `) as { id: number }[];
      const orderId = orderIdResult[0].id;

      return { id: orderId, message: "Orden creada exitosamente" };
    });
  }

  async getOrders(filters: any): Promise<Order[]> {
    const {
      startDate,
      endDate,
      id_status,
      id_client,
      id_vehicle,
      id_driver,
      id_origin,
      id_destination,
      consecutive
    } = filters;

    let query = `
      SELECT a.id, a.consecutive, a.commitment_date, a.delivery_date, a.delivery_time, st.color as status_color,
             co.name as origin_name, ds.name as destination_name, vh.plate, 
             CONCAT(dr.name, ' ', dr.last_name) as driver_name, dr.document as document_driver,
             st.name as status_name, cl.name as client_name, a.created_at, a.updated_at, 
             uc.name as user_created, sd.name as sender_name, sd.document as sender_document,
             sd.celphone as sender_celphone, sd.address as sender_address, 
             rv.name as receiver_name, rv.document as receiver_document, rv.celphone as receiver_celphone, 
             rv.address as receiver_address, ua.name as user_update, 
             co.departament as origin_departament, ds.departament as destination_departament,
             COALESCE(
                 JSON_ARRAYAGG(
                     JSON_OBJECT(
                         'id', do.id,
                         'peso', do.weight,
                         'alto', do.height,
                         'largo', do.length,
                         'ancho', do.width,
                         'cantidad', do.quantity,
                         'producto', do.product
                     )
                 ), '[]'
             ) AS detail
      FROM orders as a
      JOIN cities as co ON co.id = a.id_origin                                          
      JOIN cities as ds ON ds.id = a.id_destination          
      JOIN status_delivery st ON st.id = a.id_status                               
      JOIN clients cl ON cl.id = a.id_client
      JOIN senders sd ON sd.id = a.id_sender                              
      JOIN receivers rv ON rv.id = a.id_receiver                              
      LEFT JOIN vehicles vh ON vh.id = a.id_vehicle                                          
      LEFT JOIN drivers dr ON dr.id = a.id_driver      
      JOIN users as uc ON uc.id = a.id_user_create                                    
      LEFT JOIN users as ua ON ua.id = a.id_user_update
      JOIN detail_order AS do ON do.id_order = a.id
      WHERE a.deleted_at IS NULL
    `;

    const params: any[] = [];

    if (startDate && endDate) {
      query += ` AND a.created_at BETWEEN ? AND ?`;
      params.push(startDate, endDate);
    }

    if (id_status) {
      query += ` AND a.id_status = ?`;
      params.push(id_status);
    }

    if (id_client) {
      query += ` AND a.id_client = ?`;
      params.push(id_client);
    }

    if (id_vehicle) {
      query += ` AND a.id_vehicle = ?`;
      params.push(id_vehicle);
    }

    if (id_driver) {
      query += ` AND a.id_driver = ?`;
      params.push(id_driver);
    }

    if (id_origin) {
      query += ` AND a.id_origin = ?`;
      params.push(id_origin);
    }

    if (id_destination) {
      query += ` AND a.id_destination = ?`;
      params.push(id_destination);
    }
    
    if (consecutive && consecutive.length > 0) {
      query += ` AND a.consecutive = ?`;

      params.push(consecutive);
    }

    query += ` GROUP BY a.id ORDER BY a.created_at;`;

    return await prisma.$queryRawUnsafe(query, ...params) as Order[];
  }

  async getOrderById(id: number): Promise<Order | null> {
    const result = await prisma.$queryRaw<Order[]>`
       SELECT a.id, a.consecutive, a.commitment_date, a.delivery_date, a.delivery_time , st.color as status_color,
           co.name as origin_name, ds.name as destination_name, vh.plate, CONCAT(dr.name, ' ', dr.last_name) as driver_name, dr.document as document_driver,
           st.name as status_name, cl.name as client_name, a.created_at, a.updated_at, uc.name as user_created, sd.name as sender_name, sd.document as sender_document,
           sd.celphone as sender_celphone, sd.address as sender_address, rv.name as receiver_name, rv.document as receiver_document, rv.celphone as receiver_celphone, 
           rv.address as receiver_address, ua.name as user_update, co.departament as origin_departament, ds.departament as destination_departament,
                          COALESCE(
                    JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id', do.id,
                                'peso', do.weight,
                                'alto', do.height,
                                'largo', do.length,
                                'ancho', do.width,
                                'cantidad', do.quantity,
                                'producto', do.product
                            )
                    ), '[]'
                ) AS detail
    FROM orders as a
    JOIN cities as co ON co.id = a.id_origin                                          
    JOIN cities as ds ON ds.id = a.id_destination          
    JOIN status_delivery st ON st.id = a.id_status                               
    JOIN clients cl ON cl.id = a.id_client
    JOIN senders sd ON sd.id = a.id_sender                              
    JOIN receivers rv ON rv.id = a.id_receiver                              
    LEFT JOIN vehicles vh ON vh.id = a.id_vehicle                                          
    LEFT JOIN drivers dr ON dr.id = a.id_driver      
    JOIN users as uc ON uc.id = a.id_user_create                                    
    LEFT JOIN users as ua ON ua.id = a.id_user_update
    JOIN detail_order AS do ON do.id_order = a.id                                   
    WHERE a.id = ${id} AND a.deleted_at IS NULL
    GROUP BY a.id;`;
    return result.length > 0 ? result[0] : null;
  }

  async dispatchOrder(data: any, userId: number): Promise<void> {

    const orderIds = data.orders;

    if (!orderIds.length) {
      throw new Error("El array de órdenes está vacío o no es válido.");
    }

    for (const orderId of data.orders) {
      await prisma.$executeRaw`
          UPDATE orders
          SET id_vehicle = ${data.id_vehicle}, 
              id_driver = ${data.id_driver}, 
              id_status = ${data.id_status},
              id_user_update = ${userId}, 
              updated_at = NOW()
          WHERE consecutive = ${orderId}
       `;
    }

  }

  async getIdByConsecutive(consecutive: string): Promise<number> {
    const orderIdResult = await prisma.$queryRawUnsafe(
     `SELECT id FROM orders WHERE consecutive = ? LIMIT 1`,
    consecutive
    ) as { id: number }[];
  
    return orderIdResult.length ? orderIdResult[0].id : 0; // Manejo de caso sin resultados
  }

  async updateOrder(id: number, data: any): Promise<void> {
    await prisma.$executeRaw`
      UPDATE orders
      SET consecutive = '${data.consecutive}', id_origin = ${data.id_origin}, id_destination = ${data.id_destination},
          id_vehicle = ${data.id_vehicle}, id_driver = ${data.id_driver}, id_status = ${data.id_status},
          fecha_compromiso = '${data.fecha_compromiso}', fecha_entrega = '${data.fecha_entrega}', hora_entrega = ${data.hora_entrega},
          updated_at = NOW(), id_user_update = ${data.id_user_update}
      WHERE id = ${id} AND deleted_at IS NULL;
    `;
  }

  async deleteOrder(id: number, userId: number): Promise<void> {
    await prisma.$executeRaw`
      UPDATE orders
      SET deleted_at = NOW(), id_user_delete = ${userId}
      WHERE id = ${id};
    `;
  }
}