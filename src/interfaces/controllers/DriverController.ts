import { Request, Response } from "express";
import { DriverUseCase } from "../../core/usecases/DriverUseCase";

export class DriverController {
    constructor(private driverUseCase: DriverUseCase) {}

    async getAvailableDrivers(req: Request, res: Response): Promise<Response> {
        try {
            const drivers = await this.driverUseCase.execute();
            const sanitizedCities = JSON.parse(JSON.stringify(drivers));
            return res.status(200).json(sanitizedCities);
        } catch (error) {
            const errorMessage = (error as Error).message || "Error desconocido";
            return res.status(500).json({ message: errorMessage });
        }
    }
}