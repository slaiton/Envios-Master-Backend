import { Router } from "express";
import { TrackingController } from "../interfaces/controllers/TrackingController";
import { TrackingUseCase } from "../core/usecases/TrackingUseCase";
import { TrackingRepositoryImpl } from "../infrastructure/repositories/TrackingRepositoryImpl";
import authMiddleware from '../middlewares/authMiddleware'


const router = Router();
const trackingRepository = new TrackingRepositoryImpl();
const trackingUseCase = new TrackingUseCase(trackingRepository);
const trackingController = new TrackingController(trackingUseCase);

/**
 * @swagger
 * tags:
 *   name: Tracking
 *   description: Endpoints para gestionar el tracking de órdenes
 */

/**
 * @swagger
 * /api/tracking:
 *   post:
 *     summary: Crea un nuevo tracking
 *     tags: [Tracking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_order
 *               - id_status
 *               - id_user_create
 *             properties:
 *               id_order:
 *                 type: integer
 *                 example: 123
 *               id_status:
 *                 type: integer
 *                 example: 1
 *               id_user_create:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Tracking creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tracking creado"
 *                 id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Datos faltantes o inválidos
 *       500:
 *         description: Error en el servidor
 */
router.post("/tracking", authMiddleware, async (req, res) => {
    try {
        await trackingController.createTracking(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al crear Tracking" });
    }
});

/**
 * @swagger
 * /api/tracking/order/{id_order}:
 *   get:
 *     summary: Obtiene el tracking de una orden por ID
 *     tags: [Tracking]
 *     parameters:
 *       - in: path
 *         name: id_order
 *         required: true
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Lista de tracking encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   id_order:
 *                     type: integer
 *                   id_status:
 *                     type: integer
 *                   id_user_create:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Falta el ID de la orden
 *       500:
 *         description: Error en el servidor
 */
router.get("/tracking/order/:id_order", authMiddleware, async (req, res) => {
    try {
        await trackingController.getTrackingByOrder(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tracking" });
    }
});
/**
 * @swagger
 * /api/tracking/{id}:
 *   get:
 *     summary: Obtiene un tracking por su ID
 *     tags: [Tracking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Tracking encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_order:
 *                   type: integer
 *                 id_status:
 *                   type: integer
 *                 id_user_create:
 *                   type: integer
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Tracking no encontrado
 *       400:
 *         description: Falta el ID del tracking
 *       500:
 *         description: Error en el servidor
 */
router.get("/tracking/:id", authMiddleware, async (req, res) => {
    try {
        await trackingController.getTrackingById(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tracking" });
    }
});

export default router;