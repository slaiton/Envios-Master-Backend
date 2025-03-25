import { Router } from "express";
import { CityController } from "../interfaces/controllers/CityController";
import { GetCitiesUseCase } from "../core/usecases/GetCitiesUseCase";
import { CityRepositoryImpl } from "../infrastructure/repositories/CityRepositoryImpl";
import authMiddleware from '../middlewares/authMiddleware'


const router = Router();

// Inyectamos dependencias
const cityRepository = new CityRepositoryImpl();
const getCitiesUseCase = new GetCitiesUseCase(cityRepository);
const cityController = new CityController(getCitiesUseCase);


/**
 * @swagger
 * /cities:
 *   get:
 *     summary: Obtiene la lista de ciudades disponibles
 *     description: Retorna un listado de todas las ciudades registradas en la base de datos.
 *     tags:
 *       - Cities
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de ciudades obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Bogotá"
 *       401:
 *         description: No autorizado - Token inválido o no proporcionado
 *       500:
 *         description: Error interno del servidor
 */

router.get("/", authMiddleware,  async (req, res) => {
    try {
        await cityController.getCities(req, res);
    } catch (error) {
        console.error("Error al obtener las ciudades:", error);
        
        if (!res.headersSent) {
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
});

export default router;