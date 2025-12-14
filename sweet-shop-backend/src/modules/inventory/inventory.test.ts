import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";

let token: string;
let sweetId: string;

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/sweetshop-test");

  await request(app)
    .post("/api/auth/register")
    .send({ email: "admin2@test.com", password: "123456", role: "admin" });

  const login = await request(app)
    .post("/api/auth/login")
    .send({ email: "admin2@test.com", password: "123456" });

  token = login.body.token;

  const sweet = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${token}`)
    .send({ name: "Barfi", category: "Indian", price: 40, quantity: 5 });

  sweetId = sweet.body._id;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Inventory Tests", () => {
  test("Purchase", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.sweet.quantity).toBe(4);
  });

  test("Restock", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${token}`)
      .send({ amount: 10 });

    expect(res.status).toBe(200);
    expect(res.body.sweet.quantity).toBe(14);
  });
});
