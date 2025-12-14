import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";

let token: string;

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/sweetshop-test");

  // create admin user and login
  await request(app)
    .post("/api/auth/register")
    .send({ email: "admin@test.com", password: "123456", role: "admin" });

  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "admin@test.com", password: "123456" });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Sweet CRUD Tests", () => {
  test("Create Sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Ladoo", category: "Indian", price: 20, quantity: 10 });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Ladoo");
  });

  test("Get Sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
