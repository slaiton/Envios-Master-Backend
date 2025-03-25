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
const AuthController_1 = require("../src/interfaces/controllers/AuthController");
describe("Auth Controller - Register", () => {
    it("Debe registrar un usuario correctamente", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                name: "Andres Torres",
                email: "andresktorres@gmail.com",
                password: "123456",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        yield (0, AuthController_1.register)(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Usuario creado exitosamente" }));
    }));
    it("Debe devolver error si falta un campo", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                email: "andresktorres@gmail.com",
                password: "123456",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        yield (0, AuthController_1.register)(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Todos los campos son obligatorios" }));
    }));
});
