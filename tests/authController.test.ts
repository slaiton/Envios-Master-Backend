import { Request, Response } from "express";
import { register } from "../src/interfaces/controllers/AuthController";

describe("Auth Controller - Register", () => {
  it("Debe registrar un usuario correctamente", async () => {

    const req = {
      body: {
        name: "Andres Torres",
        email: "andresktorres@gmail.com",
        password: "123456",
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Usuario creado exitosamente" })
    );
  });

  it("Debe devolver error si falta un campo", async () => {
    const req = {
      body: {
        email: "andresktorres@gmail.com",
        password: "123456",
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Todos los campos son obligatorios" })
    );
  });
});