"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderController_1 = require("../src/interfaces/controllers/OrderController");
const mockOrderUseCase = {
    createOrder: jest.fn(),
};
const orderController = new OrderController_1.OrderController(mockOrderUseCase);
describe("OrderController", () => {
    it("debería crear una orden y devolver el ID", () => __awaiter(void 0, void 0, void 0, function* () {
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
        yield orderController.createOrder(req, res);
        expect(mockOrderUseCase.createOrder).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: 1, message: "Orden creada exitosamente" });
    }));
});
