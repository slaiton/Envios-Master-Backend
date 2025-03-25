import { Request, Response } from "express";
import { ClientUseCase } from "../../core/usecases/ClientUseCase";

export class CityController {
    constructor(private clientUseCase: ClientUseCase) {}

    async getCities(req: Request, res: Response): Promise<Response> {
        try {
            const clients = await this.clientUseCase.execute();
            const sanitizedClients = JSON.parse(JSON.stringify(clients));
            return res.status(200).json(sanitizedClients);
        } catch (error) {
            const errorMessage = (error as Error).message || "Error desconocido";
            return res.status(500).json({ message: errorMessage });
        }
    }
}