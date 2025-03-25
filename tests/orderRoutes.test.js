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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe("Order Routes", () => {
    it("debería crear una nueva orden", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/order/")
            .send({
            consecutive: "ORD20240322001",
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
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("message", "Orden creada exitosamente");
    }));
});
