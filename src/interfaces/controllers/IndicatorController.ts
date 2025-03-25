import { Request, Response } from "express";
import { GetIndicatorsUseCase } from "../../core/usecases/GetIndicatorsUseCase";
import { VehicleRepositoryImpl } from "../../infrastructure/repositories/VehicleRepositoryImpl";
import { DriverRepositoryImpl } from "../../infrastructure/repositories/DriverRepositoryImpl";
import { ClientRepositoryImpl } from "../../infrastructure/repositories/ClientRepositoryImpl";

export class IndicatorController {
  static async getIndicators(req: Request, res: Response) {
    const driverRepository = new DriverRepositoryImpl();
    const vehicleRepository = new VehicleRepositoryImpl();
    const clientRepositoryImpl = new ClientRepositoryImpl()
    const getIndicators = new GetIndicatorsUseCase(
        driverRepository, 
        vehicleRepository,
        clientRepositoryImpl);

    try {
      const indicators = await getIndicators.execute();
      res.json(indicators);
    } catch (error) {
      res.status(500).json({ message: "Error obteniendo indicadores" });
    }
  }
}