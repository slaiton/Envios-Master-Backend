import { Router } from "express";
import { VehicleController } from "../interfaces/controllers/VehicleController";
import { VehicleUseCase } from "../core/usecases/VehicleUseCase";
import { VehicleRepositoryImpl } from "../infrastructure/repositories/VehicleRepositoryImpl";
import authMiddleware from '../middlewares/authMiddleware'


const router = Router();

const vehicleRepository = new VehicleRepositoryImpl();
const vehicleUseCase = new VehicleUseCase(vehicleRepository);
const vehicleController = new VehicleController(vehicleUseCase);

/**
 * @swagger
 * /vehicles/available:
 *   get:
 *     summary: Obtiene todos los vehículos disponibles con fechas al día
 *     tags:
 *       - Vehicles
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vehículos disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   plate:
 *                     type: string
 *                     example: "ABC123"
 *                   model:
 *                     type: string
 *                     example: "Toyota Hilux"
 *                   capacity:
 *                     type: number
 *                     example: 1000
 *                   id_brand:
 *                     type: number
 *                     example: 2
 *                   id_class:
 *                     type: number
 *                     example: 3
 *                   id_type:
 *                     type: number
 *                     example: 1
 *                   soat_date:
 *                     type: string
 *                     format: date
 *                     example: "2025-12-31"
 *                   tecno_date:
 *                     type: string
 *                     format: date
 *                     example: "2025-06-30"
 *                   id_status:
 *                     type: number
 *                     example: 1
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */


router.get("/available/", authMiddleware, async (req, res) => {
    try {
        await vehicleController.getAvailableVehicles(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los vehículos disponibles" });
    }
});

export default router;