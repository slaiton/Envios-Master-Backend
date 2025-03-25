import { PrismaClient } from "@prisma/client";
import { TrackingRepository } from "../../core/interfaces/TrackingRepository";
import { Tracking } from "../../core/entities/Tracking";

const prisma = new PrismaClient();

export class TrackingRepositoryImpl implements TrackingRepository {
  async createTracking(id_order: number, id_status: number, observation:string, id_user_create: number): Promise<void> {
    const query = `
      INSERT INTO tracking (id_order, id_status, observation, id_user_create) 
      VALUES (${id_order}, ${id_status}, '${observation}', ${id_user_create});
    `;
    await prisma.$queryRawUnsafe(query) as { id: number }[];
    return;
  }

  async getTrackingByOrder(id_order: number): Promise<Tracking[]> {
    const query = `
      SELECT * FROM tracking WHERE id_order = ?;
    `;
    return await prisma.$queryRawUnsafe(query, id_order) as Tracking[];
  }

  async getTrackingById(id: number): Promise<Tracking | null> {
    const query = `
      SELECT * FROM tracking WHERE id = ? LIMIT 1;
    `;
    const result = await prisma.$queryRawUnsafe(query, id) as Tracking[];
    return result.length ? result[0] : null;
  }
}