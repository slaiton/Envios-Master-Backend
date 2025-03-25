import { Router, Request, Response } from 'express';
import { ClientUseCase } from '../core/usecases/ClientUseCase';
import { ClientRepositoryImpl } from '../infrastructure/repositories/ClientRepositoryImpl';

// Crear una instancia del repositorio
const clientRepository = new ClientRepositoryImpl();

// Crear una instancia del Use Case
const clientUseCase = new ClientUseCase(clientRepository);

// Crear el enrutador de clientes
const clientRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: API para manejar los clientes
 */

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClientViewModel'
 *       500:
 *         description: Error al obtener los clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener los clientes."
 */
clientRoutes.get('/getall', async (req: Request, res: Response) => {
  try {
    // Ejecutar el Use Case
    const clients = await clientUseCase.execute();

    // Responder con la lista de clientes
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    res.status(500).json({ message: 'Error al obtener los clientes.' });
  }
});

export default clientRoutes;