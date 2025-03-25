import { Router } from "express";
import { IndicatorController } from "../interfaces/controllers/IndicatorController";

const router = Router();

/**
 * @swagger
 * /indicators:
 *   get:
 *     summary: Obtener indicadores del sistema
 *     description: Retorna el total de vehículos, conductores, órdenes despachadas y vehículos disponibles.
 *     tags:
 *       - Indicadores
 *     responses:
 *       200:
 *         description: Éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalVehicles:
 *                   type: integer
 *                   example: 120
 *                 totalDrivers:
 *                   type: integer
 *                   example: 85
 *                 totalDispatchedOrders:
 *                   type: integer
 *                   example: 200
 *                 availableVehicles:
 *                   type: integer
 *                   example: 50
 *       500:
 *         description: Error en el servidor
 */
router.get("/indicators", IndicatorController.getIndicators);

export default router;