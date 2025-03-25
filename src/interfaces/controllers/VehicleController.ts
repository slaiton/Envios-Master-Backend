import { Request, Response } from "express";
import { VehicleUseCase } from "../../core/usecases/VehicleUseCase";

export class VehicleController {
    constructor(private vehicleUseCase: VehicleUseCase) {}

    async getAvailableVehicles(req: Request, res: Response): Promise<Response> {
        try {
            const vehicles = await this.vehicleUseCase.execute();
            const sanitizedCities = JSON.parse(JSON.stringify(vehicles));
            return res.status(200).json(sanitizedCities);
        } catch (error) {
            const errorMessage = (error as Error).message || "Error desconocido";
            return res.status(500).json({ message: errorMessage });
        }
    }
}