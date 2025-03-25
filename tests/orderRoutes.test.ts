import request from "supertest";
import app from "../src/app";

describe("Order Routes", () => {
  let token:any;


  beforeAll(async () => {
    const authResponse = await request(app)
      .post("/api/auth/login")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "admin@gmail.com",
        password: "123456" 
      });

    token = authResponse.body.token;
  })

  it("debería crear una nueva orden", async () => {
    const response = await request(app)
      .post("/api/order/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id_origin: 7988,
        id_destination: 7988,
        id_client: 1,
        commitment_date: "2025-03-25T07:31:37.766Z",
        sender: {
          name: "Andres",
          document: "546541",
          celphone: "546451",
          address: "Carrera 11b este # 20 - 54 Sur - las mercedes",
          id_city: 7988,
          streetType: "Carrera",
          orientation: "Sur",
          streetNumber: "11b este",
          neighborhood: "las mercedes",
          reference: "20 - 54"
        },
        receiver: {
          name: "Jorge",
          document: "452465",
          celphone: "456465",
          address: "Calle 20 bis sur # 9d-66 Este - San blas",
          id_city: 7988,
          streetType: "Calle",
          orientation: "Este",
          streetNumber: "20 bis sur",
          neighborhood: "San blas",
          reference: "9d-66"
        },
        detail: [
          {
            product: "Carne",
            weight: "600",
            height: "10",
            length: "20",
            width: "20",
            quantity: 1
          }
        ]
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(typeof response.body.id).toBe("number");
    expect(response.body).toHaveProperty("message", "Orden creada exitosamente");
  });
});
