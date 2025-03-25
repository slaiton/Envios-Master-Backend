import { Request, Response } from "express";
import { GetCitiesUseCase } from "../../core/usecases/GetCitiesUseCase";

export class CityController {
    constructor(private getCitiesUseCase: GetCitiesUseCase) {}

    async getCities(req: Request, res: Response): Promise<Response> {
        try {
            const cities = await this.getCitiesUseCase.execute();
            const sanitizedCities = JSON.parse(JSON.stringify(cities));
            return res.status(200).json(sanitizedCities);
        } catch (error) {
            const errorMessage = (error as Error).message || "Error desconocido";
            return res.status(500).json({ message: errorMessage });
        }
    }
}