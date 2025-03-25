import request from "supertest";
import app from "../src/app";

describe("Auth Routes - /api/auth/register", () => {
  it("Debe registrar un usuario correctamente", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123456",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Usuario creado exitosamente");
  });

  it("Debe fallar si falta un campo", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "johndoe@example.com",
        password: "123456",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Todos los campos son obligatorios");
  });
});