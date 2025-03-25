import { OrderController } from "../src/interfaces/controllers/OrderController";
import { OrderUseCase } from "../src/core/usecases/OrderUseCase";

const mockOrderUseCase = {
  createOrder: jest.fn(),
};

const orderController = new OrderController(mockOrderUseCase as any);

describe("OrderController", () => {
  it("debería crear una orden y devolver el ID", async () => {
    const req = {
      body: {
        consecutive: "ORD20240322002",
        id_origin: 1,
        id_destination: 2,
        id_client: 1,
        id_status: 1,
        commitment_date: "2025-03-22",
        delivery_date: "2025-03-25",
        delivery_time: "14:00",
        sender: {
          name: "Juan Pérez",
          document: "1234567890",
          celphone: "+573001234567",
          address: "Calle 123, Bogotá",
          id_city: 1
        },
        receiver: {
          name: "Ana Gómez",
          document: "0987654321",
          celphone: "+573002345678",
          address: "Avenida 456, Medellín",
          id_city: 2
        },
        detalle: [
          {
            peso: 50.5,
            alto: 1.2,
            largo: 2.0,
            ancho: 1.0,
            cantidad: 10,
            producto: "Producto A"
          },
          {
            peso: 30.0,
            alto: 1.0,
            largo: 1.5,
            ancho: 0.8,
            cantidad: 5,
            producto: "Producto B"
          }
        ]
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    mockOrderUseCase.createOrder.mockResolvedValue({ id: 1, message: "Orden creada exitosamente" });

    await orderController.createOrder(req as any, res as any);

    expect(mockOrderUseCase.createOrder).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, message: "Orden creada exitosamente" });
  });
});