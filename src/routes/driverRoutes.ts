import { Router } from "express";
import { DriverController } from "../interfaces/controllers/DriverController";
import { DriverUseCase } from "../core/usecases/DriverUseCase";
import { DriverRepositoryImpl } from "../infrastructure/repositories/DriverRepositoryImpl";
import authMiddleware from '../middlewares/authMiddleware'


const router = Router();

const driverRepository = new DriverRepositoryImpl();
const driverUseCase = new DriverUseCase(driverRepository);
const driverController = new DriverController(driverUseCase);


/**
 * @swagger
 * /drivers/available:
 *   get:
 *     summary: Obtiene todos los conductores disponibles con fechas al día
 *     tags:
 *       - Drivers
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de conductores disponibles
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
 *                   name:
 *                     type: string
 *                     example: "Juan"
 *                   last_name:
 *                     type: string
 *                     example: "Pérez"
 *                   document:
 *                     type: string
 *                     example: "123456789"
 *                   number_contact:
 *                     type: string
 *                     example: "+573001234567"
 *                   email:
 *                     type: string
 *                     example: "juan.perez@email.com"
 *                   licence_date:
 *                     type: string
 *                     format: date
 *                     example: "2025-12-31"
 *                   social_security_date:
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
      await driverController.getAvailableDrivers(req, res);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los vehículos disponibles" });
    }
  });

  export default router;