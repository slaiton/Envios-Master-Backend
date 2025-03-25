import { Request, Response } from "express";
import { TrackingUseCase } from "../../core/usecases/TrackingUseCase";

export class TrackingController {
  constructor(private trackingUseCase: TrackingUseCase) {}

  async createTracking(req: Request, res: Response): Promise<Response> {
    try {
      const { id_order, id_status, id_user_create } = req.body;
      if (!id_order || !id_status || !id_user_create) {
        return res.status(400).json({ message: "Faltan datos obligatorios" });
      }

      const trackingId = await this.trackingUseCase.createTracking(id_order, id_status, id_user_create);
      return res.status(201).json({ message: "Tracking creado", id: trackingId });
    } catch (error:any) {
      return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
  }

  async getTrackingByOrder(req: Request, res: Response): Promise<Response> {
    try {
      const { id_order } = req.params;
      if (!id_order) {
        return res.status(400).json({ message: "Falta el ID de la orden" });
      }

      const tracking = await this.trackingUseCase.getTrackingByOrder(Number(id_order));
      return res.json(tracking);
    } catch (error:any) {
      return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
  }

  async getTrackingById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Falta el ID del tracking" });
      }

      const tracking = await this.trackingUseCase.getTrackingById(Number(id));
      if (!tracking) {
        return res.status(404).json({ message: "Tracking no encontrado" });
      }

      return res.json(tracking);
    } catch (error:any) {
      return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
  }
}