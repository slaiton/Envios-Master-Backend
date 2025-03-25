import { Request, Response } from "express";
import { OrderUseCase } from "../../core/usecases/OrderUseCase";
import { AuthRequest } from "../../middlewares/authMiddleware";
import { Prisma } from "@prisma/client";

export class OrderController {

  constructor(private orderUseCase: OrderUseCase) {}

  async getOrders(req: AuthRequest, res: Response): Promise<void> {
    try {
      const filters = req.query
      const orders = await this.orderUseCase.getOrders(filters);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders" });
    }
  }

  async getOrderById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const order = await this.orderUseCase.getOrderById(Number(id));
      if (!order) {
        res.status(404).json({ message: "Order not found" });
        return;
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Error fetching order" });
    }
  }
  
  async createOrder(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId;
      const newOrder = await this.orderUseCase.createOrder(req.body, userId);

      if (newOrder.errors) {
      res.status(newOrder.statusCode).json({message: "Error en los datos", errors: newOrder.errors});
      }else{
        res.status(201).json(newOrder);
      }
    
    } catch (error) {
      console.error("Error creating order:", error);
  
      let errorResponse: any = { message: "Error creating order" };
  
      res.status(500).json(errorResponse);
    }
  }

  async dispatchOrder(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId;
      const newOrder = await this.orderUseCase.dispatchOrder(req.body, userId);
      res.status(200).json(newOrder);
    } catch (error) {
      console.log(error);
      
      let errorResponse: any = { message: "Error despachando... " };
      res.status(500).json(errorResponse);
    }
  }

  async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedOrder = await this.orderUseCase.updateOrder(Number(id), req.body);
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: "Error updating order" });
    }
  }

  async deleteOrder(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.userId;
      if (userId) {
      await this.orderUseCase.deleteOrder(Number(id), userId);
      }else{
         res.status(401).json({ message: "Usuario no autenticado" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting order" });
    }
  }
}