import { TrackingRepository } from "../../core/interfaces/TrackingRepository";
import { Tracking } from "../../core/entities/Tracking";

export class TrackingUseCase {
  constructor(private trackingRepository: TrackingRepository) {}

  async createTracking(id_order: number, id_status: number, id_user_create: number): Promise<number> {
    return await this.trackingRepository.createTracking(id_order, id_status, id_user_create);
  }

  async getTrackingByOrder(id_order: number): Promise<Tracking[]> {
    return await this.trackingRepository.getTrackingByOrder(id_order);
  }

  async getTrackingById(id: number): Promise<Tracking | null> {
    return await this.trackingRepository.getTrackingById(id);
  }
}