import { OrderRepositoryImpl } from "../../infrastructure/repositories/OrderRepositoryImpl";
import { SenderRepository } from '../../infrastructure/repositories/senderRepository';
import { ReceiverRepository } from '../../infrastructure/repositories/receiverRepository';
import { OrderDetailRepositoryImpl } from "../../infrastructure/repositories/OrderDetailRepositoryImpl";
import { ConsecutiveRepositoryImpl } from "../../infrastructure/repositories/ConsecutiveRepositoryImpl";
import { CityRepositoryImpl } from "../../infrastructure/repositories/CityRepositoryImpl";
import { ValidationError } from "../../errors/ValidationError";
import { TrackingRepositoryImpl } from "../../infrastructure/repositories/TrackingRepositoryImpl";

export class OrderUseCase {
  private orderRepository: OrderRepositoryImpl;
  private senderRepository: SenderRepository;
  private receiverRepository: ReceiverRepository;
  private orderDetailRepository: OrderDetailRepositoryImpl;
  private consecutiveRepository: ConsecutiveRepositoryImpl;
  private cityRepository: CityRepositoryImpl;
  private trackingRepository: TrackingRepositoryImpl;

  constructor(
    orderRepository: OrderRepositoryImpl,
    senderRepository: SenderRepository,
    receiverRepository: ReceiverRepository,
    orderDetailRepository: OrderDetailRepositoryImpl,
    consecutiveRepository: ConsecutiveRepositoryImpl,
    cityRepository: CityRepositoryImpl,
    trackingRepository: TrackingRepositoryImpl
  ) {
    this.orderRepository = orderRepository;
    this.senderRepository = senderRepository;
    this.receiverRepository = receiverRepository;
    this.orderDetailRepository = orderDetailRepository;
    this.consecutiveRepository = consecutiveRepository;
    this.cityRepository = cityRepository;
    this.trackingRepository = trackingRepository
  }

  async createOrder(data: any, userId: any): Promise<any> {
    const errors: Record<string, string> = {};

    if (!data.id_origin) {
      errors.id_origin = "El origen es obligatorio.";
    }
    if (!data.id_destination) {
      errors.id_destination = "El destino es obligatorio.";
    }
    if (!data.id_client) {
      errors.id_client = "El campo cliente es obligatorio.";
    }

    if (!data.detail) {
      errors.id_client = "El campo detalle es obligatorio.";
    }

    if (data.detail.length == 0) {
      errors.id_client = "El campo detalle esta Vacio.";
    }

    if (Object.keys(errors).length > 0) {
      return { errors, statusCode: 422, message: "Errores en los datos proporcionados" };
    }


    const sender = await this.senderRepository.getOrCreateSender(data.sender, userId);
    const receiver = await this.receiverRepository.getOrCreateReceiver(data.receiver, userId);

    const cityOrigin = await this.cityRepository.getCityById(data.id_origin)

    if (!cityOrigin) {
      throw new Error("Ciudad de origen no encontrada.");
    }

    const prefix = cityOrigin.prefix


    if (!prefix) {
      throw new Error("Error al generar consecutivo.");
    }

    const consecutive = await this.consecutiveRepository.generateConsecutive(prefix)
    // const consecutive = await this.consecutiveRepository.getLastConsecutive(prefix)


    // if (!consecutive) {
    //   throw new Error("No se pudo obtener el consecutivo.");
    // }

    let consecutiveNumber = consecutive.toString()

    if (consecutiveNumber.length < 3) {
      consecutiveNumber = prefix + '00' + consecutive
    } else {
      consecutiveNumber = prefix + consecutive
    }


    const senderId = sender.id;
    const receiverId = receiver.id;

    const order = await this.orderRepository.createOrder(data, userId, senderId, receiverId, consecutiveNumber);


    if ((data.detail && data.detail.length > 0)) {
      await this.orderDetailRepository.createOrderDetails(order.id, data.detail);
    }


    return { id: order.id, message: "Orden creada exitosamente" };
  }

  async getOrders(filters: any): Promise<any[]> {
    return await this.orderRepository.getOrders(filters);
  }

  async getOrderById(id: number): Promise<any | null> {
    return await this.orderRepository.getOrderById(id);
  }

  async dispatchOrder(data: any, userId: any): Promise<void> {

    await this.orderRepository.dispatchOrder(data, userId);

    for (const consecutive of data.orders) {

      const orderId = await this.orderRepository.getIdByConsecutive(consecutive)
      await this.trackingRepository.createTracking(Number(orderId), data.id_status, data.observation, userId)
      // return orderId;
    }


    return;
  }

  async updateOrder(id: number, data: any): Promise<void> {
    return await this.orderRepository.updateOrder(id, data);
  }

  async deleteOrder(id: number, userId: number): Promise<void> {
    return await this.orderRepository.deleteOrder(id, userId);
  }
}