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
describe("Auth Routes - /api/auth/register", () => {
    it("Debe registrar un usuario correctamente", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/auth/register")
            .send({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Usuario creado exitosamente");
    }));
    it("Debe fallar si falta un campo", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/auth/register")
            .send({
            email: "johndoe@example.com",
            password: "123456",
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Todos los campos son obligatorios");
    }));
});
