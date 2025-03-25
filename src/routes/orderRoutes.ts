import { Router } from "express";
import { OrderController } from "../interfaces/controllers/OrderController";
import { OrderUseCase } from "../core/usecases/OrderUseCase";
import { OrderRepositoryImpl } from "../infrastructure/repositories/OrderRepositoryImpl";
import { SenderRepository } from '../infrastructure/repositories/senderRepository';
import { ReceiverRepository } from '../infrastructure/repositories/receiverRepository';
import { OrderDetailRepositoryImpl } from "../infrastructure/repositories/OrderDetailRepositoryImpl";
import { ConsecutiveRepositoryImpl } from "../infrastructure/repositories/ConsecutiveRepositoryImpl";
import { CityRepositoryImpl } from "../infrastructure/repositories/CityRepositoryImpl";
import { TrackingRepositoryImpl } from "../infrastructure/repositories/TrackingRepositoryImpl";



import authMiddleware from '../middlewares/authMiddleware'


const router = Router();
const senderRepository = new SenderRepository();
const receiverRepository = new ReceiverRepository();
const orderRepository = new OrderRepositoryImpl();
const orderDetailRepository = new OrderDetailRepositoryImpl();
const consecutiveRepository = new ConsecutiveRepositoryImpl();
const cityRepository = new CityRepositoryImpl();
const trackingRepository = new TrackingRepositoryImpl();
const orderUseCase = new OrderUseCase(
     orderRepository,
     senderRepository,
     receiverRepository,
     orderDetailRepository,
     consecutiveRepository,
     cityRepository,
     trackingRepository);
const orderController = new OrderController(orderUseCase);

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API para gestionar órdenes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autoincremental de la orden
 *         consecutive:
 *           type: string
 *           description: Número consecutivo de la orden
 *         id_origin:
 *           type: integer
 *           description: ID de la ciudad de origen
 *         id_destination:
 *           type: integer
 *           description: ID de la ciudad de destino
 *         id_vehicle:
 *           type: integer
 *           description: ID del vehículo asignado
 *         id_driver:
 *           type: integer
 *           description: ID del conductor asignado
 *         id_status:
 *           type: integer
 *           description: ID del estado de la orden
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Obtener todas las órdenes
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de órdenes
 */
router.get("/", orderController.getOrders.bind(orderController));

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Obtener una orden por ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Orden encontrada
 *       404:
 *         description: Orden no encontrada
 */
router.get("/:id", orderController.getOrderById.bind(orderController));

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crear una nueva orden
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 */
router.post("/", authMiddleware, orderController.createOrder.bind(orderController));

/**
 * @swagger
 * /orders/distpacht:
 *   post:
 *     summary: Despachar una orden
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Orden Despachada
 */

router.post("/dispatch", authMiddleware, orderController.dispatchOrder.bind(orderController));

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Actualizar una orden
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la orden a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Orden actualizada
 */
router.put("/:id", orderController.updateOrder.bind(orderController));

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Eliminar una orden
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la orden a eliminar
 *     responses:
 *       200:
 *         description: Orden eliminada
 */
router.delete("/:id", orderController.deleteOrder.bind(orderController));

export default router;