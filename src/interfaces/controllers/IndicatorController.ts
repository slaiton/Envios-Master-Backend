import { Request, Response } from "express";
import { GetIndicatorsUseCase } from "../../core/usecases/GetIndicatorsUseCase";
import { VehicleRepositoryImpl } from "../../infrastructure/repositories/VehicleRepositoryImpl";
import { DriverRepositoryImpl } from "../../infrastructure/repositories/DriverRepositoryImpl";

export class IndicatorController {
  static async getIndicators(req: Request, res: Response) {
    const driverRepository = new DriverRepositoryImpl();
    const vehicleRepository = new VehicleRepositoryImpl();
    const getIndicators = new GetIndicatorsUseCase(driverRepository, vehicleRepository);

    try {
      const indicators = await getIndicators.execute();
      res.json(indicators);
    } catch (error) {
      res.status(500).json({ message: "Error obteniendo indicadores" });
    }
  }
}