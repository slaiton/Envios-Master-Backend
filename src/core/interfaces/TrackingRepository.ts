import { Tracking } from "../entities/Tracking";

export interface TrackingRepository {
  createTracking(id_order: number, id_status: number, observation:string ,id_user_create: number): Promise<void>;
  getTrackingByOrder(id_order: number): Promise<Tracking[]>;
  getTrackingById(id: number): Promise<Tracking | null>;
}